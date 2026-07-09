import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import type { ListingType } from "../utils/types";

const Listing = () => {
  const [listing, setListing] = useState<ListingType>();
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const { id } = useParams();

  const fetchListing = async () => {
    try {
      setLoading(true);
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
  }, []);

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
      {loading || errored ? (
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

              <div>
                <h1 className="text-5xl font-bold">{listing?.name}</h1>
                <p className="py-6">{listing?.description}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Listing;
