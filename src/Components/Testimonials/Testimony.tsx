import star from "@/assets/svg/star.svg";

interface TestimonialProps {
  name: string;
  message: string;
  rating: number;
  date: string;
}

const Testimony = ({ name, message, rating, date }: TestimonialProps) => {
  const generateStartsForRating = (rating: number) => {
    const totalStars = Math.round(rating);
    return (
      <div className="flex">
        {Array(totalStars)
          .fill(star)
          .map((star, index) => (
            <span key={index}>
              <img src={star} alt="image of reviews star" className="w-10" />
            </span>
          ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5 justify-between card-shadow px-8 py-10 min-h-[300px]">
      {generateStartsForRating(rating)}
      <h2 className="text-4xl font-semibold">{name}</h2>
      <p className="text-3xl line-clamp-3">{message}</p>
      <p className="text-xl text-gray-400">{date}</p>
    </div>
  );
};

export default Testimony;
