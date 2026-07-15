import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import api from "../api/api";
import SearchSidebar from "../components/SearchSidebar";
import type { RefinedSearchType } from "../utils/types";

const Search = () => {
  const [refinedSearch, setRefinedSearch] = useState<RefinedSearchType>({
    searchTerm: "",
    typeOfPlace: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  //fill the setRefinedSearch with the values from the URL query parameters when the component mounts or when the location.search changes
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTerm = urlParams.get("searchTerm") || "";
    const typeOfPlace = urlParams.get("typeOfPlace") || "all";
    const parking = urlParams.get("parking") === "true";
    const furnished = urlParams.get("furnished") === "true";
    const offer = urlParams.get("offer") === "true";
    const sort = urlParams.get("sort") || "createdAt";
    const order = urlParams.get("order") || "desc";

    setRefinedSearch({
      searchTerm,
      typeOfPlace,
      parking,
      furnished,
      offer,
      sort,
      order,
    });
  }, [location.search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (name === "typeOfPlace") {
      setRefinedSearch((prev) => ({
        ...prev,
        typeOfPlace: value,
      }));
    }

    if (name === "searchTerm") {
      setRefinedSearch((prev) => ({
        ...prev,
        searchTerm: value,
      }));
    }

    if (name === "parking" || name === "furnished" || name === "offer") {
      setRefinedSearch((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    const [sort, order] = value.split("_");

    setRefinedSearch((prev) => ({
      ...prev,
      sort,
      order,
    }));
  };

  const handleSearchURL = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const urlParams = new URLSearchParams();

      if (refinedSearch.searchTerm) {
        urlParams.set("searchTerm", refinedSearch.searchTerm);
      }

      if (refinedSearch.typeOfPlace !== "all") {
        urlParams.set("typeOfPlace", refinedSearch.typeOfPlace);
      }

      if (refinedSearch.parking) {
        urlParams.set("parking", "true");
      }

      if (refinedSearch.furnished) {
        urlParams.set("furnished", "true");
      }

      if (refinedSearch.offer) {
        urlParams.set("offer", "true");
      }

      urlParams.set("sort", refinedSearch.sort);
      urlParams.set("order", refinedSearch.order);

      navigate(`/search?${urlParams.toString()}`);
    } catch (error: any) {
      console.log("Error in handleSearch!:", error);
      toast.error(
        error?.response?.data?.message || "An error occurred while searching!",
      );
    }
  };

  useEffect(() => {
    const findListings = async () => {
      try {
        setLoading(true);

        const { data } = await api.get(`/api/listing${location.search}`);

        setListings(data.foundListings);
        toast.success(data.message);
      } catch (error: any) {
        console.log("Error in findListings!:", error);
        toast.error(
          error?.response?.data?.message ||
            "An error occurred while searching!",
        );
      } finally {
        setLoading(false);
      }
    };

    findListings();
  }, [location.search]);
  console.log(listings);
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
        {loading ? (
          <p className="mt-4 text-sm text-muted">Searching listings...</p>
        ) : (
          "Found"
        )}
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* Sidebar content*/}
        <SearchSidebar
          refinedSearch={refinedSearch}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleSearchURL={handleSearchURL}
        />
      </div>
    </div>
  );
};

export default Search;
