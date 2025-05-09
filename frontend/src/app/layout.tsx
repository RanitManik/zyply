import "./global.css";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/auth-context";

export const metadata = {
  title: "Welcome to frontend",
  description: "Generated by create-nx-workspace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
