"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/menu/MobileMenu";
import { Menu } from "@/components/menu/Menu";
import { AppWrapper } from "@/contexts/AppContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cn(
          "antialiased font-sans",
          inter.className
        )} flex flex-col min-h-screen h-screen`}
      >
        <AppWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <MobileMenu />
            <main className="flex h-full w-full flex-row items-stretch gap-2 p-2">
              <Menu />
              <div className="rounded-lg shadow-lg grow">{children}</div>
            </main>
          </ThemeProvider>
        </AppWrapper>
      </body>
    </html>
  );
}
