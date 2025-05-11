import ThumbnailById from "../components/thumbnails";
import AdspaceById from "../components/adspace";
import Navtab from "../components/navtab";
import "../style/adspace.css";
import "../style/video_page.css";
export default function Video_page() {
  return (
    <>
      {/* <div
        className="gap"
        style={{ height: "60px", backgroundColor: "transparent" }}
      ></div> */}
      <div className="section-1">
        <div id="adspace-1" className="adspace">
          <AdspaceById id={"1"} />
        </div>
        <ThumbnailById id={"1"} />
        <Navtab></Navtab>
        <div className="gridspace">
          <div className="innerspace">
            <div className="up">
              <div className="up-1">UP</div>
              <div className="up-2">UP</div>
            </div>
            <div className="down">
              <div className="down-1">DOWN</div>
              <div className="down-2">DOWN</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
