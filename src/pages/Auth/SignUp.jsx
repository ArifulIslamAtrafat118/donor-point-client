import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useSwalTheme from "../../hooks/useSwalTheme";
import { errorToast } from "../../utils/errorToast";
import LocationSelector from "../../utils/LocationSelector";
import useRegisterUser from "../../api/useRegisterUser";

const SignUp = () => {
  const [passMatchError, setPassMatchError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    bloodGroup: "",
    location: {
      division: "",
      district: "",
      upazila: "",
    },
    password: "",
    confirmPassword: "",
  });
  // console.log(formData)
  const { signup, googleSignIn, setCurrentUser, currentUser } = useAuth();
  const { registerUser } = useRegisterUser();
  const { SwalTheme } = useSwalTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.pathname || "/";
  const navigateNow = () => {
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updateData = { ...formData, [name]: value };
    if (
      name === "confirmPassword" ||
      (name === "password" && updateData.confirmPassword)
    ) {
      if (updateData.confirmPassword !== updateData.password) {
        setPassMatchError("Password do not match");
      } else {
        setPassMatchError("");
      }
    }
    setFormData(updateData);
  };
  const handleLocationChange = (locationData) => {
    setFormData((prev) => ({ ...prev, location: locationData }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signup(formData.email, formData.password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.avatar,
      });
      setCurrentUser(user);

      // register to DB
      await registerUser(formData, user.uid)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Congratulations!",
            text: "Your account registration was successful",
            timer: 800,
            ...SwalTheme,
          });
        })
        .then(() => navigateNow());
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[90vh] flex items-center justify-center bg-stone-200 dark:bg-gray-900 px-4"
    >
      <div className=" bg-red-300/10  p-8 rounded-lg shadow-lg max-w-3xl w-full relative overflow-hidden">
        <div className="absolute -top-24 -right-20 opacity-10 pointer-events-none w-[300px]"></div>
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
          Register
        </h2>
        <form
          onSubmit={(event) => handleRegister(event)}
          className="p-8 space-y-4 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2  input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 input"
            required
          />
          <input
            type="url"
            name="avatar"
            placeholder="Photo URL"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full p-2 input"
            required
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
          <LocationSelector onLocationChange={handleLocationChange} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 input"
            required
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
            title="Must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 special character"
          />
          <div className="">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 input"
              required
            />
            {passMatchError ? (
              <p className="text-red-500 text-xs">{passMatchError}</p>
            ) : (
              <span> </span>
            )}
          </div>
          <button
            type="submit"
            disabled={!!passMatchError}
            className={`w-full py-2 rounded cursor-pointer ${
              passMatchError
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            Sign Up
          </button>
        </form>
        {/* <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-2 rounded mt-3 cursor-pointer"
        >
          Sign up with Google
        </button> */}
        <p className="text-sm mt-4 text-center text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-green-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUp;
