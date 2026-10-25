import Link from "next/link";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex gap-1">
        <Link href={"/"}>Home</Link>
        <Link href={"/student"}>Dashboard</Link>
        <Link href={"/student/courses"}>MyCourses</Link>
        <Link href={"#"}>MyClasses</Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
