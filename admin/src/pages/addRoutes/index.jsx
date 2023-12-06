import { useJsApiLoader } from "@react-google-maps/api";
import Map from "./Map";

function AddRoute() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  return (
    <div className="px-[40px]">
      <p className="text-main_blue text-[37px] font-semibold font-barlows   leading-6 ">
        Manage Route
      </p>
      {isLoaded ? <Map /> : <h1>not loaded</h1>}
    </div>
  );
}

export default AddRoute;
