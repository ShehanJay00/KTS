import { IoGridSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { useUserContext } from "../../hooks/useUserAuthContext";
import { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { BsFillPersonFill } from "react-icons/bs";
import { HiMiniInboxArrowDown } from "react-icons/hi2";

function Navbar() {
  const { user, dispatch } = useUserContext();
  const [profileClicked, setProfileClicked] = useState(false);

  const logoutFun = () => {
    setProfileClicked(false);
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("manager");
  };

  return (
    <div className="flex justify-between pt-1 items-center pr-4 pl-3">
      <div className="text-[25px] text-main_blue">
        <IoGridSharp />
      </div>
      <div className="flex items-center">
        <div className="flex text-main_blue items-center gap-7">
          <FaSearch className="text-[20px]" />{" "}
          <IoSettings className="text-[22px]" />
        </div>
        <div
          className="flex items-center ml-7 gap-3 relative"
          onClick={() => {
            setProfileClicked(!profileClicked);
          }}
        >
          <div>
            <img
              src={
                user
                  ? user.photo
                  : "https://res.cloudinary.com/dnoobzfxo/image/upload/v1698320073/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD_g5ncwh.jpg"
              }
              alt=""
              className="h-[40px] w-[40px]  object-cover rounded-full "
              style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))" }}
            />
          </div>

          <p className="font-roboto font-bold text-main_blue">
            {user ? user.shortName : "loading.."}
          </p>
        </div>
        <div className="relative ml-5">
          <IoIosNotifications className="text-[25px]" />
          <span className="absolute top-[-4px] right-[-3px] bg-main_blue text-white font-bold w-4 h-4 text-xs flex  items-center justify-center rounded-full">
            1
          </span>
        </div>
      </div>
      {profileClicked && (
        <div className=" bg-white absolute right-[160px] top-[40px] w-[230px]  z-10 font-roboto border-[1px] rounded-md border-gray-400 text-black">
          <div className="px-3 py-2 w-full h-full text-sm font-normal flex-col flex">
            <div className="flex  items-center justify-between px-1">
              <div className="font-roboto font-medium text-[16px]">
                User Profile
              </div>
              <div
                className=" rounded-full p-3 hover:bg-slate-200 cursor-pointer"
                onClick={() => {
                  setProfileClicked(false);
                }}
              >
                <ImCancelCircle size="16px" />
              </div>
            </div>
            <div className="flex justify-between p-1 ">
              <div>
                <img
                  className="w-[70px] h-[70px]  object-cover "
                  src={
                    user
                      ? user.photo
                      : "https://res.cloudinary.com/dnoobzfxo/image/upload/v1698320073/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD_g5ncwh.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-center font-roboto">
                <p className="text-[16px] font-bold">
                  {user ? user.eId : "loading"}
                </p>
                <p className="text-[12px] font-normalt">
                  {user ? user.fullName : "loading"}
                </p>
                <p className="text-[9px] font-normal">
                  {user ? user.email : "loading"}
                </p>
              </div>
            </div>
            <div className="px-2 flex flex-col w-full pt-4 pb-4 font-roboto">
              <div className=" flex  justify-between items-center border-t-[1px] border-b-[1px] border-gray-300 py-2 px-4 hover:bg-gray-100">
                <div className="w-10 h-10 bg-[#E5FAFB]  rounded-md text-[20px] flex items-center justify-center text-main-blue ">
                  <BsFillPersonFill />
                </div>
                <div className="font-medium">
                  <p>My profile</p>
                  <p className="text-xs font-light">Account Settings</p>
                  <p></p>
                </div>
              </div>
              <div className=" flex  justify-between items-center border-t-[1px] border-b-[1px] border-gray-300 py-2 px-4 hover:bg-gray-100">
                <div className="w-10 h-10 bg-[#E5FAFB]  rounded-md text-[20px] flex items-center justify-center text-main_blue font-extrabold">
                  <HiMiniInboxArrowDown />
                </div>
                <div className="font-medium">
                  <p>My Inbox</p>
                  <p className="text-xs font-light">Recent Noticecs</p>
                  <p></p>
                </div>
              </div>
            </div>
            <button
              className="bg-main_blue text-white px-3 py-[6px] rounded-lg text-xs font-normal"
              onClick={logoutFun}
            >
              logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
