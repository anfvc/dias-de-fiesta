import FilterButtons from "@/components/FilterButtons";
import { PHOTOS } from "@/consts/portfolio";
import { useState } from "react";

const Portfolio = () => {
  const [filteredPhotos, setFilteredPhotos] = useState(PHOTOS);
  const shufflePhotosArray = () => {
    const shuffled = [...PHOTOS].sort(() => Math.random() - 0.5);
    setFilteredPhotos(shuffled);
  };
  const filterDisplayedCategory = (targetCategory: string) => {
    const filtered = PHOTOS.filter(
      (category) => category.category === targetCategory
    );
    setFilteredPhotos(filtered);
  };

  const resetFilter = () => {
    shufflePhotosArray();
  };
  return (
    <section className="pt-[84.16px] sm:pt-[92.19px] max-w-[1500px] mx-auto">
      <div className="w-full flex place-content-center my-20 gap-6">
        <FilterButtons
          filterDisplayedCategory={filterDisplayedCategory}
          resetFilter={resetFilter}
          shufflePhotosArray={shufflePhotosArray}
        />
      </div>
      <div className="min-h-screen w-full border-2 my-20">
        <div className="grid auto-rows-[200px] grid-cols-6 gap-4 p-2">
          {filteredPhotos.map((photo, id) => (
            <div
              className={`${photo.layout} bg-indigo-200 flex place-content-center rounded-4xl`}
              key={id}
            >
              {photo.category}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
