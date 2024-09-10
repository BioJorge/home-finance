import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/menu/MobileMenu";
import { Menu } from "@/components/menu/Menu";

const inter = Inter({ subsets: ["latin"] });
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Home finance",
  description: "Home finance app created with Next.js, Drizzle, Tailwind",
  icons: [{ rel: "icon", url: "/generic-cryptocurrency.svg" }],
};
const currentUser = { name: "BioJorge", moneyType: "EUR", balance: 1000 };
// const currentUser = undefined;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${
          (cn("antialiased font-sans"), inter.className)
        } flex flex-col min-h-screen h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {currentUser ? <MobileMenu /> : null}

          <main className="flex h-full w-full flex-row items-stretch gap-2 p-2">
            {currentUser ? <Menu /> : null}
            <div className="rounded-lg shadow-lg grow">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
