
export default function RootLayout({ children }) {
  return (
    <html lang=\"en\">
      <body className=\"bg-black text-white overflow-hidden\">{children}</body>
    </html>
  );
}
