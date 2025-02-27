// // export default function Navbar() {
// //   return (
// //     <>
// //       <nav className="bg-white border-gray-200">
// //         <div className="max-w-screen-xl flex items-center flex-wrap justify-between mx-auto p-4">
// //           <a
// //             href="/"
// //             className="flex items-center space-x-3 rtl:space-x-reverse"
// //           >
// //             {/* <img
// //               src="https://flowbite.com/docs/images/logo.svg"
// //               className="h-8"
// //               alt="Flowbite Logo"
// //             /> */}
// //             <span className="self-center text-xl text-[#16a34a] font-medium whitespace-nowrap">
// //               TEN ALL Engine
// //             </span>
// //           </a>
// //           <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
// //             {/* <a
// //               href="/dashboard"
// //               type="button"
// //               className="focus:outline-none text-white hide-b bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 px-4 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
// //               style={{ backgroundColor: "#16a34a" }}
// //             >
// //               Get started
// //             </a> */}
// //             <button
// //               data-collapse-toggle="navbar-cta"
// //               type="button"
// //               className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
// //               aria-controls="navbar-cta"
// //               aria-expanded="false"
// //             >
// //               <span className="sr-only">Open main menu</span>
// //               <svg
// //                 className="w-5 h-5"
// //                 aria-hidden="true"
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 fill="none"
// //                 viewBox="0 0 17 14"
// //               >
// //                 <path
// //                   stroke="currentColor"
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth="2"
// //                   d="M1 1h15M1 7h15M1 13h15"
// //                 />
// //               </svg>
// //             </button>
// //           </div>
// //           <div
// //             className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
// //             id="navbar-cta"
// //           >
// //             <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
// //               <li>
// //                 <a
// //                   href="/"
// //                   className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#16a34a]"
// //                   aria-current="page"
// //                 >
// //                   Home
// //                 </a>
// //               </li>
// //               <li>
// //                 <a
// //                   href="/about"
// //                   className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#16a34a]"
// //                 >
// //                   About
// //                 </a>
// //               </li>
// //               <li>
// //                 <a
// //                   href="/contact-us"
// //                   className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#16a34a]"
// //                 >
// //                   Contact
// //                 </a>
// //               </li>
// //             </ul>
// //           </div>
// //         </div>
// //       </nav>
// //     </>
// //   );
// // }


// import { useState } from "react";

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <>
//       <nav className="bg-white border-gray-200">
//         <div className="max-w-screen-xl flex items-center flex-wrap justify-between mx-auto p-4">
//           <a
//             href="/"
//             className="flex items-center space-x-3 rtl:space-x-reverse"
//           >
//             <span className="self-center text-xl text-[#16a34a] font-medium whitespace-nowrap">
//               TEN ALL Engine
//             </span>
//           </a>
//           <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

//              <a
//               href="/Workflow"
//               type="button"
//               className="focus:outline-none text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 px-4 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//               style={{ backgroundColor: "#16a34a" }}
//             >
//               Workflow
//             </a> 
//             <button
//               onClick={toggleMenu}
//               type="button"
//               className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
//               aria-controls="navbar-cta"
//               aria-expanded={isMenuOpen ? "true" : "false"}
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className="w-5 h-5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 17 14"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M1 1h15M1 7h15M1 13h15"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div
//             className={`items-center justify-between ${
//               isMenuOpen ? "flex" : "hidden"
//             } w-full md:flex md:w-auto md:order-1`}
//             id="navbar-cta"
//           >
//             <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
//               <li>
//                 <a
//                   href="/"
//                   className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#16a34a]"
//                   aria-current="page"
//                 >
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/about"
//                   className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#16a34a]"
//                 >
//                   About
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/contact-us"
//                   className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#16a34a]"
//                 >
//                   Contact
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex items-center flex-wrap justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-xl text-[#16a34a] font-medium whitespace-nowrap">
              ALL Engine
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* Workflow button outside the mobile menu */}
            <a
              href="/Workflow"
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 md:px-4 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              style={{ backgroundColor: "#16a34a" }}
            >
              Workflow
            </a>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-cta"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${
              isMenuOpen ? "flex" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#16a34a]"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#16a34a]"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact-us"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#16a34a]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
