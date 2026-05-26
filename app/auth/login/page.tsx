import Link from "next/link";
import { CheckSquare } from "lucide-react";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/5 blur-[120px] rounded-full pointer-events-none" />
      <Link href="/" className="flex items-center gap-2 mb-8 relative">
        <div className="p-1.5 rounded-lg bg-blue-500/10">
          <CheckSquare className="h-5 w-5 text-blue-400" />
        </div>
        <span className="font-semibold text-lg text-white">TaskFlow</span>
      </Link>
      <AuthForm mode="login" />
    </div>
  );
}
