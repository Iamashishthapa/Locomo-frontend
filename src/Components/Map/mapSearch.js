import React from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxOption,
} from "@reach/combobox";

function Search(props) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 28.184855, lng: () => 83.99963 },
      radius: 200 * 1000,
    },
  });

  return (
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            props.panTo({ lat, lng });
            props.latlngDispatch({
              latdestination: lat,
              lngdestination: lng,
              time: new Date(),
            });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disable={ready ? 1 : 0}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          {status === "OK" &&
            data.map(({ description }) => (
              <ComboboxOption key={description} value={description} />
            ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    centerlat: state.center.centerlat,
    centerlng: state.center.centerlng,
    position: state.position.position,
    close: state.position.close,
    latlng: state.latlng,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    centerDispatch: (data) => dispatch(actions.center(data)),
    positionDispatch: (data) => dispatch(actions.position(data)),
    latlngDispatch: (data) => dispatch(actions.latlng(data)),
    // oninitdata:()=>dispatch(actions.oninitdata()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
