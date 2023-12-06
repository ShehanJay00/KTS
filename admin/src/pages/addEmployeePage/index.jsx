import { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import "./addEmployeePage.css";
import { toast } from "react-toastify";
import adminAxios from "../../baseURL";
import { useUserContext } from "../../hooks/useUserAuthContext";
import { useEmployeeContext } from "../../hooks/useEmployeeContext";
const normalInputStyle =
  "py-[16px] pl-3 focus:outline-none rounded-md border-[1px] border-gray-300 text-sm text-[#000] font-normal";
const normalLabelStyle =
  "font-roboto text-[16px] font-semibold leading-[92%] text-[#383838]";

function AddEmployeePage() {
  const { user } = useUserContext();
  const { dispatch } = useEmployeeContext();

  const [employeeId, setEmployeeId] = useState("");
  const [employeeImage, setEmployeeImage] = useState(null);
  const [role, setRole] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  //mobile is a number
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !employeeId ||
      !employeeImage ||
      !role ||
      !employeeName ||
      !email ||
      !mobile ||
      !password
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

    //check the validity of the email
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      toast.error("Please enter a valid email", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    //check the validity of the mobile number (10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      setError("Please enter a valid mobile number");
      toast.error("Please enter a valid mobile number", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    if (password.length < 6) {
      setError("Password should be atleast 6 characters long");
      toast.error("Password should be atleast 6 characters long", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    //only jpg, jpeg, png allowed
    if (
      employeeImage.type !== "image/png" &&
      employeeImage.type !== "image/jpg" &&
      employeeImage.type !== "image/jpeg"
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

    //create a form data object
    const formData = new FormData();
    formData.append("eId", employeeId);
    formData.append("image", employeeImage);
    formData.append("role", role);
    formData.append("fullName", employeeName);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("password", password);

    //send the data to the backend
    try {
      const result = await adminAxios.post("api/employees/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (result.status === 201) {
        toast.success("Employee added successfully", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
        setEmployeeId("");
        setEmployeeImage(null);
        setRole("");
        setEmployeeName("");
        setEmail("");
        setMobile("");
        setPassword("");
        setError("");
      }

      dispatch({ type: "ADD_EMPLOYEE", payload: result.data });
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
      <p className="text-main_blue text-[37px] font-semibold font-barlows  mb-[30px] leading-6 ">
        Insert Employee Details
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-[50px]">
          <div className="w-[400px] h-[500px]">
            <label htmlFor="busImage" className="w-fit">
              <div
                className={`${
                  employeeImage
                    ? "border-[1px] border-solid rounded-[6px] border-gray-300"
                    : "border-2 border-dashed rounded-[8px] border-main_blue"
                }  h-[450px]  flex items-center justify-center overflow-hidden px-3 py-3`}
              >
                {employeeImage ? (
                  <img
                    src={URL.createObjectURL(employeeImage)}
                    alt="bus"
                    className="w-full h-full object-cover "
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
                  setEmployeeImage(null);
                }}
              />
            </div>
            <input
              type="file"
              name="busImage"
              id="busImage"
              className="hidden"
              onChange={(e) => {
                setEmployeeImage(e.target.files[0]);
              }}
            />
          </div>
          <div className="flex-1 flex flex-col gap-[20px]">
            <div className="flex gap-7">
              <div className="flex flex-col flex-1 gap-[5px]">
                <label htmlFor="empId" className={normalLabelStyle}>
                  Employee ID
                </label>
                <input
                  type="text"
                  id="empId"
                  className={normalInputStyle}
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="Enter Employee ID..."
                />
              </div>
              <div className="flex flex-col flex-1 gap-[5px]">
                <label htmlFor="busID" className={normalLabelStyle}>
                  Employee Position
                </label>
                <select
                  id="model"
                  className={`py-3 px-4  w-full rounded-md border-[1px] border-gray-300 text-sm font-normal focus:outline-none h-[53.6px] role-select ${
                    role ? "text-[#000]" : "text-gray-400"
                  } `}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" className="">
                    Select a role...
                  </option>
                  <option value="driver">Driver</option>
                  <option value="conductor">Conductor</option>
                </select>
              </div>
            </div>
            <div className="flex gap-7">
              <div className="flex flex-col flex-1 gap-[5px]">
                <label htmlFor="empName" className={normalLabelStyle}>
                  Employee Name
                </label>
                <input
                  type="text"
                  id="empName"
                  className={normalInputStyle}
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  placeholder="Enter Employee Name..."
                />
              </div>
            </div>
            <div className="flex gap-7">
              <div className="flex flex-col flex-1 gap-[5px]">
                <label htmlFor="email" className={normalLabelStyle}>
                  Employee Email
                </label>
                <input
                  type="text"
                  id="email"
                  className={normalInputStyle}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Employee Email..."
                />
              </div>
            </div>
            <div className="flex gap-7">
              <div className="flex flex-col flex-1 gap-[5px]">
                <label htmlFor="mobile" className={normalLabelStyle}>
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobile"
                  className={normalInputStyle}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter Mobile Number..."
                />
              </div>
              <div className="flex flex-col flex-1 gap-[5px]">
                <label htmlFor="password" className={normalLabelStyle}>
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  className={normalInputStyle}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password..."
                />
              </div>
            </div>
            <div className="w-full flex flex-col">
              {error && (
                <p className="text-red-500 text-[15px] font-normal text-center mt-1">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="bg-main_blue text-[16px] font-roboto text-white font-medium   px-[50px] py-[14px] rounded-md place-self-center
            "
              >
                Submit Employee Credentials
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEmployeePage;
