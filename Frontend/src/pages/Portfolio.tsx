// import FilterButtons from "@/components/FilterButtons";
import { useContext } from "react";
// import { useState } from "react";

import PublicContext from "@/context/PublicContext";

const Portfolio = () => {
  const { photos } = useContext(PublicContext);
  // const [filteredPhotos, setFilteredPhotos] = useState(photos);

  // const filterDisplayedCategory = (targetCategory: string) => {
  //   const filtered = photos.filter(
  //     (photo) => photo.category === targetCategory
  //   );
  //   setFilteredPhotos(filtered);
  // };

  // console.log(filteredPhotos);
  // const resetFilter = () => {
  //   setFilteredPhotos([]);
  // };

  return (
    <section className="px-4 pt-[84.16px] sm:pt-[92.19px] max-w-[1500px] mx-auto">
      <div className="w-full flex place-content-center my-20 gap-6">
        {/* <FilterButtons
          filterDisplayedCategory={filterDisplayedCategory}
          resetFilter={resetFilter}
        /> */}
      </div>
      <div className="min-h-screen w-full border-2 my-20">
        <div className="columns-1 sm:columns-2 md:py-20 lg:columns-3 py-10 gap-4">
          {photos.map((photo, _id) => (
            <div className={`rounded-4xl mb-4 break-inside-avoid`} key={_id}>
              <img
                src={photo.photo}
                alt={`Portfolio ${photo.photo}`}
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
