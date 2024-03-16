import { useOutletContext } from "@remix-run/react";
import { SupabaseContext } from "~/utils/supabase";

export default function Login() {
  const { supabase, session, siteUrl } = useOutletContext<SupabaseContext>();

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${siteUrl}auth/callback`,
      },
    });

    if (error) {
      console.log({ error });
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }
  };

  return session ? (
    <button onClick={handleLogout}>Logout</button>
  ) : (
    // <button
    //   className="grow-0 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
    //   onClick={handleGitHubLogin}
    // >
    //   <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
    //   <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
    //     Login with Google
    //   </span>
    // </button>

    <button className="p-[3px] relative" onClick={handleGitHubLogin}>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
      <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent text-base">
        Start tracking
      </div>
    </button>
  );
}
