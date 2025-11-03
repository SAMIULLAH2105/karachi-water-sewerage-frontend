export const metadata = {
  title: "Karachi Water Sewerage",
  description: "Official website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
