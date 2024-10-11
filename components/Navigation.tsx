"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export function Navigation() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-gray-800 dark:text-white"
        >
          JobSearch
        </Link>
        <div className="flex items-center">
          <Link
            href="/jobs"
            className="mx-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            Jobs
          </Link>
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="mx-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="mx-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="mx-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
