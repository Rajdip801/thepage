import React, { useEffect, useState } from "react";
import "../style/adspace.css";

interface AdspaceProps {
  id: string;
}

interface AdspaceData {
  title: string;
}

export default function AdspaceById({ id }: AdspaceProps): React.ReactElement {
  const [adspace, setAdspace] = useState<AdspaceData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost/API/Apagefromthephotographer";

  useEffect(() => {
    fetch(`${API_BASE_URL}/config/adspace_fetch.php?id=${id}`)
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
          setAdspace(jsonData);
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!adspace) {
    return <p>No data available.</p>;
  }

  return (
    <div className="adspace">
    <p id="p1">Adspace{id}</p>
      <script>{adspace.title}</script>
      {/* Add more fields if needed */}
    </div>
  );
}