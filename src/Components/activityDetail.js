import React, { Component } from 'react';
import { Carousel, WingBlank,Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {HttpClient, HttpClientget, HttpClientpost,HttpClientput,HttpClientdelete,FetchApi} from '../AxiosUtils';
import '../Style/all.css'
import liulan from '../Img/liulan.png'
import shoucang from '../Img/shoucang.png'
import shoucang2 from '../Img/shoucang2.png'
import fenxiang from '../Img/fenxiang.png'
import dizhi from '../Img/dingwei2.png'
import headImg from '../Img/unie64d.png'
import refresh from '../Img/refresh.png'
import tanhao from '../Img/tanhao.png'
import zhuye from '../Img/zhuye.png'
import left from '../Img/左.png'
import logo from '../Img/logo.png'
import jiahao from '../Img/加号.png'
import {url} from '../url'

window.getLoginUserId = function(userId) {
    if(window.callback != undefined) {
        window.callback.getLoginUserId(userId);
    }
}

window.jsRefresh = function(userId) {
    if(window.callback != undefined) {
        window.callback.jsRefresh(userId);
    }
}
window.setCallback = function(callback) {
    window.callback = callback;
}
class activityDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
            list:[],
            content:"",
            isAttention:false,
            isCollect:false,
            detailShow1:"detailShow",
            detailShow2:"nodetailShow",
            detailShow3:"nodetailShow",

            detailBorderShow1:"detailBorderShow",
            detailBorderShow2:"",
            detailBorderShow3:"",

            detailIntoShow1:true,
            detailIntoShow2:false,
            detailIntoShow3:false,
            into3:[],
            into2:null,
            showOpenVip:false,
            isVip:false,
            collectCount:"",
            shareCount:"",
            startTime:"",
            endTime:"",
            num:1,
            click:true,
            versions:""
        }
    }

    componentWillMount(){
        window.setCallback(this);
        document.body.style.backgroundColor = "#F7F7F7"
        window.scrollTo(0,0);
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

        const sessinUserId = JSON.parse(sessionStorage.getItem("userId"))
        const sessinVip = sessionStorage.getItem("isVip")

        const query = this.props.location.search==""?this.props.location.pathname:this.props.location.search
        const arr = query.split('&') // ['?userId=', 'id=7']
        const userId = arr[1].substr(7)
        const id = arr[2].substr(3)
        const down = arr[3]
        this.setState({
            userId:sessinUserId?sessinUserId:userId,
            id:id,
            showDown:down!="down"?false:true,
            isVip:sessinVip?sessinVip:false,
            isAndroid:isAndroid,
            isIOS:isIOS
        },()=>{
            HttpClientpost(url+"/appAct/act/act/"+id,{
            }).then((e)=>{
                console.log(e)
                this.setState({
                    content:e,
                    collectCount:e.collectCount,
                    shareCount:e.shareCount,
                    startTime:e.startTime,
                    endTime:e.endTime==null?"":e.endTime,

                },()=>{
                    document.getElementById("showIntro").innerHTML = this.state.content.actIntro?this.state.content.actIntro:"暂无内容"
                    this.getUserInfo()
                })         
            }).catch((err)=>{
                Toast.info("服务器繁忙，请稍后再试")
            })
            HttpClientpost(url+"/appBase/myInfo/myVipEquity/"+userId,{}).then((e)=>{
                console.log(e)
                if(e.vipType!=0){
                    this.setState({
                        isVip:true,
                    },()=>{
                    })
                }else{
                    this.setState({
                        isVip:false,
                    })
                }
            })
        })
       
        
    }
    getLoginUserId=(userId)=>{
        this.setState({
            userId:userId,
        },()=>{
    sessionStorage.setItem("userId",this.state.userId)
    const {userId} =this.state
    const hostId = this.state.content.hostId
    const msgId = this.state.content.id
    HttpClientpost(url+"/appBase/myInfo/myVipEquity/"+userId,{}).then((e)=>{
        console.log(e)
        if(e.vipType!=0){
            this.setState({
                isVip:true,
            },()=>{
                sessionStorage.setItem("isVip",this.state.isVip)
            })
        }else{
            this.setState({
                isVip:false,
            },()=>{
                sessionStorage.setItem("isVip",this.state.isVip)
            })
        }
    })
    
    //是否关注收藏
 
        HttpClientpost(url+"/appBase/user/getUserAttention",{
            userId:userId,
            museumId:hostId,
            attType:"2"

        }).then((e)=>{
            console.log("isAttention",e)
            if(e==1){
                this.setState({
                    isAttention:true
                })
            }
        })

        HttpClientpost(url+"/appBase/user/getUserCollection",{
            userId:userId,
            msgId:msgId,
            colType:"2"

        }).then((e)=>{
            console.log("isCollect",e)
            if(e==1){
                this.setState({
                    isCollect:true
                })
            }
        })
    
        })
    }
   getUserInfo=()=>{
    const {userId} =this.state
    const hostId = this.state.content.hostId
    const msgId = this.state.content.id
    
    //浏览次数
    HttpClientget(url+"/appAct/act/updateActViewCount/"+msgId,{
        
    }).then((e)=>{
        console.log(e)
    })
    //是否关注收藏
 
        HttpClientpost(url+"/appBase/user/getUserAttention",{
            userId:userId,
            museumId:hostId,
            attType:"2"

        }).then((e)=>{
            console.log("isAttention",e)
            if(e==1){
                this.setState({
                    isAttention:true
                })
            }
        })

        HttpClientpost(url+"/appBase/user/getUserCollection",{
            userId:userId,
            msgId:msgId,
            colType:"2"

        }).then((e)=>{
            console.log("isCollect",e)
            if(e==1){
                this.setState({
                    isCollect:true
                })
            }
        })

        HttpClientpost(url+"/appAct/act/recomActList",{
            "actId":this.state.content.id,
            "hostId":this.state.content.hostId,
            "pageIndex":this.state.num,
            "pageSize":2

                    }).then((e)=>{
                        console.log("0",e)
                        if(e.list!=null){
                            this.setState({
                                list:e.list
                            })
                        }else{
                            HttpClientpost(url+"/appAct/act/recomActList",{
                                "actId":this.state.content.id,
                                "hostId":this.state.content.hostId,
                                "pageIndex":this.state.num,
                                "pageSize":2

                                }).then((e)=>{
                                    console.log("推荐",e)
                                    if(e.rspCode==1){
                                        this.setState({
                                            list:e.list==null?[]:e.list
                                        })
                                    }
                                })
                            console.log("2",e)
                        }
                    })
    
   }
    componentDidMount() {
        HttpClientpost(url+"/appBase/common/getAppVersion",{},{}).then((e)=>{
            console.log("banbenhao",e.versionName)
            this.setState({
                versions:e.versionName
            })
        })
        const {detail} = this.state
        const city = sessionStorage.getItem("city")
        if(detail!=null){
            this.setState({
                content:detail
            },()=>{
                const name = this.state.content.museumName
                const id = this.state.content.id
        
                HttpClientpost(url+"/appAct/act/recomActList",{
                    "actId":this.state.content.id,
                    "hostId":this.state.content.hostId,
                    "pageIndex":this.state.num,
                    "pageSize":2

                    }).then((e)=>{
                        console.log("0",e)
                        if(e.list!=null&&e.count>1){
                            this.setState({
                                list:e.list.slice(0,2)
                            })
                        }else{
                            HttpClientpost(url+"/appAct/act/recomActList",{
                                "actId":this.state.content.id,
                                "hostId":this.state.content.hostId,
                                "pageIndex":this.state.num,
                                "pageSize":2

                                }).then((e)=>{
                                    console.log("推荐",e)
                                    if(e.rspCode==1){
                                        this.setState({
                                            list:e.list==null?[]:e.list
                                        })
                                    }
                                })
                            console.log("2",e)
                        }
                    })
            })
            return
        }
        
    }
   
    goLocation=()=>{
        // this.props.history.push({pathname:`/location`,state:this.state.content})
        if(this.state.showDown){
            Toast.info("请下载APP",1.5,"",false)
            return
        }
        const {id,isAndroid} = this.state
        if(isAndroid){
            window.android.jsStartMap(2,id)
        }else{
            window.webkit.messageHandlers.jsStartMap.postMessage([2,id]);
        }

    }
    //主办方或博物馆
    goMuseum=()=>{
        if(this.state.showDown){
            Toast.info("请下载APP",1.5,"",false)
            return
        }
        const {userId} = this.state
        const hostId = this.state.content.hostId
        this.props.history.push({pathname:`/sponsor/?a&userId=${userId}&id=${hostId}`,state:this.state.content})
    }
    //分享
    share=()=>{
        const {content,id,isAndroid}=this.state
        if(this.state.showDown){
            Toast.info("请下载APP",1.5,"",false)
            return
        }
        if(isAndroid){
            window.android.jsStartShareDialog ("博物馆在移动",content.actName,"http://museum.renneng.net/museumAPP/index.html#/activityDetail?a&userId=&id="+id+"&"+"down",content.logoUrl,id,2)
        }else{
            window.webkit.messageHandlers.jsStartShareDialog.postMessage(["博物馆在移动",content.actName,"http://museum.renneng.net/museumAPP/index.html#/activityDetail?a&userId=&id="+id+"&"+"down",content.logoUrl,id,2]);
        }
    }
    //换一换
    huanyihuan=(name,id)=>{
        // const city = sessionStorage.getItem("city").value

        // HttpClientpost(url+"/appBiz/showMsg/recomShowMsgList",{
        //     userLocation:city,
        //     }).then((e)=>{
        //         console.log("0",e)
        //         if(e.rspCode==1){
        //             this.setState({
        //                 list:e.list
        //             },()=>{
        //                 console.log("1",e)
        //             })
        //         }else{
        //             console.log("2",e)
        //         }
        //     })
        this.setState({
            num:this.state.num+1
        },()=>{
            HttpClientpost(url+"/appAct/act/recomActList",{
                "actId":this.state.content.id,
                "hostId":this.state.content.hostId,
                "pageIndex":this.state.num,
                "pageSize":2
                }).then((e)=>{
                    console.log("推荐",e)
                    if(e.rspCode==1){
                        if(e.list==""){
                            this.setState({
                                num:1
                            },()=>{
                                HttpClientpost(url+"/appAct/act/recomActList",{
                                    "actId":this.state.content.id,
                                    "hostId":this.state.content.hostId,
                                    "pageIndex":this.state.num,
                                    "pageSize":2
                                }).then((e)=>{
                                    this.setState({
                                        list:e.list==""?[]:e.list
                                    })
                                })
                            })
                        }else{
                            this.setState({
                                list:e.list==""?[]:e.list
                            })
                        }
                    }
                })
        })

    }
    //推荐
    goDetail=(item)=>{
        const {userId} =this.state
        if(this.state.showDown){
            Toast.info("请下载APP",1.5,"",false)
            return
        }
        HttpClientpost(url+"/appAct/act/act/"+item.id,{}).then((e)=>{
            
            sessionStorage.setItem("recommend2Detail",JSON.stringify(e))
            this.props.history.push({pathname:`/recommend2/?a&userId=${userId}&id=${item.id}`,state:e})

        })
        // window.location.reload()
        window.scrollTo(0,0);

    }
    //收藏
    collect=()=>{
        const {userId,isAndroid} = this.state
        const msgId= this.state.content.id
        if(this.state.showDown){
            Toast.info("请下载APP",1.5,"",false)
            return
        }
        if(userId==""){
            Toast.info("请先登录",1.5,"",false)
            if(isAndroid){
                window.android.jsStartLoginActivity()
            }else{
                window.webkit.messageHandlers.jsStartLoginActivity.postMessage([]);
            }
    
            return
        }
        this.setState({
            click:false
        },()=>{
            if(this.state.isCollect){
                HttpClientpost(url+'/appBase/user/deleteUserCollection',{
                    userId:userId,
                    msgId:msgId,
                    colType:"2"
                    }).then((e)=>{
                        console.log(e)
                        if(e.rspCode==1){
                            Toast.fail("取消收藏",1.5,"")
                            this.setState({
                                isCollect:false,
                                collectCount:this.state.collectCount-1,
                                click:true
                            })
                        }else{
                            this.setState({
                                click:true
                            },()=>{
                                Toast.fail("取消失败，请稍后再试",1.5,"",false)
                            })
                        }
                  })
              }else{
                HttpClientpost(url+'/appBase/user/saveUserCollection',{
                    userId:userId,
                    msgId:msgId,
                    colType:"2"
                }).then((e)=>{
                    console.log(e)
                    if(e.rspCode==1){
                        Toast.success("收藏成功",1.5,"")
                        this.setState({
                            isCollect:true,
                            collectCount:this.state.collectCount+1,
                            click:true
                        })
                    }else{
                        this.setState({
                            click:true
                        },()=>{
                            Toast.fail("收藏失败，请稍后再试",1.5,"",false)
                        })
                    }
                  })
              }
        })

          
          
    }
    //关注
    attention=()=>{
        const {userId,isAndroid} = this.state
        const hostId= this.state.content.hostId
        const phoneNumber = 15683548607
        if(userId==""){
            if(this.state.showDown){
                Toast.info("请下载APP",1.5,"",false)
                return
            }
            Toast.info("请先登录",1.5,"",false)
            if(isAndroid){
                window.android.jsStartLoginActivity()
            }else{
                window.webkit.messageHandlers.jsStartLoginActivity.postMessage([]);
            }


            return
        }
       

          if(this.state.isAttention){
            HttpClientpost(url+'/appBase/user/deleteUserAttention',{
                userId:userId,
                museumId:hostId,
                attType:"2"

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
                museumId:hostId,
                attType:"2"

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
    close=()=>{
        this.setState({
            showOpenVip:false
        })
    }
    changeIntro=(type)=>{
        if(type==1){
            this.setState({
                detailShow1:"detailShow",
                detailShow2:"nodetailShow",
                detailShow3:"nodetailShow",
                detailBorderShow1:"detailBorderShow",
                detailBorderShow2:"",
                detailBorderShow3:"",
                detailIntoShow1:true,
                detailIntoShow2:false,
                detailIntoShow3:false,

            },()=>{

            })
        }
        if(type==2){
            this.setState({
                detailShow1:"nodetailShow",
                detailShow2:"detailShow",
                detailShow3:"nodetailShow",
                detailBorderShow1:"",
                detailBorderShow2:"detailBorderShow",
                detailBorderShow3:"",
                detailIntoShow1:false,
                detailIntoShow2:true,
                detailIntoShow3:false,

            },()=>{
                HttpClientpost(url+"/appBiz/comment/expertCommentList",{
                    type: "2",
                    fkId: "1"
                }).then((e)=>{
                    console.log(e)
                    this.setState({
                        into2:e.list?e.list:null
                    })
                })
            })
        }
        if(type==3){
            this.setState({
                detailShow1:"nodetailShow",
                detailShow2:"nodetailShow",
                detailShow3:"detailShow",
                detailBorderShow1:"",
                detailBorderShow2:"",
                detailBorderShow3:"detailBorderShow",
                detailIntoShow1:false,
                detailIntoShow2:false,
                detailIntoShow3:true,
            },()=>{
                HttpClientpost(url+"/appBiz/comment/list",{
                    type: "1",
                    fkId: "7976"
                }).then((e)=>{
                    console.log(e)
                    this.setState({
                        into3:e.list?e.list:[]
                    })
                })
            })
        }
    }
    comment=()=>{
        const {content} =this.state
        this.props.history.push({pathname:'/comment',state:content.id})
    }
    rate=()=>{

        const {content} =this.state
        sessionStorage.setItem("rate",JSON.stringify(content))
        this.props.history.push({pathname:'/rate',state:content})

    }
    // checkVip=()=>{
    //     const {userId,id}=this.state

    //     HttpClientpost(url+"/appBiz/myInfo/myVipEquity/"+userId,{}).then((e)=>{
    //         console.log(e)
    //         alert("123")
    //         if(e.vipType!=0){
    //             this.setState({
    //                 isVip:true,
    //             },()=>{
    //                 this.props.history.push({pathname:'/subscribe',state:{"userId":userId,"id":id}})
    //             })
    //         }else{
    //             this.setState({
    //                 isVip:false,
    //             })
    //         }
    //     })
    //    }
    subscribe=()=>{
        const {userId,id,isVip,content,isAndroid}=this.state
        if(userId==""){
            if(this.state.showDown){
                Toast.info("请下载APP",1.5,"",false)
                return
            }
            Toast.info("请先登录",1.5,"",false)
            if(isAndroid){
                window.android.jsStartLoginActivity()
            }else{
                window.webkit.messageHandlers.jsStartLoginActivity.postMessage([]);
            }

            return
        }
        if(isVip){
           this.props.history.push({pathname:'/subscribe',state:{"userId":userId,"id":id,"joinTime":content.startTime,"endTime":content.endTime}})
        }else{
            this.setState({
                showOpenVip:true
            })
        }
    }
    //开通会员
    goOpenVip=()=>{
        const {isAndroid}=this.state
        if(this.state.showDown){
            Toast.info("请下载APP",1.5,"",false)
            return
        }
        if(isAndroid){
            window.android.jsStartVipActivity()
        }else{
            window.webkit.messageHandlers.jsStartVipActivity.postMessage([]);
        }
    }
    goHome=()=>{
        const {isAndroid}=this.state
        if(isAndroid){
            window.android.jsStartTabActivity(0)
        }else{
            window.webkit.messageHandlers.jsStartTabActivity.postMessage([0]);
        }    
    }
    goBack=()=>{
        const {isAndroid}=this.state
        if(isAndroid){
            window.android.jsBack()
        }else{
            window.webkit.messageHandlers.jsBack.postMessage([]);
        }
    }
    down=()=>{
        var a = document.createElement('a');
        const {isAndroid} = this.state
        var a = document.createElement('a');
        if(isAndroid){
            a.href = "http://museum.renneng.net/version/Museum.apk";
            a.click();
        }else{
            Toast.info("IOS暂未开放")
        }
    }
    kong=()=>{
        
    }
    jsRefresh=(userId)=>{
        sessionStorage.setItem("userId",userId)
        window.location.reload()
    }
    render() {
        const {content,showDown,collectCount,shareCount,startTime,endTime,click,versions} = this.state
        const location = content.location
        const _that =this
        return (
            <div className="app" style={{width:"100%",background:"#F7F7F7",paddingBottom:"10px"}}>
            {
                showDown?<div style={{width:"100%",position:"fixed",top:0,zIndex:999,display:"flex",justifyContent:"space-between",background:"white",alignItems:"center",padding:"10px"}}>
                <div style={{display:"flex"}}>
                    <img src={logo} alt="" style={{width:"30px",height:"30px"}}/>
                    <p>博物馆在移动V{versions}</p>
                </div>
                <button className="btn" onClick={this.down}>立即下载</button>
                </div>:""
            }

            <div  style={{position:"fixed",top:0,zIndex:100,background:"white",display:"flex",width:"100%",lineHeight:"60px",height:"50px",justifyContent:"space-between"}}>
                        <img src={left} alt="" style={{width:"20px",height:"20px",marginLeft:"10px",marginTop:"20px"}} onClick={this.goBack}/>
                        <p style={{color:"black",fontSize:"16px"}}>
                            专属活动详情
                        </p>
                        <img src={zhuye} alt="" style={{width:"20px",height:"20px",marginRight:"10px",marginTop:"20px"}} onClick={this.goHome}/>
            </div>
            <img src={content.logoUrl} alt="" style={{width:"100%",position:"relative",top:50}}/>
            <div style={{width:"100%",display:"flex",flexDirection:"column",position:"relative",top:0,alignItems:"center",paddingBottom:"50px"}}>
                <div className="content1">
                    <div style={{display:"flex",justifyContent:"space-between",padding:"0 15px"}}>
                        <div style={{fontSize:"16px",color:"#2B2B2B",width:"80%"}}>{content.actName}</div>
                        {content.price==0&&content.ticket==0?<p style={{color:"red",fontSize:"14px",width:"20%",textAlign:"center"}}>免费</p>:
                        <div style={{display:"flex"}}>   
                            <p style={{color:"#FF2828",fontSize:"16px",fontWeight:500,display:content.price==0?"none":"flex",justifyContent:"center",alignItems:"center"}}>￥{content.price}</p>
                            <p style={{color:"#FF2828",fontSize:"16px",fontWeight:500,display:content.ticket==0||content.price==0?"none":"flex",justifyContent:"center",alignItems:"center"}}>+</p>
                            <div style={{height:"100%",display:content.ticket==0?"none":"flex",justifyContent:"center",alignItems:"center"}}>
                                <p className="quanbac">{content.ticket}张</p>

                            </div>
                        </div>
    
                    }
                    </div>
                    <div>
                        <div style={{fontSize:"16px",padding:"0 14px"}}>
                            <div style={{display:"flex"}}>
                                <p className="content1P" style={{color:"#ADADAD"}}><img className="content1Img" src={liulan} alt="" />浏览 <span style={{marginLeft:"4px"}}>{content.viewCount}</span></p>
                                <p onClick={click?this.collect:this.kong} className="content1P"style={{marginLeft:"8px",color:"#ADADAD"}}>
                                    {this.state.isCollect?<img className="content1Img" src={shoucang2} alt="" className="icon" style={{marginRight:"6px"}}/>:<img className="content1Img" src={shoucang} alt="" className="icon" style={{marginRight:"3px"}}/>}收藏 <span style={{marginLeft:"4px"}}>{collectCount}</span>
                                </p>
                                <p className="content1P" id="share" onClick={this.share} style={{marginLeft:"8px",color:"#ADADAD"}} onClick={this.share}><img className="content1Img" src={fenxiang} alt="" className="icon" style={{marginRight:"3px"}}/>分享 <span style={{marginLeft:"4px"}}>{shareCount}</span></p>
                            </div>
                        </div>
                        <div className="activityOpenVip">
                            <div className="activityOpenVip2" onClick={this.goOpenVip}>
                                <div style={{display:"flex"}}>
                                    98元套餐VIP价￥{content?content.price/10*content.discount:""}
                                    <p style={{color:"#A99059",display:content.ticket==0?"none":"black"}}>+</p>
                                    <div style={{height:"100%",display:content.ticket==0?"none":"flex",justifyContent:"center",alignItems:"center"}}>
                                        <p className="quanbac2">{content.ticket}张</p>

                                    </div>
                                </div>
                                <div>立即开通 ></div>
                            </div>

                        </div>
                        <p className="content1P" style={{marginLeft:"15px",marginTop:"5px"}}>活动时间：<span>{content.startTime} - {endTime.substr(0,10)==startTime.substr(0,10)?endTime.substr(10,6):endTime}</span></p>
                        <p className="content1P" style={{marginLeft:"15px",marginTop:"5px"}}>预约时间：<span>{content.bookTime}</span></p>
                        <p className="content1P" style={{marginLeft:"15px",marginTop:"5px"}}>人数要求：<span>{content.peopleLimit}</span></p>
                        <p className="content1P" style={{marginLeft:"15px",marginTop:"5px"}}>年龄要求：<span>{content.ageLimit}</span></p>
                        <div className="content1P" onClick={this.goLocation} style={{padding:"0 15px",marginTop:"5px",display:"flex",justifyContent:"space-between"}} onClick={this.goLocation}>
                            <p>活动地点：{content.address==null?content.museumName:content.address}</p>
                            <img src={dizhi} style={{marginTop:"5px"}} alt="" className="icon"/>
                        </div>
                    </div>
                </div>

                <div className="content2">
                    <div style={{marginRight:"15px"}}>
                        <img src={content.hostImg} alt="" style={{width:"82px",height:"82px"}} onClick={this.goMuseum}/>
                    </div>
                    <div style={{width:"100%"}}>
                        <div onClick={this.goMuseum} style={{fontSize:"16px",color:"#2B2B2B"}}>{content.hostName}</div>
                        <p onClick={this.goMuseum} className="attenTionP" style={{marginTop:"5px",fontSize:"13px",color:"#8A8888"}}>{content.hostIntro}</p>
                        
                        <div style={{marginTop:"8px",width:"75%",display:"flex",justifyContent:"space-between"}}>
                            <button className={this.state.isAttention?"btn1":"btn"} onClick={this.attention}>  {this.state.isAttention?"":<img src={jiahao} alt="" style={{width:"13px"}}/>}{this.state.isAttention?"已关注":"关注"}</button>
                            <button className="btn1" onClick={this.goMuseum}>主办方小站</button>
                        </div>
                    </div>
                </div>

                <div className="content3" style={{marginTop:"5px",width:"96%",marginBottom:"5px"}}>
                    <div style={{display:"flex",borderBottom:"1px solid #F1F1F1",justifyContent:"space-around",margin:"10px 15px"}}>
                        <div  className={this.state.detailShow1} onClick={this.changeIntro.bind(this,1)} style={{marginLeft:"5px"}}>
                            活动详情
                            <div className={this.state.detailBorderShow1} ></div>
                        </div>
                        <div className={this.state.detailShow2} onClick={this.changeIntro.bind(this,2)}>
                            活动推荐
                            <div className={this.state.detailBorderShow2} ></div>

                        </div>
                        
                    </div>
                   

                    <div style={{background:"white",padding:"8px 0",borderRadius:"10px"}}>
                        <p   style={{margin:"0 15px",display:this.state.detailIntoShow1?"block":"none"}} id="showIntro"></p>
                        <p   style={{margin:"0 15px",display:this.state.detailIntoShow2?"block":"none"}} >
                            {
                                this.state.into2?this.state.into2[0].content:"暂无内容"
                            }
                        </p>
                        <div   style={{margin:"0 15px",display:this.state.detailIntoShow3?"block":"none"}} >
                            {
                                this.state.into3.map((item,index)=>{
                                    return <div key={index+"into3"} style={{display:"flex",borderBottom:"1px solid #F1F1F1",padding:"10px 0"}}>
                                            <img src={item.headImgUrl?item.headImgUrl:headImg} alt="" style={{width:"42px",height:"42px",borderRadius:"50%"}}/>
                                            <div style={{marginLeft:"5px",width:"100%"}}>
                                                <div style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
                                                    <p>{item.nickname}</p>
                                                    <p>{item.createTime}</p>
                                                </div>
                                                <p style={{marginTop:"5px"}}>{item.content}</p>
                                            </div>
                                        </div>
                                })
                            }
                        </div>

                    </div>
                    
                </div>

                

                <div  className="content3">
                <div style={{width:"96%",background:"white",display:"flex",justifyContent:"space-between",padding:"5px 0 0 0 ",borderRadius:"10px"}}>
                    <div style={{marginLeft:"15px",color:"black"}}>为您推荐</div>
                    <img src={refresh} alt="" onClick={this.huanyihuan.bind(this,content.museumName,content.id)} style={{width:"25px",height:"25px",cursor:"pointer"}}/>
                </div>
                {
                    this.state.list.map((item,index)=>{
                    return   <div key={index+"recommend"} className="ul" style={{marginBottom:"8px",background:"white"}} onClick={this.goDetail.bind(this,item)}> 
                                    <div style={{fontSize:"13px",color:"#2B2B2B",marginBottom:"10px"}}>活动时间:{item.startTime} - {item.endTime.substr(0,10)==item.startTime.substr(0,10)?item.endTime.substr(10,6):item.endTime}</div>
                                    <div style={{width:"100%",borderBottom:"1px solid #F1F1F1"}}></div>
                                    <div className="content" style={{display:"flex",paddingTop:"8px",width:"100%",height:"90px"}}>
                                        <div>
                                            <div style={{position:"relative"}}>
                                                {
                                                    item.status==1?<p className="Start">进行中</p>:""
                                                }
                                                {
                                                    item.status==2?<p className="noStart">未开始</p>:""
                                                }
                                                {
                                                    item.status==3?<p className="over">结束了</p>:""
                                                }
                                                <img src={item.imgUrl} alt="" style={{width:"107px",height:"90px"}}/>
                                            </div>
                                        </div>
                                        
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",marginLeft:"15px",width:"80%",height:"90px"}}>
                                            <div className="title" style={{color:"black"}}>{item.actName}</div>
                                            <p className="address" style={{marginTop:"8px",color:"grey",fontSize:"11px"}}>{item.hostName?item.hostName:"博物馆在移动"}</p>
                                            <div style={{display:"flex",justifyContent:"space-between",marginTop:"5px"}}>
                                            {item.price==0? 
                                                <p style={{color:"#FF2828",fontSize:"12px",marginTop:"5px"}}>免费</p>
                                                :<p style={{color:"#FF2828",fontSize:"12px",marginTop:"5px"}}>￥{item.price}</p>}
                                                {/* {
                                                    item.status==1?<button className="btn" onClick={this.goDetail}>立即预约</button>
                                                    :<button className="btn1" onClick={this.goDetail}>前往查看</button>
                                                } */}
                                                <button className="btn1">前往查看</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        })
                }
                
                </div>
            </div>
            {/* 预约 */}
            <button className="subscribe" onClick={this.subscribe} style={{position:"fixed",bottom:"0"}}>
                立即预约
            </button>

            {
                    this.state.showOpenVip?
                    <div>
                        <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"black",opacity:"0.3"}} onClick={this.close}>
                            </div>
                                <div style={{position:"fixed",top:"30%",left:0,width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <div style={{width:"226px",height:"163px",background:"white",opacity:1,borderRadius:"5px" }}>
                                        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                            <img src={tanhao} alt="" style={{width:"33px",height:"33px"}}/>
                                        </div>
                                        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                            <p style={{fontSize:"18px",color:"#2B2B2B"}}>请先开通会员！</p>
                                        </div>
                                        <div style={{width:"100%",display:"flex",justifyContent:"space-around",marginTop:"20px"}}>
                                            <button onClick={this.goOpenVip} style={{background:"#F4B639",color:"white",width:"104px",height:"30px",textAlign:"center",lineHeight:"30px",border:"0",borderRadius:"3px"}}>去开通</button>

                                            <button onClick={this.close} style={{background:"#D0D0D0",color:"white",width:"104px",height:"30px",textAlign:"center",lineHeight:"30px",border:"0",borderRadius:"3px"}}>关闭</button>
                                        </div>
                            </div>
                        </div>
                    </div>:""

                }
            </div>

        ) 
    }
   
}

export default activityDetail;