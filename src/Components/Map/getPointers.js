import React from "react";
import { InfoWindow, Marker } from "@react-google-maps/api";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

const GetPointer = (props) => {
  const [selected, setSelected] = React.useState(null);

  var markerorigin = null;
  if (props.markers.lngorigin !== null && !props.currentPosition.got)
    markerorigin = (
      <div>
        {
          <Marker
            key={props.markers.time.toISOString()}
            position={{
              lat: props.markers.latorigin,
              lng: props.markers.lngorigin,
            }}
            onClick={() => {
              props.close = false;
              setSelected({
                latorigin: props.markers.latorigin,
                lngorigin: props.markers.lngorigin,
              });
            }}
          ></Marker>
        }
      </div>
    );
  else if (props.currentPosition.got)
    markerorigin = (
      <div>
        {
          <Marker
            key={props.currentPosition.time.toISOString()}
            position={{
              lat: props.currentPosition.lat,
              lng: props.currentPosition.lng,
            }}
            onClick={() => {
              props.positionDispatch({ close: false });
              setSelected({
                latorigin: props.currentPosition.latitude,
                lngorigin: props.currentPosition.longitude,
              });
            }}
          ></Marker>
        }
      </div>
    );

  var markerdestination = null;
  if (props.markers.lngdestination !== null) {
    markerdestination = (
      <div>
        {
          <Marker
            key={props.markers.time.toISOString()}
            position={{
              lat: props.markers.latdestination,
              lng: props.markers.lngdestination,
            }}
            onClick={() => {
              props.positionDispatch({ close: false });
              setSelected({
                latdestination: props.markers.latdestination,
                lngdestination: props.markers.lngdestination,
              });
            }}
          ></Marker>
        }
      </div>
    );
  }

  var marker = null;

  if (selected !== null && !props.close) {
    if (selected.latdestination) {
      marker = (
        <div>
          {selected ? (
            <InfoWindow
              position={{
                lat: selected.latdestination,
                lng: selected.lngdestination,
              }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>Destination</h2>
                <p>
                  lat:{selected.latdestination} lng:{selected.lngdestination}
                </p>
              </div>
            </InfoWindow>
          ) : null}
        </div>
      );
    } else if (selected.latorigin) {
      marker = (
        <div>
          {selected ? (
            <InfoWindow
              position={{
                lat: selected.latorigin,
                lng: selected.lngorigin,
              }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>Origin</h2>
                <p>
                  lat:{selected.latorigin} lng:{selected.lngorigin}
                </p>
              </div>
            </InfoWindow>
          ) : null}
        </div>
      );
    }
  }

  return (
    <div>
      {markerorigin}
      {markerdestination}
      {marker}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    close: state.position.close,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    positionDispatch: (data) => dispatch(actions.position(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GetPointer);
