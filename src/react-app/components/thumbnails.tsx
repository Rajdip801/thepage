import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/thumbnail.css";

import views from "../assets/icons/Views_icon.svg";
import likes from "../assets/icons/Love_icon.svg";


interface ThumbnailProps {
  id: string;
}

interface ThumbnailData {
  image_url: string;
  title: string;
  views: number;
  likes: number;
}

export default function ThumbnailById({ id }: ThumbnailProps): React.ReactElement {
  const [thumbnail, setThumbnail] = useState<ThumbnailData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "https://apagefromthephotographer.site";
//mark in here
  useEffect(() => {
    fetch(`${API_BASE_URL}/config/data_fetch.php?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        try {
          const cleanedData = data.replace("Connected successfully", "").trim();
          const jsonData = JSON.parse(cleanedData);
          setThumbnail(jsonData);
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          setError("Invalid response from server.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching thumbnail:", error);
        setError("Failed to load thumbnail. Please try again later.");
        setIsLoading(false);
      });
  }, [id]);

  const incrementViews = async (): Promise<void> => {
    if (!thumbnail) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/config/increment_views.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      const data = await response.json();

      if (data.success) {
        setThumbnail((prev) =>
          prev
            ? {
                ...prev,
                views: prev.views + 1,
              }
            : null
        );
      } else {
        console.error("Failed to increment views:", data.message);
      }
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!thumbnail) {
    return <p>Thumbnail not found</p>;
  }

  return (
    <div className="thumbnail">
      <a
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.466)), url(${thumbnail.image_url})`,
          backgroundSize: "contain",
        }}
        href={`/videos/${id}`}
        aria-label={thumbnail.title}
        onClick={async (e) => {
          e.preventDefault();
          await incrementViews();
          navigate(`/videos/${id}`);
        }}
      ></a>
        <div className="details">
        <div>
          <img src={views} alt="views"></img>
          <p>&nbsp;{thumbnail.views}</p>
        </div>
          <div>
            <img src={likes} alt="likes"></img>
            <p>&nbsp;{thumbnail.likes}</p>
          </div>
        </div>
    </div>
  );
}