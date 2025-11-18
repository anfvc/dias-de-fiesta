import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  message: string;
  rating: number;
  date: string;
}

const Testimony = ({ name, message, rating, date }: TestimonialProps) => {
  return (
    <div className="flex flex-col justify-between h-full w-full min-h-[350px] card-shadow px-8 py-10 rounded-xl bg-white">
      <div className="flex gap-2 mb-4">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={` ${
              index < Math.round(rating)
                ? "text-gold-section fill-gold-section"
                : "text-gray-400 fill-gray-400"
            }`}
          />
        ))}
      </div>

      <div className="flex flex-col flex-grow justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-semibold">{name}</h2>
          <p className=" text-2xl text-gray-700 break-words">{message}</p>
        </div>
        <p className="text-xl text-gray-400 mt-6">
          {" "}
          {new Date(date).toDateString()}
        </p>
      </div>
    </div>
  );
};

export default Testimony;
