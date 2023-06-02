import Link from "next/link";
import "../globals.css";
import { Inter } from "next/font/google";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lassonde Blockchain Blog",
  description: "Generated by LasDevers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* home page style */}
      <body className="max-w-screen-2xl mx-auto py-10">
        <header>
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent"
          >
            LBA - Blog
          </Link>
          <main className="py-20">{children}</main>
        </header>
      </body>
      {/* footer section */}
      <div>
        <Footer />
      </div>
    </html>
  );
}
