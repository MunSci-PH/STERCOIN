export default function Loading() {
  return (
    <main className="container mx-auto flex flex-1 px-4 text-center">
      <div className="m-auto">
        <div className="my-12 flex flex-col items-center">
          <span className="loading loading-spinner"></span>
          Loading...
        </div>
      </div>
    </main>
  );
}
