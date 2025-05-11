import { useState } from "react";
import "../style/navtab.css";
import ThumbnailById from "./thumbnails";

export default function NavTab() {
  const [activeTab, setActiveTab] = useState("INDIA");

  return (
    <>
    <div className="image_teller">
      <div className="center">
        <span>ROADCASTING<br></br>IN</span>
      </div>
      <div className="left">
        <span>B</span>
      </div>
      <div className="right">
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          role="tablist"
        >
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "INDIA"
                  ? "border-yellow-500 text-yellow-500"
                  : "border-white text-white hover:text-yellow-600 hover:border-yellow-100 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("INDIA")}
              type="button"
              role="tab"
              aria-controls="INDIA"
              aria-selected={activeTab === "INDIA"}
            >
              INDIA
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "USA"
                  ? "border-yellow-500 text-yellow-500"
                  : "border-white text-white hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("USA")}
              type="button"
              role="tab"
              aria-controls="USA"
              aria-selected={activeTab === "USA"}
            >
              USA
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "UK"
                  ? "border-yellow-500 text-yellow-500"
                  : "border-white text-white hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("UK")}
              type="button"
              role="tab"
              aria-controls="UK"
              aria-selected={activeTab === "UK"}
            >
              UK
            </button>
          </li>
        </ul>
      </div>
      </div>
    </div>
  
      <div>
        {activeTab === "INDIA" && (
          <div
            className={`tab-content ${activeTab === "INDIA" ? "active" : ""}`}
            id="INDIA"
            role="tabpanel"
            aria-labelledby="INDIA-tab"
          >
            <ThumbnailById id={"1"} />
          </div>
        )}
        {activeTab === "USA" && (
          <div
            className={`tab-content ${activeTab === "USA" ? "active" : ""}`}
            id="USA"
            role="tabpanel"
            aria-labelledby="USA-tab"
          >
            <ThumbnailById id={"1"} />
          </div>
        )}
        {activeTab === "UK" && (
          <div
            className={`tab-content ${activeTab === "UK" ? "active" : ""}`}
            id="UK"
            role="tabpanel"
            aria-labelledby="UK-tab"
          >
            <ThumbnailById id={"1"} />
          </div>
        )}
      </div>
    </>
  );
}