import type { RefinedSearchType } from "../utils/types";

type SearchSidebarProps = {
  refinedSearch: RefinedSearchType;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearchURL: (e: React.SubmitEvent<HTMLFormElement>) => void;
};

const SearchSidebar = ({
  refinedSearch,
  handleInputChange,
  handleSelectChange,
  handleSearchURL,
}: SearchSidebarProps) => {
  return (
    <form
      onSubmit={handleSearchURL}
      className="menu bg-base-200 min-h-full w-80 p-4"
    >
      <div className="flex flex-col gap-5">
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg">Refined Search</legend>
          <input
            type="search"
            className="input"
            name="searchTerm"
            value={refinedSearch?.searchTerm}
            onChange={handleInputChange}
          />
        </fieldset>

        <div className="flex flex-col gap-5">
          <div>
            <label className="label text-lg">Search options</label>
            <div className="grid grid-cols-2">
              <div className="mt-2 flex gap-2">
                <input
                  type="radio"
                  name="typeOfPlace"
                  className="radio"
                  value={"all"}
                  checked={refinedSearch?.typeOfPlace === "all"}
                  onChange={handleInputChange}
                />
                <span>Rent & Sell</span>
              </div>

              <div className="mt-2 flex gap-2">
                <input
                  type="radio"
                  name="typeOfPlace"
                  className="radio"
                  value={"rent"}
                  checked={refinedSearch?.typeOfPlace === "rent"}
                  onChange={handleInputChange}
                />
                <span>Rent</span>
              </div>

              <div className="mt-2 flex gap-2">
                <input
                  type="radio"
                  name="typeOfPlace"
                  className="radio"
                  value={"sell"}
                  checked={refinedSearch?.typeOfPlace === "sell"}
                  onChange={handleInputChange}
                />
                <span>Sell</span>
              </div>

              <div className="mt-2 flex gap-2">
                <input
                  type="checkbox"
                  name="offer"
                  className="checkbox"
                  checked={refinedSearch?.offer}
                  onChange={handleInputChange}
                />
                <span>Offer</span>
              </div>
            </div>
          </div>

          <div>
            <label className="label text-lg">Utilities</label>
            <div className="grid grid-cols-2">
              <div className="mt-2 flex gap-2">
                <input
                  type="checkbox"
                  name="parking"
                  className="checkbox"
                  checked={refinedSearch?.parking}
                  onChange={handleInputChange}
                />
                <span>Parking</span>
              </div>

              <div className="mt-2 flex gap-2">
                <input
                  type="checkbox"
                  name="furnished"
                  className="checkbox"
                  checked={refinedSearch?.furnished}
                  onChange={handleInputChange}
                />
                <span>Furnished</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="label text-lg">Sort</label>
            <select
              className="select"
              name="sortOrder"
              value={`${refinedSearch.sort}_${refinedSearch.order}`}
              onChange={handleSelectChange}
            >
              <option value={""} hidden></option>
              <option value={"price_desc"}>Price: High to Low</option>
              <option value={"price_asc"}>Price: Low to High</option>
              <option value={"createdAt_desc"}>Latest</option>
              <option value={"createdAt_asc"}>Oldest</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchSidebar;
