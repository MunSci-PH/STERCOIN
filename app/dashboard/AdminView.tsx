"use client";

import Link from "next/link";
import { UserInfo } from "./types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GradeInfo {
  grade: number;
  color: string;
  category: "jhs" | "shs";
}

const grades: GradeInfo[] = [
  { grade: 7, color: "bg-emerald-600", category: "jhs" },
  { grade: 8, color: "bg-yellow-600", category: "jhs" },
  { grade: 9, color: "bg-red-600", category: "jhs" },
  { grade: 10, color: "bg-blue-600", category: "jhs" },
  { grade: 11, color: "bg-orange-600", category: "shs" },
  { grade: 12, color: "bg-purple-600", category: "shs" },
];

const GradeLink = ({
  grade,
  color,
  isEnabled,
}: GradeInfo & { isEnabled: boolean }) => {
  const href = isEnabled ? `/dashboard/admin/view/grade/${grade}` : "#";

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center rounded-xl p-6 text-2xl transition-all",
        color,
        isEnabled
          ? "hover:opacity-80"
          : "pointer-events-none opacity-50 cursor-default"
      )}
      aria-disabled={!isEnabled}
    >
      <Card className="flex size-full items-center justify-center border-none bg-transparent shadow-none">
        <CardContent className="p-0 text-center">
          <span className="block">Grade</span>
          <span className="block font-bold">{grade}</span>
        </CardContent>
      </Card>
    </Link>
  );
};

const AdminView = ({ user }: { user: UserInfo }) => {
  const hasAccess = (grade: number, category: string) => {
    return (
      user?.role === "full" ||
      user?.role === grade.toString() ||
      user?.role === category
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      {grades.map((gradeInfo) => (
        <GradeLink
          key={gradeInfo.grade}
          {...gradeInfo}
          isEnabled={hasAccess(gradeInfo.grade, gradeInfo.category)}
        />
      ))}
    </div>
  );
};

export default AdminView;
