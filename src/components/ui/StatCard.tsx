import type { ReactNode } from "react";
import { cn } from "@/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  isLoading?: boolean;
  link?: string;
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  isLoading = false,
  link,
  className,
}: StatCardProps) {
  const content = (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-200",
        link && "hover:shadow-md hover:border-gray-200 cursor-pointer",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400">{icon}</span>
      </div>
      {isLoading ? (
        <div className="space-y-2">
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-28 bg-gray-100 rounded animate-pulse" />
        </div>
      ) : (
        <>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{title}</p>
        </>
      )}
    </div>
  );

  if (link) {
    return <a href={link}>{content}</a>;
  }

  return content;
}
