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
    import.meta.env.VITE_API_BASE_URL || "https://apagefromthephotographer.site";

  useEffect(() => {
    fetch(`${API_BASE_URL}/config/adspace_fetch.php?id=${id}`)
      .then((response) => response.text()) // ✅ Get raw text before parsing
      .then((text) => {
        const cleanedText = text.replace("Connected successfully", "").trim(); // ✅ Remove extra text
        return JSON.parse(cleanedText); // ✅ Safely parse JSON
      })
      .then((data) => {
        setAdspace(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching adspace:", error);
        setError("Failed to load ad space");
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (adspace?.title) {
      const scriptElement = document.createElement("script");
      scriptElement.textContent = adspace.title;
      document.body.appendChild(scriptElement);
    }
  }, [adspace]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!adspace) return <p>No data available.</p>;

  return (
    <div className="adspace">
        {adspace.title}
    </div>
  );
}