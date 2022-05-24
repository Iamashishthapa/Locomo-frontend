import React, { Component } from "react";
import GetPointer from "./getPointers";
import GetDirection from './mapDirection';
import Search from "./mapSearch";
import myLocation from '../../assets/images/MyLocation.png';
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {got:false};
  }
  render() {
    var setThisState = (latitude, longitude) => {
      this.setState({ lat: latitude, lng: longitude,time: new Date(),got:true });
      this.props.panTo({ lat: latitude, lng: longitude})
    };

    var onClick = () => {
      navigator.geolocation.getCurrentPosition(
        function success(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setThisState(latitude, longitude);
        },
        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        },
        options
      );
    };

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    var marker=this.props.markers;
    if(this.state.got){
        marker.latorigin=this.state.lat;
        marker.lngorigin=this.state.lng;
    }
    return (
      <div>
        
        <img src={myLocation} className="myLocationLogo" onClick={onClick} alt="Get Location"/>
      
        <GetPointer markers={this.props.markers} which={this.props.which} currentPosition={this.state}/>
        <GetDirection markers={marker}/>
        <Search panTo={this.props.panTo} />
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
