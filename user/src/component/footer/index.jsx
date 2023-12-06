import { AiOutlineMail } from "react-icons/ai";
import { LuPhone } from "react-icons/lu";
function Footer() {
  return (
    <div className="h-[340px] bg-main_blue flex flex-col items-center text-white font-roboto">
      <div className="flex gap-[187px] mt-[22px]">
        <div className="flex flex-col items-center">
          <p className="font-roboto_slab text-[20px] mb-[8px]">Contact Us</p>
          <p className="w-[272px] text-justify font-medium leading-[151%] text-[14px]">
            Leverage agile frameworks to provide a robust synopsis for strategy
            collaborative thinking to further the overall value proposition.
          </p>
          <div className="flex flex-col gap-4 mt-3 text-[12px]">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-[#111C55] border-[1px] border-[#3c4ba2]">
                <AiOutlineMail className="text-[25px]" />
              </div>
              <div>
                <p>Email</p>
                <p>contactkts@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-[#111C55] border-[1px] border-[#3c4ba2]">
                <LuPhone className="text-[25px]" />
              </div>
              <div>
                <p>Phone</p>
                <p>(+94)011546342</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-roboto_slab text-[20px] mb-[8px]">Site Links</p>
          <div className="flex flex-col items-center gap-[8px]">
            <p className="text-[14px]  font-medium">Home</p>
            <p className="text-[14px]  font-medium">Routes</p>
            <p className="text-[14px]  font-medium">Journey</p>
            <p className="text-[14px]  font-medium">Booking</p>
            <p className="text-[14px]  font-medium">Prices</p>
            <p className="text-[14px]  font-medium">Contact Us</p>
          </div>
        </div>
        <div>
          <img
            src="https://kdu.ac.lk/wp-content/uploads/2023/06/kdu-logo2.png.webp"
            alt=""
            className="w-[250px]"
          />
          <div className="flex flex-col gap-[13px] mt-[10px]">
            <div className="flex gap-2">
              <img
                src="https://kdu.ac.lk/wp-content/uploads/2023/05/MOD.png.webp"
                alt=""
                className="w-[14px]"
              />
              <p className="text-sm font-medium">
                Sri Lanka Embassy in Katmandu
              </p>
            </div>
            <div className="flex gap-2">
              <img
                src="https://kdu.ac.lk/wp-content/uploads/2023/05/MOD.png.webp"
                alt=""
                className="w-[14px]"
              />
              <p className="text-sm font-medium">
                The Embassy of Sri Lanka in the People’s Republic of China
              </p>
            </div>
            <div className="flex gap-2">
              <img
                src="https://kdu.ac.lk/wp-content/uploads/2023/05/MOD.png.webp"
                alt=""
                className="w-[14px]"
              />
              <p className="text-sm font-medium">
                Scholarships – High Commission of Sri Lanka in Pakistan
              </p>
            </div>{" "}
            <div className="flex gap-2">
              <img
                src="https://kdu.ac.lk/wp-content/uploads/2023/05/logo-wide.png.webp"
                alt=""
                className="w-[14px]"
              />
              <p className="text-sm font-medium">
                Grand Royal Education Pvt Ltd
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-[#848E99] w-full mt-[15px]" />
      <div className="text-sm mt-[14px] font-medium">
        Copyright © 2022 General Sir John Kotelawala Defence University
      </div>
    </div>
  );
}

export default Footer;
