import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/navbar";
import Footer from "@/components/global/footer";
import { Toaster } from "sonner"
import { ReactQueryProvider } from "@/react-query/provider";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "View Certificate | UKQS",
  description: "View Certificate | UKQS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar  currentUser={session?.user}/>
            {children}
            <Footer />
          </div>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
