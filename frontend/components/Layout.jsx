import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import Cookie from "js-cookie";
import Footer from "@/components/Footer"

const Cart = dynamic(() => import("@/components/Cart"), { ssr: false });

import Head from "next/head";
import Link from "next/link";

function Navigation() {
  const { user, setUser } = useAppContext();
  const router = useRouter();

  function handleLogout() {
    setUser(null);
    Cookie.remove("token");
    router.push("/");
  }

return (
    <header className="bg-blue-800">
      <nav className="flex justify-between p-6 px-4">
        <div className="flex justify-between items-center w-full mx-16">
          <div className="xl:w-1/3">
            <Link
              href="/"
              passHref
              className="block text-2xl max-w-max text-white font-semibold"
            >
              Blue Food
            </Link>
          </div>

          <div className="xl:block xl:w-1/3">
            <div className="flex items-center justify-end">
              <Link
                href="/checkout"
                passHref
                className="text-gray-50 hover:text-yellow-200 font-semibold text-lg"
              >
                Checkout
              </Link>

             <div className="hxl:block">
                {user ? (
                  <div className="flex items-center justify-end">
                    <span className="inline-block py-2 px-4 mr-2 leading-5 text-gray-50 hover:text-gray-100 bg-transparent font-semibold rounded-md">
                      {user.username}
                    </span>
                    <button
                      className="inline-block py-2 px-4 text-sm leading-5 text-blue-50 bg-blue-500 hover:bg-blue-600 font-semibold focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-end">
                    <Link
                      href="/login"
                      passHref
                      className="inline-block py-2 px-4 text-lg mr-2 leading-5 text-gray-50 hover:text-yellow-200 font-semibold bg-transparent rounded-md"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/register"
                      passHref
                      className="inline-block py-2 px-4 text-sm leading-5 text-blue-50 bg-blue-600 hover:bg-blue-700 font-semibold focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default function Layout(props) {
  const title = "Blue Banquet";

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navigation />
      <Cart />
      <div className="container mx-auto px-4">{props.children}</div>
      <Footer />
    </div>
  );
}