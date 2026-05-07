 
export const metadata = {
  title: "Page Not Found - Microlights",
  description: "Page Not Found - Microlights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
