type FilterButtonProps = {
  filterDisplayedCategory: (category: string) => void;
  resetFilter: () => void;
  shufflePhotosArray: () => void;
};

const FilterButtons = ({
  filterDisplayedCategory,
  resetFilter,
}: FilterButtonProps) => {
  return (
    <>
      <button
        className="border-2 p-4 rounded-full"
        onClick={() => filterDisplayedCategory("weddings")}
      >
        Weddings
      </button>
      <button
        className="border-2 p-4 rounded-full"
        onClick={() => filterDisplayedCategory("birthdays")}
      >
        Birthdays
      </button>
      <button
        className="border-2 p-4 rounded-full"
        onClick={() => filterDisplayedCategory("children's parties")}
      >
        Children's Parties
      </button>
      <button
        className="border-2 p-4 rounded-full"
        onClick={() => filterDisplayedCategory("conferences")}
      >
        Conferences
      </button>
      <button
        className="border-2 p-4 rounded-full"
        onClick={() => filterDisplayedCategory("baptisms")}
      >
        Baptisms
      </button>
      <button
        className="border-2 p-4 rounded-full"
        onClick={() => filterDisplayedCategory("graduations")}
      >
        Graduations
      </button>
      <button className="border-2 p-4 rounded-full" onClick={resetFilter}>
        Ver Todos
      </button>
    </>
  );
};

export default FilterButtons;
