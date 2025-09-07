import BentoLargeGrid from "./BentoLargeGrid";
import BentoIndividualPost from "./BentoIndividualPost";
import BentoDetection from "./BentoDetection";
import BentoUpload from "./BentoUpload";
import BentoDownload from "./BentoDownload";

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BentoLargeGrid />
      <BentoIndividualPost />
      <BentoUpload />
      <BentoDetection />
      <BentoDownload />
    </div>
  );
}
