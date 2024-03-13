import type { MetaFunction } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import { SupabaseContext } from "utils/supabase";
import Login from "~/components/login";

export const meta: MetaFunction = () => {
  return [
    { title: "EV calculator - Is your EV cheap to drive?" },
    { name: "description", content: "Welcome to EV calculator" },
  ];
};

export default function Index() {
  const { session } = useOutletContext<SupabaseContext>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Login />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
