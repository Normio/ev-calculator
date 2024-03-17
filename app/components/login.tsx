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
    <button className="p-[3px] relative" onClick={handleGitHubLogin}>
      <div className="absolute inset-0 bg-gradient-to-b from-purple-400 to-indigo-400 rounded-lg" />
      <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent text-base">
        Start tracking
      </div>
    </button>
  );
}
