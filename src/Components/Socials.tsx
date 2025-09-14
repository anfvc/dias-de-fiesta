import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoTiktok,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { BsThreads } from "react-icons/bs";

type SocialsProps = {
  color?: string;
  url: string;
};

const Socials = ({ color = "text-gray-900", url }: SocialsProps) => {
  return (
    <div className="flex gap-6 text-5xl md:text-6xl">
      <a href={`${url}/whatsapp`} target="_blank">
        <IoLogoWhatsapp className={color} />
      </a>
      <a href="https://www.tiktok.com/@diasdefiestaco" target="_blank">
        <IoLogoTiktok className={color} />
      </a>
      <a
        href="https://www.threads.net/@diasdefiestaco?xmt=AQGzuH6gTOf5mHIAVzJfOwvHQjwN0_S7ZTvdwv1LMO_SAcg"
        target="_blank"
      >
        <BsThreads className={color} />
      </a>
      <a href="https://www.instagram.com/diasdefiestaco" target="_blank">
        <IoLogoInstagram className={color} />
      </a>
      <a href="https://www.facebook.com/DiasDeFiestaCo" target="_blank">
        <IoLogoFacebook className={color} />
      </a>
    </div>
  );
};

export default Socials;
