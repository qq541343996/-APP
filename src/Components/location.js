import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Map,Marker } from 'react-amap';
const MyMapComponent = (props) => {
    // props.__ele__;
    // props.__map__;
    // your code here
  };
class Location extends Component {
    constructor(props) {
        super(props);
        this.state={
            mapZoom: 13,
            mapCenter:[116.397428,  39.90923],
            mapMake :[116.397428,  39.90923],
            address:"故宫博物馆"
        }
    }
  componentDillMount(){
  }
    render() {
        let {mapCenter, mapMake, mapZoom,address} = this.state;
        return (
            <div className="app" style={{width:"100%",height:"100%",background:"#F7F7F7"}}>
              <Map amapkey={"0bfdb143c7cb1a549680d388bd8df599"} version={"1.4.13"} center={mapCenter} zoom={mapZoom}> 
                <Marker position={mapMake} visible={true} icon={"https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png"} title={address}/>
                </Map>     
            </div>

        ) 
    }
   
}

export default Location;