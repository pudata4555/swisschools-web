import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://swisschools.com"),
  title: {
    default: "SwisSchools — Study in Switzerland",
    template: "%s | SwisSchools",
  },
  description:
    "Explore Swiss universities, English-taught programmes, entry requirements, tuition, scholarships and the student visa. Free counselling for international students.",
  openGraph: {
    title: "SwisSchools — Study in Switzerland",
    description:
      "Your guide to higher education in Switzerland: universities, programmes, costs, scholarships and visas.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
