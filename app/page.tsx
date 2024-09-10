import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartColumnIncreasing,
  DollarSign,
  LucideIcon,
  EuroIcon,
} from "lucide-react";
import { redirect } from "next/navigation";

// Formatação do saldo de acordo com a moeda do usuário
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export default function Home() {
  const currentUser = { name: "BioJorge", moneyType: "EUR", balance: 1000 };
  // const currentUser = undefined;
  if (!currentUser) {
    redirect("/login");
  }

  return (
    <section className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Card className="p-2 md:p-6 lg:p-10 flex flex-col gap-4">
        <CardTitle className="flex flex-row justify-between">
          <span>Balance</span>
          <DollarSign />
        </CardTitle>
        <CardDescription className="">
          Current {currentUser?.name ?? "John Doe"} balance
        </CardDescription>
        <CardContent className="p-0 grow flex flex-row justify-center items-center *:text-3xl text-primary font-semibold">
          <p>
            {currentUser?.balance
              ? formatCurrency(currentUser?.balance, currentUser?.moneyType)
              : "0.00"}
          </p>
        </CardContent>
      </Card>

      <Card className="p-2 md:p-4 col-span-2">
        <CardTitle className="flex flex-row justify-between">
          <span>User Analytics</span>
          <ChartColumnIncreasing />
        </CardTitle>
        <CardContent>Content 1</CardContent>
        <CardFooter>Footer 1</CardFooter>
      </Card>
    </section>
  );
}
