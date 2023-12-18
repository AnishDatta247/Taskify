import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "./mobile-sidebar";
import { FormModal } from "@/components/form/form-modal";

export const Navbar = () => {
  return (
    <nav className="fixed px-4 z-50 top-0 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormModal>
          <Button
            size="sm"
            variant="primary"
            className="rounded-md hidden md:block h-auto py-1.5 px-2"
          >
            Create
          </Button>
        </FormModal>
        <FormModal>
          <Button
            size="sm"
            variant="primary"
            className="rounded-md md:hidden p-2 aspect-square"
          >
            <Plus />
          </Button>
        </FormModal>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
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
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};
