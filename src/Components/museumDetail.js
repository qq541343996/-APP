import React, { Component } from 'react';
import {Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../Style/museumDetail.css'
import {HttpClient, HttpClientget, HttpClientpost,HttpClientput,HttpClientdelete,FetchApi} from '../AxiosUtils';
import BaiduMap from '../map.js'
import left from "../Img/左.png";
import refresh from '../Img/refresh.png'
import jiahao from '../Img/加号.png'
import dingwei from '../Img/dingwei2.png'


import Micon1 from '../Img/Micon1.png'
import Micon2 from '../Img/Micon2.png'
import Micon3 from '../Img/Micon3.png'
import Micon4 from '../Img/Micon4.png'
import Micon5 from '../Img/Micon5.png'
import Micon6 from '../Img/Micon6.png'
import Micon7 from '../Img/Micon7.png'
import Micon8 from '../Img/Micon8.png'

import Noicon1 from '../Img/Noicon1.png'
import Noicon2 from '../Img/Noicon2.png'
import Noicon3 from '../Img/Noicon3.png'
import Noicon4 from '../Img/Noicon4.png'
import Noicon5 from '../Img/Noicon5.png'
import Noicon6 from '../Img/Noicon6.png'
import Noicon7 from '../Img/Noicon7.png'
import Noicon8 from '../Img/Noicon8.png'

import {url} from '../url'
window.getLoginUserId = function(userId) {
    if(window.callback != undefined) {
        window.callback.getLoginUserId(userId);
    }
}

window.setCallback = function(callback) {
    window.callback = callback;
}
class MuseumDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
           detail:"",
           isAttention:false,
           museumCollType:[],
           museumCollList:[],
           detailShow1:"detailShow",
           detailBorderShow1:"detailBorderShow",
           msgList:[],
           num:1,
        }
    }
    getDetail=()=>{
        const sessinUserId = JSON.parse(sessionStorage.getItem("userId"))

        const query = this.props.location.search==""?this.props.location.pathname:this.props.location.search
        const arr = query.split('&') // ['?userId=', 'id=7']
        const userId = arr[1].substr(7)
        const id = arr[2].substr(3)
        const down = arr[3]

        this.setState({
            id:id,
            userId:sessinUserId?sessinUserId:userId,
            showDown:down!="down"?false:true

        },()=>{
            const {userId,id}=this.state 
            this.getAllIcon(id)
            //    this.icon1(id)
            //    this.icon2(id)
            //    this.icon3(id)
            //    this.icon4(id)
            //    this.icon5(id)
            //    this.icon6(id)
            //    this.icon8(id)

                HttpClientpost(url+"/appBase/user/getUserAttention",{
                    userId:userId,
                    museumId:id,
                    attType:"1"

                }).then((e)=>{
                    if(e==1){
                        this.setState({
                            isAttention:true
                        })
                    }
                })
            
        })
        
    }
    componentWillMount(){
        window.setCallback(this);

        this.getDetail()
        document.body.style.backgroundColor = "#F7F7F7"
    }
    goLocation=()=>{
        if(this.state.showDown){
            Toast.info("请下载APP",1.5,"",false)
            return
        }
        const museumId = this.state.id
        window.android.jsStartMap(3,museumId)
    }
    //获取图标下是否有数据
    getAllIcon=(id)=>{
        HttpClientpost(`http://47.98.101.202:40080/appShow/museum/iconDataCount/${id}`,{}).then((e)=>{
            console.log(e[3]>2)
            this.setState({
                showIcon1:e[1]>0?true:false,
                showIcon2:e[2]>0?true:false,
                showIcon3:e[3]!=0?true:false,
                showIcon4:e[4]!=0?true:false,
                showIcon5:e[5]!=0?true:false,
                showIcon6:e[6]>0?true:false,
                showIcon8:e[8]>0?true:false,
                icon3Url:e[3],
                icon4Url:e[4],
                icon5Url:e[5],
                icon6Url:e[6],


            })
        })
    }
    
    icon7=(name)=>{
        HttpClientpost("http://47.98.101.202:40080/appBase/common/columnSearchList",{
           keyword:name,
           searchType:1
        }).then((e)=>{
            this.setState({
                showIcon7:e.list==null?false:true
            })
        })
    }
   
    //点击8个图标区
    btnIcon=(type)=>{
        const museumId = this.state.id
        const {detail,icon3Url,icon5Url,icon4Url,icon6Url}=this.state
        console.log(detail.name)
        // window.location.href=""
        if(type==1){
            if(this.state.showIcon1){
                window.android.jsSpeakYou(museumId)
            }
        }
        if(type==2){
            if(this.state.showIcon2){
                window.android.lookToMuseumCollection("2",museumId)
            }
        }
        if(type==3){
            if(this.state.showIcon3){
                if(icon3Url>1){
                    window.android.jsStartPanoramicNavigation5G(museumId)
                }else{
                    window.location.href=icon3Url
                }
            }
        }
        if(type==4){
            if(this.state.showIcon4){
                window.location.href=icon4Url
            }
        }
        if(type==5){
            if(this.state.showIcon5){
                window.location.href=icon5Url
            }
        }
        if(type==6){
            if(this.state.showIcon6){
                window.location.href=icon6Url
            }
        }
        if(type==7){
            if(this.state.showIcon7){
                window.android.lookToExhibitopnList(detail.name)
            }
        }
        if(type==8){
            if(this.state.showIcon8){
                window.android.jsStartMuseumVideo5G(museumId)
            }
        }
        
    }
    getLoginUserId=(userId)=>{
        this.setState({
            userId:userId
        },()=>{
            sessionStorage.setItem("userId",this.state.userId)
        })
    }
    componentDidMount(){
        const {id,userId}= this.state
        const wu = `<p><span style="font-size:14px"><span style="line-height:1.75"><span style="letter-spacing:1px">无</span></span></span></p>`
        const wu1 =`<p></p>`

            HttpClientget(url+"/appShow/museum/"+id,{}).then((e)=>{
                console.log(e)
                if(e!=null){
                    this.setState({
                        detail:e
                    },()=>{
                        this.icon7(this.state.detail.name)

                        this.museumCollList()

                        document.getElementById("travelGuide").innerHTML = this.state.detail.travelGuide==wu||this.state.detail.travelGuide==wu1||this.state.detail.travelGuide==null?null:this.state.detail.travelGuide
                        document.getElementById("openTime").innerHTML = this.state.detail.openTime

                        document.getElementById("visitExplain").innerHTML = this.state.detail.visitExplain==wu||this.state.detail.visitExplain==wu1||this.state.detail.visitExplain==null?null:this.state.detail.visitExplain

                        document.getElementById("guideService").innerHTML = this.state.detail.guideService==wu||this.state.detail.guideService==wu1||this.state.detail.guideService==null?null:this.state.detail.guideService

                        document.getElementById("explainService").innerHTML = this.state.detail.explainService==wu||this.state.detail.explainService==wu1||this.state.detail.explainService==null?null:this.state.detail.explainService

                        document.getElementById("museumIntro").innerHTML = this.state.detail.museumIntro==wu||this.state.detail.museumIntro==wu1||this.state.detail.museumIntro==null?null:this.state.detail.museumIntro
                    
                        const _that =this
                        const name = this.state.detail.name==undefined?this.state.detail.museumName:this.state.detail.name
                        console.log(name)
                        BaiduMap.init()
                        .then((BMap) => {
                            // 百度地图API功能
                            var map = new BMap.Map("allmap");        
                            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
                            var options = {
                                onSearchComplete: function(results){
                                    // 判断状态是否正确
                                    console.log(results)
                                    if(results){
                                        if(results.Sq){
                                            _that.setState({
                                                address:results.Sq[0].address
                                            })
                                        }
                                    }
                                    
                                }
                            };
                            var local = new BMap.LocalSearch(map, options);
                            local.search(name);

                    })
                       
                    })
                }
            })
    }
    goList(id){
        this.props.history.push(`/list?`)
        
    }
    goBack=()=>{
        // this.props.history.goBack()
        window.android.jsBack()

    }

     //关注
     attention=()=>{
        const {userId} = this.state
        const museumId = this.state.id
        if(this.state.showDown){
            Toast.info("请下载APP",1.5,"",false)
            return
        }
        if(userId==""){
            Toast.info("请先登陆",1.5,"",false)
            window.android.jsStartLoginActivity()

            return
        }
        
          if(this.state.isAttention){
            HttpClientpost(url+'/appBase/user/deleteUserAttention',{
                userId:userId,
                museumId:museumId,
                attType:"1"

            }).then((e)=>{
                console.log(e)
                if(e.rspCode==1){
                    this.setState({
                        isAttention:false
                    })
                    Toast.fail("取消关注",1.5,"",false)
                }else{
                    Toast.fail("取消失败，请稍后再试",1.5,"",false)
                }
              })
          }else{
            HttpClientpost(url+'/appBase/user/saveUserAttention',{
                userId:userId,
                museumId:museumId,
                attType:"1"

                }).then((e)=>{
                console.log(e)
                if(e.rspCode==1){
                    this.setState({
                        isAttention:true
                    })
                    Toast.success("关注成功",1.5,"",false)
                }else{
                    Toast.fail("关注失败，请稍后再试",1.5,"",false)
                }
            })
          }
    }
    //博物馆收藏
    museumCollList=()=>{

        HttpClientpost(url+"/appShow/showMsg/longTermShowMsgList",{
            museumName:this.state.detail.name,
            showMsgId:this.state.detail.id,
            pageIndex:this.state.num,
            pageSize:2

        }).then((e)=>{
            console.log("陈列",e)
            if(e.rspCode==1){
                this.setState({
                    msgList:e.list==null?[]:e.list
                })
            }
            HttpClientget(url+"/appShow/museum/musCollTypes/77",{}).then((e)=>{
                console.log(e)
                this.setState({
                    museumCollType:e
                },()=>{
                    HttpClientpost(url+"/appShow/museum/museumCollList",{
                        type:this.state.museumCollType[0]
                    }).then((e)=>{
                        console.log(e)
                        this.setState({
                            museumCollList:e.list
                        },()=>{
                            const bottom = sessionStorage.getItem("bottom")
                            console.log(bottom)
                            if(bottom){
                                window.scrollTo(0,100000000000)
                                sessionStorage.removeItem("bottom")
                            }
                        })
                    })
                })
            })

        })
       
    }
    //馆藏选择
    selectColl=(id,num,type)=>{
        for(var i=0; i<num;i++){
            document.getElementById(id).parentNode.children[i].className=""
            document.getElementById(i+"border").className=""
        }

        document.getElementById(id).className="detailShow"
        document.getElementById(id+"border").className="detailBorderShow"
        HttpClientpost(url+"/appShow/museum/museumCollList",{
            type:type
        }).then((e)=>{
            console.log(e)
            this.setState({
                museumCollList:e.list
            },()=>{
                
            })
        })
    }
    //基本陈列
    goDetail(item){
        const {userId} = this.state
        this.props.history.push(`/detail?a&userId=${userId}&id=${item.id}`)
    }
    goCollDetadil=(item)=>{
        sessionStorage.setItem("bottom","true")

        this.props.history.push({pathname:'/collDetail',state:item})
    }
    //换一换
    huanyihuan=(name,id)=>{
        // const city = sessionStorage.getItem("city").value
        this.setState({
            num:this.state.num+1
        },()=>{
            HttpClientpost(url+"/appShow/showMsg/longTermShowMsgList",{
                museumName:name,
                showMsgId:id,
                pageIndex:this.state.num,
                pageSize:2
                }).then((e)=>{
                    console.log("推荐",e)
                    if(e.list==""||e.list==null){
                        Toast.info("暂无更多")
                        return
                    }
                    if(e.rspCode==1){
                        this.setState({
                            msgList:e.list==null?[]:e.list
                        })
                    }
                    
                })
        })
    

    }
    subscribe=()=>{
        const {detail,userId} =this.state
        if(userId==""){
            Toast.info("请先登录",1.5,"",false)
            window.android.jsStartLoginActivity()

            return
        }
        window.android.jsStartWebViewActivity2Subscribe(1,detail.id,detail.bookUrl)
        // document.body.style.overflow = "hidden"
        // this.setState({
        //     show:true
        // })
    }
    render() {
        const wu = `<p><span style="font-size:14px"><span style="line-height:1.75"><span style="letter-spacing:1px">无</span></span></span></p>`
        const wu1 =`<p></p>`

        const {detail} = this.state
        return (
            <div className="museumDetadil" id="museumDetadil" style={{width:"100%",background:"#F7F7F7",paddingBottom:detail.bookUrl==null?"0":"40px"}}>
                <div  style={{display:"flex",width:"100%",justifyContent:"space-between",background:"white",height:"50px",lineHeight:"40px"}}>
                        <img src={left} alt="" style={{width:"20px",height:"20px",marginLeft:"10px",marginTop:"20px"}} onClick={this.goBack}/>
                        <p style={{color:"black",fontSize:"16px"}}>
                            详情
                        </p>
                        <div style={{width:"30px",height:"30px"}}></div>
                </div>
                <div className="banner">
                    <img src={detail.museumImg} alt="" style={{height:"188px",width:"100%"}}/>
                </div>
               <div className="museum" style={{position:"relative",top:-20,background:"white",padding:"10px 0",borderRadius:"10px",margin:"0 10px"}}>
                   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginLeft:"15px"}}>
                        <div style={{fontSize:"16px",marginBottom:"10px"}}>{detail.name}</div>
                        <button className={this.state.isAttention?"btn1":"btn"} style={{marginRight:"15px"}} onClick={this.attention}>{this.state.isAttention?"":<img src={jiahao} alt="" style={{width:"13px",marginRight:"3px",marginBottom:"2px"}}/>} {this.state.isAttention?"已关注":"关注"}</button>
                   </div>
                   <div onClick={this.goLocation} style={{fontSize:"12px",color:"#8A8888"}}> <img src={dingwei} alt="" style={{width:"10px",height:"10px",marginRight:"5px",marginLeft:"15px"}}/> {this.state.address}</div>
                    <div>
                        <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",marginTop:"10px"}}>
                            <div onClick={this.btnIcon.bind(this,1)} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"25%"}}>
                                {this.state.showIcon1?
                                    <img src={Micon1} alt="" style={{width:"50px",height:"50px",display:"block"}}/>:
                                    <img src={Noicon1} alt="" style={{width:"50px",height:"50px",display:"block"}}/>}
                                    <div style={{fontSize:"12px"}}>为您讲</div>
                            </div>
                            <div onClick={this.btnIcon.bind(this,2)} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"25%"}}>
                                {
                                    this.state.showIcon2?
                                    <img src={Micon2} alt="" style={{width:"50px",height:"50px",display:"block"}}/>:
                                    <img src={Noicon2} alt="" style={{width:"50px",height:"50px",display:"block"}}/>
                                }  

                                <div style={{fontSize:"12px"}}>5G精品馆藏</div>
                            </div>
                            <div onClick={this.btnIcon.bind(this,3)} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"25%"}}>
                                {
                                 this.state.showIcon3?
                                 <img src={Micon3} alt="" style={{width:"50px",height:"50px",display:"block"}}/>:
                                 <img src={Noicon3} alt="" style={{width:"50px",height:"50px",display:"block"}}/>
                                 }
                               
                                <div style={{fontSize:"12px"}}>5G全景导览</div>
                            </div>
                            <div onClick={this.btnIcon.bind(this,4)} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"25%"}}>
                                {
                                    this.state.showIcon4?
                                    <img src={Micon4} alt="" style={{width:"50px",height:"50px",display:"block"}}/>:
                                    <img src={Noicon4} alt="" style={{width:"50px",height:"50px",display:"block"}}/>
    
                                }
                                <div style={{fontSize:"12px"}}>5G全景航拍</div>
                            </div>

                            <div onClick={this.btnIcon.bind(this,5)} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"25%"}}>
                                {
                                   this.state.showIcon5?
                                   <img src={Micon5} alt="" style={{width:"50px",height:"50px",display:"block"}}/>:
                                   <img src={Noicon5} alt="" style={{width:"50px",height:"50px",display:"block"}}/>
                                }

                                <div style={{fontSize:"12px"}}>AI智慧导览</div>
                            </div>
                            <div onClick={this.btnIcon.bind(this,6)} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"25%"}}>
                                {
                                    this.state.showIcon6?
                                    <img src={Micon6} alt="" style={{width:"50px",height:"50px",display:"block"}}/>:
                                    <img src={Noicon6} alt="" style={{width:"50px",height:"50px",display:"block"}}/>
                                }
                                <div style={{fontSize:"12px"}}>编码讲解</div>
                            </div>
                            <div onClick={this.btnIcon.bind(this,7)} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"25%"}}>
                                {
                                    this.state.showIcon7?
                                    <img src={Micon7} alt="" style={{width:"50px",height:"50px",display:"block"}}/>:
                                    <img src={Noicon7} alt="" style={{width:"50px",height:"50px",display:"block"}}/>
    
                                }

                                <div style={{fontSize:"12px"}}>展览</div>
                            </div>
                            <div onClick={this.btnIcon.bind(this,8)} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"25%"}}>
                                {
                                    this.state.showIcon8?
                                    <img src={Micon8} alt="" style={{width:"50px",height:"50px",display:"block"}}/>:
                                    <img src={Noicon8} alt="" style={{width:"50px",height:"50px",display:"block"}}/>
                                }
                                <div style={{fontSize:"12px"}}>5G超高清视频</div>
                            </div>
                        </div>

                        

                    </div>
               </div>

               <div style={{position:"relative",top:-20,display:"flex",justifyContent:"space-around",alignItems:"center",background:"white",borderRadius:"10px",margin:"10px 10px 0 10px"}}>
                    <div>
                        {
                            this.state.detail.openTime==null?"":
                                <div style={{width:"100%",height:"42px",lineHeight:"42px",fontSize:"16px",borderBottom:"1px solid #F7F7F7"}}>
                                <span style={{marginLeft:"15px",color:"black"}}>开放时间</span>
                                </div>
                                
                        }
                        <div style={{width:"100%"}}>
                                <div style={{fontSize:"14px",padding:this.state.detail.openTime==null?0:"15px",wordWrap:"break-word",lineHeight:"22px",letterSpacing:"2px"}} id="openTime"></div>
                        </div>
                        {this.state.detail.travelGuide==wu||this.state.detail.travelGuide==wu1||this.state.detail.travelGuide==null?"":<div style={{background:"white",width:"100%",height:"42px",lineHeight:"42px",fontSize:"16px",borderBottom:"1px solid #F7F7F7"}}>
                            <span style={{marginLeft:"15px",color:"black"}}>交通指南</span>
                        </div>}

                        <div style={{width:"100%"}}>
                            <div style={{fontSize:"12px",padding:"15px",wordWrap:"break-word"}} id="travelGuide"></div>
                        </div>

                        {
                            this.state.detail.museumIntro==wu||this.state.detail.museumIntro==wu1||this.state.detail.museumIntro==null?"":
                            <div style={{width:"100%",height:"42px",lineHeight:"42px",fontSize:"16px",borderBottom:"1px solid #F7F7F7"}}>
                                <span style={{marginLeft:"15px",color:"black"}}>博物馆介绍</span>
                            </div>
                        }


                        <div style={{width:"100%"}}>
                            <div style={{fontSize:"12px",padding:"15px",wordWrap:"break-word"}} id="museumIntro"></div>
                        </div>

                        {
                            this.state.detail.visitExplain==wu||this.state.detail.visitExplain==wu1||this.state.detail.visitExplain==null?"":
                            <div style={{width:"100%",height:"42px",lineHeight:"42px",fontSize:"16px",borderBottom:"1px solid #F7F7F7"}}>
                                <span style={{marginLeft:"15px",color:"black"}}>参观须知</span>
                            </div>
                        }

                        <div style={{width:"100%"}}>
                            <div style={{fontSize:"12px",padding:"15px",wordWrap:"break-word"}} id="visitExplain"></div>
                        </div>

                        {
                            this.state.detail.guideService==wu||this.state.detail.guideService==wu1||this.state.detail.guideService==null?"":
                            <div style={{width:"100%",height:"42px",lineHeight:"42px",fontSize:"16px",borderBottom:"1px solid #F7F7F7"}}>
                                <span style={{marginLeft:"15px",color:"black"}}>导览服务</span>
                            </div>
                        }

                        <div style={{width:"100%"}}>
                            <div style={{fontSize:"12px",padding:"15px",wordWrap:"break-word"}} id="guideService"></div>
                        </div>

                        {
                            this.state.detail.explainService==wu||this.state.detail.explainService==wu1||this.state.detail.explainService==null?"":
                                <div style={{width:"100%",height:"42px",lineHeight:"42px",fontSize:"16px",borderBottom:"1px solid #F7F7F7"}}>
                                    <span style={{marginLeft:"15px",color:"black"}}>讲解服务</span>
                                </div>
                        }
                        <div style={{width:"100%"}}>
                            <div style={{fontSize:"12px",padding:"15px",wordWrap:"break-word"}} id="explainService"></div>
                        </div>
                   </div>
               </div>
               {/* 基本陈列 */}
               {this.state.msgList!=""?
                <div style={{position:"relative",top:-10,background:"white",margin:"0 10px",borderRadius:"10px",padding:"10px"}}>
                    <div style={{width:"100%",background:"white",display:"flex",justifyContent:"space-between",paddingTop:"5px",borderRadius:"10px"}}>
                        <div style={{color:"black"}}>基本陈列</div>
                        <img src={refresh} alt="" onClick={this.huanyihuan.bind(this,detail.name,detail.id)} style={{width:"25px",height:"25px",cursor:"pointer"}}/>
                    </div>
                    {
                        this.state.msgList.map((item,index)=>{
                            return <div key={index} style={{display:"flex",width:"100%",marginTop:"10px"}} onClick={this.goDetail.bind(this,item)} >
                                    <img src={item.picture} alt="" style={{width:"120px",height:"70px"}}/>
                                    <div style={{marginLeft:"10px"}}>
                                        <div style={{color:"black"}}>{item.title}</div>
                                        <div style={{fontSize:"12px"}}>{item.museumName}</div>
                                    </div>
                                </div> 
                        })
                    }
                                       
                </div>:""}
                
               {/* 馆藏精品 */}
                {/* <div style={{position:"relative",top:-10,background:"white",margin:"0 10px",borderRadius:"10px",padding:"10px",marginTop:"10px"}}>
                   <div style={{color:"black",fontSize:"16px"}}>
                       馆藏精品
                   </div>
                   <div style={{display:"flex",borderBottom:"1px solid rgba(209,209,209,1)",justifyContent:"space-between",margin:"10px 0"}}>
                        {this.state.museumCollType.map((item,index)=>{
                           return <div id={index} key={index+"coll"} className={index==0?this.state.detailShow1:""} style={{marginLeft:"5px"}} onClick={this.selectColl.bind(this,index,this.state.museumCollType.length,item)}>
                                        <div className="">{item}</div>
                                        <div id={index+"border"} className={index==0?this.state.detailBorderShow1:""} ></div>
                                    </div>
                        })}
                        
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div className="left">
                            {
                                this.state.museumCollList.map((item,index)=>{
                                    if(index%2==0){
                                        return <div key={index+"left"} onClick={this.goCollDetadil.bind(this,item)}>
                                        <img src={item.picture} alt="" style={{width:"150px",height:"94px"}}/>
                                        <p style={{color:"black",width:"150px"}}>{item.name}</p>
                                        </div>
                                    }
                                    
                                })
                            }
                        </div>
                        <div className="right">
                            {
                                this.state.museumCollList.map((item,index)=>{
                                    if(index%2!=0){
                                        return <div key={index+"right"} onClick={this.goCollDetadil.bind(this,item)}>
                                        <img src={item.picture} alt="" style={{width:"150px",height:"94px"}}/>
                                        <p style={{color:"black",width:"150px"}}>{item.name}</p>
                                        </div>
                                    }
                                })
                            }
                        </div>

                    </div>
               </div> */}
               {
                    detail.bookUrl==null?"":
                    <button className="subscribe" onClick={this.subscribe} style={{position:"fixed",bottom:"0"}}>
                        立即预约
                    </button>
                }
               <div id="allmap"></div>

               

                {/* <button className="subscribe">立即预约</button> */}
            </div>

        ) 
    }
   
}

export default MuseumDetail;