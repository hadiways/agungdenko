import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://agungdenko.asia"),
  title: "PT Denko Wahana Sakti | Material Handling Solution",
  description: "Distributor resmi forklift electric, diesel, reach truck, electric stacker, hand pallet, scissor lift, dan aerial work platform.",
  keywords: "denko wahana sakti, forklift bandung, forklift electric, forklift diesel, reach truck, electric stacker",
  authors: [{ name: "Agung Ramdhani" }],
<<<<<<< HEAD

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo-dws.png",
  },
=======
  icons: {
    icon: [
      { url: "/favicon.ico?v=1" },
      { url: "/favicon.png?v=1", type: "image/png" }
    ],
    apple: "/icon.png?v=1",
  }
>>>>>>> 918afa9 (fix: resolve missing favicon issue)
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-800 font-sans">
        {children}
      </body>
    </html>
  );
}
