"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartColumnIncreasing,
  DollarSign,
  LucideIcon,
  EuroIcon,
} from "lucide-react";
import { redirect } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";
import { userPlaceholder } from "@/public/placeholders";
// Formatação do saldo de acordo com a moeda do usuário
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const languageConverter = {
  en: {
    balance: "balance",
    profile: "profile",
    transactions: "transactions",
    analytics: "analytics",
    settings: "settings",
    logout: "logout",
  },
  pt: {
    balance: "saldo",
    profile: "perfil",
    transactions: "transações",
    analytics: "análises",
    settings: "configurações",
    logout: "sair",
  },
};

export default function Home() {
  const { user, language, setUser } = useAppContext();
  let currentUser;
  if (!user) {
    setUser(userPlaceholder);
    currentUser = userPlaceholder;
    // redirect("/login");
  } else {
    currentUser = user;
  }
  const username = currentUser?.username ?? "John Doe";

  return (
    <section className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Card className="p-2 md:p-6 lg:p-10 flex flex-col gap-4">
        <CardTitle className="flex flex-row justify-between">
          <span className="first-letter:uppercase">
            {languageConverter[language].balance}
          </span>
          <DollarSign />
        </CardTitle>
        <CardDescription className="first-letter:uppercase">
          {language === "en"
            ? `Current ${username} balance`
            : `Saldo atual de ${username}`}
        </CardDescription>
        <CardContent className="p-0 grow flex flex-row justify-center items-center *:text-3xl text-primary font-semibold">
          <p>
            {currentUser?.balance
              ? formatCurrency(currentUser?.balance, currentUser?.currency)
              : "0.00"}
          </p>
        </CardContent>
      </Card>

      <Card className="p-2 md:p-4 col-span-2">
        <CardTitle className="flex flex-row justify-between">
          <span className="first-letter:uppercase">User Analytics</span>
          <ChartColumnIncreasing />
        </CardTitle>
        <CardContent className="first-letter:uppercase">Content 1</CardContent>
        <CardFooter className="first-letter:uppercase">Footer 1</CardFooter>
      </Card>
    </section>
  );
}
