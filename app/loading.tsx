import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="container mx-auto flex flex-1 px-4 text-center">
      <div className="m-auto">
        <div className="my-12 flex flex-col items-center">
          <Loader2 className="animate-spin" />
        </div>
      </div>
    </main>
  );
}
