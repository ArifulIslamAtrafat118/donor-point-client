import { useNavigate } from "react-router";
import "../../index.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import LocationSelector from "../../utils/LocationSelector";
import useTheme from "../../hooks/useTheme";
import useCreateRequest from "../../api/useCreateRequest";
export const initialRequestData = {
  recipientName: "",
  bloodGroup: "",
  category: "",
  hospitalName: "",
  fullAddress: "",
  requestMessage: "",
  imageUrl: "",
  donationTime: "",
  donationDate: "",
};

const CreateDonationRequest = () => {
  const { currentUser } = useAuth();
  const { darkMode } = useTheme();
  const { createRequest } = useCreateRequest();
  const [formData, setFormData] = useState(initialRequestData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handelLocationChange = (locationData) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        division: locationData.division,
        district: locationData.district,
        upazila: locationData.upazila,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      ...formData,

      requester: {
        uid: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
      },
    };
    // console.log("Submitted:", requestData);
    const reqResult = await createRequest(requestData);
    if (reqResult.insertedId) {
      setFormData(initialRequestData);
      toast.success("Your Request is Submitted.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="min-h-[90vh]  bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className="mb-6 inline-block text-green-600 border border-green-500 px-4 py-1.5 rounded hover:bg-green-500 hover:text-white transition"
        >
          ← Back
        </button>

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Create a Donation Request
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-red-50 dark:bg-gray-800 p-8 rounded-lg shadow-md"
        >
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            placeholder="Recipient Name"
            required
            className="input"
          />

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            className="input cursor-pointer"
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              --Blood Group--
            </option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>

          <select
            name="category"
            value={formData.category}
            className="input cursor-pointer"
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              --Category--
            </option>
            {["Blood", "Plasma", "Platelets", "Skin", "Bone marrow"].map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )
            )}
          </select>

          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL (Optional)"
            className="input md:col-sp"
          />

          <div className="md:col-span-2 space-y-6 mt-[-12px]">
            <label className="text-xs mb-[-1px]">Recipient's:</label>
            <LocationSelector onLocationChange={handelLocationChange} />
          </div>

          <input
            type="text"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            placeholder="Hospital/Clinic Name"
            required
            className="input"
          />

          <input
            type="text"
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleChange}
            placeholder="Full Address: Street, Town/City"
            required
            className="input"
          />

          <textarea
            name="requestMessage"
            value={formData.requestMessage}
            onChange={handleChange}
            placeholder="Write request message..."
            required
            minLength="200"
            className="input md:col-span-2 h-32"
          ></textarea>

          <div className="flex flex-col gap-3 ">
            <fieldset className="fieldset">
              <label className="text-xs mb-[-1px]">Donation Date</label>
              <input
                type="date"
                name="donationDate"
                value={formData.donationDate}
                onChange={handleChange}
                required
                className="input "
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="text-xs mb-[-1px]">Time</label>
              <input
                type="time"
                name="donationTime"
                value={formData.donationTime}
                onChange={handleChange}
                required
                className="input"
              />
            </fieldset>
          </div>

          <div className="flex flex-col gap-3">
            <fieldset className="fieldset">
              <label className="text-xs mb-[-1px]">Requester Name</label>
              <input
                type="text"
                value={currentUser.displayName}
                readOnly
                className="input bg-gray-100 dark:bg-gray-700"
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="text-xs mb-[-1px]">Email</label>
              <input
                type="email"
                value={currentUser.email}
                readOnly
                className="input bg-gray-100 dark:bg-gray-700"
              />
            </fieldset>
          </div>

          <button
            type="submit"
            className="md:col-span-2 bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition cursor-pointer"
          >
            Request
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateDonationRequest;
