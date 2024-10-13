import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className=" w-full text-black p-4 h-16  flex justify-between items-center border-t-2">

      <div className="flex gap-1 items-center">
        <p className="text-xs ">
          {`© ${new Date().getFullYear()} Created by Eran Michaeli. All Rights Reserved.`}
        </p>
        <Link href="https://www.linkedin.com/in/michaelieran/">
          <FontAwesomeIcon
            icon={faLinkedin}
            className="w-4 h-4 hover:scale-105 transition-all"
          />
        </Link>
        <Link href="https://github.com/P4t4m8n">
          <FontAwesomeIcon
            className="w-4 h-4 hover:scale-105 transition-all"
            icon={faGithub}
          />
        </Link>
      </div>

      <nav className="flex gap-2">
        <Link href="/about" className="hover:underline">
          About Us
        </Link>

        <Link href="/contact" className="nav-link">
          Contact Us
        </Link>

        <Link href="/privacy-policy" className="nav-link">
          Privacy Policy
        </Link>

        <Link href="/terms-of-service" className="nav-link">
          Terms of Service
        </Link>
      </nav>

      <div className="flex  items-center ">
        <div className="flex gap-2">
          <a href="https://twitter.com">
            <FontAwesomeIcon className="w-6 h-6  " icon={faTwitter} />
          </a>
          <a href="https://facebook.com">
            <FontAwesomeIcon className="w-6 h-6  " icon={faFacebook} />
          </a>
          <a href="https://instagram.com" className="">
            <FontAwesomeIcon className="w-6 h-6  " icon={faInstagram} />
          </a>
        </div>
      </div>
      
    </footer>
  );
}
