"use client";

import { useEffect, useState } from "react";
import { getProviders, signIn, ClientSafeProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getProviders().then((res) => {
      if (res) setProviders(res);
    });
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/profile");
    } else {
      alert("Email yoki parol noto'g'ri!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-pink-500 to-red-500 flex items-center justify-center px-4">
      <div className="bg-cyan-400 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">loginga kirdiz</h2>

        {providers?.credentials && (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Emailini kirit</label>
              <input
                name="email"
                type="email"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
                placeholder="email@example.com"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Parolini kirit</label>
              <input
                name="password"
                type="password"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
                placeholder="********"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Yuklanmoqda..." : "Enter"}
            </button>
          </form>
        )}

        <div className="mt-6 space-y-3">
          {providers?.google && (
            <button
              onClick={() => signIn("google", { callbackUrl: "/profile" })}
              className="w-full bg-white text-black py-2 rounded hover:bg-gray-100 flex items-center justify-center gap-2 border"
            >
              <FcGoogle className="text-xl" />
              <span>Gugol orqali</span>
            </button>
          )}
          {providers?.github && (
            <button
              onClick={() => signIn("github", { callbackUrl: "/profile" })}
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 flex items-center justify-center gap-2"
            >
              <FaGithub className="text-xl" />
              <span>GitHub orqali</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
