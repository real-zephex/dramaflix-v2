import Image from "next/image";
import Link from "next/link";
import HomepageCards from "@/components/ui/homepage-cards";

import { getRandomMovie } from "@/utils/request";

export default async function Home() {
  return (
    <main>
      <div data-theme="dark">
        <div className="lg:w-10/12 mx-auto w-full p-2">
          <div className="flex flex-row items-center justify-center py-12 md:py-24">
            <div className="flex flex-col">
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Unlimited Access to Your Favorite Media
              </h1>
              <p className="text-md lg:text-xl md:flex hidden md:w-11/12">
                Streamify offers a vast library of anime, K-dramas, movies, and
                web series for you to enjoy anytime, anywhere.
              </p>
            </div>
            <div className="p-2">
              <Image
                src={"https://generated.vusercontent.net/placeholder.svg"}
                width={500}
                height={300}
                alt="Hero Image"
                className="rounded-xl object-cover"
              ></Image>
            </div>
          </div>
        </div>
      </div>

      <div data-theme="light">
        <HomepageCards />
      </div>
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </aside>
      </footer>
    </main>
  );
}
