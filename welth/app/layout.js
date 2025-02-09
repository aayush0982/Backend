import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Welth - Ai Financer",
  description: "Your one stop platform for managing your finance",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className}`}
        >
          <Header />
          {children}
          <Toaster richColors/>
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}
