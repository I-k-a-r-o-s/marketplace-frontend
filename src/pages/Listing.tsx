import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import type { ListingType } from "../utils/types";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { LuSquareParking, LuSquareParkingOff } from "react-icons/lu";
import {
  TbArmchair,
  TbArmchairOff,
  TbBath,
  TbBathOff,
  TbBed,
  TbBedOff,
} from "react-icons/tb";

const Listing = () => {
  const [listing, setListing] = useState<ListingType>();
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const { id } = useParams();

  const fetchListing = async () => {
    try {
      setLoading(true);
      setErrored(false);
      const { data } = await api.get(`/api/listing/${id}`);
      if (data.success) {
        toast.success(data.message);
        setListing(data.listing);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log("Error in fetchListing!:", error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while fetching the listing!",
      );
      setErrored(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListing();
  }, [id]);

  const images = listing?.images ?? [];

  const nextImage = () => {
    if (images.length === 0) return;

    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length === 0) return;

    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    setCurrentImage(0);
  }, [listing]);
  return (
    <>
      {loading ? (
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col w-full max-w-5xl">
            <div className="relative w-full">
              <div className="skeleton w-full h-72 md:h-96 rounded-box"></div>

              <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2 flex justify-between">
                <div className="skeleton h-12 w-12 rounded-full"></div>
                <div className="skeleton h-12 w-12 rounded-full"></div>
              </div>
            </div>

            <div className="w-full space-y-4 mt-6">
              <div className="skeleton h-10 w-80"></div>

              <div className="space-y-2">
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-11/12"></div>
                <div className="skeleton h-4 w-10/12"></div>
              </div>

              <div className="skeleton h-12 w-36"></div>
            </div>
          </div>
        </div>
      ) : errored ? (
        <div className="hero min-h-screen">
          <h1 className="text-4xl font-bold">Listing not found</h1>
        </div>
      ) : (
        <>
          {" "}
          <title>{listing?.name?.slice(0, 20)}</title>
          <div className="hero min-h-screen">
            <div className="hero-content flex-col">
              <div className="relative w-full max-w-5xl">
                <img
                  src={images[currentImage]}
                  alt={listing?.name}
                  className="w-full h-125 object-cover rounded-box"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="btn btn-circle absolute left-5 top-1/2 -translate-y-1/2"
                    >
                      ❮
                    </button>

                    <button
                      onClick={nextImage}
                      className="btn btn-circle absolute right-5 top-1/2 -translate-y-1/2"
                    >
                      ❯
                    </button>
                  </>
                )}
              </div>

              <div className="">
                <h1 className="text-5xl font-bold">
                  {listing?.name} -{" "}
                  {listing?.offer ? (
                    <>
                      <span className="text-decoration-line: line-through">
                        ${listing?.price}
                      </span>
                      <span> ${listing?.discountedPrice}</span>
                    </>
                  ) : (
                    <span>${listing?.price}</span>
                  )}
                  {listing?.typeOfPlace === "rent" ? "/mo" : ""}
                </h1>
                <p className="py-6 flex gap-2 item-center">
                  <LiaMapMarkerAltSolid size={20} />
                  {listing?.address}
                </p>
                <div className="flex gap-4">
                  <p className="w-full max-w-50 text-center p-1 rounded-md bg-primary">
                    {listing?.typeOfPlace === "rent" ? "For Rent" : "For Sale"}
                  </p>
                  {listing?.offer && listing?.discountedPrice && (
                    <p className="w-full max-w-50 text-center p-1 rounded-md bg-success">
                      Save ${listing?.price - listing?.discountedPrice}
                    </p>
                  )}
                </div>
                <p className="pt-5">
                  <span className="font-semibold">Description</span>:-{" "}
                  {listing?.description}
                </p>
                <ul className="flex flex-wrap gap-5 pt-2">
                  <li className="flex gap-2 items-center">
                    {listing?.bedrooms && listing?.bedrooms > 0 ? (
                      <>
                        <TbBed size={20} />
                        {listing?.bedrooms} Bedrooms
                      </>
                    ) : (
                      <>
                        <TbBedOff size={20} />
                        {listing?.bedrooms} Bedroom
                      </>
                    )}
                  </li>
                  <li className="flex gap-2 items-center">
                    {listing?.bathrooms && listing?.bathrooms > 0 ? (
                      <>
                        <TbBath size={20} />
                        {listing?.bathrooms} Bathrooms
                      </>
                    ) : (
                      <>
                        <TbBathOff size={20} />
                        {listing?.bathrooms} Bathrooms
                      </>
                    )}
                  </li>
                  <li className="flex gap-2 items-center">
                    {listing?.furnished ? (
                      <>
                        <TbArmchair size={20} /> Furnished
                      </>
                    ) : (
                      <>
                        <TbArmchairOff size={20} /> Not furnished
                      </>
                    )}
                  </li>
                  <li className="flex gap-2 items-center">
                    {listing?.parking ? (
                      <>
                        <LuSquareParking size={20} /> Parking Available
                      </>
                    ) : (
                      <>
                        <LuSquareParkingOff size={20} /> No Parking
                      </>
                    )}
                  </li>
                </ul>
                
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Listing;
