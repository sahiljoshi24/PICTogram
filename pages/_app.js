import "../styles/globals.css";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  );

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}

export default MyApp;
