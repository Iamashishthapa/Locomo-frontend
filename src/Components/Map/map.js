import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import MapStyle from "./mapStyle";
import Backbtn from "../../assets/images/back.svg";
import "./map.css";
import GetCurrentLocation from "./getCurrentlocation";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

import "@reach/combobox/styles.css";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const options = {
  styles: MapStyle,
  disableDefaultUI: true,
};

const libraries = ["places"];

class Map extends Component {
  state = {
    mapRef: null,
  };
  style = { width: "140px", marginLeft: `${window.innerWidth - 140}px` };
  style1 = { width: "140px", marginLeft: `${window.innerWidth - 240}px` };
  render() {
    const panTo = ({ lat, lng }) => {
      this.state.mapRef.panTo({ lat, lng });
      this.state.mapRef.setZoom(14);
    };
    var markers = {
      latdestination: this.props.latlng.latdestination,
      lngdestination: this.props.latlng.lngdestination,
      latorigin: this.props.latlng.latorigin,
      lngorigin: this.props.latlng.lngorigin,
      time: this.props.latlng.time,
    };
    var which = {
      position: this.props.position,
      close: this.props.close,
    };
    const api = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    // const onDirectionOrigin = () => {
    //   this.setState({ position: "origin", close: true });
    // };

    const centerChanged = () => {
      if (this.state.mapRef) {
        this.props.centerDispatch(this.state.mapRef.getCenter().toJSON());
      }
    };
    const whichOnMouseEnter = () => {
      this.props.positionDispatch({ close: true });
    };

    const onDirectionDestination = () => {
      this.props.positionDispatch({ position: "destination", close: true });
    };
    // const willwork=()=> {
    //   this.props.firstlogaction();
    // }
    var onMapClick = null;
    if (this.props.position === "origin") {
      onMapClick = (event) => {
        this.props.latlngDispatch({
          latdestination: this.props.latlng.latdestination,
          lngdestination: this.props.latlng.lngdestination,
          latorigin: event.latLng.lat(),
          lngorigin: event.latLng.lng(),
          time: new Date(),
        });
        this.props.positionDispatch({ position: null, close: true });
      };
    }

    if (this.props.position === "destination") {
      onMapClick = (event) => {
        this.props.latlngDispatch({
          lngorigin: this.props.latlng.lngorigin,
          latorigin: this.props.latlng.latorigin,
          latdestination: event.latLng.lat(),
          lngdestination: event.latLng.lng(),
          time: new Date(),
          loaded:false,
        });
        this.props.positionDispatch({ position: null, close: true });
      };
    }

    if (this.props.position === null) {
      onMapClick = () => {
        this.props.positionDispatch({ close: true });
      };
    }
    return (
      <div className="map">
        <NavLink to="/" className="backBtn">
          <img className="backBtnImage" src={Backbtn} alt="backbtn" />
        </NavLink>

        {/* <button onMouseEnter={whichOnMouseEnter} onClick={onDirectionOrigin}>
          Origin
        </button> */}
        <button
          onMouseEnter={whichOnMouseEnter}
          // style={this.style}
          onClick={onDirectionDestination}
        >
          Destination
        </button>

        <LoadScript googleMapsApiKey={api} libraries={libraries}>
            <GoogleMap
              onLoad={(map) => {
                this.setState({ mapRef: map });
              }}
              mapContainerStyle={containerStyle}
              center={{ lat: this.props.centerlat, lng: this.props.centerlng }}
              zoom={12}
              options={options}
              onClick={onMapClick}
              onCenterChanged={centerChanged}
            >
              <GetCurrentLocation
                markers={markers}
                which={which}
                panTo={panTo}
              />
            </GoogleMap>
        </LoadScript>
      </div>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Map);
