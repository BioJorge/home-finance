"use client"; //hooks can only be used in client side components
import "./styles.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
