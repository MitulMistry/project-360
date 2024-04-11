"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// The duration until a query transitions from fresh (read from cache) to stale
const defaultQueryConfig = { staleTime: 60000 };

export default function QueryClientWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: defaultQueryConfig },
    }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
