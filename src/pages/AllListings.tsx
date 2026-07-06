import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

export type ListingType = {
  _id: string;
  name: string;
  address: string;
  price: number;
  discountedPrice?: number;
  bathrooms: number;
  bedrooms: number;
  typeOfPlace: "rent" | "sell";
  offer: boolean;
  images: string[];
  createdAt: string;
};

const AllListings = () => {
  const [listings, setListings] = useState<ListingType[]>([]);

  const fetchUserListings = async () => {
    try {
      const { data } = await api.get("/api/user");
      if (data.success) {
        setListings(data.listings);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log("Error in updateInfo!:", error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while updating user info!",
      );
    }
  };
  useEffect(() => {
    fetchUserListings();
  }, []);
  return (
    <>
      <title>Your Listings</title>
      <h1 className="my-5 text-center text-2xl font-semibold">All Listings</h1>

      {listings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Property</th>
                <th className="hidden md:table-cell">Address</th>
                <th>Price</th>
                <th className="hidden sm:table-cell">Offer</th>
                <th className="hidden md:table-cell">Beds</th>
                <th className="hidden md:table-cell">Baths</th>
                <th className="hidden lg:table-cell">Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {listings.map((listing: ListingType) => (
                <tr key={listing._id} className="hover">
                  {/* Property */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={listing.images[0]} alt="property" />
                        </div>
                      </div>

                      <div>
                        <div className="font-semibold">{listing.name}</div>

                        <div className="text-xs opacity-60 capitalize">
                          {listing.typeOfPlace}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="hidden md:table-cell truncate">
                    {listing.address}
                  </td>

                  <td className="font-semibold">
                    ${listing.price}
                    <span className="text-xs opacity-60">
                      {listing.typeOfPlace === "rent" ? "/mo" : ""}
                    </span>
                  </td>

                  <td className="hidden sm:table-cell">
                    {listing.offer ? (
                      <span className="badge badge-success badge-sm">
                        Offer
                      </span>
                    ) : (
                      <span className="badge badge-ghost badge-sm">No</span>
                    )}
                  </td>

                  <td className="hidden md:table-cell">{listing.bedrooms}</td>

                  <td className="hidden md:table-cell">{listing.bathrooms}</td>

                  <td className="hidden lg:table-cell">
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-ghost btn-xs">
                        Edit
                        <CiEdit size={20} />
                      </button>
                      <button className="btn btn-ghost btn-xs text-error">
                        Delete
                        <MdOutlineDelete size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

            {/* foot */}
            <tfoot>
              <tr>
                <th>Property</th>
                <th className="hidden md:table-cell">Address</th>
                <th>Price</th>
                <th className="hidden sm:table-cell">Offer</th>
                <th className="hidden md:table-cell">Beds</th>
                <th className="hidden md:table-cell">Baths</th>
                <th className="hidden lg:table-cell">Created</th>
                <th>Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="hero min-h-screen">
          <div className="hero-content text-center">
            <span className="skeleton skeleton-text text-3xl">
              No listings yet!
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default AllListings;
