import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaDiscord, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[rgb(3,88,69)] w-full">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0 flex items-center justify-center md:justify-start">
                        <div className="flex items-center">
                            <Link href="/">
                                <Image src="/assets/images/logo.jpeg" alt="Your Logo" width={200} height={200} className="mr-3" />
                            </Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-lg font-semibold text-white uppercase dark:text-white">Resources</h2>
                            <ul className="text-blue-200 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="/resources" className="hover:underline">Resource 1</a>
                                </li>
                                <li>
                                    <a href="/resources" className="hover:underline">Resource 2</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-lg font-semibold text-white uppercase dark:text-white">Follow us</h2>
                            <ul className="text-blue-200 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="https://github.com/your-github" className="hover:underline">Github</a>
                                </li>
                                <li>
                                    <a href="https://discord.gg/your-discord" className="hover:underline">Discord</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-lg font-semibold text-white uppercase dark:text-white">Legal</h2>
                            <ul className="text-blue-200 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="/terms-conditions" className="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-lg text-white text-center dark:text-gray-400">© 2024 <a href="/" className="hover:underline">Status-Code-1</a>. All Rights Reserved.</span>
                    <div className="flex mt-4 justify-center sm:mt-0">
                        <a href="#" className="text-blue-300 hover:text-white dark:hover:text-white mx-2">
                            <FaFacebook className="w-5 h-5" />
                            <span className="sr-only">Facebook page</span>
                        </a>
                        <a href="#" className="text-blue-300 hover:text-white dark:hover:text-white mx-2">
                            <FaDiscord className="w-5 h-5" />
                            <span className="sr-only">Discord community</span>
                        </a>
                        <a href="#" className="text-blue-300 hover:text-white dark:hover:text-white mx-2">
                            <FaTwitter className="w-5 h-5" />
                            <span className="sr-only">Twitter page</span>
                        </a>
                        <a href="#" className="text-blue-300 hover:text-white dark:hover:text-white mx-2">
                            <FaLinkedin className="w-5 h-5" />
                            <span className="sr-only">LinkedIn page</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;