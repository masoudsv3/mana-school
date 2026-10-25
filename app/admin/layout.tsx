import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex gap-1">
        <Link href={"/"}>Home</Link>
        <Link href={"/admin"}>Dashboard</Link>
        <Link href={"/admin/users"}>Users</Link>
        <Link href={"/admin/courses"}>Courses</Link>
        <Link href={"#"}>Classes</Link>

        <Link href={"#"}>Students</Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
