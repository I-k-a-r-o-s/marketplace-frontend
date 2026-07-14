const Search = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content*/}
        <h1 className="text-2xl mt-5">Search Results</h1>
        <label
          htmlFor="my-drawer-3"
          className="btn btn-primary drawer-button my-5 lg:hidden"
        >
          Refine Search
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* Sidebar content*/}
        <form action="" className="menu bg-base-200 min-h-full w-80 p-4">
          <div className="flex flex-col gap-5">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">
                Refined Search
              </legend>
              <input type="search" className="input" />
            </fieldset>

            <div className="flex flex-col gap-5">
              <div>
                <label className="label text-lg">Search options</label>
                <div className="grid grid-cols-2">
                  <div className="mt-2 flex gap-2">
                    <input type="checkbox" name="all" className="checkbox" />
                    <span>Rent & Sell</span>
                  </div>

                  <div className="mt-2 flex gap-2">
                    <input type="checkbox" name="rent" className="checkbox" />
                    <span>Rent</span>
                  </div>

                  <div className="mt-2 flex gap-2">
                    <input type="checkbox" name="sell" className="checkbox" />
                    <span>Sell</span>
                  </div>

                  <div className="mt-2 flex gap-2">
                    <input type="checkbox" name="offer" className="checkbox" />
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
                    />
                    <span>Parking</span>
                  </div>

                  <div className="mt-2 flex gap-2">
                    <input
                      type="checkbox"
                      name="furnished"
                      className="checkbox"
                    />
                    <span>Furnished</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="label text-lg">Sort</label>
                <select className="select">
                  <option value={""} hidden></option>
                  <option>Price: High to Low</option>
                  <option>Price: Low to High</option>
                  <option>Latest</option>
                  <option>Oldest</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
