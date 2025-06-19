import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { shadesOfPurple } from "@clerk/themes";
import {
  ClerkProvider
} from '@clerk/nextjs'


const inter = Inter({
  subsets: ["latin"],
});



export const metadata = {
  title: "Agilix",
  description: "Project management tool for Agile teams",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: shadesOfPurple,
      variables: {
      colorPrimary: "#6d28d9",
      colorBackground: "#1f2937",
      colorDanger: "#ef4444",
      colorSuccess: "#16a34a",
    },
    elements:{
      formButtonPrimary: "text-white",
      card: "bg-gray-800",
      headerTitle: "text-2xl font-bold text-blue-300",
      headerSubtitle: "text-gray-400",

    }
    }}
    >
    <html lang="en">
      <body
        className={`${inter.className}
        dotted-background
        `}
        
      >
        <ThemeProvider attribute="class" defaultTheme="dark">

          <Header/>
          <main className="min-h-screen">
        {children}
        </main>
        
        <footer className="bg-gray-900 py-12">
  <div className="container mx-auto px-4 text-center text-gray-200">
    <p>Made with ❤️ by the Agilix Team</p>
    <p>© 2025 Agilix. All rights reserved.</p>
  </div>
</footer>

       
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
