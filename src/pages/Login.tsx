import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

export default function Login() {
  const [passcode, setPasscode] = useState("");
  const [isPasscodeValid, setIsPasscodeValid] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Simple UI passcode gate
  const ADMIN_PASSCODE = "mugu123";

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setIsPasscodeValid(true);
      setError("");
    } else {
      setError("Incorrect password! Access denied.");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Strict security: Only allow the specific admin email
      if (result.user.email !== "samjhamnamalla22444@gmail.com") {
        await signOut(auth);
        setError("Unauthorized: Only the main admin can access this panel.");
        return;
      }

      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 bg-white/5 relative z-10 min-h-screen">
      <div className="w-full max-w-md bg-gray-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
        <Lock className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Admin Access
        </h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {!isPasscodeValid ? (
          <form onSubmit={handlePasscodeSubmit} className="space-y-6">
            <div>
              <p className="text-gray-400 text-center text-sm mb-4">
                Please enter the secret admin password to continue.
              </p>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-center focus:outline-none focus:border-emerald-500 transition-colors tracking-widest"
                required
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-3 font-medium transition-colors shadow-lg shadow-emerald-900/20"
            >
              Verify Password
            </button>
          </form>
        ) : (
          <div className="animate-in fade-in zoom-in duration-300">
            <p className="text-emerald-400 text-center text-sm mb-8 font-medium">
              Password verified! Please sign in to your admin account.
            </p>
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex justify-center items-center gap-3 bg-white hover:bg-gray-100 text-gray-900 rounded-xl py-3 font-semibold transition-colors disabled:opacity-70"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              {loading ? "Please wait..." : "Sign in with Google"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
