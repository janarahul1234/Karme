import { NavLink } from "react-router-dom";
import { House, Target, Wallet } from "lucide-react";

import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  return (
    <nav className="w-full max-w-[480px] px-4 fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="h-14 bg-card grid grid-cols-3 p-1 border rounded-full shadow-xs">
        <NavItem to="/dashboard" label="Home" icon={<House />} />
        <NavItem to="/goals" label="Goals" icon={<Target />} />
        <NavItem to="/finances" label="Finances" icon={<Wallet />} />
      </div>
    </nav>
  );
};

const NavItem = ({ to = "", label = "", icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return cn(
          "font-medium flex items-center justify-center gap-2 rounded-full transition",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground"
        );
      }}
    >
      {icon}
      <span className="hidden sm:block">{label}</span>
    </NavLink>
  );
};

export default BottomNavigation;
