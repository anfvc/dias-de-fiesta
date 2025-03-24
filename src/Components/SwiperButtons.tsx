import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useSwiper } from "swiper/react";

const SwiperButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flex justify-start gap-6 mt-20">
      <button
        className="border rounded-full p-6 cursor-pointer active:scale-90 active:transition"
        onClick={() => swiper.slideNext()}
      >
        <FaArrowLeft />
      </button>
      <button
        className="border rounded-full p-6 cursor-pointer active:scale-90 active:transition"
        onClick={() => swiper.slidePrev()}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default SwiperButtons;
