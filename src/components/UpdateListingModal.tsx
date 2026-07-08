import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { SlPicture } from "react-icons/sl";
import type { FormDataType, UpdateListingModalProps } from "../utils/types";
import api from "../api/api";
import toast from "react-hot-toast";

const UpdateListingModal = ({
  listing,
  onUpdated,
  disabled,
}: UpdateListingModalProps) => {
  const [loading, setLoading] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>(
    listing.images,
  );
  const [existingImagePublicIds, setExistingImagePublicIds] = useState<
    string[]
  >(listing.cloudinaryImagePublicIds ?? []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    name: listing.name,
    description: listing.description ?? "",
    address: listing.address,
    typeOfPlace: listing.typeOfPlace,
    parking: listing.parking ?? false,
    furnished: listing.furnished ?? false,
    offer: listing.offer,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    price: listing.price,
    discountedPrice: listing.discountedPrice ?? 0,
    images: [],
  });

  const dialogRef = useRef<HTMLDialogElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFormData({
      name: listing.name,
      description: listing.description ?? "",
      address: listing.address,
      typeOfPlace: listing.typeOfPlace,
      parking: listing.parking ?? false,
      furnished: listing.furnished ?? false,
      offer: listing.offer,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
      price: listing.price,
      discountedPrice: listing.discountedPrice ?? 0,
      images: [],
    });
    setExistingImages(listing.images);
    setExistingImagePublicIds(listing.cloudinaryImagePublicIds ?? []);
    setNewFiles([]);
  }, [listing]);

  useEffect(() => {
    const urls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newFiles]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, type, value, checked } = target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const availableSlots = 6 - existingImages.length - newFiles.length;
    const nextFiles = files.slice(0, availableSlots);
    setNewFiles((prev) => [...prev, ...nextFiles]);
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    setExistingImagePublicIds((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewFile = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateListing = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (existingImages.length + newFiles.length === 0) {
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      newFiles.forEach((file) => payload.append("images", file));
      payload.append(
        "data",
        JSON.stringify({
          ...formData,
          existingImagePublicIds,
        }),
      );

      const { data } = await api.patch(`/api/listing/${listing._id}`, payload);
      if (data.success) {
        toast.success(data.message);
        dialogRef.current?.close();
        await onUpdated();
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.error("Error in handleUpdateListing:", error);
      toast.error(error?.response?.data?.message || "Internal Server Error!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        className="btn btn-ghost btn-xs btn-info"
        disabled={disabled}
        onClick={() => dialogRef.current?.showModal()}
        type="button"
      >
        Edit
        <CiEdit size={20} />
      </button>

      <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-full max-w-3xl">
          <div className="min-h-screen px-4 py-10">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-center mb-8">
                Update Listing
              </h1>

              <div className="card bg-base-100 shadow-xl">
                <form
                  className="card-body space-y-6"
                  onSubmit={handleUpdateListing}
                >
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
                          Click to choose up to 6 images. First image will be
                          used as cover.
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
                    {existingImages.length + newFiles.length === 0 ? (
                      <div className="mt-4">
                        <p className="text-sm text-error font-semibold mb-2">
                          At least one image is required!
                        </p>
                      </div>
                    ) : (
                      <></>
                    )}
                    {existingImages.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold mb-2">
                          Existing images
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {existingImages.map((url, index) => (
                            <div
                              key={`${url}-${index}`}
                              className="relative overflow-hidden rounded-xl border border-base-300 bg-base-100"
                            >
                              <img
                                src={url}
                                alt={`Existing ${index + 1}`}
                                className="h-40 w-full object-cover"
                              />
                              <button
                                type="button"
                                className="btn btn-xs btn-error absolute right-2 top-2"
                                onClick={() => removeExistingImage(index)}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {previewUrls.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold mb-2">New images</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {previewUrls.map((url, index) => (
                            <div
                              key={`${url}-${index}`}
                              className="relative overflow-hidden rounded-xl border border-base-300 bg-base-100"
                            >
                              <img
                                src={url}
                                alt={`New ${index + 1}`}
                                className="h-40 w-full object-cover"
                              />
                              <button
                                type="button"
                                className="btn btn-xs btn-error absolute right-2 top-2"
                                onClick={() => removeNewFile(index)}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </fieldset>

                  <div className="grid grid-cols-1 gap-4">
                    <fieldset className="fieldset" disabled={loading}>
                      <legend className="fieldset-legend">Name</legend>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        name="name"
                        minLength={5}
                        maxLength={60}
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </fieldset>

                    <fieldset className="fieldset" disabled={loading}>
                      <legend className="fieldset-legend">Description</legend>
                      <textarea
                        className="textarea textarea-bordered w-full h-24"
                        name="description"
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
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </fieldset>
                  </div>

                  <fieldset className="fieldset" disabled={loading}>
                    <legend className="fieldset-legend">
                      Property Options
                    </legend>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                      <label className="label cursor-pointer gap-2 justify-start">
                        <input
                          type="radio"
                          className="radio radio-primary"
                          name="typeOfPlace"
                          value="sell"
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
                          value="rent"
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

                  <fieldset className="fieldset" disabled={loading}>
                    <legend className="fieldset-legend">
                      Property Details
                    </legend>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="label">Bedrooms</label>
                        <input
                          type="number"
                          className="input input-bordered w-full"
                          name="bedrooms"
                          min={0}
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
                          value={formData.bathrooms}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label className="label">
                          Price{" "}
                          {formData.typeOfPlace === "sell"
                            ? "($)"
                            : "($ / month)"}
                        </label>
                        <input
                          type="number"
                          className="input input-bordered w-full"
                          name="price"
                          min={0}
                          value={formData.price}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label className="label">
                          Discounted Price{" "}
                          {formData.typeOfPlace === "sell"
                            ? "($)"
                            : "($ / month)"}
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

                  <button
                    className="btn btn-primary w-full mt-2"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        Updating...
                        <span className="loading loading-spinner loading-sm"></span>
                      </>
                    ) : (
                      "Update Listing"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateListingModal;
