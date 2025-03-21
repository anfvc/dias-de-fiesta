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
    <div className="w-full flex flex-col justify-between gap-6 shadow-2xl px-8 py-4">
      {generateStartsForRating(rating)}
      <h2 className="text-4xl font-semibold">{name}</h2>
      <p>{message}</p>
      <p className="text-2xl text-gray-400">{date}</p>
    </div>
  );
};

export default Testimony;
