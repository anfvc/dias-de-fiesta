import FilterButtons from "@/components/FilterButtons";
import { PHOTOS } from "@/consts/portfolio";
import { useState } from "react";

const Portfolio = () => {
  const [filteredPhotos, setFilteredPhotos] = useState(PHOTOS);

  const filterDisplayedCategory = (targetCategory: string) => {
    const filtered = PHOTOS.filter(
      (photo) => photo.category === targetCategory
    );
    setFilteredPhotos(filtered);
  };

  const resetFilter = () => {
    setFilteredPhotos(PHOTOS);
  };

  return (
    <section className="px-4 pt-[84.16px] sm:pt-[92.19px] max-w-[1500px] mx-auto">
      <div className="w-full flex place-content-center my-20 gap-6">
        <FilterButtons
          filterDisplayedCategory={filterDisplayedCategory}
          resetFilter={resetFilter}
        />
      </div>
      <div className="min-h-screen w-full border-2 my-20">
        <div className="columns-1 sm:columns-2 md:py-20 lg:columns-3 py-10 gap-4">
          {filteredPhotos.map((photo, id) => (
            <div
              className={`rounded-4xl mb-4 break-inside-avoid`}
              key={id}
            >
              <img
                src={photo.image}
                alt={`Portfolio ${photo.category}`}
                className="w-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
