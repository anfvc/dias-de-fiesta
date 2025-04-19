import FilterButtons from "@/components/FilterButtons";
import { PHOTOS } from "@/consts/portfolio";
import { useState, useEffect } from "react";

const LAYOUTS = [
  "col-span-2 row-span-2",
  "col-span-3 row-span-2",
  "col-span-2 row-span-3",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-3 row-span-1",
  "col-span-1 row-span-3",
  "col-span-2 row-span-2",
  "col-span-3 row-span-3",
];

const Portfolio = () => {
  const [filteredPhotos, setFilteredPhotos] = useState(PHOTOS);
  const shufflePhotosArray = () => {
    const randomOffset = Math.floor(Math.random() * LAYOUTS.length);
    const shuffled = [...PHOTOS]
      .sort(() => Math.random() - 0.5)
      .map((photo, id) => ({ ...photo, layout: LAYOUTS[(id + randomOffset) % LAYOUTS.length] }));
    setFilteredPhotos(shuffled);
  };
  const filterDisplayedCategory = (targetCategory: string) => {
    const filtered = PHOTOS.filter(
      (photo) => photo.category === targetCategory
    );
    setFilteredPhotos(filtered);
  };

  const resetFilter = () => {
    setFilteredPhotos(PHOTOS);
    shufflePhotosArray();
  };

  useEffect(() => {
    shufflePhotosArray();
  }, []);

  return (
    <section className="pt-[84.16px] sm:pt-[92.19px] max-w-[1500px] mx-auto">
      <div className="w-full flex place-content-center my-20 gap-6">
        <FilterButtons
          filterDisplayedCategory={filterDisplayedCategory}
          resetFilter={resetFilter}
        />
      </div>
      <div className="min-h-screen w-full border-2 my-20">
        <div className="grid auto-rows-[200px] grid-cols-6 gap-4 p-2 [grid-auto-flow:dense]">
          {filteredPhotos.map((photo, id) => (
            <div
              className={`${
                photo.layout || "col-span-2 row-span-2"
              } bg-indigo-200 flex place-content-center rounded-4xl`}
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
