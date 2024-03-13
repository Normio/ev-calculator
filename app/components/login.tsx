import { useOutletContext } from "@remix-run/react";
import { SupabaseContext } from "utils/supabase";

export default function Login() {
  const { supabase, session } = useOutletContext<SupabaseContext>();

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
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
    <>
      <button onClick={handleGitHubLogin}>Login</button>
    </>
  );
}
