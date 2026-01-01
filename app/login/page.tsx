"use client";

import NailPolishAuth from "@/components/nailPolishAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div
      className="relative w-screen h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-50 to-white"
      style={{
        backgroundImage: `url('/nail-background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay מטושטש */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-md z-10" onClick={() => router.push("/")}/>

      {/* קומפוננטת הבקבוק */}
      <div className="relative z-20">
        <NailPolishAuth />
      </div>

    </div>
  );
}
