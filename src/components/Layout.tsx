import React, { ReactNode } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Page Title",
  description: "Page Description",
};
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={`${poppins.variable}`}>
        <header className="py-4 flex space-x-4 items-center fixed z-50 bg-gray-300  w-screen px-80">
          <h1 className="text-3xl font-bold mb-0 ">BlogApp</h1>
          <nav className="flex-1">
            <ul className="flex space-x-4 items-center justify-end">
              <li>
                <Link href="/" className="text-blue-500 hover:text-blue-700">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/posts/new"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Add Post
                </Link>
              </li>
            </ul>
          </nav>
        </header>

      <main className="pt-24 max-w-5xl mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
