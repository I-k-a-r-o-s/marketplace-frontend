const CreateListing = () => {
  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8">
          Create A Listing
        </h1>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-xl">
          <form className="card-body space-y-6">
            {/* Images */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Images</legend>

              <input
                type="file"
                className="file-input file-input-bordered w-full"
                name="image"
                accept="image/*"
                multiple
              />

              <p className="text-xs opacity-70 mt-1">
                First image will be used as cover (max 6)
              </p>
            </fieldset>

            {/* Basic Info */}
            <div className="grid grid-cols-1 gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Name</legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  name="name"
                  minLength={10}
                  maxLength={60}
                  required
                  placeholder="Beautiful apartment in Zurich"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Description</legend>
                <textarea
                  className="textarea textarea-bordered w-full h-24"
                  name="description"
                  required
                  placeholder="Describe the property..."
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Address</legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  name="address"
                  required
                  placeholder="Street, City, Country"
                />
              </fieldset>
            </div>

            {/* Property Options */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Property Options</legend>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                <label className="label cursor-pointer gap-2 justify-start">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    name="sell"
                  />
                  <span>Sell</span>
                </label>

                <label className="label cursor-pointer gap-2 justify-start">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    name="rent"
                  />
                  <span>Rent</span>
                </label>

                <label className="label cursor-pointer gap-2 justify-start">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    name="parking"
                  />
                  <span>Parking</span>
                </label>

                <label className="label cursor-pointer gap-2 justify-start">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    name="furnished"
                  />
                  <span>Furnished</span>
                </label>

                <label className="label cursor-pointer gap-2 justify-start">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    name="offer"
                  />
                  <span>Offer</span>
                </label>
              </div>
            </fieldset>

            {/* Numeric Fields */}
            <fieldset className="fieldset">
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
                  />
                </div>

                <div>
                  <label className="label">Price ($ / month)</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    name="price"
                    min={0}
                    required
                  />
                </div>

                <div>
                  <label className="label">Discounted Price ($ / month)</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    name="discountedPrice"
                    min={0}
                    required
                  />
                </div>
              </div>
            </fieldset>

            {/* Submit */}
            <button className="btn btn-primary w-full mt-2" type="submit">
              Submit Listing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
