
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata = {
  title: "Agilix",
  description: "Project management tool for developers",
};

export default function RootLayout({ children }) {
  return (
  <ClerkProvider
  
  appearance={{
    baseTheme:shadesOfPurple,
    variables: {
      colorPrimary: "#6d28d9",
      colorBackground: "#1f2937",
      colorDanger: "#ef4444",
      colorSuccess: "#16a34a",
    },
    elements:{
      formButtonPrimary: "text-white",
      card: "bg-gray-800",

    }
  }}
  >
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header/>
          <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-900 py-12">
          <div className="container mx-auto px-4 text-center text-white">
            Made with ❤️ by Chirag
          </div>
          
        </footer>
        </ThemeProvider>
      </body>
    </html>
  </ClerkProvider>
  );
}
