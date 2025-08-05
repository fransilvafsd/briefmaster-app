
import BriefingForm from "../components/BriefingForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="bg-blue-600 text-white p-6 text-center text-2xl font-bold">
        BriefMaster – Briefings inteligentes, projetos de sucesso
      </header>
      <main className="p-6">
        <BriefingForm />
      </main>
    </div>
  );
}
