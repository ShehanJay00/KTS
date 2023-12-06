import { useEffect, useState } from "react";
import "./addBus.css";
import adminAxios from "../../baseURL";
import { useUserContext } from "../../hooks/useUserAuthContext";
import { MdCloudUpload } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";
import { useEmployeeContext } from "../../hooks/useEmployeeContext";
import { toast } from "react-toastify";
import { useBusContext } from "../../hooks/useBusContext";

const normalInputStyle =
  "py-[16px] pl-3 focus:outline-none rounded-md border-[1px] border-gray-300 text-sm text-[#000] font-normal";
const normalLabelStyle =
  "font-roboto text-[16px] font-semibold leading-[92%] text-[#383838]";

function AddBusPage() {
  const { user } = useUserContext();
  const { employees } = useEmployeeContext();
  const { buses, dispatch } = useBusContext();
  const [busImage, setBusImage] = useState(null);
  //
  const [busId, setBusId] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [chassisNumber, setChassisNumber] = useState("");
  const [model, setModel] = useState("0");
  const [seatingCapacity, setSeatingCapacity] = useState(0);
  const [color, setColor] = useState("");
  const [driver, setDriver] = useState("0");
  const [conductor, setConductor] = useState("0");
  const [owner, setOwner] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (buses && buses.length > 0) {
      setBusId(
        `B#kts${parseInt(buses[buses.length - 1].busId.split("B#kts")[1]) + 1}`
      );
    } else {
      setBusId("B#kts1");
    }
  }, [buses]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !busId ||
      !registrationNumber ||
      !chassisNumber ||
      !model ||
      !seatingCapacity ||
      !color ||
      !driver ||
      !conductor ||
      !owner ||
      !busImage
    ) {
      setError("Please fill all fields");
      toast.error("Please fill all fields", {
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

    if (seatingCapacity <= 20) {
      setError("Please enter valid seat capacity");
      toast.error("Please enter valid seat capacity", {
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
    // only accept png,jpg,jpeg file formats
    if (
      busImage.type !== "image/png" &&
      busImage.type !== "image/jpg" &&
      busImage.type !== "image/jpeg"
    ) {
      setError("Only jpeg,jpg,png file formats are allowed");
      toast.error("Only jpeg,jpg,png file formats are allowed", {
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

    setError("");

    try {
      const formData = new FormData();
      formData.append("busId", busId);
      formData.append("registrationNumber", registrationNumber);
      formData.append("chassisNumber", chassisNumber);
      formData.append("model", model);
      formData.append("seatingCapacity", seatingCapacity);
      formData.append("color", color);
      formData.append("driver", driver);
      formData.append("conductor", conductor);
      formData.append("owner", owner);
      formData.append("image", busImage);

      const result = await adminAxios.post("/api/buses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (result.status === 201) {
        toast.success("Bus added successfully", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setBusId("");
        setRegistrationNumber("");
        setChassisNumber("");
        setModel("0");
        setSeatingCapacity(0);
        setColor("");
        setDriver("0");
        setConductor("0");
        setOwner("");
        setBusImage(null);

        dispatch({ type: "ADD_BUS", payload: result.data });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
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
  };

  return (
    <div className="mx-[80px]">
      <p className="text-main_blue text-[37px] font-semibold font-barlows  mb-[15px] leading-6">
        Insert Bus Details
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-[20px] gap-[10px]">
          <div className="flex gap-[40px]">
            <div className="flex flex-col flex-1 gap-[5px]">
              <label htmlFor="busID" className={normalLabelStyle}>
                Bus ID
              </label>
              <input
                type="text"
                id="busID"
                className={normalInputStyle}
                value={busId}
                onChange={(e) => setBusId(e.target.value)}
              />
            </div>
            <div className="flex flex-col flex-1 gap-[5px]">
              <label htmlFor="registrationNumber" className={normalLabelStyle}>
                Registration Number
              </label>
              <input
                type="text"
                id="registrationNumber"
                className={normalInputStyle}
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                placeholder="Enter registration number..."
              />
            </div>
            <div className="flex flex-col flex-1 gap-[5px]">
              <label htmlFor="chassisNumber" className={normalLabelStyle}>
                Chassis Number
              </label>
              <input
                type="text"
                id="chassisNumber"
                value={chassisNumber}
                onChange={(e) => {
                  setChassisNumber(e.target.value);
                }}
                className={normalInputStyle}
                placeholder="Enter chassis number..."
              />
            </div>
          </div>
          <div className="flex gap-[40px]">
            <div className="flex flex-col flex-1 gap-[5px]">
              <label htmlFor="model" className={normalLabelStyle}>
                Model
              </label>
              <select
                id="model"
                className={`py-3 px-4  w-full rounded-md border-[1px] border-gray-300 text-sm font-normal focus:outline-none h-[53.6px] model-select ${
                  model ? "text-[#000]" : "text-gray-400"
                } `}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="0" className="">
                  Select a model
                </option>
                <option value="single-deck">Single-deck</option>
                <option value="double-deck">Double-decker</option>
                <option value="coach">Coach</option>
                <option value="minibus">Minibus</option>
                <option value="school-bus">School Bus</option>
              </select>
            </div>
            <div className="flex flex-col flex-1 gap-[5px] ">
              <label htmlFor="registrationNumber" className={normalLabelStyle}>
                Seat Capacity
              </label>
              <div className="w-full  h-full rounded-md border-[1px] border-gray-300 text-sm text-[#000] font-normal flex justify-between overflow-hidden pl-3">
                <input
                  type={seatingCapacity === 0 ? "text" : "number"}
                  className={`focus:outline-none seat-input w-full ${
                    seatingCapacity === 0 ? "text-gray-400" : ""
                  }`}
                  placeholder="Enter seat capacity..."
                  value={seatingCapacity ? seatingCapacity : ""}
                  //convert to number
                  onChange={(e) => setSeatingCapacity(e.target.value)}
                />
                <div className="flex flex-col w-7 bg-gray-100 border-r-[1px] border-gray-300">
                  <button
                    type="button"
                    className="flex-1 border-b-[1px] flex justify-center items-center text-gray-600"
                    onClick={() => {
                      setSeatingCapacity((prev) => prev + 1);
                    }}
                  >
                    <IoMdAdd />
                  </button>
                  <button
                    type="button"
                    className="flex-1 flex justify-center items-center text-gray-600 text-[12px]"
                    onClick={() => {
                      setSeatingCapacity((prev) => prev - 1);
                    }}
                  >
                    <FaMinus />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-[5px]">
              <label htmlFor="color" className={normalLabelStyle}>
                Color
              </label>
              <input
                type="text"
                id="color"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
                className={normalInputStyle}
                placeholder="Enter bus color..."
              />
            </div>
          </div>
          <div className="flex gap-[40px]">
            <div className="flex flex-col flex-1 gap-[5px]">
              <label htmlFor="driver" className={normalLabelStyle}>
                Driver
              </label>
              <select
                id="driver"
                className={`py-3 px-4  w-full rounded-md border-[1px] border-gray-300 text-sm  font-normal focus:outline-none h-[53.6px] model-select ${
                  driver ? "text-[#000]" : "text-gray-400"
                }`}
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
              >
                <option value="0" className="">
                  Select a Driver
                </option>

                {employees &&
                  employees.length > 0 &&
                  employees
                    .filter((employee) => employee.role === "driver")
                    .map((employee, index) => (
                      <option key={index} value={employee._id}>
                        {employee.eId}-{employee.fullName}
                      </option>
                    ))}
              </select>
            </div>
            <div className="flex flex-col flex-1 gap-[5px]">
              <label htmlFor="conductor" className={normalLabelStyle}>
                Conductor
              </label>
              <select
                id="conductor"
                className={`py-3 px-4  w-full rounded-md border-[1px] border-gray-300 text-sm font-normal focus:outline-none h-[53.6px] model-select ${
                  model ? "text-[#000]" : "text-gray-400"
                } `}
                value={conductor}
                onChange={(e) => setConductor(e.target.value)}
              >
                <option value="0" className="">
                  Select a Conductor
                </option>

                {employees &&
                  employees.length > 0 &&
                  employees
                    .filter((employee) => employee.role === "conductor")
                    .map((employee, index) => (
                      <option key={index} value={employee._id}>
                        {employee.eId}-{employee.fullName}
                      </option>
                    ))}
              </select>
            </div>
            <div className="flex flex-col flex-1 gap-[5px]">
              <label htmlFor="owner" className={normalLabelStyle}>
                Owner
              </label>
              <input
                type="text"
                id="owner"
                value={owner}
                onChange={(e) => {
                  setOwner(e.target.value);
                }}
                className={normalInputStyle}
                placeholder="Enter owner name..."
              />
            </div>
          </div>
        </div>
        <div className="w-full mt-[15px] flex justify-between">
          <div className="w-[40%]">
            <label htmlFor="busImage" className="w-fit">
              <div
                className={`${
                  busImage
                    ? "border-[1px] border-solid rounded-[6px] border-gray-300"
                    : "border-2 border-dashed rounded-[8px] border-main_blue"
                }  h-[300px]  flex items-center justify-center overflow-hidden px-3 py-3`}
              >
                {busImage ? (
                  <img
                    src={URL.createObjectURL(busImage)}
                    alt="bus"
                    className="w-full h-full object-fill "
                  />
                ) : (
                  <div className="flex flex-col items-center font-roboto">
                    <MdCloudUpload className="text-[42px] text-main_blue" />
                    <p className="text-gray-800 text-[20px] font-semibold">
                      Click here to upload the image
                    </p>
                    <p className="text-[14px]">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                )}
              </div>
            </label>
            <div className="h-[40px] bg-main_blue  flex mt-[5px] rounded-lg items-center  justify-between px-[20px]">
              <label htmlFor="busImage">
                <FaImage className="text-[17px] text-white" />
              </label>
              <RiDeleteBin5Fill
                className="text-[17px] text-white"
                onClick={() => {
                  setBusImage(null);
                }}
              />
            </div>
            <input
              type="file"
              name="busImage"
              id="busImage"
              className="hidden"
              onChange={(e) => {
                setBusImage(e.target.files[0]);
              }}
            />
          </div>
          <div className="place-self-start">
            {error && (
              <p className="text-red-500 text-[15px] font-normal text-center mt-1">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="bg-main_blue text-[15px] font-roboto text-white font-medium   px-[50px] py-2 rounded-md 
            "
            >
              Submit Bus Credentials
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddBusPage;
