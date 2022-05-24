import React, { Component } from "react";
import {
  DirectionsService,
  DirectionsRenderer,
  DistanceMatrixService,
} from "@react-google-maps/api";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class GetDirection extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      this.props.latlng === nextProps.latlng &&
      this.props.latlng.loaded &&
      this.state.response
    ) {
      return false;
    } else return true;
  }
  state = {};
  render() {
    const destination = {
      lat: this.props.latlng.latdestination,
      lng: this.props.latlng.lngdestination,
    };
    const origin = {
      lat: this.props.markers.latorigin,
      lng: this.props.markers.lngorigin,
    }

    const directionsMatrixResponse = (response) => {
      // console.log(response); Important Comment
    };

    const directionsResponse = (response) => {
      if (response !== null) {
        if (response.status === "OK") {
          this.setState({
            response: response,
            lat: this.props.latlng.latdestination,
            lng: this.props.latlng.lngdestination,
          });
          if (
            this.state.lat !== this.props.latlng.latdestination &&
            this.state.lng !== this.props.latlng.lngdestination
          ) {
            this.props.latlngDispatch({
              loaded: false,
              latdestination: this.props.latlng.latdestination,
              lngdestination: this.props.latlng.lngdestination,
              latorigin: this.props.latlng.latorigin,
              lngorigin: this.props.latlng.lngorigin,
              time: this.props.latlng.time,
            });
            this.setState({
              lat: this.props.latlng.latdestination,
              lng: this.props.latlng.lngdestination,
            });
          } else if (!this.state.loaded) {
            this.props.latlngDispatch({
              loaded: true,
              latdestination: this.props.latlng.latdestination,
              lngdestination: this.props.latlng.lngdestination,
              latorigin: this.props.latlng.latorigin,
              lngorigin: this.props.latlng.lngorigin,
              time: this.props.latlng.time,
            });
          }
        }
      }
    };

    const Loaded = () => {
      this.props.latlngDispatch({
        loaded: true,
        latdestination: this.props.latlng.latdestination,
        lngdestination: this.props.latlng.lngdestination,
        latorigin: this.props.latlng.latorigin,
        lngorigin: this.props.latlng.lngorigin,
        time: this.props.latlng.time,
      });
    };

    return (
      <div>
        {destination.lat !== null && origin.lat != null && (
          <div>
            <DirectionsService
              options={{
                destination: destination,
                origin: origin,
                travelMode: "DRIVING",
                provideRouteAlternatives: true,
              }}
              callback={directionsResponse}
            />
            <DistanceMatrixService
              options={{
                destinations: [destination],
                origins: [origin],
                travelMode: "DRIVING",
              }}
              callback={directionsMatrixResponse}
            />
          </div>
        )}
        {destination.lat !== null &&
          //origin.lat != null &&
          this.state.response !== null && (
            <DirectionsRenderer
              options={{
                directions: this.state.response,
                draggable: true,
              }}
              onLoad={Loaded}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    latlng: state.latlng,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    latlngDispatch: (data) => dispatch(actions.latlng(data)),
    // oninitdata:()=>dispatch(actions.oninitdata()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetDirection);
