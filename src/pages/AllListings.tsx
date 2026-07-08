import { useEffect, useRef, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import UpdateListingModal from "../components/UpdateListingModal";
import type { ListingType } from "../utils/types";

const AllListings = () => {
  const [listings, setListings] = useState<ListingType[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<ListingType | null>(
    null,
  );

  const dialogRef = useRef<HTMLDialogElement>(null);

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
      console.log("Error in fetchUserListings!:", error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while fetching listings!",
      );
    }
  };

  const handleDeleteListing = async () => {
    if (!selectedListing) return;

    try {
      setDeletingId(selectedListing._id);

      const { data } = await api.delete(`/api/listing/${selectedListing._id}`);

      if (data.success) {
        toast.success(data.message);
        dialogRef.current?.close();
        await fetchUserListings();
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log("Error in handleDeleteListing!:", error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while deleting listing!",
      );
    } finally {
      setDeletingId(null);
      setSelectedListing(null);
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
                      <>
                        Offer
                        <br />
                        <span className="badge badge-success badge-sm">
                          ${listing.discountedPrice}
                          {listing.typeOfPlace === "rent" ? "/mo" : ""}
                        </span>
                      </>
                    ) : (
                      "No"
                    )}
                  </td>

                  <td className="hidden md:table-cell">{listing.bedrooms}</td>

                  <td className="hidden md:table-cell">{listing.bathrooms}</td>

                  <td className="hidden lg:table-cell">
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <UpdateListingModal
                        listing={listing}
                        onUpdated={fetchUserListings}
                        disabled={deletingId !== null}
                      />

                      <button
                        className="btn btn-ghost btn-xs btn-error"
                        disabled={deletingId !== null}
                        onClick={() => {
                          setSelectedListing(listing);
                          dialogRef.current?.showModal();
                        }}
                      >
                        {deletingId === listing._id ? (
                          <>
                            Deleting...
                            <span className="loading loading-spinner loading-xs"></span>
                          </>
                        ) : (
                          "Delete"
                        )}
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
      <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are You Sure?</h3>
          <p className="py-4 text-center font-semibold text-xl text-warning">
            THIS ACTION IS IRREVERSIBLE!
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <button className="btn btn-error" onClick={handleDeleteListing}>
                Delete
              </button>
              <button className="btn btn-primary">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AllListings;
