import { Outlet } from "react-router-dom";

import Logo from "@/components/partials/Logo";
import ThemeToggle from "@/components/partials/ThemeToggle";
import UserMenu from "@/components/partials/UserMenu";
import BottomNavigation from "@/components/partials/BottomNavigation";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="w-full bg-card sticky top-0 left-0 border-b px-4 sm:px-6 z-50">
        <div className="max-w-[1100px] h-16 mx-auto flex items-center justify-between gap-2">
          <Logo />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="size-1 bg-border rounded-full" />
            <UserMenu />
          </div>
        </div>
      </header>

      <BottomNavigation />

      {/* Main content */}
      <main className="px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto pb-28">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
