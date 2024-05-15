import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import dynamic from "next/dynamic";
import Sidemenu from "@/components/sidemenu";
import styles from './page.module.scss'
// dynamic(import("bootstrap/dist/js/bootstrap.bundle.min.js" as string), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather",
  description: "Weather app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={styles.main} >
        <Sidemenu />
        <div className={styles.content} >
          {children}
        </div>
        </main>
      </body>
    </html>
  );
}
