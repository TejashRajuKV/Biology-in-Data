import { useState } from "react";
import { Lock, Mail, Beaker } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login functionality would be implemented here!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f5e9] via-white to-[#ebe9f7] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-[#44b44b]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#867ddd]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      {/* Background Illustration */}
      <div className="absolute inset-0 opacity-5">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1760837989896-212a64cb3a99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbnRpZmljJTIwcmVzZWFyY2glMjBkYXRhfGVufDF8fHx8MTc2NDI1Mjc3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Science Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Login Card */}
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-md border-2 border-white">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#44b44b] via-[#5ec465] to-[#867ddd] flex items-center justify-center shadow-lg shadow-[#44b44b]/30 animate-pulse">
              <Beaker className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-[#1a1a1a] leading-tight">Biology in Data</h2>
              <p className="text-sm text-[#666666]">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-[#1a1a1a]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#fafafa] border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44b44b] focus:border-transparent transition-all"
                placeholder="admin@biologyindata.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-[#1a1a1a]">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#fafafa] border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44b44b] focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-border text-[#44b44b] focus:ring-[#44b44b]"
              />
              <span className="text-sm text-[#666666]">Remember me</span>
            </label>
            <a href="#" className="text-sm text-[#44b44b] hover:text-[#338a39] transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-[#44b44b] to-[#5ec465] text-white rounded-xl hover:shadow-xl hover:shadow-[#44b44b]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[#666666]">or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="py-3 bg-white border-2 border-border rounded-xl hover:bg-[#e8f5e9] hover:border-[#44b44b] transition-all text-[#666666] hover:scale-105 active:scale-95 shadow-sm"
            >
              Google
            </button>
            <button
              type="button"
              className="py-3 bg-white border-2 border-border rounded-xl hover:bg-[#ebe9f7] hover:border-[#867ddd] transition-all text-[#666666] hover:scale-105 active:scale-95 shadow-sm"
            >
              Microsoft
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#666666]">
            Don't have an account?{" "}
            <a href="#" className="text-[#44b44b] hover:text-[#338a39] transition-colors">
              Request Access
            </a>
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-5 bg-gradient-to-r from-[#e8f5e9] to-[#ebe9f7] rounded-xl border-2 border-white shadow-inner">
          <p className="text-sm text-[#666666]">
            <strong className="text-[#1a1a1a] flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#44b44b] rounded-full animate-pulse"></span>
              Demo credentials:
            </strong>
            Email: demo@biologyindata.com<br />
            Password: demo123
          </p>
        </div>
      </div>
    </div>
  );
}
