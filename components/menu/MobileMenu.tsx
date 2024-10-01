import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "../ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
import { useAppContext } from "@/contexts/AppContext";
import LanguageToggler from "../languageToggler";

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  text: string;
}

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
    menu: "open navigation menu",
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
    menu: "abrir menu de navegação",
  },
};

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, text }) => {
  return (
    <Link
      href={href}
      className="group flex flex-row items-center gap-4 hover:font-bold hover:text-primary pl-2 text-foreground"
    >
      <Icon className="text-md lg:text-lg text-foreground group-hover:text-primary" />

      <p className="text-md lg:text-lg text-foreground group-hover:text-primary first-letter:uppercase">
        {text}
      </p>
    </Link>
  );
};

export function MobileMenu() {
  const { language, user } = useAppContext();
  if (!user) return null;
  return (
    <div className="sm:hidden">
      <header className="sticky top-0 z-50 w-full bg-secondary shadow-md px-4 py-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="text-primary border-2 border-primary"
            >
              <Menu size={24} />
              <span className="sr-only">
                {languageConverter[language].menu}
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent className="p-4 flex flex-col justify-between">
            <div>
              <Link
                href="/profile"
                className="flex flex-row items-center gap-3 group relative left-[7] w-fit"
              >
                <span className="sr-only">
                  {" "}
                  {languageConverter[language].profile}
                </span>
                <Avatar className="border-foreground group-hover:border-primary border-2">
                  <AvatarImage src="" />
                  <AvatarFallback>@</AvatarFallback>
                </Avatar>
                <span className="group-hover:font-semibold group-hover:text-primary text-lg text-foreground first-letter:uppercase">
                  {language === "en"
                    ? `${user.username} profile`
                    : `perfil de ${user.username}`}
                </span>
              </Link>
              <nav className="flex flex-col gap-4 mt-8">
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
            </div>
            <div className="px-2 flex flex-row justify-between items-center">
              <LanguageToggler
                acessibilityText={languageConverter[language].language}
              />

              <ThemeToggle
                acessibilityText={languageConverter[language].theme}
              />
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
}
