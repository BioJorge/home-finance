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

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, text }) => {
  return (
    <Link
      href={href}
      className="group flex flex-row items-center gap-4 hover:font-bold hover:text-primary pl-2 text-foreground"
    >
      <Icon className="text-md lg:text-lg text-foreground group-hover:text-primary" />

      <p className="text-md lg:text-lg text-foreground group-hover:text-primary">
        {text}
      </p>
    </Link>
  );
};

export function MobileMenu() {
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
              <span className="sr-only">Abrir menu de navegação</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="p-4">
            <Link
              href="/profile"
              className="flex flex-row items-center gap-3 group relative left-[7] w-fit"
            >
              <span className="sr-only">button to go to profile editing</span>
              <Avatar className="border-foreground group-hover:border-primary border-2">
                <AvatarImage src="" />
                <AvatarFallback>BJ</AvatarFallback>
              </Avatar>
              <span className="group-hover:font-semibold group-hover:text-primary text-lg text-foreground">
                BioJorge
              </span>
            </Link>
            <nav className="flex flex-col gap-4 mt-8">
              <NavLink href="/" icon={House} text="Home" />
              <NavLink href="/profile" icon={User} text="Profile" />
              <NavLink
                href="/transactions"
                icon={BadgeEuro}
                text="Transactions"
              />
              <NavLink
                href="/analytics"
                icon={ChartColumnIncreasing}
                text="Analytics"
              />
              <NavLink href="/settings" icon={Settings2} text="Settings" />
            </nav>
            <div className="absolute bottom-2 right-2">
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
}
