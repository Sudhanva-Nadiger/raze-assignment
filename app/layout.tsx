import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Raze Assignment',
  description: 'LinkedIn Profile UI with Next.js and Tailwind CSS. Create and edit profile functionalities',
  authors: [{
    name: 'Sudhanva Nadiger',
    url: 'https://sudhanva-nadiger.netlify.app/'
  }],
  keywords: ['Next.js', 'Tailwind CSS', 'LinkedIn', 'Raze']
}

import { EdgeStoreProvider } from '@/lib/edgeStore';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <EdgeStoreProvider>
        <body className={inter.className}>{children}</body>
      </EdgeStoreProvider>
    </html>
  );
}
