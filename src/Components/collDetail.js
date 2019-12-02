import React, { Component } from 'react';
import {Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../Style/museumDetail.css'
import {HttpClient, HttpClientget, HttpClientpost,HttpClientput,HttpClientdelete,FetchApi} from '../AxiosUtils';
import left from "../Img/左.png";

class MuseumDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
           detail:this.props.location.state,
        
        }
    }
    componentWillMount(){
        document.body.style.backgroundColor = "#F7F7F7"
        window.scrollTo(0,0)  
 
        
    }
    
    componentDidMount(){
        
       
    }
    goBack=()=>{
        this.props.history.goBack()
    }
    render() {
        const {detail} = this.state
        return (
            <div className="museumDetadil" id="museumDetadil" style={{width:"100%",height:"100%",background:"#F7F7F7"}}>
                <div  style={{display:"flex",width:"100%",justifyContent:"space-between"}}>
                        <img src={left} alt="" style={{width:"20px",height:"20px",marginLeft:"10px",marginTop:"10px"}} onClick={this.goBack}/>
                        <p style={{color:"black",fontSize:"16px"}}>
                            详情
                        </p>
                        <div style={{width:"30px",height:"30px"}}></div>
                </div>
                <img src={detail.picture} alt="" style={{width:"100%"}}/>
                <div style={{position:"relative",top:-20,background:"white",margin:"0 10px",borderRadius: "10px",padding:"5px",paddingBottom: "20px",}}>
                   <div style={{color:"black",margin:"10px 0"}}>{detail.name}</div>
                   <div>{detail.year}</div>
                   <div>{detail.description}</div>
                </div>
                <div style={{position:"relative",top:-20,background:"white",margin:"10px",borderRadius: "10px",padding: "5px",paddingBottom: "150px",}}>
                   <p style={{color:"black"}}>简介</p>
                   {detail.intro}
                </div>
            </div>

        ) 
    }
   
}

export default MuseumDetail;