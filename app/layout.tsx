import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/providers/theme-provider";
const inter = Open_Sans({ subsets: ["latin"] });
import { cn } from "@/lib/utils";
import { Modalprovider } from "@/components/providers/modal-provider";

export const metadata: Metadata = {
  title: "RaCord",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        
        <body className={cn(inter.className, "bg-white dark:bg-[#313338]")}><ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="racord-theme">
          <Modalprovider/>
          {children}</ThemeProvider></body></ClerkProvider>
    </html>
  );
}
