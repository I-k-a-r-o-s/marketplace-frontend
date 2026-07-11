import toast from "react-hot-toast";
import api from "../api/api";
import type { ContactProps, UserType } from "../utils/types";
import { useEffect, useState } from "react";

const ContactLandlord = ({ listing }: ContactProps) => {
  const [landlord, setLandlord] = useState<UserType>();
  const fetchLandlord = async () => {
    try {
      const { data } = await api.get(`/api/user/${listing?.userRef}`);
      if (data.success) {
        setLandlord(data.user);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log("Error in fetchLandlord!:", error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while fetching landlord!",
      );
    }
  };
  useEffect(() => {
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <div className="pt-5 gap-4">
      <h2 className="text-center text-3xl font-semibold">
        Contact {landlord?.userName}
      </h2>
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="checkbox" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
          {landlord?.userName} Email
        </div>
        <div className="collapse-content text-sm">{landlord?.email}</div>
      </div>
    </div>
  );
};

export default ContactLandlord;
