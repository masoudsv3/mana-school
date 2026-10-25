import Link from "next/link";

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex gap-1">
        <Link href={"/"}>Home</Link>
        <Link href={"/mentor"}>Dashboard</Link>
        <Link href={"/mentor/courses"}>Courses</Link>
        <Link href={"#"}>Classes</Link>
        <Link href={"#"}>Students</Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
