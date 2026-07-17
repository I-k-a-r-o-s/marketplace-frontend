const ListingCardSkeleton = () => {
  return (
    <div className="card h-full bg-base-300 shadow-sm">
      {/* Image skeleton */}
      <div className="skeleton h-60 w-full"></div>

      <div className="card-body">
        {/* Title */}
        <div className="skeleton h-6 w-3/4"></div>

        {/* Address */}
        <div className="skeleton h-4 w-full"></div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-5/6"></div>
        </div>

        {/* Price */}
        <div className="skeleton h-5 w-1/3"></div>

        {/* Bedrooms / Bathrooms */}
        <div className="flex gap-5">
          <div className="skeleton h-5 w-24"></div>
          <div className="skeleton h-5 w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default ListingCardSkeleton;
