import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { ListingType } from "../utils/types";
import api from "../api/api";
import toast from "react-hot-toast";
import ListingCard from "../components/ListingCard";
import ListingCardSkeleton from "../components/ListingCardSkeleton";

const Home = () => {
  const [offerListings, setOfferListings] = useState<ListingType[]>([]);
  const [saleListings, setSaleListings] = useState<ListingType[]>([]);
  const [rentListings, setRentListings] = useState<ListingType[]>([]);
  const [loading, setLoading] = useState(false);

  const HOME_LIMIT = 4;

  const fetchListings = async (params: Record<string, string>) => {
    try {
      const urlParams = new URLSearchParams(params);
      urlParams.set("limit", HOME_LIMIT.toString());

      const { data } = await api.get<{ foundListings: ListingType[] }>(
        `/api/listing?${urlParams.toString()}`,
      );
      return data.foundListings;
    } catch (error: any) {
      console.log("Error in fetchListings!:", error);
      toast.error(error?.response?.data?.message || "Internal Server Error!");
      return [];
    }
  };

  useEffect(() => {
    const loadListings = async () => {
      try {
        setLoading(true);
        const [offers, rents, sales] = await Promise.all([
          fetchListings({ offer: "true" }),
          fetchListings({ typeOfPlace: "rent" }),
          fetchListings({ typeOfPlace: "sell" }),
        ]);

        setOfferListings(offers);
        setRentListings(rents);
        setSaleListings(sales);
      } catch (error: any) {
        console.log("Error in loadListings!:", error);
        toast.error(error?.response?.data?.message || "Internal Server Error!");
      } finally {
        setLoading(false);
      }
    };
    loadListings();
  }, []);
  return (
    <div>
      <title>Home</title>
      <div className="flex flex-col gap-5 py-28 px-5 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Find your <span className="text-primary">Perfect</span> place!
        </h1>
        <div className="text-xs sm:text-sm">
          Estates is the best place to find a place that suits your needs.
          <br />
          We have multiple options for you to choose!
        </div>
        <Link
          to={"/search"}
          className="link link-hover link-primary text-xs sm:text-sm"
        >
          Find a place...
        </Link>
      </div>

      <div className="max-w-6xl mx-auto p-5 flex flex-col gap-10 my-10">
        {loading ? (
          <>
            <div className="my-3 flex flex-col">
              <h2 className="text-2xl font-bold">Recent Offers</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <ListingCardSkeleton key={index} />
                ))}
            </div>
          </>
        ) : (
          offerListings.length > 0 && (
            <>
              <div className="my-3 flex flex-col">
                <h2 className="text-2xl font-bold">Recent Offers</h2>

                <Link
                  to="/search?offer=true"
                  className="link link-primary text-sm"
                >
                  Show More
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {offerListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            </>
          )
        )}

        {loading ? (
          <>
            <div className="my-3 flex flex-col">
              <h2 className="text-2xl font-bold">Recent Sales</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <ListingCardSkeleton key={index} />
                ))}
            </div>
          </>
        ) : (
          saleListings.length > 0 && (
            <>
              <div className="my-3 flex flex-col">
                <h2 className="text-2xl font-bold">Recent Sales</h2>

                <Link
                  to="/search?offer=true"
                  className="link link-primary text-sm"
                >
                  Show More
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {saleListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            </>
          )
        )}

        {loading ? (
          <>
            <div className="my-3 flex flex-col">
              <h2 className="text-2xl font-bold">Recent Rents</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <ListingCardSkeleton key={index} />
                ))}
            </div>
          </>
        ) : (
          rentListings.length > 0 && (
            <>
              <div className="my-3 flex flex-col">
                <h2 className="text-2xl font-bold">Recent Rents</h2>

                <Link
                  to="/search?offer=true"
                  className="link link-primary text-sm"
                >
                  Show More
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {rentListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
