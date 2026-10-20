import { Suspense } from "react";

import Loading from "@/loading";
import StudentSearch from "./studentSearch";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <StudentSearch />
    </Suspense>
  );
}
