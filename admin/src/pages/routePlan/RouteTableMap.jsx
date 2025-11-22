import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Polyline,
} from "@react-google-maps/api";

function RouteTableMap({ googleRoutes, stations, startLocation }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const mapRef = useRef();

  const center = useMemo(
    () => ({ lat: 7.091634533102047, lng: 79.99258716627725 }),
    []
  );

  const options = useMemo(
    () => ({
      mapId: "958725da470cbe5e",
      disableDefaultUI: true,
      clickableIcons: false,
      fullscreenControl: false,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  // Build a path that connects center then all stations in order.
  const path = useMemo(() => {
    const points = [];
    if (center) points.push(center);
    if (stations && stations.length > 0) {
      stations.forEach((s) => {
        points.push({ lat: s.lat, lng: s.lng });
      });
    }
    return points;
  }, [center, stations]);

  // Directions computed by DirectionsService for the multi-stop route
  const [computedDirections, setComputedDirections] = useState(null);

  // When stations change, request a driving route from `center` through all stations.
  useEffect(() => {
    if (!isLoaded) return;
    if (!stations || stations.length === 0) {
      setComputedDirections(null);
      return;
    }

    // Prepare origin, destination and waypoints so the route follows actual roads
    const origin = center;
    const destination = {
      lat: stations[stations.length - 1].lat,
      lng: stations[stations.length - 1].lng,
    };
    const waypoints =
      stations.length > 1
        ? stations
            .slice(0, stations.length - 1)
            .map((s) => ({
              location: { lat: s.lat, lng: s.lng },
              stopover: true,
            }))
        : [];

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        waypoints,
        optimizeWaypoints: false,
      },
      (result, status) => {
        if (
          status === window.google.maps.DirectionsStatus.OK ||
          status === "OK"
        ) {
          setComputedDirections(result);
        } else {
          console.error("Directions request failed due to ", status);
          setComputedDirections(null);
        }
      }
    );
  }, [isLoaded, stations, center]);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden">
      {isLoaded ? (
        <GoogleMap
          zoom={12}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {/* If stations exist, first try to render a real driving route via DirectionsService
              (computedDirections). If that isn't available, fallback to a simple polyline.
              If no stations provided, fall back to precomputed googleRoutes directions. */}
          {stations && stations.length > 0 ? (
            computedDirections ? (
              <DirectionsRenderer
                options={{
                  directions: computedDirections,
                  suppressMarkers: true,
                  polylineOptions: {
                    strokeColor: "blue",
                    strokeWeight: 4,
                    strokeOpacity: 0.9,
                  },
                }}
              />
            ) : (
              path &&
              path.length > 1 && (
                <Polyline
                  path={path}
                  options={{
                    strokeColor: "blue",
                    strokeWeight: 3,
                    strokeOpacity: 0.9,
                  }}
                />
              )
            )
          ) : (
            googleRoutes && (
              <DirectionsRenderer
                options={{
                  directions: googleRoutes.directions,
                  routeIndex: googleRoutes.routeId,
                  suppressMarkers: true,
                  polylineOptions: {
                    strokeColor: "blue",
                    strokeWeight: 3,
                    strokeOpacity: 0.9,
                  },
                }}
              />
            )
          )}
          {center && (
            <Marker
              position={center}
              icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            ></Marker>
          )}
          {startLocation && (
            <Marker
              position={startLocation.latlng}
              icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            ></Marker>
          )}
          {stations &&
            stations.map((station) => (
              <Marker
                key={`${station.id} ${station.lat} ${station.lng}`}
                position={{ lat: station.lat, lng: station.lng }}
                icon={{
                  scaledSize: new window.google.maps.Size(26, 26),
                }}
                label={{
                  text: `${station.id}`,
                  color: "white",
                  className: "font-roboto px-1 py-[2px] rounded-lg bg-red-600",
                  fontSize: "10px",
                  fontWeight: "500",
                }}
              ></Marker>
            ))}
        </GoogleMap>
      ) : (
        <h1>not loaded</h1>
      )}
    </div>
  );
}

export default RouteTableMap;
