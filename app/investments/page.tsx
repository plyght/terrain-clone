import Footer from "../components/Footer";

export const metadata = { title: "Investments — Terrain" };

export default function Investments() {
  return (
    <section className="bg-light-400 text-dark-500 selection:bg-light-200 min-h-screen px-section flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <p className="font-mono uppercase text-[12px] tracking-[-0.01em] text-dark-400">
          Investments · Coming soon
        </p>
      </div>
      <div className="pb-[60px]">
        <Footer />
      </div>
    </section>
  );
}
