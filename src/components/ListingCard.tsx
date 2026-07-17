import { Link } from "react-router";
import type { ListingType } from "../utils/types";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { TbBath, TbBathOff, TbBed, TbBedOff } from "react-icons/tb";

type ListingCardProps = {
  listing: ListingType;
};

const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <Link to={`/listing/${listing._id}`} className="hover-3d  cursor-pointer">
      {/* content */}
      <div className="card h-full bg-base-300 shadow-sm">
        <figure>
          <img
            src={listing.images[0]}
            alt={listing.name}
            className="h-90 sm:h-60 w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-xl">{listing.name}</h2>
          <p className="flex text-sm">
            <LiaMapMarkerAltSolid size={20} />
            {listing.address}
          </p>
          <p className="text-lg">
            {listing.description.length > 20 ? (
              <span>{listing.description.slice(0, 80)}...</span>
            ) : (
              listing.description
            )}
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex items-center">
              {listing.offer ? (
                <div className="flex gap-2">
                  <span className="text-decoration-line: line-through">
                    ${listing.price.toLocaleString()}
                  </span>
                  <span> ${listing.discountedPrice?.toLocaleString()}</span>
                </div>
              ) : (
                <span>${listing.price.toLocaleString()}</span>
              )}
              {listing.typeOfPlace === "rent" && "/mo"}
            </div>
            <div className="flex gap-5">
              <span className="flex items-center gap-2">
                {listing.bedrooms > 0 ? (
                  <>
                    <TbBed size={20} />
                    {listing.bedrooms} Bedrooms
                  </>
                ) : (
                  <>
                    <TbBedOff size={20} />
                    {listing.bedrooms} Bedroom
                  </>
                )}{" "}
              </span>
              <span className="flex gap-2">
                {listing.bathrooms > 0 ? (
                  <>
                    <TbBath size={20} />
                    {listing.bathrooms} Bathrooms
                  </>
                ) : (
                  <>
                    <TbBathOff size={20} />
                    {listing.bathrooms} Bathrooms
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 8 empty divs needed for the 3D effect */}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Link>
  );
};

export default ListingCard;
