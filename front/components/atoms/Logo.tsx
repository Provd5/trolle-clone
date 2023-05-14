import Image from "next/image";
import Link from "next/link";
import LogoImage from "public/android-chrome-512x512.png";

export default function Logo() {
  return (
    <Link
      href={"/"}
      className="flex items-center gap-1 tracking-widest transition-all hover:tracking-wide"
    >
      <Image
        alt="Projekt T.U.T.E.L Logo"
        src={LogoImage}
        className="h-6 w-6 md:h-8 md:w-8"
      />
      <h1 className="text-xl font-bold uppercase md:text-2xl">t.u.t.e.l</h1>
    </Link>
  );
}
