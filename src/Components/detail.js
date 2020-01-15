import React, { Component } from 'react';
import { Carousel, WingBlank,Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../Style/all.css'
import liulan from '../Img/liulan.png'
import shoucang from '../Img/shoucang.png'
import shoucang2 from '../Img/shoucang2.png'
import fenxiang from '../Img/fenxiang.png'
import dizhi from '../Img/dingwei2.png'
import headImg from '../Img/unie64d.png'
import pinglun from '../Img/pinglun.png'
import refresh from '../Img/refresh.png'
import gou from '../Img/gou.png'
import zhuye from '../Img/zhuye.png'
import left from '../Img/左.png'
import logo from '../Img/logo.png'
import jiahao from '../Img/加号.png'
import tanhao from '../Img/tanhao.png'

import {url} from '../url'
import {HttpClient, HttpClientget, HttpClientpost,HttpClientput,HttpClientdelete,FetchApi} from '../AxiosUtils';
import $ from  'jquery'
var timestamp = Date.parse(new Date());
window.getLoginUserId = function(userId) {
    if(window.callback != undefined) {
        window.callback.getLoginUserId(userId);
    }
}

window.setCallback = function(callback) {
    window.callback = callback;
}
class Detail extends Component {
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
            show:false,
            num:1,
            collectCountBase:"",
            click:true,
            versions:"",
            openAllShowInTro:false,
            showReport:false
        }
    }

    componentWillMount(){
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        // console.log(isIOS,isAndroid)
        // window.scrollTo(0,0)

        window.setCallback(this);
        document.body.style.backgroundColor = "#F7F7F7"
        document.title="博物馆在移动"
        const sessinUserId = JSON.parse(sessionStorage.getItem("userId"))


        const query = this.props.location.search==""?this.props.location.pathname:this.props.location.search
        const arr = query.split('&') // ['?userId=', 'id=7']
        const userId = arr[1].substr(7)
        const id = arr[2].substr(3)
        const down = arr[3]
        console.log("isDown",down)
        this.setState({
            userId:sessinUserId?sessinUserId:userId,
            id:id,
            showDown:down!="down"?false:true,
            isAndroid:isAndroid,
            isIOS:isIOS
        },()=>{
            console.log("userID",this.state.userId)
            console.log("时间戳",timestamp)

            HttpClientget(url+"/appShow/showMsg/"+id).then((e)=>{
                console.log(e)
                const time = new Date(e.showTime.substr(11,11)).getTime()
                console.log(e.showTime.substr(11,11))
                console.log(time)
                this.setState({
                    content:e,
                    collectCountBase:e.collectCountBase,
                    shareCountBase:e.shareCountBase,
                    isLate:timestamp>time?true:false
                },()=>{
                    document.getElementById("showIntro").innerHTML = this.state.content.showIntro
                    // HttpClientpost(url+"/appShow/showMsg/recomMuseumShowMsgList",{
                    //     museumName:this.state.content.museumName,
                    //     showMsgId:id
                    // }).then((e)=>{
                    //     console.log("0",e)
                    //     if(e.list!=null){
                    //         this.setState({
                    //             list:e.list
                    //         })
                    //     }else{
                    //         HttpClientpost(url+"/appShow/showMsg/recomShowMsgList",{
                    //             museumName:this.state.content.museumName,
                    //             showMsgId:id
                    //             }).then((e)=>{
                    //                 console.log("推荐",e)
                    //                 if(e.rspCode==1){
                    //                     this.setState({
                    //                         list:e.list==null?[]:e.list
                    //                     })
                    //                 }
                    //             })
                    //         console.log("2",e)
                    //     }
                    // })
                    this.getUerInfo()
                })
            })
        })
        
        // const _that=this
        // window.onscroll = function() {
        //     var htmlHeight = document.documentElement.scrollHeight||document.body.scrollHeight;  
        //     //clientHeight是网页在浏览器中的可视高度，
        //     var clientHeight = document.documentElement.clientHeight || document.body.clientHeight; 
        //     //scrollTop滚动条到顶部的垂直高度
        //     var scrollTop =  document.documentElement.scrollTop||document.body.scrollTop; 
        //     //通过判断滚动条的top位置与可视网页之和与整个网页的高度是否相等来决定是否加载内容；
        //     var he = scrollTop + clientHeight;
        //     if (he >= htmlHeight * 0.9) {
        //         setTimeout(() => {
        //             _that.setState({ 
        //                 refreshing: false,
        //                 num: _that.state.num+1
        //             },()=>{
        //                 const city = sessionStorage.getItem("city")
        //                 _that.getNewIntro3()
        //             });
        //         }, 100);
        //     }
            
        // }
        
    }
    
    handleScroll(){
        const _that = this
        const top1 = window.scrollY
        // const top2 = $("#selectTitle").offset().top-$("#titleTop").outerHeight()
        const top2 = 0
        if(top1>top2){
            _that.setState({
                titleSelectTopShow:false
            },()=>{
            })
        }else{
            _that.setState({
                titleSelectTopShow:false
            },()=>{
            })
        }

    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        HttpClientpost(url+"/appBase/common/getAppVersion",{},{}).then((e)=>{
            console.log("banbenhao",e.versionName)
            this.setState({
                versions:e.versionName
            })
        })
        // const detail =this.state.content
        // const city = sessionStorage.getItem("city")
        // if(detail!=null){
        //     this.setState({
        //         content:detail
        //     },()=>{
        //         const name = this.state.content.museumName
        //         const id = this.state.content.id
        
        //         HttpClientpost(url+"/appShow/showMsg/recomMuseumShowMsgList",{
        //         museumName:name,
        //         showMsgId:id
        //             }).then((e)=>{
        //                 console.log("0",e)
        //                 if(e.list!=null&&e.count>1){
        //                     this.setState({
        //                         list:e.list.slice(0,2)
        //                     })
        //                 }else{
        //                     HttpClientpost(url+"/appShow/showMsg/recomShowMsgList",{
        //                         museumName:name,
        //                         showMsgId:id
        //                         }).then((e)=>{
        //                             console.log("推荐",e)
        //                             if(e.rspCode==1){
        //                                 this.setState({
        //                                     list:e.list==null?[]:e.list
        //                                 })
        //                             }
        //                         })
        //                     console.log("2",e)
        //                 }
        //             })


        //             HttpClientpost(url+"/appBase/comment/expertCommentList",{
        //                 type: "1",
        //                 fkId: this.state.content.id
        //             }).then((e)=>{
        //                 console.log(e)
        //                 this.setState({
        //                     into2:e.list?e.list:null
        //                 })
        //             })

        //             HttpClientpost(url+"/appBase/comment/list",{
        //                 type: "1",
        //                 fkId: this.state.content.id
        //             }).then((e)=>{
        //                 console.log(e)
        //                 this.setState({
        //                     into3:e.list?e.list:[]
        //                 })
        //             })
        //     })
        //     return
        // }
        //推荐
        const name = this.state.content.museumName
        const id = this.state.content.id
        console.log("id",id)
        HttpClientpost(url+"/appShow/showMsg/recomMuseumShowMsgList",{
                museumName:name,
                showMsgId:id
        }).then((e)=>{
            console.log("0",e)
            if(e.list!=null){
                this.setState({
                    list:e.list
                })
            }else{
                HttpClientpost(url+"/appShow/showMsg/recomShowMsgList",{
                    museumName:name,
                    showMsgId:id
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
    
   

    getLoginUserId=(userId)=>{
        this.setState({
            userId:userId
        },()=>{
            sessionStorage.setItem("userId",this.state.userId)
            this.getUerInfo()
        })
    }
    getUerInfo=()=>{
        const museumId = this.state.content.museumId
        const msgId = this.state.content.id
        //浏览次数
        HttpClientget(url+"/appBase/user/updateMsgViewCount/"+msgId,{
            
        }).then((e)=>{
            console.log(e)
            
        })
        //是否关注收藏
        const {userId} =this.state
        if(userId!=null||userId!=""){
            HttpClientpost(url+"/appBase/user/getUserAttention",{
                userId:userId,
                museumId:museumId,
                attType:"1"

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
                colType:"1"

            }).then((e)=>{
                console.log("isCollect",e)
                if(e==1){
                    this.setState({
                        isCollect:true
                    })
                }
            })
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
            window.android.jsStartMap(1,id)
        }else{
            window.webkit.messageHandlers.jsStartMap.postMessage([1,id]);
        }
    }
    goMuseum=()=>{
        if(this.state.showDown){
            Toast.info("请下载APP",1.5,"",false)
            return
        }
        document.body.style.overflow = ""

        this.setState({
            show:false
        },()=>{
            const {userId} = this.state
            sessionStorage.setItem("museumDetail",JSON.stringify(this.state.content))

            if(this.state.showDown){
                Toast.info("请下载APP",1.5,"",false)
                this.props.history.push({pathname:`/museumDetail/?a&userId=${userId}&id=${this.state.content.museumId}&down`,state:this.state.content})

                return
            }else{
                this.props.history.push({pathname:`/museumDetail/?a&userId=${userId}&id=${this.state.content.museumId}`,state:this.state.content})

            }
    
        })
    }
    //分享
    share=()=>{
        const {content,id,isAndroid}=this.state
        if(this.state.showDown){
            Toast.info("请下载APP",1.5,"",false)
            return
        }
        if(isAndroid){
            window.android.jsStartShareDialog ("博物馆在移动",content.title,"http://museum.renneng.net/museumAPP/index.html#/detail?a&userId=&id="+id+"&"+"down",content.picture,id,1)

        }else{
            window.webkit.messageHandlers.jsStartShareDialog.postMessage (["博物馆在移动",content.title,"http://museum.renneng.net/museumAPP/index.html#/detail?a&userId=&id="+id+"&"+"down",content.picture,id,1])

        }
    }
    //换一换
    huanyihuan=(name,id)=>{
        // const city = sessionStorage.getItem("city").value

        // HttpClientpost(url+"/appShow/showMsg/recomShowMsgList",{
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
    HttpClientpost(url+"/appShow/showMsg/recomShowMsgList",{
                        museumName:name,
                        showMsgId:id
                        }).then((e)=>{
                            console.log("推荐",e)
                            if(e.rspCode==1){
                                this.setState({
                                    list:e.list==null?[]:e.list
                                })
                            }
                        })

    }
    //去推荐页
    goDetail=(item)=>{
        const {userId} = this.state
        if(this.state.showDown){
            Toast.info("请下载APP",1.5,"",false)
            return
        }
        HttpClientget(url+"/appShow/showMsg/"+item.id,{}).then((e)=>{
            
            sessionStorage.setItem("recommendDetail",JSON.stringify(e))
            this.props.history.push({pathname:`/recommend/?a&userId=${userId}&id=${item.id}`,state:e})

        })
        // window.location.reload()
        window.scrollTo(0,0)

    }
    //收藏
    collect=()=>{
        const id = this.state.userId
        const msgId = this.state.content.id
        const {isAndroid} =this.state
        if(this.state.showDown){
            Toast.info("请下载APP",1.5,"",false)
            return
        }
        if(id==""){
            Toast.info("请先登陆",1.5,"",false)
            if(isAndroid){
                window.android.jsStartLoginActivity()

            }else{
                window.webkit.messageHandlers.jsStartLoginActivity.postMessage([])

            }
            return
        }
        this.setState({
            click:false
        },()=>{
            if(this.state.isCollect){
                HttpClientpost(url+'/appBase/user/deleteUserCollection',{
                    userId:id,
                    msgId:msgId,
                    colType:"1"
                    }).then((e)=>{
                        console.log(e)
                        if(e.rspCode==1){
                            Toast.fail("取消收藏",1.5,"")
                            this.setState({
                                isCollect:false,
                                collectCountBase:this.state.collectCountBase-1,
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
                    userId:id,
                    msgId:msgId,
                    colType:"1"
                }).then((e)=>{
                    console.log(e)
                    if(e.rspCode==1){
                        Toast.success("收藏成功",1.5,"")
                        this.setState({
                            isCollect:true,
                            collectCountBase:this.state.collectCountBase+1,
                            click:true
                        },()=>{
                            
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
        const userId =this.state.userId
        const museumId =this.state.content.museumId
        const {isAndroid} =this.state

        if(userId==""){
            if(this.state.showDown){
                Toast.info("请下载APP",1.5,"",false)
                return
            }
            Toast.info("请先登陆",1.5,"",false)
            if(isAndroid){
                window.android.jsStartLoginActivity()

            }else{
                window.webkit.messageHandlers.jsStartLoginActivity.postMessage([])

            }
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
    close=()=>{
        this.setState({
            show:false
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
                // const top = $("#selectTitle").offset().top-$("#titleTop").outerHeight()
                // window.scrollTo(0,top)
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
                // const top = $("#selectTitle").offset().top-$("#titleTop").outerHeight()
                // window.scrollTo(0,top)
                HttpClientpost(url+"/appBase/comment/expertCommentList",{
                        type: "1",
                        fkId: this.state.content.id
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
                // const top = $("#selectTitle").offset().top-$("#titleTop").outerHeight()
                // window.scrollTo(0,top)
            HttpClientpost(url+"/appBase/comment/list",{
                    type: "1",
                    fkId: this.state.content.id
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
        const {content,userId,isAndroid} =this.state
        if(userId==""){
            if(this.state.showDown){
                Toast.info("请下载APP",1.5,"",false)
                return
            }
            Toast.info("请先登录",1.5,"",false)
            if(isAndroid){
                window.android.jsStartLoginActivity()

            }else{
                window.webkit.messageHandlers.jsStartLoginActivity.postMessage([])

            }

            return
        }
        sessionStorage.setItem("rate",JSON.stringify(content))
        sessionStorage.setItem("userId",JSON.stringify(userId))


        this.props.history.push({pathname:'/comment',state:{"id":content.id,"type":"1","userId":userId}})
    }
    rate=()=>{

        const {content,userId,isAndroid} =this.state
        if(userId==""){
            if(this.state.showDown){
                Toast.info("请下载APP",1.5,"",false)
                return
            }
            Toast.info("请先登录",1.5,"",false)
            if(isAndroid){
                window.android.jsStartLoginActivity()

            }else{
                window.webkit.messageHandlers.jsStartLoginActivity.postMessage([])

            }

            return
        }

        sessionStorage.setItem("rate",JSON.stringify(content))
        sessionStorage.setItem("userId",JSON.stringify(userId))

        this.props.history.push({pathname:'/rate',state:{"content":content,"userId":userId}})

    }
    subscribe=()=>{
        const {content,userId,isAndroid} =this.state
        if(userId==""){
            if(this.state.showDown){
                Toast.info("请下载APP",1.5,"",false)
                return
            }
            Toast.info("请先登录",1.5,"",false)
            if(isAndroid){
                window.android.jsStartLoginActivity()

            }else{
                window.webkit.messageHandlers.jsStartLoginActivity.postMessage([])

            }
            return
        }
        if(isAndroid){
            window.android.jsStartWebViewActivity2Subscribe(2,content.id,content.bookUrl)

        }else{
            window.webkit.messageHandlers.jsStartWebViewActivity2Subscribe.postMessage([2,content.id,content.bookUrl])

        }
        // document.body.style.overflow = "hidden"
        // this.setState({
        //     show:true
        // })
    }
    close=()=>{
        document.body.style.overflow = ""
        this.setState({
            show:false
        })
    }
    goHome=()=>{
        const {isAndroid} = this.state
        if(isAndroid){
            window.android.jsStartTabActivity("0")
        }else{
            window.webkit.messageHandlers.jsStartTabActivity.postMessage(["0"])
        }
    }
    goBack=()=>{
        const {isAndroid} = this.state
        if(isAndroid){
            window.android.jsBack()
        }else{
            window.webkit.messageHandlers.jsBack.postMessage([])
        }
    }
    down=()=>{
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
    openAllShowInTro=()=>{
        this.setState({
            openAllShowInTro:!this.state.openAllShowInTro
        })
    }
    //获取下一页评论
    // getNewIntro3=()=>{
    //     const {id,num}=this.state
    //     HttpClientpost(url+"/appBiz/comment/list",{
    //                 type: "2",
    //                 fkId: id,
    //                 pageIndex:num,
    //                 pageSize:10
    //                 }).then((e)=>{
    //                     console.log(e)
    //                     if(e.list!=null){
    //                         this.setState({
    //                             into3:[...this.state.into3,...e.list],
    //                             into3Count:e.count,
    //                         })
    //                     }
    //                 })
    // }

    sidebarTouchMove=(e)=>{
        console.log(111)
        e.preventDefault()
    }
    showReport=()=>{
        this.setState({
            showReport:true
        },()=>{
            document.getElementById('srollDetail').addEventListener("touchmove",this.sidebarTouchMove,false)  
        })
    }
    report=()=>{
        HttpClientpost(url+"/appBase/common/getAppVersion",{},{}).then((e)=>{
            Toast.info("举报成功")
            this.setState({
                showReport:false
            })
        })
    }
    closeReport=()=>{
        this.setState({
            showReport:false
        },()=>{
            // 为元素添加事件监听   
            document.getElementById('srollDetail').removeEventListener("touchmove",this.sidebarTouchMove,false)  
        })
    }
    render() {
        const {content,showDown,collectCountBase,shareCountBase,click,isLate,versions,openAllShowInTro,showReport} = this.state
        const location = content.location
        const _that =this
        return (
            <div className="app" id="srollDetail" style={{width:"100%",background:"#F7F7F7",paddingBottom:"10px"}}>
            {
                showDown?<div style={{width:"100%",position:"fixed",top:0,zIndex:999,display:"flex",justifyContent:"space-between",background:"white",alignItems:"center",padding:"10px"}}>
                <div style={{display:"flex"}}>
                    <img src={logo} alt="" style={{width:"30px",height:"30px"}}/>
                    <p>博物馆在移动V{versions}</p>
                </div>
                <button className="btn" onClick={this.down}>立即下载</button>
                </div>:""
            }
            <div id="titleTop" style={{position:"fixed",top:0,zIndex:100,background:"white",display:"flex",width:"100%",lineHeight:"60px",height:"50px",justifyContent:"space-between"}}>
                        <img src={left} alt="" style={{width:"20px",height:"20px",marginLeft:"10px",marginTop:"20px"}} onClick={this.goBack}/>
                        <p style={{color:"black",fontSize:"16px"}}>
                            展览详情
                        </p>
                        <img src={zhuye} alt="" style={{width:"20px",height:"20px",marginRight:"10px",marginTop:"20px"}} onClick={this.goHome}/>
            </div>
             
            <img src={pinglun} alt="" style={{width:"46px",height:"46px",position:"fixed",bottom:"20%",right:"3%",zIndex:"999"}} onClick={this.comment}/>
            <img src={content.picture} alt="" style={{width:"100%",position:"relative",top:50}}/>
            <div style={{width:"100%",display:"flex",flexDirection:"column",position:"relative",top:0,alignItems:"center",paddingBottom:content.bookUrl==null?"5px":"70px"}}>
                <div className="content1">
                    <div style={{display:"flex",justifyContent:"space-between",padding:"0 15px"}}>
                        <div style={{fontSize:"16px",color:"#2B2B2B",width:"80%"}}>{content.title}</div>
                        {content.price===null?<p style={{color:"red",fontSize:"14px",width:"20%",textAlign:"center"}}>免费</p>:
                            <p style={{color:"#FF2828",fontSize:"16px",width:"20%"}}>￥{content.price}</p>
                        }
                    </div>
                    <div>
                        <div style={{display:"flex",fontSize:"16px",padding:"0 14px",justifyContent:"space-between",alignItems:"center"}}>
                            <div style={{display:"flex"}}>
                                <p className="content1P" style={{color:"#ADADAD"}}><img className="content1Img" src={liulan} alt="" /> <span>{content.viewCountBase}</span></p>
                                <p onClick={click?this.collect:this.kong} className="content1P" style={{marginLeft:"10px",color:"#ADADAD"}}>
                                    {this.state.isCollect?<img className="content1Img" src={shoucang2} alt="" className="icon" style={{marginRight:"3px"}}/>:<img className="content1Img" src={shoucang} alt="" className="icon" style={{marginRight:"3px"}}/>} <span >{collectCountBase}</span>
                                </p>
                                <p className="content1P" id="share" onClick={this.share} style={{marginLeft:"10px",color:"#ADADAD"}} onClick={this.share}><img className="content1Img" src={fenxiang} alt="" className="icon" style={{marginRight:"3px"}}/> <span>{shareCountBase}</span></p>
                            </div>
                            <div style={{color:"#EFB746",display:"flex"}} onClick={this.rate}>
                                <p style={{fontSize:"26px"}}>{content.score}</p>
                                <p style={{fontSize:"14px",display:"flex",alignItems:"center",marginTop:"5px"}}>分></p>
                            </div>
                        </div>
                        <p className="content1P" style={{marginLeft:"15px"}}>展览时间：<span>{content.showTime}</span></p>
                        <div className="content1P" onClick={this.goLocation} style={{padding:"0 15px",display:"flex",justifyContent:"space-between"}} onClick={this.goLocation}>
                            <p>展览地址：{content.address==null?content.museumName:content.address}</p>
                            <img src={dizhi} style={{marginTop:"5px"}} alt="" className="icon"/>
                        </div>
                    </div>
                </div>
                {
                    this.state.content==""?"":
                    <div className="content2">

                        <div style={{marginRight:"15px"}}>
                            <img src={content.logoImg} alt="" style={{width:"82px",height:"82px"}} onClick={this.goMuseum}/>
                        </div>
                        <div style={{width:"100%"}}>
                            <div onClick={this.goMuseum} style={{fontSize:"16px",color:"#2B2B2B"}}>{content.museumName}</div>
                            <p onClick={this.goMuseum} className="attenTionP" style={{marginTop:"5px",fontSize:"13px",color:"#8A8888"}}>{content.museumShortIntro}</p>
                            
                            <div style={{marginTop:"8px",width:"75%",display:"flex",justifyContent:"space-between"}}>
                                <button className={this.state.isAttention?"btn1":"btn"} onClick={this.attention}> {this.state.isAttention?"":<img src={jiahao} alt="" style={{width:"13px",marginRight:"3px",marginBottom:"2px"}}/>}    {this.state.isAttention?"已关注":"关注"}</button>
                                <button className="btn1" onClick={this.goMuseum}>博物馆小站</button>
                            </div>
                        </div>
                    </div>
                }
                <div className="content3" style={{marginTop:"5px",width:"96%",marginBottom:"5px"}}>
                    {
                        this.state.titleSelectTopShow?
                        <div id="" style={{display:"flex",width:"94%",backgroundColor:"white",position:"fixed",top:40,borderBottom:"1px solid #F1F1F1",justifyContent:"space-between",margin:"10px 5px"}}>
                        <div  className={this.state.detailShow1} onClick={this.changeIntro.bind(this,1)} style={{marginLeft:"5px"}}>
                            展讯详情
                            <div className={this.state.detailBorderShow1} ></div>
                        </div>
                        <div className={this.state.detailShow2} onClick={this.changeIntro.bind(this,2)}>
                            展评推荐
                            <div className={this.state.detailBorderShow2} ></div>

                        </div>
                        <div className={this.state.detailShow3} onClick={this.changeIntro.bind(this,3)} style={{marginRight:"5px"}}>
                            评论（{content.commentCount}）
                            <div className={this.state.detailBorderShow3} ></div>

                        </div>
                    </div>
                        :
                        ""
                    }
                    <div id="selectTitle" style={{display:"flex",borderBottom:"1px solid #F1F1F1",justifyContent:"space-between",margin:"10px 15px"}}>
                        <div  className={this.state.detailShow1} onClick={this.changeIntro.bind(this,1)} style={{marginLeft:"5px"}}>
                            展讯详情
                            <div className={this.state.detailBorderShow1} ></div>
                        </div>
                        <div className={this.state.detailShow2} onClick={this.changeIntro.bind(this,2)}>
                            展评推荐
                            <div className={this.state.detailBorderShow2} ></div>

                        </div>
                        <div className={this.state.detailShow3} onClick={this.changeIntro.bind(this,3)} style={{marginRight:"5px"}}>
                            评论（{content.commentCount}）
                            <div className={this.state.detailBorderShow3} ></div>

                        </div>
                    </div>
                   
                    <div style={{background:"white",paddingBottom:"5px",borderRadius:"10px"}}>
                        <p   style={{margin:"0 15px",display:this.state.detailIntoShow1?"block":"none"}} id="showIntro"></p>
                        <p   style={{margin:"0 15px",display:this.state.detailIntoShow2?"block":"none"}} >
                            {
                                this.state.into2?this.state.into2[0].content:"暂无内容"
                            }
                        </p>
                        <div   style={{margin:"0 15px",display:this.state.detailIntoShow3?"block":"none"}} >
                            {
                                this.state.into3==""?"暂无内容":
                                this.state.into3.map((item,index)=>{
                                    return <div key={index+"into3"} onClick={this.showReport} style={{display:"flex",borderBottom: this.state.into3.length==1||this.state.into3.length-1==index?"":"1px solid #F1F1F1",padding:"10px 0"}}>
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

                    {/* <div style={{background:"white",paddingBottom:"5px",borderRadius:"10px"}}>
                        <p   style={{margin:"0 15px",height:openAllShowInTro?"":"500px",overflow:openAllShowInTro?"":"hidden"}} id="showIntro"></p>
                        
                        {
                            openAllShowInTro?
                            <p style={{width:"100%",textAlign:"center",color:"#A99059",background:"white",opacity:"0.8",position:"relative",top:-4}} onClick={this.openAllShowInTro}>收起</p>
                            :
                            <p style={{width:"100%",textAlign:"center",color:"#A99059",background:"white",opacity:"0.8",position:"relative",top:-4}} onClick={this.openAllShowInTro}>全部信息</p>
                        }
                    </div> */}
                    
                </div>
                {/* 推荐 */}
                {/* <div className="content3" style={{marginBottom:"5px"}}> 
                    <div  style={{padding:"5px"}} id="recommend">
                        <h3 style={{fontWeight:800}}>展评推荐</h3>
                        <p  style={{margin:"0 15px"}}>
                            {
                                this.state.into2?this.state.into2[0].content:"暂无内容"
                            }

                        </p>
                    </div>
                </div> */}
                {/* 评论 */}
                {/* <div className="content3" style={{marginBottom:"5px"}}>
                    <div   style={{padding:"5px"}} id="comment">
                            <h3 style={{fontWeight:800}}>评论</h3>

                            {
                                this.state.into3==""?"暂无内容":
                                this.state.into3.map((item,index)=>{
                                    return <div key={index+"into3"} style={{display:"flex",borderBottom: this.state.into3.length==1||this.state.into3.length-1==index?"":"1px solid #F1F1F1",padding:"10px 0"}}>
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
                </div> */}

                

                <div  className="content3">
                <div style={{width:"96%",background:"white",display:"flex",justifyContent:"space-between",paddingTop:"10px",borderRadius:"10px"}}>
                    <div style={{marginLeft:"15px",color:"black"}}>为您推荐</div>
                    <img src={refresh} alt="" onClick={this.huanyihuan.bind(this,content.museumName,content.id)} style={{width:"25px",height:"25px",cursor:"pointer"}}/>

                </div>
                {
                    this.state.list.map((item,index)=>{
                    return   <div key={index+"recommend"} className="ul" style={{marginBottom:"3px",background:"white"}} onClick={this.goDetail.bind(this,item)}> 
                                    <div style={{fontSize:"13px",color:"#2B2B2B",marginBottom:"5px"}}>展览时间:{item.showTime}</div>
                                    <div style={{width:"100%",borderBottom:"1px solid #F1F1F1"}}></div>
                                    <div className="content" style={{display:"flex",paddingTop:"8px",width:"100%",height:"80px"}}>
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
                                                <img src={item.picture} alt="" style={{width:"107px",height:"80px"}}/>
                                            </div>
                                        </div>
                                        
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",marginLeft:"15px",width:"80%",height:"80px"}}>
                                            <div>
                                                <div className="title" style={{color:"black"}}>{item.title}</div>
                                                <p className="address" style={{marginTop:"5px",color:"grey",fontSize:"11px"}}>{item.museumName}</p>
                                            </div>
                                            
                                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                            {item.price==null? 
                                                <p style={{color:"#FF2828",fontSize:"12px"}}>免费</p>
                                                :<p style={{color:"#FF2828",fontSize:"12px"}}>￥{item.price}</p>}
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
                {
                    content.bookUrl==null||isLate==true?"":
                    <button className="subscribe" onClick={this.subscribe} style={{position:"fixed",bottom:"0"}}>
                        立即预约
                    </button>
                }
           
            
            
            {
                    this.state.show?
                    <div>
                        <div id="black" style={{position:"fixed",bottom:0,width:"100%",height:"100%",background:"black",opacity:"0.3"}} onClick={this.close}>
                            </div>
                                <div style={{position:"fixed",top:"30%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <div style={{width:"226px",padding:"5px 5px",background:"white",opacity:1,borderRadius:"5px"}}>
                                        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                            <img src={gou} alt="" style={{width:"33px",height:"33px"}}/>
                                        </div>
                                        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                            <p style={{fontSize:"18px",color:"black"}} >展览预约成功</p>
                                        </div>
                                        <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",marginTop:"10px"}}>
                                            <p style={{fontSize:"14px",color:"#8C8B8B"}}>
                                            展览预约流程
                                            </p>
                                            <p style={{fontSize:"14px",color:"#8C8B8B"}}>
                                            第一步：约展览
                                            </p>
                                            <p style={{fontSize:"14px",color:"#8C8B8B"}}>
                                            第二步：约博物馆
                                            </p>
                                            <p style={{fontSize:"14px",color:"#8C8B8B"}}>
                                            （两步完成后才可观展）
                                            </p>
                                        </div>
                                        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"20px"}}>
                                            <button onClick={this.goMuseum} style={{background:"#F4B639",color:"white",width:"160px",height:"30px",textAlign:"center",lineHeight:"30px",border:"0",borderRadius:"3px"}}>前往预约博物馆</button>
                                        </div>
                                        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                            <button onClick={this.close} style={{background:"#D0D0D0",color:"white",width:"160px",height:"30px",textAlign:"center",lineHeight:"30px",border:"0",borderRadius:"3px"}}>放弃预约</button>
                                        </div>
                            </div>
                        </div>
                    </div>:""

                }
                {
                    this.state.showReport?
                    <div>
                        <div style={{position:"fixed",bottom:0,width:"100%",height:"100%",background:"black",opacity:"0.3"}}>
                        </div>
                        <div style={{position:"fixed",top:"30%",left:0,width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <div style={{width:"226px",height:"146px",background:"white",opacity:1,borderRadius:"5px" }}>
                                <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                    <img src={tanhao} alt="" style={{width:"33px",height:"33px"}}/>
                                </div>
                                <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                    <p style={{fontSize:"15px",color:"#2B2B2B"}}>是否举报该条评论</p>
                                </div>
                                <div style={{width:"100%",display:"flex",justifyContent:"space-around",marginTop:"20px"}}>
                                    <button onClick={this.report} style={{background:"#F4B639",color:"white",width:"96px",height:"30px",textAlign:"center",lineHeight:"30px",border:"0",borderRadius:"3px"}}>举报</button>

                                    <button onClick={this.closeReport} style={{background:"#D0D0D0",color:"white",width:"96px",height:"30px",textAlign:"center",lineHeight:"30px",border:"0",borderRadius:"3px"}}>关闭</button>
                                </div>
                            </div>
                        </div>
                    </div>:""

                }
                
            </div>

        ) 
    }
   
}

export default Detail;