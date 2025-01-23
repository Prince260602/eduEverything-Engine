import "./Hero.css";
import { whitebg } from "../../assets/assets";

export default function Hero() {
  return (
    <section className="flex justify-center screen items-center">
      <img
        src={whitebg}
        className="sm:hidden md:block"
        alt=""
        style={{ position: "absolute", opacity: "0.4" }}
      />
      <div className="content py-8 px-4 mx-auto max-w-screen-xl text-center">
        <h1
          className="mb-4 font-bold tracking-tight leading-none main-heading"
          style={{ color: "#16a34a" }}
        >
          Simplify Planning with All Engine
        </h1>
        <p
          className="mb-8 text-lg px-4 paragraph max-w-6xl mx-auto text-gray-600 lg:text-xl"
          style={{ lineHeight: "1.5" }}
        >
          Harness the power of AI to create tailored PDFs for any domain or
          subdomain. TEN - All Engine empowers you to streamline your workflow,
          innovate smarter, and achieve your goals effortlessly.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <a
            href="/dashboard"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300"
          >
            Get Started
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
          {/* <a
            href="#features"
            className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            Learn More
          </a> */}
        </div>
      </div>
    </section>
  );
}
