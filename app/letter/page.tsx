import LetterContent from "./LetterContent";
import Footer from "../components/Footer";

export const metadata = {
  title: "Letter — Terrain",
};

export default function Letter() {
  return (
    <>
      <LetterContent />
      <div className="z-50 relative max-tablet:pb-[40px] px-section pointer-events-auto bg-light-400 text-dark-500">
        <Footer />
      </div>
    </>
  );
}
