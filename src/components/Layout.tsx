import React, { ReactNode } from "react";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div >
      <header className="py-4 flex space-x-4 items-center fixed z-50 bg-gray-300 w-screen px-8">
        <h1 className="text-3xl font-bold mb-0 ">Blog App</h1>
        <nav className="flex-1">
          <ul className="flex space-x-4 items-center justify-center">
            <li>
              <Link href="/" className="text-blue-500 hover:text-blue-700">
                Home
              </Link>
            </li>
            <li>
              <Link href="/posts" className="text-blue-500 hover:text-blue-700">
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
      <main className="pt-24 px-8 ">{children}</main>
    </div>
  );
};

export default Layout;
