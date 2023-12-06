import { RiTicket2Line } from "react-icons/ri";
import { MdOutlineQrCodeScanner } from "react-icons/md";

function MiddleD() {
  return (
    <div
      className="w-full h-full  bg-contain pl-8 pr-8 flex justify-center items-center rounded-[10px] "
      style={{
        backgroundImage:
          "url(https://cdn11.bigcommerce.com/s-l2xlls5oyw/images/stencil/original/products/31352/46634/15c5a9b1-2996-44cf-beb9-c8e2b8559058__87246.1661175221.jpg)",
      }}
    >
      <div className="flex gap-10 ">
        <div className="bg-main_blue w-full h-[90px] rounded-3xl flex flex-col px-7 py-4 justify-center gap-1">
          <div className="flex items-center justify-between gap-5">
            <div className="text-[#FEF2EC] text-2xl ">
              <RiTicket2Line />
            </div>
            <div className="text-[#FEF2EC] text-2xl font-sans font-bold ">
              56834
            </div>
          </div>
          <div className="flex justify-end font-sans text-[#FEF2EC]  text-[12px]">
            Bought Tickets-Nov
          </div>
        </div>

        <div className="bg-main_blue w-full h-[90px] rounded-3xl flex flex-col px-7 py-4 justify-center gap-1">
          <div className="flex items-center justify-between gap-5">
            <div className="text-[#FEF2EC] text-3xl ">
              <MdOutlineQrCodeScanner />
            </div>
            <div className="text-[#FEF2EC] text-2xl font-sans font-bold ">
              9453
            </div>
          </div>
          <div className="flex justify-end font-sans text-[#FEF2EC] text-[12px] ">
            Scanned Tickets-Nov
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddleD;
//FEF2EC
