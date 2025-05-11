import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/player_page.css";
import views from "../assets/icons/Views_icon.svg";
import likes from "../assets/icons/Love_icon.svg"; // Import your CSS file for styling

function PlayerPage() {
  const { id } = useParams(); // Access the dynamic segment
  const navigate = useNavigate(); // React Router navigation hook

  interface VideoData {
    image_url: string;
    likes: number;
    views: number;
    videos: string;
  }

  const [data, setData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true); // Explicit loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "https://apagefromthephotographer.site"; // Fallback to localhost if env variable is not set

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController
    const signal = controller.signal;

    setLoading(true); // Start loading
    setError(null); // Reset error state

    fetch(`${API_BASE_URL}/config/data_fetch.php?id=${id}`, { signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // Get the response as plain text
      })
      .then((text) => {
        try {
          // Remove "Connected successfully" and parse the JSON
          const cleanedText = text
            .replace(/^Connected successfully\s*/, "")
            .trim();
          const jsonData = JSON.parse(cleanedText);

          // Check if the response contains an error
          if (jsonData.error) {
            console.error("API Error:", jsonData.error);
            navigate("/404", { replace: true }); // Redirect to 404 page and replace history
          } else if (!jsonData || Object.keys(jsonData).length === 0) {
            navigate("/404", { replace: true }); // Redirect to 404 page and replace history
          } else {
            setData(jsonData); // Set the data directly
          }
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          setError("Invalid response from server.");
        }
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching data:", error);
          setError("Failed to load data. Please try again later.");
          setLoading(false); // Stop loading
        }
      });

    return () => controller.abort(); // Cleanup on unmount
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <>
      <div className="whole_page">
        {data ? (
          <div className="container">
            <div className="video_container">
              <iframe
                src={data.videos}
                title="Video Player"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="video_player"
              ></iframe>
            </div>
            <div className="video_details">
              <button
                className="like_button"
                onClick={() => {
                  fetch(`${API_BASE_URL}/config/like_video.php?id=${id}`, {
                    method: "POST",
                  })
                    .then((response) => {
                      if (!response.ok) {
                        throw new Error("Failed to like the video.");
                      }
                      return response.text(); // Get the response as plain text
                    })
                    .then((text) => {
                      try {
                        // Remove "Connected successfully" and parse the JSON
                        const cleanedText = text
                          .replace(/^Connected successfully\s*/, "")
                          .trim();
                        const updatedData = JSON.parse(cleanedText);

                        // Update the likes count in the state
                        setData((prevData) => ({
                          ...prevData!,
                          likes: updatedData.likes,
                        }));
                      } catch (parseError) {
                        console.error("Error parsing JSON:", parseError);
                        setError("Invalid response from server.");
                      }
                    })
                    .catch((error) => {
                      console.error("Error liking the video:", error);
                      setError("Failed to like the video.");
                    });
                }}
              >
                <img src={likes} alt="Like" />
              </button>
              <h2>{data.likes}</h2>
              <img src={views} alt="views" />
              <h2>{data.views}</h2>

              <div className="btn-multi">
                <input type="checkbox" id="multi-btn" name="multi-btn" />
                <label htmlFor="multi-btn">
                  {/* Facebook Share */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=http://localhost:5173/videos/${id}`}
                    className="btn btn-circle"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="fab fa-facebook-f icon"
                      aria-hidden="true"
                    ></i>
                  </a>

                  {/* Twitter Share */}
                  <a
                    href={`https://twitter.com/intent/tweet?url=http://localhost:5173/videos/${id}&text=Check%20out%20this%20video!`}
                    className="btn btn-circle"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter icon" aria-hidden="true"></i>
                  </a>

                  {/* YouTube Link */}
                  <a
                    href="https://www.youtube.com/"
                    className="btn btn-circle"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-youtube icon" aria-hidden="true"></i>
                  </a>

                  <span className="btn btn-circle">
                    <i className="material-icons icon">close</i>
                  </span>
                  <i className="material-icons icon">share</i>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </>
  );
}

export default PlayerPage;
