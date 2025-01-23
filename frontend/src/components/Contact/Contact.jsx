import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const [data, setdata] = useState({
    email: "",
    first_name: "",
    last_name: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://edueverything-engine.onrender.com/api/contacts", {
        name: `${data.first_name} ${data.last_name}`,
        email: data.email,
        message: data.message,
      });
      if (response.data) {
        toast.success(response.data.message);
      }
      setdata({
        email: "",
        first_name: "",
        last_name: "",
        message: "",
      });
    } catch (error) {
      if (error) {
        toast.error(error.message);
      }
      throw error;
    }
  };

  return (
    <>
      <div>
        <div className="p-8">
          <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-center text-[#16a34a] md:text-4xl lg:text-4xl">
            Connect with our Team
          </h1>
          <p className="mb-6 text-lg text-center font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
            Connect with our team for expert support, personalized solutions,
            and meaningful collaboration. We're here to assist via email, calls,
            meetings, or social media—let's achieve your goals together!
          </p>
        </div>
        <div className="flex px-4 flex-wrap justify-evenly max-w-6xl mx-auto">
          <div>
            <form
              onSubmit={handleSubmit}
              className="max-w-xl px-4 mb-4 mx-auto bg-gray-50 p-8 rounded-lg"
            >
              <h2 className="text-lg font-bold mb-4">Get in touch with us</h2>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={handleChange}
                aria-describedby="helper-text-explanation"
                className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-[#16a34a] focus:border-[#16a34a] block w-full p-2.5 "
                placeholder="johndoe@gmail.com"
              />
              <div className="grid gap-6 mt-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    value={data.first_name}
                    onChange={handleChange}
                    className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-[#16a34a] focus:border-[#16a34a] block w-full p-2.5"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    value={data.last_name}
                    onChange={handleChange}
                    className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-[#16a34a] focus:border-[#16a34a] block w-full p-2.5"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your message
              </label>
              <textarea
                id="message"
                value={data.message}
                onChange={handleChange}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-white focus:ring-[#16a34a] focus:border-[#16a34a]"
                placeholder="Write your thoughts here..."
              ></textarea>
              <div className="text-center mt-6">
                <p
                  id="helper-text-explanation"
                  className="mt-3 text-sm text-gray-500"
                >
                  We’ll never share your details. Read our{" "}
                  <a
                    href="#"
                    className="font-medium text-[#16a34a] hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
                <button
                  type="submit"
                  className="text-white mt-4 bg-[#16a34a] hover:bg-[#16a34a] focus:ring-4 focus:outline-none focus:ring-[#16a34a] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <div className="px-4 mb-2">
            <div className="max-w-xl bg-gray-50 mx-auto p-8 rounded-lg">
              <h2 className="text-lg font-bold mb-4">Contact Details</h2>
              <p className="mt-2 text-sm text-gray-500">
                Reach out to us for inquiries, support, or collaboration.
                Whether it's via email, phone, or social media, we're available
                to connect and assist you promptly.
              </p>
              <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-4 mt-4">
                <a
                  href="#"
                  className="w-full sm:w-auto bg-white  focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg inline-flex items-center px-4 py-2.5"
                >
                  <svg
                    className="me-3 w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M19.728 10.686c-2.38 2.256-6.153 3.381-9.875 3.381-3.722 0-7.4-1.126-9.571-3.371L0 10.437V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7.6l-.272.286Z" />
                    <path d="m.135 7.847 1.542 1.417c3.6 3.712 12.747 3.7 16.635.01L19.605 7.9A.98.98 0 0 1 20 7.652V6a2 2 0 0 0-2-2h-3V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H2a2 2 0 0 0-2 2v1.765c.047.024.092.051.135.082ZM10 10.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM7 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H7V3Z" />
                  </svg>
                  <div className="text-left rtl:text-right">
                    <div className="mb-1 text-xs">Address</div>
                    <div className="-mt-1 font-sans text-sm font-semibold">
                      Noida
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="w-full sm:w-auto bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg inline-flex items-center px-4 py-2.5"
                >
                  <svg
                    className="me-3 w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 19 18"
                  >
                    <path
                      fill="currentColor"
                      d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"
                    />
                  </svg>
                  <div className="text-left rtl:text-right">
                    <div className="mb-1 text-xs">Phone</div>
                    <div className="-mt-1 font-sans text-sm font-semibold">
                      +91-XXXXXXXXXX
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="w-full sm:w-auto bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg inline-flex items-center px-4 py-2.5"
                >
                  <svg
                    className="me-3 w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="text-left">
                    <div className="mb-1 text-xs">Availability</div>
                    <div className="-mt-1 font-sans text-sm font-semibold">
                      +91-XXXXXXXXXX
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="w-full sm:w-auto bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg inline-flex items-center px-4 py-2.5"
                >
                  <div>
                    <svg
                      className="w-5 me-3 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <div className="text-left ">
                    <div className="mb-1 text-xs">Email</div>
                    <div className="-mt-1 font-sans text-sm font-semibold">
                      example@gmail.com
                    </div>
                  </div>
                </a>
              </div>
              <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
              <div className="sm:flex sm:items-center sm:justify-between">
                <h3 className="text-sm font-medium text-gray-900">
                  Social Media Links:
                </h3>
                <div className="flex mt-4 sm:justify-center sm:mt-0">
                  <a href="#" className="text-gray-500 hover:text-[#16a34a]">
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 8 19"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="sr-only">Facebook page</span>
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-[#16a34a] ms-5"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 21 16"
                    >
                      <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                    </svg>
                    <span className="sr-only">Discord community</span>
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-[#16a34a] ms-5"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 17"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="sr-only">Twitter page</span>
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-[#16a34a] ms-5"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="sr-only">GitHub account</span>
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-[#16a34a] ms-5"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="sr-only">Dribbble account</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Contact;
