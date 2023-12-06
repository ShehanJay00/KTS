import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  const containerStyle = {
    width: "400px",
    height: "400px",
  };
  return isLoaded ? (
    <div>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default Map;
