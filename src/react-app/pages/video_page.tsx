import ThumbnailById from "../components/thumbnails";
import AdspaceById from "../components/adspace";
import "../style/adspace.css";
export default function Video_page() {
    return (
    <>
    <AdspaceById id={"1"} />
        <ThumbnailById id={"2"} />
        <AdspaceById id={"2"} />
    </>
    );
}