// import Link from "next/link";
// import {
//   House,
//   User,
//   BadgeEuro,
//   ChartColumnIncreasing,
//   LucideIcon,
// } from "lucide-react";
// import { ThemeToggle } from "./ui/ThemeToggle";

// interface NavLinkProps {
//   href: string;
//   icon: LucideIcon;
//   text: string;
// }

// const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, text }) => {
//   return (
//     <Link
//       href={href}
//       className="group flex flex-row items-center gap-4 text-foreground hover:text-primary transition-colors duration-200"
//     >
//       <Icon className="text-md lg:text-lg" />
//       <p className="text-md lg:text-lg hidden group-hover:inline">{text}</p>
//       <span className="sr-only">{text}</span>
//     </Link>
//   );
// };

// export function Menu() {
//   return (
//     <aside className="group hidden sm:flex border-2 shadow-lg h-full hover:w-fit transition-all duration-300 flex-col justify-between p-2 rounded-lg">
//       <nav className="py-5 px-2 flex flex-col items-start justify-start gap-8">
//         <NavLink href="/" icon={House} text="Home" />
//         <NavLink href="/profile" icon={User} text="Profile" />
//         <NavLink href="/transactions" icon={BadgeEuro} text="Transactions" />
//         <NavLink
//           href="/analytics"
//           icon={ChartColumnIncreasing}
//           text="Analytics"
//         />
//       </nav>
//       <ThemeToggle />
//     </aside>
//   );
// }
"use client";

import Link from "next/link";
import {
  House,
  User,
  BadgeEuro,
  ChartColumnIncreasing,
  LucideIcon,
  Settings2,
  LogOut,
} from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, text }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className="flex flex-row items-center text-foreground hover:text-primary"
          >
            <Icon className="text-md lg:text-lg" />

            <span className="sr-only">{text}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="font-semibold">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export function Menu() {
  return (
    <aside className="hidden sm:flex border-2 shadow-lg h-full  transition-all duration-300 flex-col justify-between p-2 rounded-lg py-5">
      <nav className="flex flex-col items-center justify-start gap-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/profile"
                className="flex flex-row items-center group"
              >
                <span className="sr-only">button to go to profile editing</span>
                <Avatar className="border-foreground group-hover:border-primary border-2">
                  <AvatarImage src="" />
                  <AvatarFallback>BJ</AvatarFallback>
                </Avatar>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-semibold">
              BioJorge profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <NavLink href="/" icon={House} text="Home" />
        <NavLink href="/profile" icon={User} text="Profile" />
        <NavLink href="/transactions" icon={BadgeEuro} text="Transactions" />
        <NavLink
          href="/analytics"
          icon={ChartColumnIncreasing}
          text="Analytics"
        />
        <NavLink href="/settings" icon={Settings2} text="Settings" />
      </nav>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/logout"
              className="flex flex-row items-center justify-center text-foreground hover:text-primary"
            >
              <LogOut className="hover:text-[#bb2124] hover:cursor-pointer" />

              <span className="sr-only">Logout</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-semibold">
            Logout
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </aside>
  );
}
