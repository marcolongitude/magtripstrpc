export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8 md:w-[calc(100%-270px)]">
      <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-gray-900"></div>
      <div>
        <h2>Carregando...</h2>
      </div>
    </div>
  );
}
