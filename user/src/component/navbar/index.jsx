import { NavLink, useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { useUserContext } from "../../hooks/useUserAuthContext";
import { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { BsFillPersonFill } from "react-icons/bs";
import { HiMiniInboxArrowDown } from "react-icons/hi2";

const linkClassNames =
  "w-[125px]  pt-[2px]  pl-[6px]  pr-[6px]  pb-[7px] flex justify-center items-center border-l-[1px]";

function Navbar() {
  const { user, dispatch } = useUserContext();
  const [profileClicked, setProfileClicked] = useState(false);
  const navigate = useNavigate();

  const logoutFun = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  const clickToProfile = () => {
    setProfileClicked(false);
    navigate("/profile");
  };
  return (
    <div className="bg-main_blue h-[60px] flex justify-between font-roboto text-white">
      <div>
        <img
          src="https://kdu.ac.lk/wp-content/uploads/2023/06/kdu-logo2.png.webp"
          alt=""
          className="h-[60px]"
        />
      </div>
      <div className="mt-[14px] flex items-center text-[17px] font-medium">
        <NavLink to="/">
          <div className={linkClassNames}>Home</div>
        </NavLink>
        <NavLink to="/routes">
          <div className={linkClassNames}>Routes</div>
        </NavLink>
        <NavLink to="/journey">
          <div className={linkClassNames}>Journey</div>
        </NavLink>
        <NavLink to="/booking">
          <div className={linkClassNames}>Booking</div>
        </NavLink>
        <NavLink to="/prices">
          <div className={linkClassNames}>Prices</div>
        </NavLink>
        <NavLink to="/contact-us">
          <div className={`${linkClassNames} border-r-[1px]`}>Contact Us</div>
        </NavLink>
      </div>
      <div
        className="font-roboto_slab flex items-center mr-3 gap-3 relative cursor-pointer"
        onClick={() => {
          setProfileClicked(!profileClicked);
          console.log(profileClicked);
        }}
      >
        <img
          src={
            user
              ? user.photo
              : "https://res.cloudinary.com/dnoobzfxo/image/upload/v1698320073/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD_g5ncwh.jpg"
          }
          alt=""
          className="h-[60px]"
        />
        <div>
          <p>{user ? user.sId : "loading"}</p>
          <p className="text-[17px]">{user ? user.shortName : "loading"}</p>
        </div>
        <div className="relative ml-2">
          <IoIosNotifications className="text-[23px]" />
          <span className="absolute top-[-4px] right-[-3px] bg-red-600 text-white w-4 h-4 text-xs flex  items-center justify-center rounded-full">
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
                  {user ? user.sId : "loading"}
                </p>
                <p className="text-[12px] font-normalt">
                  {user ? user.shortName : "loading"}
                </p>
                <p className="text-[9px] font-normal">
                  {user ? user.email : "loading"}
                </p>
              </div>
            </div>
            <div className="px-2 flex flex-col w-full pt-4 pb-4 font-roboto">
              <div
                className=" flex  justify-between items-center border-t-[1px] border-b-[1px] border-gray-300 py-2 px-4 hover:bg-gray-100 cursor-pointer"
                onClick={clickToProfile}
              >
                <div className="w-10 h-10 bg-[#E5FAFB]  rounded-md text-[20px] flex items-center justify-center text-main-blue ">
                  <BsFillPersonFill />
                </div>
                <div className="font-medium ">
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
