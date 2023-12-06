import { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { toast } from "react-toastify";

function StationsInput({
  setStations,
  currentMarker,
  setCurrentMaker,
  currentMakerDistance,
}) {
  const [name, setName] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [price, setPrice] = useState(0);

  const addStation = () => {
    if (name === "" || lat === 0 || lng === 0 || price === 0) {
      toast.error("Fill all the felids", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setStations((prev) => [
      ...prev,
      {
        id: name,
        lat: lat,
        lng: lng,
        price: price,
        distance: currentMakerDistance,
      },
    ]);
    setName("");
    setLat(0);
    setLng(0);
    setPrice(0);
    setCurrentMaker({ lat: 0, lng: 0 });
  };

  return (
    <div className="flex items-end justify-between">
      <div className="flex gap-2">
        <div className="">
          <p>Station Name</p>
          <input
            value={name}
            type="text"
            className="py-2 border rounded-lg font-roboto focus:outline-none w-[120px] pl-2 text-sm  text-[13px]"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="">
          <p>Latitude </p>
          <input
            value={lat}
            type="number"
            className="py-2 border rounded-lg font-roboto focus:outline-none w-[120px] pl-2 text-sm  text-[13px]"
            onChange={(e) => {
              setLat(parseFloat(e.target.value));
              setCurrentMaker({
                ...currentMarker,
                lat: parseFloat(e.target.value),
              });
            }}
          />
        </div>
        <div className="">
          <p>Longitude</p>
          <input
            value={lng}
            type="number"
            className="py-2 border rounded-lg font-roboto focus:outline-none w-[120px] pl-2 text-sm  text-[13px]"
            onChange={(e) => {
              setLng(parseFloat(e.target.value));
              setCurrentMaker({
                ...currentMarker,
                lng: parseFloat(e.target.value),
              });
            }}
          />
        </div>
        <div className="">
          <p>Price</p>
          <input
            value={price}
            type="text"
            className="py-2 border rounded-lg font-roboto focus:outline-none w-[120px] pl-2 text-[13px]"
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <button className="pb-[11px]" onClick={addStation}>
        <IoAddCircle />
      </button>
    </div>
  );
}

export default StationsInput;
