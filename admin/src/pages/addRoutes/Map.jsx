import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
} from "@react-google-maps/api";

import PlacesAutocomplete from "./MapSearch";
import adminAxios from "../../baseURL";
import StationsOutput from "./StationsOutput";
import StationsInput from "./StationsInput";
import { useUserContext } from "../../hooks/useUserAuthContext";
import { toast } from "react-toastify";
import { useRoadRouteContext } from "../../hooks/useRoadRouteContext";

function Map() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { roadRoutes, dispatch } = useRoadRouteContext();

  const mapRef = useRef();

  const center = useMemo(
    () => ({ lat: 6.833813409471106, lng: 79.88634319394335 }),
    []
  );

  const options = useMemo(
    () => ({
      mapId: "958725da470cbe5e",
      //disableDefaultUI: true,
      //clickableIcons: false,
      fullscreenControl: false,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  //start location
  const [startLocation, setStartLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const [routeId, setRouteId] = useState(0);

  const [startLocationName, setStartLocationName] = useState("");

  const [directions, setDirections] = useState(null);

  const [stations, setStations] = useState([]);

  const [route0, setRoute0] = useState(true);
  const [route1, setRoute1] = useState(false);
  const [route2, setRoute2] = useState(false);

  const [currentMarker, setCurrentMarker] = useState({
    lat: 0,
    lng: 0,
  });

  const [currentMakerDistance, setCurrentMakerDistance] = useState(0);

  const [rightClickedLocation, setRightClickedLocation] = useState({
    lat: 0,
    lng: 0,
    name: "",
  });

  const [circles, setCircles] = useState(false);

  const service = new google.maps.DirectionsService();

  useEffect(() => {
    if (roadRoutes && roadRoutes.length > 0) {
      setRouteId(
        `RR#kts${
          parseInt(roadRoutes[roadRoutes.length - 1].rId.split("RR#kts")[1]) + 1
        }`
      );
    } else {
      setRouteId("RR#kts1");
    }
  }, [roadRoutes]);

  console.log("routeId", routeId);

  useEffect(() => {
    if (startLocation.lat && startLocation.lng) {
      service.route(
        {
          origin: startLocation,
          destination: center,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [startLocation]);

  useEffect(() => {
    if (currentMarker.lat && currentMarker.lng) {
      service.route(
        {
          origin: currentMarker,
          destination: center,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setCurrentMakerDistance(result.routes[0].legs[0].distance.text);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [currentMarker]);

  console.log("current", currentMarker);
  console.log("dis", currentMakerDistance);

  const handleRightClick = (e) => {
    const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results[0]) {
        const placeName = results[0].formatted_address;
        console.log("Right-clicked location:", latLng);
        console.log("Place Name:", placeName);
        setRightClickedLocation({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          name: placeName,
        });
      } else {
        console.error("Geocoder failed due to:", status);
      }
    });
  };

  function getLocationName(latLng) {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          const placeName = results[0].formatted_address;
          console.log("Place Name:", placeName);
          resolve(placeName);
        } else {
          console.error("Geocoder failed due to:", status);
          reject(status);
        }
      });
    });
  }

  const createRoadRoute = async () => {
    if (route0 && route1) {
      toast.error("Please select one Route", {
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
    if (route2 && route1) {
      toast.error("Please select one Route", {
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

    if (route0 && route2) {
      toast.error("Please select one Route", {
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

    let startName = "";

    if (startLocationName == "") {
      startName = await getLocationName(startLocation);
      console.log("hitting");
    }

    let directionId;
    if (route0 == true) {
      directionId = 0;
    } else if (route1 == true) {
      directionId = 1;
    } else if (route2 == true) {
      directionId = 2;
    }

    if (setStartLocationName === "" && startName === "") {
      toast.error("Select a another Start Location", {
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

    if (directions === null) {
      toast.error("Directions are empty", {
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

    try {
      const res = await adminAxios.post(
        "/api/roadRoutes/",
        {
          rId: routeId,
          googleRoute: {
            routeId: directionId,
            directions: directions,
          },
          startLocation: {
            name: startLocationName ? startLocationName : startName,
            latlng: {
              lat: startLocation.lat,
              lng: startLocation.lng,
            },
          },
          stations: stations,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(res);
      if (res.status === 201) {
        dispatch({ type: "ADD_ROAD_ROUTE", payload: res.data });
        toast.success("Route added successfully", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
        navigate("/routes");
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
    <div className="flex justify-between mt-[20px]">
      <div className="w-[5ddd00px]">
        <div className="flex place-self-start  items-center gap-[5px]">
          <div className="flex gap-[10px] ">
            <div className="">
              <PlacesAutocomplete
                setLocation={setStartLocation}
                setStartLocationName={setStartLocationName}
              />
            </div>
            <input
              type="number"
              placeholder="Latitude"
              className="py-3 pl-3 border rounded-lg font-roboto focus:outline-none w-[150px]  text-[13px] font-semibold"
              onChange={(e) => {
                setStartLocation({
                  ...startLocation,
                  lat: parseFloat(e.target.value),
                });
              }}
            />
            <input
              type="number"
              placeholder="Langitude"
              className="py-3 pl-3 border rounded-lg font-roboto focus:outline-none w-[150px] text-[13px] font-semibold"
              onChange={(e) => {
                setStartLocation({
                  ...startLocation,
                  lng: parseFloat(e.target.value),
                });
              }}
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={createRoadRoute}
              className={`text-[20px] ${
                startLocation.lat && startLocation.lng
                  ? "hidden"
                  : "text-[20px]"
              }`}
            >
              <IoAddCircle />
            </button>
            <div
              className={`text-[20px] ${
                startLocation.lat && startLocation.lng
                  ? "text-[20px]"
                  : "hidden"
              }`}
            >
              <button className="" onClick={createRoadRoute}>
                <MdEdit className="text-[20px]" />
              </button>
              <button className="" onClick={createRoadRoute}>
                <MdDeleteOutline className="text-[20px]" />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${
            startLocation.lat && startLocation.lng ? "mt-[15px]" : "hidden"
          }`}
        >
          <div className="flex font-roboto justify-between">
            {/*  */}

            {directions && directions.routes[0] && (
              <div className="flex flex-col items-center">
                <input
                  checked={route0}
                  type="checkbox"
                  onChange={(e) => {
                    console.log(e.target.checked);
                    setRoute0(e.target.checked);
                  }}
                  className="w-4 h-4  bg-gray-100 border-gray-300 focus:outline-none "
                />
                <div className="flex flex-col items-center text-center gap-[7px]">
                  {directions && (
                    <>
                      <p
                        className="text-[18px] font-semibold"
                        style={{ lineHeight: "normal" }}
                      >
                        Route 1
                      </p>
                      <div>
                        <p
                          className="text-[16px] font-semibold text-gray-900 "
                          style={{ lineHeight: "normal" }}
                        >
                          Distance :
                        </p>
                        <p
                          className="text-[14px] font-medium"
                          style={{ lineHeight: "normal" }}
                        >
                          {directions.routes[0].legs[0].distance.text}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p
                          className="text-[16px] font-semibold text-gray-900 "
                          style={{ lineHeight: "normal" }}
                        >
                          Duration :
                        </p>
                        <p
                          className="text-[14px] font-medium"
                          style={{ lineHeight: "normal" }}
                        >
                          {directions.routes[0].legs[0].duration.text}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/*  */}

            {directions && directions.routes[1] && (
              <div className="flex flex-col items-center">
                <input
                  checked={route1}
                  type="checkbox"
                  onChange={(e) => {
                    console.log(e.target.checked);
                    setRoute1(e.target.checked);
                  }}
                  className="w-4 h-4  bg-gray-100 border-gray-300 focus:outline-none "
                />
                <div className="flex flex-col items-center text-center gap-[7px]">
                  {directions && (
                    <>
                      <p
                        className="text-[18px] font-semibold"
                        style={{ lineHeight: "normal" }}
                      >
                        Route 2
                      </p>
                      <div>
                        <p
                          className="text-[16px] font-semibold text-gray-900 "
                          style={{ lineHeight: "normal" }}
                        >
                          Distance :
                        </p>
                        <p
                          className="text-[14px] font-medium"
                          style={{ lineHeight: "normal" }}
                        >
                          {directions.routes[1].legs[0].distance.text}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p
                          className="text-[16px] font-semibold text-gray-900 "
                          style={{ lineHeight: "normal" }}
                        >
                          Duration :
                        </p>
                        <p
                          className="text-[14px] font-medium"
                          style={{ lineHeight: "normal" }}
                        >
                          {directions.routes[1].legs[0].duration.text}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {directions && directions.routes[2] && (
              <div className="flex flex-col items-center">
                <input
                  checked={route2}
                  type="checkbox"
                  onChange={(e) => {
                    console.log(e.target.checked);
                    setRoute2(e.target.checked);
                  }}
                  className="w-4 h-4  bg-gray-100 border-gray-300 focus:outline-none "
                />
                <div className="flex flex-col items-center text-center gap-[7px]">
                  {directions && (
                    <>
                      <p
                        className="text-[18px] font-semibold"
                        style={{ lineHeight: "normal" }}
                      >
                        Route 3
                      </p>
                      <div>
                        <p
                          className="text-[16px] font-semibold text-gray-900 "
                          style={{ lineHeight: "normal" }}
                        >
                          Distance :
                        </p>
                        <p
                          className="text-[14px] font-medium"
                          style={{ lineHeight: "normal" }}
                        >
                          {directions.routes[2].legs[0].distance.text}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p
                          className="text-[16px] font-semibold text-gray-900 "
                          style={{ lineHeight: "normal" }}
                        >
                          Duration :
                        </p>
                        <p
                          className="text-[14px] font-medium"
                          style={{ lineHeight: "normal" }}
                        >
                          {directions.routes[2].legs[0].duration.text}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            <div>
              <div className="flex items-center ">
                <input
                  value={circles}
                  type="checkbox"
                  name="colored-radio"
                  className="w-4 h-4  bg-gray-100 border-gray-300 focus:outline-none "
                  onClick={(e) => {
                    setCircles(e.target.checked);
                  }}
                />
                <label className="ms-2 text-sm font-medium text-gray-900 ">
                  Distance Circles
                </label>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            startLocation.lat && startLocation.lng ? "outputAndInput" : "hidden"
          }`}
        >
          <div>
            <StationsOutput stations={stations} setStations={setStations} />
          </div>
          <div className="mt-[18px]">
            <StationsInput
              setStations={setStations}
              currentMarker={currentMarker}
              setCurrentMaker={setCurrentMarker}
              currentMakerDistance={currentMakerDistance}
            />
          </div>
        </div>
        <div>
          {!rightClickedLocation.lat == 0 &&
            !rightClickedLocation.lng == 0 &&
            !rightClickedLocation.name == "" && (
              <div className="mt-[20px] w-full bg-red-100 px-[20px] py-[10px] font-roboto text-[#383838] rounded-lg border-[1px] border-gray-200 relative">
                <p className="font-semibold">
                  Lat -
                  <span className="text-[14px] font-medium ml-3">
                    {rightClickedLocation.lat}
                  </span>
                </p>
                <p className="font-semibold">
                  Lng-
                  <span className="text-[14px] font-medium ml-3">
                    {rightClickedLocation.lng}
                  </span>
                </p>
                <p className="font-semibold">
                  Location Name -
                  <span className="text-[14px] font-medium ml-3">
                    {rightClickedLocation.name}
                  </span>
                </p>
                <div className="absolute top-1 right-1">
                  <IoMdCloseCircle
                    onClick={() => {
                      setRightClickedLocation({ lat: 0, lng: 0, name: "" });
                    }}
                  />
                </div>
              </div>
            )}
        </div>
        <button
          type="submit"
          className="bg-main_blue text-[14px] font-roboto text-white font-medium   px-[20px] py-[7px] rounded-md place-self-center mt-[20px]
            "
          onClick={createRoadRoute}
        >
          Submit Route
        </button>
      </div>

      <div className="min-w-[650px] h-[600px]">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
          onRightClick={handleRightClick}
        >
          {/* show the route[0]*/}
          {directions && route0 && (
            <DirectionsRenderer
              options={{
                directions: directions,
                routeIndex: 0,
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "red",
                  strokeWeight: 3,
                  strokeOpacity: 0.5,
                },
              }}
            />
          )}
          {directions && route1 && (
            <DirectionsRenderer
              options={{
                directions,
                routeIndex: 1,
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "blue",
                  strokeWeight: 4,
                  strokeOpacity: 0.5,
                },
              }}
            />
          )}
          {directions && route2 && (
            <DirectionsRenderer
              options={{
                directions,
                routeIndex: 2,
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "green",
                  strokeWeight: 6,
                  strokeOpacity: 0.5,
                },
              }}
            />
          )}

          {center && circles && (
            <>
              <Marker
                title="sadsadddd"
                position={center}
                label={{ text: `assadas sadsadasdasd`, color: "#fff" }}
              />
              <Circle center={center} radius={10000} options={closeOptions} />
              <Circle center={center} radius={20000} options={middleOptions} />
              <Circle center={center} radius={30000} options={farOptions} />
            </>
          )}

          {currentMarker.lat && currentMarker.lng && (
            <Marker position={currentMarker}></Marker>
          )}

          {stations &&
            stations.map((station) => (
              <Marker
                key={station.id}
                position={{ lat: station.lat, lng: station.lng }}
                title={station.name}
                label={{
                  text: `${station.id}`,
                  color: "#fff",
                  className:
                    " bg-red-800 font-roboto rounded-lg px-[5px] py-[2px] ",
                  fontWeight: "500",
                  fontSize: "13px",
                }}
              />
            ))}

          {startLocation.lat && startLocation.lng && (
            <Marker
              position={startLocation}
              icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            ></Marker>
          )}

          {center && (
            <Marker
              position={center}
              icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            ></Marker>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

export default Map;
const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};
