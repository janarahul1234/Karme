import { useNavigate } from "react-router-dom";
import { LogOutIcon, UserRound } from "lucide-react";

import useAuthStore from "@/stores/authStore";
import useToast from "@/hooks/useToast";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserMenu = () => {
  const { user, logout } = useAuthStore();
  const { avatar, fullName, email } = user;

  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    toast.success("Logout successfully");
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto p-0 rounded-full hover:bg-transparent"
        >
          <Avatar className="size-8">
            <AvatarImage src={avatar} alt="Profile image" />
            <AvatarFallback>
              <UserRound size={16} className="text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {fullName}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem className="cursor-pointer">
          <UserRound size={16} className="opacity-60" aria-hidden="true" />
          <span>Profile</span>
        </DropdownMenuItem> */}
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={handleLogout}
        >
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
