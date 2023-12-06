function ReservedSeat() {
  return (
    <div
      className={` w-[42px] h-[33px] rounded-md text-white font-roboto text-[15px] font-bold text-center pt-[7px] relative mb-[10px] border-2 border-[#000]`}
    >
      <div
        className={`absolute top-[5px] left-[-6px] bg-white w-[12px] h-[24px] border-2   rounded-[56px] border-[#000]`}
      ></div>

      <div
        className={`absolute top-[5px] right-[-6px] bg-white w-[12px] h-[24px] border-2  rounded-[56px] border-[#000]`}
      ></div>
      <div
        className={`absolute top-[24px] right-[-2px] bg-white w-[42px] h-[11px] border-2  rounded-[56px] border-[#000]`}
      ></div>
    </div>
  );
}
import { GiSteeringWheel } from "react-icons/gi";
export const DriverSeat = () => (
  <div
    className={` w-[42px] h-[33px] rounded-md text-white font-roboto text-[15px] font-bold text-center pt-[7px] relative mb-[10px] border-2 border-[#000]`}
  >
    <div
      className={`absolute top-[5px] left-[-6px] bg-white w-[12px] h-[24px] border-2   rounded-[56px] border-[#000]`}
    ></div>

    <div
      className={`absolute top-[5px] right-[-6px] bg-white w-[12px] h-[24px] border-2  rounded-[56px] border-[#000]`}
    ></div>
    <div
      className={`absolute top-[24px] right-[-2px] bg-white w-[42px] h-[11px] border-2  rounded-[56px] border-[#000]`}
    ></div>
    <div className="absolute z-50 text-black text-[40px] top-[-23px]">
      <GiSteeringWheel />
    </div>
  </div>
);

export default ReservedSeat;
