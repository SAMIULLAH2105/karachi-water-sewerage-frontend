// export const metadata = {
//   title: "Karachi Water Sewerage",
//   description: "Official website",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }
export const metadata = {
  title: "Karachi Water Sewerage",
  description: "Official website",
};

export default function RootLayout({ children }) {
  // We’ll set lang dynamically later, but for now just one <html>
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
