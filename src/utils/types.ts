export type AuthModeType = "signin" | "signup";

export type ListingType = {
  _id: string;
  name: string;
  description: string;
  address: string;
  price: number;
  discountedPrice?: number;
  bathrooms: number;
  bedrooms: number;
  furnished?: boolean;
  parking?: boolean;
  typeOfPlace: "rent" | "sell";
  offer: boolean;
  images: string[];
  cloudinaryImagePublicIds?: string[];
  createdAt: string;
};

export type UpdateListingModalProps = {
  listing: ListingType;
  onUpdated: () => Promise<void>;
  disabled: boolean;
};

export type FormDataType = {
  name: string;
  description: string;
  address: string;
  typeOfPlace: "sell" | "rent";
  parking: boolean;
  furnished: boolean;
  offer: boolean;
  bedrooms: number;
  bathrooms: number;
  price: number;
  discountedPrice: number;
  images: File[];
};
