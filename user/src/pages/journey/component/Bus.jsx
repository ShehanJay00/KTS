import { useEffect, useState } from "react";
import Seat from "./Seat";
import ReservedSeat, { DriverSeat } from "./CustomSeats";

function Bus({ setSeatCount }) {
  const [seats, setSeats] = useState([
    { number: 1, booked: "booked" },
    { number: 2, booked: "booked" },
    { number: 3, booked: "available" },
    { number: 4, booked: "booked" },
    { number: 5, booked: "available" },
    { number: 6, booked: "booked" },
    { number: 7, booked: "available" },
    { number: 8, booked: "available" },
    { number: 9, booked: "booked" },
    { number: 10, booked: "available" },
    { number: 11, booked: "available" },
    { number: 12, booked: "booked" },
    { number: 13, booked: "available" },
    { number: 14, booked: "available" },
    { number: 15, booked: "available" },
    { number: 16, booked: "booked" },
    { number: 17, booked: "available" },
    { number: 18, booked: "available" },
    { number: 19, booked: "booked" },
    { number: 20, booked: "available" },
    { number: 21, booked: "available" },
    { number: 22, booked: "available" },
    { number: 23, booked: "booked" },
    { number: 24, booked: "available" },
    { number: 25, booked: "available" },
    { number: 26, booked: "available" },
    { number: 27, booked: "booked" },
    { number: 28, booked: "available" },
    { number: 29, booked: "booked" },
    { number: 30, booked: "available" },
    { number: 31, booked: "available" },
    { number: 32, booked: "booked" },
    { number: 33, booked: "available" },
    { number: 34, booked: "booked" },
    { number: 35, booked: "available" },
    { number: 36, booked: "booked" },
    { number: 37, booked: "available" },
    { number: 38, booked: "booked" },
    { number: 39, booked: "available" },
    { number: 40, booked: "booked" },
  ]);

  useEffect(() => {
    setSeatCount(seats.filter((seat) => seat.booked == "selected").length);
  }, [seats]);

  const firstRow = [1, 5, 9, 13, 17, 21, 25, 29, 33];
  const secondRow = [2, 6, 10, 14, 18, 22, 26, 30, 34];
  const thirdRowUp = [3, 7, 11, 15, 19, 23];
  const thirdRowDown = [27, 31, 35];
  const fourthRowUp = [4, 8, 12, 16, 20, 24];
  const fourthRowDown = [28, 32, 36];

  return (
    <div className="w-[338px]  border-[2px] h-[530px] rounded-lg ">
      <div className="px-[30px] flex justify-end mt-[30px]">
        <DriverSeat />
      </div>
      <div className="flex  justify-between px-[30px]">
        <div className="flex gap-[20px]">
          <div>
            <ReservedSeat />
            {firstRow.map((num, i) => (
              <Seat
                key={i}
                number={num}
                status={seats[num - 1].booked}
                setSeats={setSeats}
              />
            ))}
          </div>
          <div>
            <ReservedSeat />
            {secondRow.map((num, i) => (
              <Seat
                key={i}
                number={num}
                status={seats[num - 1].booked}
                setSeats={setSeats}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-[20px]">
          <div>
            <div>
              {thirdRowUp.map((num, i) => (
                <Seat
                  key={i}
                  number={num}
                  status={seats[num - 1].booked}
                  setSeats={setSeats}
                />
              ))}
            </div>
            <div className="h-[43px]"></div>
            <div>
              {thirdRowDown.map((num, i) => (
                <Seat
                  key={i}
                  number={num}
                  status={seats[num - 1].booked}
                  setSeats={setSeats}
                />
              ))}
            </div>
          </div>
          <div>
            <div>
              {fourthRowUp.map((num, i) => (
                <Seat
                  key={i}
                  number={num}
                  status={seats[num - 1].booked}
                  setSeats={setSeats}
                />
              ))}
            </div>
            <div className="h-[43px]"></div>
            <div>
              {fourthRowDown.map((num, i) => (
                <Seat
                  key={i}
                  number={num}
                  status={seats[num - 1].booked}
                  setSeats={setSeats}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bus;
