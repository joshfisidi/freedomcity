import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Freedom City",
  description: "Charity management dashboard for donations, programs, volunteers, and board operations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

