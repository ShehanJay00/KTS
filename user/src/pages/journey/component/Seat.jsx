function Seat({ number, status, setSeats }) {
  const availableStyle = "bg-main_blue";
  const bookedStyle = "bg-main_red";
  const selectedStyle = "bg-[#EFBC07]";

  let contentStyle = availableStyle;
  if (status === "booked") {
    contentStyle = bookedStyle;
  } else if (status === "selected") {
    contentStyle = selectedStyle;
  }

  const availableBorderStyle = "border-[#002147]";
  const bookedBorderStyle = "border-[#7A0736]";
  const selectedBorderStyle = "border-[#EFBC07]";
  let borderStyle = availableBorderStyle;

  if (status === "booked") {
    borderStyle = bookedBorderStyle;
  } else if (status === "selected") {
    borderStyle = selectedBorderStyle;
  }

  const seatClick = () => {
    console.log("clicked");
    if (status === "available") {
      setSeats((prev) => {
        const newSeats = [...prev];
        newSeats[number - 1].booked = "selected";
        return newSeats;
      });
    } else if (status === "selected") {
      setSeats((prev) => {
        const newSeats = [...prev];
        newSeats[number - 1].booked = "available";
        return newSeats;
      });
    }
  };
  //disable if booked

  return (
    <div
      onClick={
        status === "available" || status == "selected" ? seatClick : null
      }
      className={
        status === "available" || status == "selected" ? "cursor-pointer" : ""
      }
    >
      <div
        className={` w-[42px] h-[33px] rounded-md text-white font-roboto text-[15px] font-bold text-center pt-[7px] relative mb-[10px] ${contentStyle}`}
      >
        <p>{number}</p>
        <div
          className={`absolute top-[5px] left-[-6px] bg-white w-[12px] h-[24px] border-2   rounded-[56px] ${borderStyle}`}
        ></div>

        <div
          className={`absolute top-[5px] right-[-6px] bg-white w-[12px] h-[24px] border-2  rounded-[56px] ${borderStyle}`}
        ></div>
        <div
          className={`absolute top-[24px] right-[-0px] bg-white w-[42px] h-[11px] border-2  rounded-[56px] ${borderStyle}`}
        ></div>
      </div>
    </div>
  );
}

export default Seat;
