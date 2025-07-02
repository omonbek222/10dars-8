"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <p className="text-center mt-20">Yuklanmoqda...</p>;
  if (status === "unauthenticated") return null;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center">
        {session?.user?.image && (
          <div className="relative mx-auto w-20 h-20 mb-6 rounded-full overflow-hidden">
            <Image
              src={session.user.image}
              alt="Profil rasmi"
              fill
              sizes="80px"
              className="object-cover rounded-full"
              priority
            />
          </div>
        )}
        <h2 className="text-2xl font-semibold mb-2">{session?.user?.name}</h2>
        <p className="text-gray-600 mb-6">{session?.user?.email}</p>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition"
        >
          tark etish
        </button>
      </div>
    </div>
  );
}
