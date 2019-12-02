import React, { Component } from 'react';
import left from "../Img/左.png";

import { PullToRefresh, ListView,Button,Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../Style/all.css'
import {HttpClient, HttpClientget, HttpClientpost,HttpClientput,HttpClientdelete,FetchApi} from '../AxiosUtils';
import gou from '../Img/gou.png'
import {url} from '../url'
class List extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            id:this.props.location.state.id,
            show:false,
            type:this.props.location.state.type,
            userId:this.props.location.state.userId,
            clearNumber:1,
            isSubmit:false,
            submitOk:true
        }
    }
    componentWillMount(){
        console.log(this.props.location.state)
        window.scrollTo(0,0)
    }
   componentDidMount(){
       console.log(this.state.id)
   }
    submitComment=()=>{
        
        const comment = document.getElementById("comment").value
        const {type,userId,id} = this.state
        if(comment=="写评论..."||comment==""){
            Toast.info("评论不能为空",1.5,"",false)
            return
        }
        if(comment.length>=200){
            Toast.info("评论不超过200字")
            return
        }
        this.setState({
            submitOk:false
        },()=>{
            HttpClientpost(url+"/appBase/comment",{
                type: type,
                content: comment,
                userId: userId,
                status: "1",
                fkId:id,
            }).then((e)=>{
                console.log(e)
                if(e.rspCode==1){
                    this.setState({
                        show:true,
                        submitOk:true
                    })
                }else{
                    this.setState({
                        submitOk:true
                    })
                    Toast.info("网络繁忙，请稍后再试")
                }
            })
        })
        
    }
    close=()=>{
        const rare =JSON.parse(sessionStorage.getItem("rate"))
        const {userId} = this.state
        if(JSON.parse(sessionStorage.getItem("rate"))){
            this.setState({
                show:false
            },()=>{
                this.props.history.push(`/detail?a&userId=${userId}&id=${rare.id}`)
            })
        }else{
            this.setState({
                show:false
            },()=>{
                this.props.history.goBack()
            })
        } 
    }
    goBack=()=>{
        const rare =JSON.parse(sessionStorage.getItem("rate"))
        const {userId} = this.state
        if(JSON.parse(sessionStorage.getItem("rate"))){
            this.props.history.push(`/detail?a&userId=${userId}&id=${rare.id}`)
        }else{
            console.log(2)
            this.props.history.goBack()
        }
    }
    clear=()=>{
        if(this.state.clearNumber==1){
            document.getElementById("comment").value =""
            this.setState({
                clearNumber:0
            })
        }
    }
    change=()=>{
        console.log(1)
        const value = document.getElementById("comment").value
        if(value.length>0){
            this.setState({
                isSubmit:true
            })
        }else{
            this.setState({
                isSubmit:false
            })
        }
    }
    kong=()=>{

    }
    render() {
        const {isSubmit,submitOk}=this.state
        return (
            <div className="app" style={{width:"100%",height:"100%",background:"white"}}>
                <div  style={{display:"flex",width:"100%",lineHeight:"60px",height:"50px",justifyContent:"space-between",marginBottom:"10px"}}>
                        <img src={left} alt="" style={{width:"20px",height:"20px",marginLeft:"10px",marginTop:"20px"}} onClick={this.goBack}/>
                        <p style={{color:"black",fontSize:"16px"}}>
                            添加评论
                        </p>
                        {
                            isSubmit?<button style={{border:0,height:"30px",marginRight:"10px",marginTop:"15px",background:"#F4B639",color:"white",lineHeight:"30px",textAlign:"center",padding:"0 4px",borderRadius:"2px"}} onClick={submitOk?this.submitComment:this.kong}>发布</button>
                            :<button style={{border:0,height:"30px",marginRight:"10px",marginTop:"15px",background:"gray",color:"white",lineHeight:"30px",textAlign:"center",padding:"0 4px",borderRadius:"2px"}}>发布</button>
                        }
                </div>
                <textarea name="" id="comment"  style={{border:"0",width:"99%",height:"100%",color:"#7D7C7C",textIndent:"2em",marginTop:"15px"}} defaultValue="写评论..." onFocus={this.clear} onChange={this.change}></textarea>
                {
                    this.state.show?
                    <div>
                        <div style={{position:"fixed",top:0,width:"100%",height:"100%",background:"black",opacity:"0.3"}}>
                            </div>
                                <div style={{position:"fixed",top:"30%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <div style={{width:"226px",height:"170px",background:"white",opacity:1,borderRadius:"5px"}}>
                                        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                            <img src={gou} alt="" style={{width:"33px",height:"33px"}}/>
                                        </div>
                                        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                            <p style={{fontSize:"18px",color:"black"}}>发布成功</p>
                                        </div>
                                        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                            <p style={{fontSize:"14px",color:"black"}}>管理员设置，评论由Ta审核后显示</p>
                                        </div>
                                        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"20px"}}>
                                            <button onClick={this.close} style={{background:"#F4B639",color:"white",width:"104px",height:"30px",textAlign:"center",lineHeight:"30px",border:"0",borderRadius:"3px"}}>关闭</button>
                                        </div>
                            </div>
                        </div>
                    </div>:""

                }
                
                
            </div>

        ) 
    }
   
}

export default List;