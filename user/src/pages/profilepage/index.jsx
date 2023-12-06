import { useUserContext } from "../../hooks/useUserAuthContext";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import userAxios from "../../baseURL";
import { toast } from "react-toastify";

const errorInputStyle =
  "py-[16px] pl-4 focus:outline-none rounded-md border-[1px] border-red-400 text-sm text-red-600 font-normal";
const normalInputStyle =
  "py-[16px] pl-4 focus:outline-none rounded-md border-[1px] border-gray-300 text-sm text-[#000] font-normal";

function ProfilePage() {
  const { user } = useUserContext();
  const [oldPassword, setOldPassword] = useState("");
  const [newPasswordOne, setNewPasswordOne] = useState("");
  const [newPasswordTwo, setNewPasswordTwo] = useState("");
  const [showNewPasswordOne, setShowNewPasswordOne] = useState(false);
  const [showNewPasswordTwo, setShowNewPasswordTwo] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [error, setError] = useState("");

  const changePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPasswordOne || !newPasswordTwo) {
      setError("Please fill all the fields");
      toast.error("Please fill all the fields", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setOldPasswordError(true);
      setNewPasswordError(true);
      return;
    }
    setOldPasswordError(false);

    if (newPasswordOne.length < 6) {
      setError("Password must be at least 6 characters");
      toast.error("Password must be at least 6 characters", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setNewPasswordError(true);
      return;
    }

    if (newPasswordOne !== newPasswordTwo) {
      setError("New passwords are not matching");
      toast.error("New passwords are not matching", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setNewPasswordError(true);
      return;
    }

    setError(null);
    setNewPasswordError(false);

    try {
      const res = await userAxios.patch(
        "/api/users/changePassword",
        {
          currentPassword: oldPassword,
          newPassword: newPasswordOne,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Password changed successfully", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setOldPassword("");
        setNewPasswordOne("");
        setNewPasswordTwo("");
      }
    } catch (err) {
      if (err.response.data.message === "Invalid current password") {
        setError("Incorrect old password");
        setOldPasswordError(true);
        toast.error("Incorrect old password", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <div className="px-[90px] mb-[50px]">
      <p className="text-main_blue text-[37px] font-semibold font-barlows mt-[12px] mb-[15px]">
        Profile Page
      </p>
      <div className="flex gap-[50px]">
        <div className="flex-1 ">
          <div className="flex gap-6">
            <div>
              <img
                src={user.photo}
                className="w-[250px] h-[250px] object-cover"
              />
            </div>
            <div className="flex-col">
              <p
                className="text-[35px]  font-bold font-barlows mb-[10px] "
                style={{ lineHeight: "normal" }}
              >
                {user ? user.fullName : "loading"}
              </p>
              <p className="text-[25px]  font-semibold font-barlows text-gray-800 mt-[10px] leading-6">
                {user ? user.sId : "loading"}
              </p>
              <p className="text-[25px]  font-semibold font-barlows text-gray-700">
                {user ? user.email : "loading"}
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-[30px]  mt-[30px] font-roboto">
            <div className="border-2 flex-1 pl-4 pt-1 pb-2 border-gray-200 rounded-md">
              <p className=" text-[24px] font-semibold pt-1 font-barlows ">
                User Information
              </p>
              <div className="mt-[15px]">
                <div>
                  <p className=" font-medium leading-4">Mobile Number :</p>
                  <p className="font- text-[14px]">
                    (+94){user ? user.mobileNo : "loading"}
                  </p>
                </div>
                <div className="mt-[10px]">
                  <p className="font-medium leading-4">Date of Birth :</p>
                  <p className="font- text-[14px]">
                    {user ? dayjs(user.dob).format("Do MMMM YYYY") : "loading"}
                  </p>
                </div>
                <div className="mt-[10px]">
                  <p className="font-medium leading-4">Current Address :</p>
                  <p className="font- text-[14px]">
                    {user
                      ? user.address
                          .split(",")
                          .map((item, index) => <p key={index}>{item},</p>)
                      : "loading"}
                  </p>
                </div>
              </div>
            </div>
            <div className="border-2 flex-1 pl-4 pt-1 pb-2 border-gray-200 rounded-md">
              <p className=" text-[24px] font-semibold pt-1 font-barlows ">
                University Information
              </p>
              <div className="mt-[15px]">
                <div>
                  <p className=" font-medium leading-4">Department :</p>
                  <p className="font- text-[14px]">
                    {user ? user.department : "loading"}
                  </p>
                </div>
                <div className="mt-[10px]">
                  <p className="font-medium leading-4">Date of Entry :</p>
                  <p className="font- text-[14px]">
                    {user
                      ? dayjs(user.dateOfEntry).format("Do MMMM YYYY")
                      : "loading"}
                  </p>
                </div>
                <div className="mt-[10px]">
                  <p className="font-medium leading-4">Current Year :</p>
                  <p className="font- text-[14px]">
                    {user ? user.year : "loading"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[380px] border-2 border-gray-200 rounded-[12px] py-[8px] px-[19px] place-self-start">
          <p className="font-barlows text-[22px] font-semibold ">
            Change your password
          </p>
          <form>
            <div className="flex flex-col gap-3 mt-4">
              <div className="relative flex flex-col">
                <label
                  htmlFor="password"
                  className={`font-semibold ${
                    oldPasswordError ? "text-red-500" : "text-[#383838]"
                  }`}
                >
                  Old Password
                </label>
                <input
                  id="password"
                  type="text"
                  className={
                    oldPasswordError ? errorInputStyle : normalInputStyle
                  }
                  value={oldPassword}
                  placeholder="Enter old password..."
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                />
              </div>

              <div className="relative flex flex-col">
                <label
                  htmlFor="password"
                  className={`font-semibold ${
                    newPasswordError ? "text-red-500" : "text-[#383838]"
                  }`}
                >
                  New password
                </label>
                <input
                  id="password"
                  type={showNewPasswordOne ? "text" : "password"}
                  className={
                    newPasswordError ? errorInputStyle : normalInputStyle
                  }
                  value={newPasswordOne}
                  placeholder="Enter new password"
                  onChange={(e) => {
                    setNewPasswordOne(e.target.value);
                  }}
                />
                <VisibilityIcon
                  className="absolute top-[40px] right-4"
                  fontSize="medium"
                  color={newPasswordError ? "error" : "disabled"}
                  onClick={() => {
                    console.log(showNewPasswordOne);
                    setShowNewPasswordOne((pre) => !pre);
                  }}
                />
              </div>
              <div className="relative flex flex-col">
                <label
                  htmlFor="password"
                  className={`font-semibold ${
                    newPasswordError ? "text-red-500" : "text-[#383838]"
                  }`}
                >
                  Confirm password
                </label>
                <input
                  id="password"
                  type={showNewPasswordTwo ? "text" : "password"}
                  className={
                    newPasswordError ? errorInputStyle : normalInputStyle
                  }
                  value={newPasswordTwo}
                  placeholder="Confirm password..."
                  onChange={(e) => {
                    setNewPasswordTwo(e.target.value);
                  }}
                />
                <VisibilityIcon
                  className="absolute top-[40px] right-4"
                  fontSize="medium"
                  color={newPasswordError ? "error" : "disabled"}
                  onClick={() => {
                    setShowNewPasswordTwo((pre) => !pre);
                  }}
                />
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-[15px] font-normal text-center mt-1">
                {error}
              </p>
            )}
            <button
              className="w-full text-white bg-main_blue py-3 rounded-lg text-[16px] font-medium font-roboto mt-3 mb-3"
              type="submit"
              onClick={changePassword}
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
