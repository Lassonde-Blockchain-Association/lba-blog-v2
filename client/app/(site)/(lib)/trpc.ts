import { AppRouter } from "../../../../server/src/types/appRouter";
import { httpBatchLink, createTRPCProxyClient } from "@trpc/client";

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_DB_URL}/api/trpc`,
    }),
  ],
});
