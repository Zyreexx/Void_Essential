import "@/styles/globals.css";
import { StoreProvider } from "@/lib/context";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import AuthModal from "@/components/auth/AuthModal";
import SearchModal from "@/components/search/SearchModal";
import ToastContainer from "@/components/ui/ToastContainer";

export const metadata = {
  title: "VOID ESSENTIALS — Essentials, without excess",
  description: "Contemporary luxury clothing brand engineered with architectural minimalism, heavyweight textiles, and archival tailoring.",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A0A0A",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-void-cream text-void-black selection:bg-void-black selection:text-void-white">
        <StoreProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          
          {/* Global Overlays & Modals */}
          <CartDrawer />
          <AuthModal />
          <SearchModal />
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
