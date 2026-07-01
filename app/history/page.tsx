import HistoryBoard from "../components/HistoryBoard";

export const metadata = {
  title: "History — Terrain",
};

export default function History() {
  return (
    <section className="bg-light-400 text-dark-500 selection:bg-light-200">
      <main className="relative min-h-screen">
        <div className="bg-light-400">
          <HistoryBoard />
        </div>
      </main>
    </section>
  );
}
