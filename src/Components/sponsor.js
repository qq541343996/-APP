import React, { Component } from 'react';
import {  Picker, List, Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../Style/all.css'
import left from "../Img/左.png";
import {HttpClient, HttpClientget, HttpClientpost,HttpClientput,HttpClientdelete,FetchApi} from '../AxiosUtils';
import {url} from '../url'
class subscribe extends Component {
    constructor(props) {
        super(props);
     
        this.state={
           content:""
        }
    }
    componentDidMount=()=>{
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

        const query = this.props.location.search==""?this.props.location.pathname:this.props.location.search
        const arr = query.split('&') // ['?userId=', 'id=7']
        const userId = arr[1].substr(7)
        const id = arr[2].substr(3)
        this.setState({
            userId:userId,
            id:id,
            isAndroid:isAndroid,
            isIOS:isIOS
        },()=>{
            HttpClientpost(url+"/appBase/myInfo/actHostDetail/"+id,{}).then((e)=>{
                console.log(e)
                this.setState({
                    content:e
                })
            })
        })
    }
    goBack=()=>{
        const {isAndroid}=this.state
        if(isAndroid){
            window.android.jsBack()
        }else{
            window.webkit.messageHandlers.jsBack.postMessage([]);
        }
        // this.props.history.goBack()
    }

    render() {
        const {content} = this.state
        return (
            <div className="app" style={{width:"100%",height:"100%",background:"white"}}>
                 <div  style={{display:"flex",width:"100%",justifyContent:"space-between",alignItems:"center",paddingBottom:"10px",paddingTop:"15px"}}>
                        <img src={left} alt="" style={{width:"20px",height:"20px",marginLeft:"10px",marginTop:"10px"}} onClick={this.goBack}/>
                        <p style={{color:"black",fontSize:"16px"}}>
                            详情
                        </p>
                        <div style={{width:"30px",height:"30px"}}></div>
                </div>
                <img src={content.picture} alt="" style={{width:"100%"}}/>
                <div style={{textIndent:"25px",width:"100%",padding:"10px"}}>
                {content.hostIntro}
                </div>
            </div>
        ) 
    }
   
}

export default subscribe;