"use client";

import Link from "next/link";
import {
  House,
  User,
  BadgeEuro,
  ChartColumnIncreasing,
  LucideIcon,
  // Settings2,
  LogOut,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppContext } from "@/contexts/AppContext";
import LanguageToggler from "../languageToggler";
import { ThemeToggle } from "../ui/ThemeToggle";

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
        <TooltipContent
          side="right"
          className="font-semibold first-letter:uppercase"
        >
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const languageConverter = {
  en: {
    home: "home",
    profile: "profile",
    transactions: "transactions",
    analytics: "analytics",
    settings: "settings",
    logout: "logout",
    language: "change language to portuguese",
    theme: "change theme",
  },
  pt: {
    home: "início",
    profile: "perfil",
    transactions: "transações",
    analytics: "análises",
    settings: "configurações",
    logout: "sair",
    language: "mudar idioma para inglês",
    theme: "mudar tema",
  },
};

export function Menu() {
  const { language, user } = useAppContext();
  if (!user) return null;
  return (
    <aside className="bg-secondary hidden sm:flex border-2 shadow-lg h-full  transition-all duration-300 flex-col justify-between p-2 rounded-lg py-5">
      <nav className="flex flex-col items-center justify-start gap-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/profile"
                className="flex flex-row items-center group"
              >
                <span className="sr-only">
                  {languageConverter[language].profile}
                </span>
                <Avatar className="border-foreground group-hover:border-primary border-2">
                  <AvatarImage src="" />
                  <AvatarFallback>@</AvatarFallback>
                </Avatar>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="font-semibold first-letter:uppercase"
            >
              {language === "en"
                ? `${user.username} profile`
                : `perfil de ${user.username}`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <NavLink
          href="/"
          icon={House}
          text={languageConverter[language].home}
        />
        <NavLink
          href="/profile"
          icon={User}
          text={languageConverter[language].profile}
        />
        <NavLink
          href="/transactions"
          icon={BadgeEuro}
          text={languageConverter[language].transactions}
        />
        <NavLink
          href="/analytics"
          icon={ChartColumnIncreasing}
          text={languageConverter[language].analytics}
        />
        {/* <NavLink
          href="/settings"
          icon={Settings2}
          text={languageConverter[language].settings}
        /> */}
      </nav>

      <div className="flex flex-col items-center gap-8">
        <LanguageToggler
          acessibilityText={languageConverter[language].language}
        />

        <ThemeToggle acessibilityText={languageConverter[language].theme} />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/logout"
                className="flex flex-row items-center justify-center text-foreground hover:text-primary"
              >
                <LogOut className="hover:text-[#bb2124] hover:cursor-pointer" />

                <span className="sr-only">
                  {languageConverter[language].logout}
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-semibold">
              {languageConverter[language].logout}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
}
