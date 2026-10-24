import AccediForm from "./AccediForm";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function EntraPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] px-6 pt-8">
      <h1 className="text-3xl font-bold text-[#2D6A4F] mb-2">Accedi</h1>
      <p className="text-gray-500 mb-8">Bentornato su LeashLove</p>
      <AccediForm />
    </div>
  );
}
