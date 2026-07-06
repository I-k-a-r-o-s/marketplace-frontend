import { useEffect, useRef, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { SlPicture } from "react-icons/sl";

type FormDataType = {
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

const CreateListing = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    description: "",
    address: "",
    typeOfPlace: "sell",
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 0,
    bathrooms: 0,
    price: 0,
    discountedPrice: 0,
    images: [],
  });
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files).slice(0, 6);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  useEffect(() => {
    const urls = formData.images.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [formData.images]);

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, type, value, checked } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = new FormData();

      formData.images.forEach((file) => {
        payload.append("images", file);
      });

      const { images, discountedPrice, offer, ...rest } = formData;
      payload.append(
        "data",
        JSON.stringify({
          ...rest,
          offer,
          discountedPrice: offer ? discountedPrice : undefined,
        }),
      );

      const { data } = await api.post("/api/listing", payload);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log("Error in handleSubmit:", error);
      toast.error(error.response?.data?.message || "Internal Server Error!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <title>Create Listing</title>
      <div className="min-h-screen bg-base-200 px-4 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-8">
            Create A Listing
          </h1>

          {/* Form Card */}
          <div className="card bg-base-100 shadow-xl">
            <form className="card-body space-y-6" onSubmit={handleSubmit}>
              {/* Images */}
              <fieldset className="fieldset" disabled={loading}>
                <legend className="fieldset-legend">Images</legend>

                <div
                  className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-base-300 bg-base-200 p-8 text-center transition hover:border-primary hover:bg-base-100"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-4xl text-primary">
                    <SlPicture size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">Upload images</p>
                    <p className="text-sm opacity-70">
                      Click to choose up to 6 images. First image will be used
                      as cover.
                    </p>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />

                {previewUrls.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold mb-2">Image preview</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {previewUrls.map((url, index) => (
                        <div
                          key={`${url}-${index}`}
                          className="relative overflow-hidden rounded-xl border border-base-300 bg-base-100"
                        >
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="h-40 w-full object-cover"
                          />
                          <button
                            type="button"
                            className="btn btn-xs btn-error absolute right-2 top-2"
                            onClick={() => removeImage(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </fieldset>

              {/* Basic Info */}
              <div className="grid grid-cols-1 gap-4">
                <fieldset className="fieldset" disabled={loading}>
                  <legend className="fieldset-legend">Name</legend>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    name="name"
                    minLength={5}
                    maxLength={60}
                    required
                    placeholder="Property Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </fieldset>

                <fieldset className="fieldset" disabled={loading}>
                  <legend className="fieldset-legend">Description</legend>
                  <textarea
                    className="textarea textarea-bordered w-full h-24"
                    name="description"
                    required
                    placeholder="Describe the property..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                </fieldset>

                <fieldset className="fieldset" disabled={loading}>
                  <legend className="fieldset-legend">Address</legend>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    name="address"
                    required
                    placeholder="Street, City, Country"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </fieldset>
              </div>

              {/* Property Options */}
              <fieldset className="fieldset" disabled={loading}>
                <legend className="fieldset-legend">Property Options</legend>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                  <label className="label cursor-pointer gap-2 justify-start">
                    <input
                      type="radio"
                      className="radio radio-primary"
                      name="typeOfPlace"
                      value={"sell"}
                      checked={formData.typeOfPlace === "sell"}
                      onChange={handleChange}
                    />
                    <span>Sell</span>
                  </label>

                  <label className="label cursor-pointer gap-2 justify-start">
                    <input
                      type="radio"
                      className="radio radio-primary"
                      name="typeOfPlace"
                      value={"rent"}
                      checked={formData.typeOfPlace === "rent"}
                      onChange={handleChange}
                    />
                    <span>Rent</span>
                  </label>

                  <label className="label cursor-pointer gap-2 justify-start">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      name="parking"
                      checked={formData.parking}
                      onChange={handleChange}
                    />
                    <span>Parking</span>
                  </label>

                  <label className="label cursor-pointer gap-2 justify-start">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      name="furnished"
                      checked={formData.furnished}
                      onChange={handleChange}
                    />
                    <span>Furnished</span>
                  </label>

                  <label className="label cursor-pointer gap-2 justify-start">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      name="offer"
                      checked={formData.offer}
                      onChange={handleChange}
                    />
                    <span>Offer</span>
                  </label>
                </div>
              </fieldset>

              {/* Numeric Fields */}
              <fieldset className="fieldset" disabled={loading}>
                <legend className="fieldset-legend">Property Details</legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="label">Bedrooms</label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      name="bedrooms"
                      min={0}
                      required
                      value={formData.bedrooms}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="label">Bathrooms</label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      name="bathrooms"
                      min={0}
                      required
                      value={formData.bathrooms}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="label">
                      Price{" "}
                      {formData.typeOfPlace === "sell"
                        ? "($)"
                        : "($ / month)"}{" "}
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      name="price"
                      min={0}
                      required
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="label">
                      Discounted Price{" "}
                      {formData.typeOfPlace === "sell"
                        ? "($)"
                        : "($ / month)"}{" "}
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      name="discountedPrice"
                      min={0}
                      disabled={!formData.offer}
                      value={formData.discountedPrice}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Submit */}
              <button
                className="btn btn-primary w-full mt-2"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    Submitting...
                    <span className="loading loading-spinner loading-sm"></span>
                  </>
                ) : (
                  "Submit Listing"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateListing;
