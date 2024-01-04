"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export const OrgSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <OrganizationSwitcher
      hidePersonal
      afterCreateOrganizationUrl="/organization/:id"
      afterLeaveOrganizationUrl="/select-org"
      afterSelectOrganizationUrl="/organization/:id"
      appearance={{
        elements: {
          rootBox: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        baseTheme: theme == "dark" ? dark : undefined,
      }}
    />
  );
};
