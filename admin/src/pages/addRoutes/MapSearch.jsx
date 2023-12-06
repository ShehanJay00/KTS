import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

const PlacesAutocomplete = ({ setLocation, setStartLocationName }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {},
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
        setLocation({ lat, lng });
        const placeName = results[0].formatted_address;
        setStartLocationName(placeName);
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="cursor-pointer p-2 hover:bg-gray-200"
        >
          <strong className="block">{main_text}</strong>{" "}
          <small className="text-gray-600">{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} className="relative w-[150px]">
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Start location"
        className="w-full p-2 py-3 pl-3 border rounded-lg font-roboto focus:outline-none text-[13px] font-semibold"
      />
      {status === "OK" && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border rounded shadow-md font-roboto z-50">
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
};

export default PlacesAutocomplete;
