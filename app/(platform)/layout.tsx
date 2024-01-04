"use client";

import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <QueryProvider>
      <ClerkProvider
        appearance={{
          baseTheme: theme == "dark" ? dark : undefined,
        }}
      >
        <Toaster theme={theme == "dark" ? "dark" : undefined} />
        <ModalProvider />
        {children}
      </ClerkProvider>
    </QueryProvider>
  );
};

export default PlatformLayout;
