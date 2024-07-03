import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth";
import AuthProvider from "./provider/AuthProvider";

export const metadata: Metadata = {
  title: "Chat App",
  description: "powared by firebase",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <AuthProvider initialSession={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
