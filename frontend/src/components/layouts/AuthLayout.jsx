import { Outlet } from "react-router-dom";

import Logo from "@/components/partials/Logo";

const AuthLayout = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-[22rem] flex flex-col gap-3">
        <Logo className="self-center" />

        {/* Main content */}
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
