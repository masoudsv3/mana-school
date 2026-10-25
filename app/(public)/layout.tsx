import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex gap-1">
        <Link href={"/"}>Home</Link>
        <Link href={"/courses"}>Courses</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/student"}>Student</Link>
        <Link href={"/mentor"}>Mentor</Link>
        <Link href={"/admin"}>Admin</Link>
        <Link href={"/login"}>Login</Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
