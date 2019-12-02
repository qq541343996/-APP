import React, { Component } from 'react';
import { Carousel, WingBlank,Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../Style/all.css'
import liulan from '../Img/liulan.png'
import shoucang from '../Img/shoucang.png'
import shoucang2 from '../Img/shoucang2.png'
import fenxiang from '../Img/fenxiang.png'
import dizhi from '../Img/dizhi.png'
import headImg from '../Img/unie64d.png'
import pinglun from '../Img/pinglun.png'
import refresh from '../Img/refresh.png'
import bofang from '../Img/bofang.png'
import dianzan2 from '../Img/点赞2.png'
import dianzan1 from '../Img/dianzan1.png'
import shuaxin from '../Img/刷新.png'
import tanhao from '../Img/tanhao.png'
import zhuye from '../Img/zhuye.png'
import left from '../Img/左.png'
import logo from '../Img/logo.png'
import jiahao from '../Img/加号.png'
import {url} from '../url'
import {HttpClient, HttpClientget, HttpClientpost,HttpClientput,HttpClientdelete,FetchApi} from '../AxiosUtils';

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

            detailIntoShow1:false,
            detailIntoShow2:false,
            detailIntoShow3:true,
            into3:[],
            into2:null,
            stop:true,
            showTicket:false,
            showMoney:false,
            isVip:false,
            videoTicketsCount:0,
            tryLook:true,
            num:1,
            versions:""
        }
    }

    componentWillMount(){
        window.setCallback(this);
        this.checkVip()
        document.body.style.backgroundColor = "#F7F7F7"
        window.scrollTo(0,0);
        const sessinUserId = JSON.parse(sessionStorage.getItem("userId"))

        const query = this.props.location.search==""?this.props.location.pathname:this.props.location.search
        const arr = query.split('&') // ['?userId=', 'id=7']
        const userId = arr[1].substr(7)
        const id = arr[2].substr(3)
        const down = arr[3]
        this.setState({
            userId:sessinUserId?sessinUserId:userId,
            id:id,
            showDown:down!="down"?false:true
        },()=>{
            HttpClientget(url+"/video/video/"+id,{
            }).then((e)=>{
                console.log(e)
                this.setState({
                    content:e.obj
                },()=>{
                    HttpClientpost(url+"/appBase/comment/list",{
                    type: "2",
                    fkId: id
                    }).then((e)=>{
                        console.log(e)
                        this.setState({
                            into3:e.list?e.list:[],
                            into3Count:e.count
                        })
                    })
                    document.getElementById("showIntro").innerHTML = this.state.content.showIntro
                    this.getUserInfo()
                })         
            })
        })

        const _that=this
        window.onscroll = function() {
            var htmlHeight = document.documentElement.scrollHeight||document.body.scrollHeight;  
        //clientHeight是网页在浏览器中的可视高度，
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight; 
        //scrollTop滚动条到顶部的垂直高度
        var scrollTop =  document.documentElement.scrollTop||document.body.scrollTop; 
        //通过判断滚动条的top位置与可视网页之和与整个网页的高度是否相等来决定是否加载内容；
        var he = scrollTop + clientHeight;
        if (he >= htmlHeight * 0.9) {
            setTimeout(() => {
                _that.setState({ 
                    refreshing: false,
                    num: _that.state.num+1
                },()=>{
                    const city = sessionStorage.getItem("city")
                    _that.getNewIntro3()
                });
            }, 100);
        }            
        }
    }

    getLoginUserId=(userId)=>{
        this.setState({
            userId:userId
        },()=>{
            sessionStorage.setItem("userId",this.state.userId)

            const{userId,id} = this.state
            const hostId = this.state.content.hostId
            const msgId = this.state.id

        //浏览次数
        HttpClientget(url+"/video/video/updateVideoViewCount/"+msgId,{
            
        }).then((e)=>{
            
        })
        //是否关注收藏点赞
        const e = this.state.userId
        console.log(e)
        if(e!=null||e!=""){
            HttpClientpost(url+"/appBase/user/getUserAttention",{
                userId:e,
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
                userId:e,
                msgId:msgId,
                colType:"3"

            }).then((e)=>{
                console.log("isCollect",e)
                if(e==1){
                    this.setState({
                        isCollect:true
                    })
                }
            })

            HttpClientpost(url+"/video/video/getUserVideoYes",{
                userId:e,
                msgId:msgId,
                colType:"3"

            }).then((e)=>{
                console.log("isLike",e)
                if(e.rspCode==1){
                    this.setState({
                        isLike:true
                    })
                }
            })
        }
            HttpClientpost(url+`/video/video/getVideoWatch/${userId}/${id}`,{}).then((e)=>{
                console.log(e=="")
                if(e==""){
                    this.addvideo()
                    HttpClientpost(url+"/appBase/myInfo/myVip/"+userId,{}).then((e)=>{
                        if(e.vipList!=""){
                            this.setState({
                                isVip:true,
                                videoTicketsCount:e.vipList[1]?e.vipList[1].videoTicketsCount+e.vipList[0].videoTicketsCount:0+e.vipList[0].videoTicketsCount,
                                vipType:e.vipList[0].vipType,
                                videoTicketsCount0:e.vipList[0].videoTicketsCount,
                                videoTicketsCount1:e.vipList[1]?e.vipList[1].videoTicketsCount:0
                
                            },()=>{
                                if(this.state.videoTicketsCount<=0){
                                    if(e.isVip==1){
                                        this.setState({
                                            showMoney:true
                                        })
                                    }else{
                                        this.setState({
                                            isVip:false
                                        }) 
                                    }
                                }else{
                                    this.setState({
                                        showTicket:true
                                    })
                                }
                            })
                        }else{
                            this.setState({
                                isVip:false
                            })
                        }
                    })
                }else{
                    this.removevideo()
                    this.setState({
                        tryLook:true,
                    })
                }   
            })
        })
    }

    getUserInfo=()=>{
        const hostId = this.state.content.hostId
        const msgId = this.state.id

        //浏览次数
        HttpClientget(url+"/video/video/updateVideoViewCount/"+msgId,{
            
        }).then((e)=>{
            
        })
        //是否关注收藏点赞
        const e = this.state.userId
        console.log(e)
        if(e!=null||e!=""){
            HttpClientpost(url+"/appBase/user/getUserAttention",{
                userId:e,
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
                userId:e,
                msgId:msgId,
                colType:"3"

            }).then((e)=>{
                console.log("isCollect",e)
                if(e==1){
                    this.setState({
                        isCollect:true
                    })
                }
            })

            HttpClientpost(url+"/video/video/getUserVideoYes",{
                userId:e,
                msgId:msgId,
                colType:"3"

            }).then((e)=>{
                console.log("isLike",e)
                if(e.rspCode==1){
                    this.setState({
                        isLike:true
                    })
                }
            })
        }
    }
   
   checkVip=()=>{
    //473会员没券
    //460会员有券
    
    const query = this.props.location.search==""?this.props.location.pathname:this.props.location.search
    const arr = query.split('&') // ['?userId=', 'id=7']
    console.log(arr)
    const userId = arr[1].substr(7)
    const id = arr[2].substr(3)
    console.log(userId,id)
    if(userId==""){
        this.setState({
            isVip:false
        })
        return
    }
    HttpClientpost(url+"/appBase/myInfo/myVip/"+userId,{}).then((e)=>{
        console.log("111",e)
        if(e.vipList!=""){
            this.setState({
                isVip:true,
                videoTicketsCount:e.vipList[1]?e.vipList[1].videoTicketsCount+e.vipList[0].videoTicketsCount:0+e.vipList[0].videoTicketsCount,
                vipType:e.vipList[0].vipType,
                videoTicketsCount0:e.vipList[0].videoTicketsCount,
                videoTicketsCount1:e.vipList[1]?e.vipList[1].videoTicketsCount:0

            },()=>{
                if(this.state.videoTicketsCount<=0){
                    if(e.isVip==1){
                        this.setState({
                            showMoney:true
                        })
                    }else{
                        this.setState({
                            isVip:false
                        }) 
                    }
                    
                }else{
                    this.setState({
                        showTicket:true
                    })
                }
            })
        }else{
            this.setState({
                isVip:false
            })
        }

        // if(e.isVip==1){
        //     this.setState({
        //         isVip:true,
        //         videoTicketsCount:e.vipList[1]?e.vipList[1].videoTicketsCount+e.vipList[0].videoTicketsCount:0+e.vipList[0].videoTicketsCount,
        //         vipType:e.vipList[0].vipType,
        //         videoTicketsCount0:e.vipList[0].videoTicketsCount,
        //         videoTicketsCount1:e.vipList[1]?e.vipList[1].videoTicketsCount:0

        //     },()=>{
        //         console.log("123",this.state.videoTicketsCount)
        //         if(this.state.videoTicketsCount<=0){
        //             this.setState({
        //                 showMoney:true
        //             })
        //         }else{
        //             this.setState({
        //                 showTicket:true
        //             })
        //         }
        //     })
        // }else{
        //     this.setState({
        //         isVip:false
        //     })
        // }
    })
   }
   //退出全屏
    exitFullscreen=()=>{
        var de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    }
    //监听视频进度
    playOrpause=()=>{
        const {stop,content} = this.state
        var v = document.getElementById("video");
        const _that = this
        var timeDisplay;
        //用秒数来显示当前播放进度
        timeDisplay = v.currentTime;
        if (timeDisplay > Number(content.preWatchLimit)) {
            if(stop){
                v.pause();
                this.exitFullscreen()
                _that.setState({
                    tryLook:false
                },()=>{
                    _that.checkVip()

                })
               
            }else{
                v.play();
            }
            
        }
    }
    
    addvideo=()=>{
        var v = document.getElementById("video");

            v.addEventListener("timeupdate",this.playOrpause,false)

    }
    removevideo=()=>{
        var v = document.getElementById("video");

        v.removeEventListener("timeupdate",this.playOrpause,false)
    }
    //付费观看
    VipPlay=()=>{
        const {userId,id} = this.state
        if(userId==""){
            if(this.state.showDown){
                Toast.info("请下载APP",1.5,"",false)
                return
            }
            Toast.info("请先登录",1.5,"",false)
            window.android.jsStartLoginActivity()

            return
        }
        var v = document.getElementById("video");
        const _that = this
        const {stop} = this.state
        this.setState({
            tryLook:true,
            show:false
        },()=>{
            _that.removevideo()
            v.play();
            HttpClientpost(url+"/video/video/saveVideoWatch",{
                        "userId":userId,  
                        "videoId":id
                    }).then((e)=>{
                        console.log(e)
                    })
        })
    }
    componentDidMount() {
        HttpClientpost("http://47.98.101.202:40080/appBase/common/getAppVersion",{},{}).then((e)=>{
            console.log("banbenhao",e.versionName)
            this.setState({
                versions:e.versionName
            })
        })
        // const video = document.querySelector('video');

        // video.addEventListener('waiting', (event) => {
        //     video.pause()
        //     console.log('Video is waiting for more data.');
        // });
        const{userId,id} = this.state
        if(userId==""){
            this.addvideo()
            return
        }
        HttpClientpost(url+`/video/video/getVideoWatch/${userId}/${id}`,{}).then((e)=>{
            console.log(e=="")
            if(e==""){
                this.addvideo()
            }else{
                this.removevideo()
            }   
        })
        
    }
   
    goLocation=()=>{
        this.props.history.push({pathname:`/location`,state:this.state.content})
    }
    //主办方
    goMuseum=()=>{
        // this.props.history.push({pathname:`/museumDetail`,state:this.state.content})
        const {userId} = this.state
        const hostId = this.state.content.hostId
        this.props.history.push({pathname:`/sponsor/?a&userId=${userId}&id=${hostId}`,state:this.state.content})

    }
    //分享
    share=()=>{
        const {content,id}=this.state
        if(this.state.showDown){
            Toast.info("请下载APP",1.5,"",false)
            return
        }
        window.android.jsStartShareDialog ("博物馆在移动",content.title,"http://museum.renneng.net/museumAPP/index.html#/videoDetail?a&userId=&id="+id+"&"+"down",content.picture,id,3)

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
    HttpClientpost(url+"/appBiz/showMsg/recomShowMsgList",{
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
    //推荐
    goDetail=(item)=>{
        HttpClientget(url+"/appBiz/showMsg/"+item.id,{}).then((e)=>{
            
            sessionStorage.setItem("recommendDetail",JSON.stringify(e))
            this.props.history.push({pathname:`/recommend`,state:e})

        })
        // window.location.reload()
        window.scrollTo(0,0);

    }
    //点赞
    like=()=>{
        const {userId} = this.state
        const msgId = this.state.id
        if(this.state.showDown){
            Toast.info("请下载APP",1.5,"",false)
            return
        }
        if(userId==""){
            Toast.info("请先登录",1.5,"",false)
            window.android.jsStartLoginActivity()

            return
        }

          if(this.state.isLike){
            HttpClientpost(url+'/video/video/deleteVideoYes',{
                userId:userId,
                msgId:msgId
                }).then((e)=>{
                    console.log(e)
                    if(e.rspCode==1){
                        Toast.fail("取消点赞",1.5,"")
                        this.setState({
                            isLike:false
                        },()=>{
                            //重新获取
                            HttpClientget(url+"/video/video/"+this.state.id,{
                            }).then((e)=>{
                                console.log(e)
                                this.setState({
                                    content:e.obj
                                },()=>{
                                    HttpClientpost(url+"/appBase/comment/list",{
                                    type: "2",
                                    fkId: this.state.id
                                    }).then((e)=>{
                                        console.log(e)
                                        this.setState({
                                            into3:e.list?e.list:[],
                                            into3Count:e.count
                                        })
                                    })
                                    document.getElementById("showIntro").innerHTML = this.state.content.showIntro
                                })         
                            })
                        })
                    }else{
                        Toast.fail("取消失败，请稍后再试",1.5,"",false)
                    }
              })
          }else{
            HttpClientpost(url+'/video/video/saveVideoYes',{
                userId:userId,
                msgId:msgId
            }).then((e)=>{
                console.log(e)
                if(e.rspCode==1){
                    Toast.success("点赞成功",1.5,"")
                    this.setState({
                        isLike:true
                    },()=>{
                        //重新获取
                        HttpClientget(url+"/video/video/"+this.state.id,{
                        }).then((e)=>{
                            console.log(e)
                            this.setState({
                                content:e.obj
                            },()=>{
                                HttpClientpost(url+"/appBase/comment/list",{
                                type: "2",
                                fkId: this.state.id
                                }).then((e)=>{
                                    console.log(e)
                                    this.setState({
                                        into3:e.list?e.list:[],
                                        into3Count:e.count
                                    })
                                })
                                document.getElementById("showIntro").innerHTML = this.state.content.showIntro
                            })         
                        })
                    })
                }else{
                    Toast.fail("点赞失败，请稍后再试",1.5,"",false)
                }
              })
          }
          
    }
    //收藏
    collect=()=>{
        const {userId} = this.state
        const msgId = this.state.id
        if(this.state.showDown){
            Toast.info("请下载APP",1.5,"",false)
            return
        }
        if(userId==""){
            Toast.info("请先登录",1.5,"",false)
            window.android.jsStartLoginActivity()
            return
        }
          if(this.state.isCollect){
            HttpClientpost(url+'/appBase/user/deleteUserCollection',{
                userId:userId,
                msgId:msgId,
                colType:"3"
                }).then((e)=>{
                    console.log(e)
                    if(e.rspCode==1){
                        Toast.fail("取消收藏",1.5,"")
                        this.setState({
                            isCollect:false
                        },()=>{
                            //重新获取
                            HttpClientget(url+"/video/video/"+this.state.id,{
                            }).then((e)=>{
                                console.log(e)
                                this.setState({
                                    content:e.obj
                                },()=>{
                                    HttpClientpost(url+"/appBiz/comment/list",{
                                    type: "2",
                                    fkId: this.state.id
                                    }).then((e)=>{
                                        console.log(e)
                                        this.setState({
                                            into3:e.list?e.list:[],
                                            into3Count:e.count
                                        })
                                    })
                                    document.getElementById("showIntro").innerHTML = this.state.content.showIntro
                                })         
                            })
                        })
                    }else{
                        Toast.fail("取消失败，请稍后再试",1.5,"",false)
                    }
              })
          }else{
            HttpClientpost(url+'/appBase/user/saveUserCollection',{
                userId:userId,
                msgId:msgId,
                colType:"3"
            }).then((e)=>{
                console.log(e)
                if(e.rspCode==1){
                    Toast.success("收藏成功",1.5,"")
                    this.setState({
                        isCollect:true
                    },()=>{
                        //重新获取
                        HttpClientget(url+"/video/video/"+this.state.id,{
                        }).then((e)=>{
                            console.log(e)
                            this.setState({
                                content:e.obj
                            },()=>{
                                HttpClientpost(url+"/appBiz/comment/list",{
                                type: "2",
                                fkId: this.state.id
                                }).then((e)=>{
                                    console.log(e)
                                    this.setState({
                                        into3:e.list?e.list:[],
                                        into3Count:e.count
                                    })
                                })
                                document.getElementById("showIntro").innerHTML = this.state.content.showIntro
                            })         
                        })
                    })
                }else{
                    Toast.fail("收藏失败，请稍后再试",1.5,"",false)
                }
              })
          }
          
    }
    //关注
    attention=()=>{
        const {userId} = this.state
        const museumId = this.state.content.hostId
        if(userId==""){
            if(this.state.showDown){
                Toast.info("请下载APP",1.5,"",false)
                return
            }
            Toast.info("请先登录",1.5,"",false)
            window.android.jsStartLoginActivity()

            return
        }
       

          if(this.state.isAttention){
            HttpClientpost(url+'/appBase/user/deleteUserAttention',{
                userId:userId,
                museumId:museumId,
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
                museumId:museumId,
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
                HttpClientpost(url+"/appBiz/comment/list",{
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

        const {id,userId} =this.state
        if(userId==""){
            if(this.state.showDown){
                Toast.info("请下载APP",1.5,"",false)
                return
            }
            Toast.info("请先登录",1.5,"",false)
            window.android.jsStartLoginActivity()

            return
        }
        sessionStorage.setItem("userId",JSON.stringify(userId))


        this.props.history.push({pathname:'/comment',state:{"id":id,"type":"2","userId":userId}})

    }
    videoReload=()=>{
        const v = document.getElementById('video')
        this.setState({
            tryLook:true,
        },()=>{
            v.currentTime=0
            v.play()
    
        })

    }
    showVipPlay=()=>{
        this.setState({
            show:true
        })
    }
    //开通会员
    goOpenVip=()=>{
        window.android.jsStartTabActivity(4)
    }
    //用券播放
    ticketsPlay=()=>{
        const {userId,vipType,id} = this.state
        var v = document.getElementById("video");
        const num0 = this.state.videoTicketsCount0-1
        const num1 = this.state.videoTicketsCount1-1

        const _that = this
if(num0>=0){
    HttpClientput(url+"/appBase/user/updateTicketCount/"+userId+"/"+num0+"/"+"1").then((e)=>{
        console.log(e)
        if(e.rspCode==1){
            _that.setState({
                tryLook:true,
                show:false
            },()=>{
                _that.removevideo()
                v.play();
                //以后需要合并接口
                HttpClientpost(url+"/video/video/saveVideoWatch",{
                    "userId":userId,  
                    "videoId":id
                }).then((e)=>{
                    console.log(e)
                })
            })
            
        }
        if(e.rspCode!=1){
            Toast.fail("点播券使用失败，请稍后再试",1.5,"",false)
        }
    })
}else{
    if(num1<0){
        this.setState({
            showMoney:true
        })
    }else{
        HttpClientput(url+"/appBase/user/updateTicketCount/"+userId+"/"+num1+"/"+"2").then((e)=>{
            console.log(e)
            if(e.rspCode==1){
                _that.setState({
                    tryLook:true,
                    show:false
                },()=>{
                    _that.removevideo()
                    v.play();
                    //以后需要合并接口
                    HttpClientpost(url+"/video/video/saveVideoWatch",{
                        "userId":userId,  
                        "videoId":id
                    }).then((e)=>{
                        console.log(e)
                    })
                })
            }
            if(e.rspCode!=1){
                Toast.fail("点播券使用失败，请稍后再试",1.5,"",false)
            }
        })
    }
}
        

        // this.setState({
        //     tryLook:true,
        //     show:false
        // },()=>{
        //     _that.removevideo()
        //     v.play();
        //     if(num0>=0){
        //         HttpClientput(url+"/appBase/user/updateTicketCount/"+userId+"/"+num0+"/"+"1").then((e)=>{
        //             console.log(e)
        //             if(e.rspCode==1){
        //                 //以后需要合并接口
        //                 HttpClientpost(url+"/video/video/saveVideoWatch",{
        //                     "userId":userId,  
        //                     "videoId":id
        //                 }).then((e)=>{
        //                     console.log(e)
        //                 })
        //             }
        //             if(e.rspCode!=1){
        //                 Toast.fail("点播券使用失败，请稍后再试",1.5,"",false)
        //             }
        //         })
        //     }else{
        //         if(num1<0){
        //                 this.setState({
        //                     showMoney:true
        //                 })
        //         }else{
        //             HttpClientput(url+"/appBase/user/updateTicketCount/"+userId+"/"+num1+"/"+"2").then((e)=>{
        //                 console.log(e)
        //                 if(e.rspCode==1){
        //                     //以后需要合并接口
        //                     HttpClientpost(url+"/video/video/saveVideoWatch",{
        //                         "userId":userId,  
        //                         "videoId":id
        //                     }).then((e)=>{
        //                         console.log(e)
        //                     })
        //                 }
        //                 if(e.rspCode!=1){
        //                     Toast.fail("点播券使用失败，请稍后再试",1.5,"",false)
        //                 }
        //             })
        //         }
                
        //     }
            
        // })
    }
    goHome=()=>{
        window.android.jsStartTabActivity("0")
    }
    goBack=()=>{
        window.android.jsBack()
    }
    //获取下一页评论
    getNewIntro3=()=>{
        const {id,num}=this.state
        HttpClientpost(url+"/appBiz/comment/list",{
                    type: "2",
                    fkId: id,
                    pageIndex:num,
                    pageSize:10
                    }).then((e)=>{
                        console.log(e)
                        if(e.list!=""){
                            this.setState({
                                into3:[...this.state.into3,...e.list],
                                into3Count:e.count,
                            })
                        }
                    })
    }
    down=()=>{
        var a = document.createElement('a');
        a.href = "http://museum.renneng.net/version/Museum_20190905.apk";
        a.click();
    }
    render() {
        const {content,showTicket,showMoney,isVip,tryLook,showDown,versions} = this.state
        const location = content.location
        const _that =this
        return (
            <div className="app" style={{width:"100%",height:"100%",background:"#F7F7F7"}}>
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
                            专属视频详情
                        </p>
                        <img src={zhuye} alt="" style={{width:"20px",height:"20px",marginRight:"10px",marginTop:"20px"}} onClick={this.goHome}/>
            </div>

            <div style={{position:"relative",top:50}}>
                <img src={pinglun} alt="" style={{width:"46px",height:"46px",position:"fixed",bottom:"20%",right:"3%",zIndex:"999"}} onClick={this.comment}/>
                <div style={{width:"100%",height:"180px",objectFit:"fill"}}>
                    <video src={content.videoUrl}
                    controls="controls"
                    controlslist="nodownload"
                    poster={content.picture}
                    x5-playsinline="" playsinline="" webkit-playsinline=""
                    id="video" style={{width:tryLook?"100%":0,height:tryLook?"95%":""}}></video>

                    {
                        tryLook?"":showTicket?
                        <div>
                            <div style={{position:"absolute",top:0,width:"100%",height:"180px",background:"black",opacity:"0.7"}}>
                            </div>
                            <div style={{position:"absolute",top:0,width:"100%",height:"180px",zIndex:100,display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <div>
                                    <div style={{display:"flex",width:"100%",justifyContent:"center"}}>
                                        <p style={{color:"white"}}>试看结束</p>
                                    </div>
                                    <div style={{display:"flex",width:"100%",justifyContent:"center",marginTop:"10px"}}>
                                        <button onClick={this.showVipPlay} style={{background:"#EFB746",color:"white",border:"0",textAlign:"center",height:"42px",lineHeight:"42px",borderRadius:"5px",width:"125px"}}>视频点播劵观看</button>
                                    </div>
                                    <div style={{display:"flex",width:"100%",justifyContent:"center",alignItems:"center",marginTop:"10px"}} onClick={this.videoReload}>
                                        <img src={shuaxin} alt="" style={{width:"14px",height:"14px"}}/>
                                        <p style={{color:"white",marginLeft:"5px"}}>重新试看</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :""
                    }
                    {
                        tryLook?"":showMoney?
                        <div>
                            <div style={{position:"absolute",top:0,width:"100%",height:"180px",background:"black",opacity:"0.7"}}>
                            </div>
                            <div style={{position:"absolute",top:0,width:"100%",height:"180px",zIndex:100,display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <div>
                                    <div style={{display:"flex",width:"100%",justifyContent:"center"}}>
                                        <p style={{color:"white"}}>试看结束</p>
                                    </div>
                                    <div style={{display:"flex",width:"100%",justifyContent:"center",marginTop:"10px"}}>
                                        <button onClick={this.VipPlay} style={{background:"#EFB746",color:"white",border:"0",textAlign:"center",height:"42px",lineHeight:"42px",borderRadius:"5px",width:"125px"}}>付费观看</button>
                                    </div>
                                    <div style={{display:"flex",width:"100%",justifyContent:"center",alignItems:"center",marginTop:"10px"}} onClick={this.videoReload}>
                                        <img src={shuaxin} alt="" style={{width:"14px",height:"14px"}}/>
                                        <p style={{color:"white",marginLeft:"5px"}}>重新试看</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :""
                    }
                    {
                        tryLook?"":isVip?
                        ""
                        :<div>
                        <div style={{position:"absolute",top:0,width:"100%",height:"180px",background:"black",opacity:"0.7"}}>
                        </div>
                        <div style={{position:"absolute",top:0,width:"100%",height:"180px",zIndex:100,display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <div>
                                <div style={{display:"flex",width:"100%",justifyContent:"center"}}>
                                    <p style={{color:"white"}}>试看结束</p>
                                </div>
                                <div style={{display:"flex",width:"100%",justifyContent:"center",marginTop:"10px"}}>
                                    <button onClick={this.goOpenVip} style={{background:"#EFB746",color:"white",border:"0",textAlign:"center",width:"110px",height:"40px",lineHeight:"40px",borderRadius:"5px"}}>开通会员</button>
                                    <button onClick={this.VipPlay} style={{background:"white",color:"black",border:"0",textAlign:"center",width:"110px",height:"40px",lineHeight:"40px",borderRadius:"5px",marginLeft:"10px"}}>付费观看</button>

                                </div>
                                <div style={{display:"flex",width:"100%",justifyContent:"center",alignItems:"center",marginTop:"10px"}} onClick={this.videoReload}>
                                    <img src={shuaxin} alt="" style={{width:"14px",height:"14px"}}/>
                                    <p style={{color:"white",marginLeft:"5px"}}>重新试看</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    
                </div>
            </div>
            
            <div style={{width:"100%",display:"flex",flexDirection:"column",position:"relative",top:35,alignItems:"center"}}>
                <div className="content1" style={{width:"100%",borderRadius:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"0 15px"}}>
                        <div style={{fontSize:"16px",color:"#2B2B2B",width:"80%"}}>{content.title}</div>
                        {content.price===null?<p style={{color:"red",fontSize:"14px",width:"20%",textAlign:"center"}}>免费</p>:
                        <p style={{color:"#FF2828",fontSize:"16px"}}>￥{content.price}</p>
    
                    }
                    </div>
                    <div style={{padding:"10px 0"}}>
                        <div style={{display:"flex",fontSize:"16px",padding:"0 14px",justifyContent:"space-between",alignItems:"center"}}>
                            <div style={{display:"flex"}}>
                                <p className="content1P" style={{color:"#ADADAD"}}><img className="icon" src={bofang} alt="" style={{width:"15px",height:"15px"}}/>{content.viewCountBase}</p>
                                {
                                    this.state.isLike?  <p className="content1P" style={{color:"#ADADAD",marginLeft:"15px"}} onClick={this.like}><img className="icon" src={dianzan2} alt="" style={{width:"15px",height:"15px"}}/>{content.yesCountBase}</p>
:                                <p className="content1P" onClick={this.like} style={{color:"#ADADAD",marginLeft:"15px"}}><img className="icon" src={dianzan1} alt="" style={{width:"15px",height:"15px"}}/>{content.yesCountBase}</p>

                                }

                                <p onClick={this.collect} className="content1P"style={{marginLeft:"15px",color:"#ADADAD"}}>
                                    {this.state.isCollect?<img className="content1Img" src={shoucang2} alt="" className="icon" style={{marginRight:"3px"}}/>:<img className="content1Img" src={shoucang} alt="" className="icon" style={{marginRight:"3px"}}/>}{content.collectCountBase}
                                </p>
                                <p className="content1P" id="share" onClick={this.share} style={{marginLeft:"15px",color:"#ADADAD"}} onClick={this.share}><img className="content1Img" src={fenxiang} alt="" className="icon" style={{marginRight:"3px"}}/>{content.shareCountBase}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="content2" style={{width:"100%",borderRadius:0}}>
                    <div style={{margin:"0 15px"}}>
                        <img src={content.hostLogoImg} alt="" style={{width:"82px",height:"82px"}} onClick={this.goMuseum}/>
                    </div>
                    <div style={{width:"100%"}}>
                        <div onClick={this.goMuseum} style={{fontSize:"16px",color:"#2B2B2B"}}>{content.hostName}</div>
                        <p onClick={this.goMuseum} className="attenTionP" style={{marginTop:"5px",fontSize:"13px",color:"#8A8888"}}>{content.hostBriefIntro}</p>
                        
                        <div style={{marginTop:"8px",width:"75%",display:"flex",justifyContent:"space-between"}}>
                            <button className={this.state.isAttention?"btn1":"btn"} onClick={this.attention}> {this.state.isAttention?"":<img src={jiahao} alt="" style={{width:"13px",marginRight:"3px",marginBottom:"2px"}}/>}{this.state.isAttention?"已关注":"关注"}</button>
                            <button className="btn1" onClick={this.goMuseum}>主办方小站</button>
                        </div>
                    </div>
                </div>

                <div className="content3" style={{marginTop:"5px",width:"100%",marginBottom:"5px",borderRadius:0}}>
                    <div style={{display:"flex",borderBottom:"1px solid #F1F1F1",justifyContent:"space-between",margin:"10px 10px",padding:"5px"}}>
                        {/* <div  className={this.state.detailShow1} onClick={this.changeIntro.bind(this,1)} style={{marginLeft:"5px"}}>
                            展讯详情
                            <div className={this.state.detailBorderShow1} ></div>
                        </div>
                        <div className={this.state.detailShow2} onClick={this.changeIntro.bind(this,2)}>
                            展评推荐
                            <div className={this.state.detailBorderShow2} ></div>

                        </div> */}
                        <div className={this.state.detailShow3}  style={{marginRight:"5px",color:"black"}}>
                            评论（{this.state.into3Count}）
                            <div className={this.state.detailBorderShow3} ></div>

                        </div>
                    </div>
                   

                    <div style={{background:"white",padding:"8px 0"}}>
                        <p   style={{margin:"0 15px",display:this.state.detailIntoShow1?"block":"none"}} id="showIntro"></p>
                        <p   style={{margin:"0 15px",display:this.state.detailIntoShow2?"block":"none"}} >
                            {
                                this.state.into2?this.state.into2[0].content:""
                            }
                        </p>
                        <div   style={{margin:"0 15px",display:this.state.detailIntoShow3?"block":"none"}} >
                            {this.state.into3==""?"暂无内容":
                                this.state.into3.map((item,index)=>{
                                    return <div key={index+"into3"} style={{display:"flex",borderBottom:this.state.into3.length==1||this.state.into3.length-1==index?"":"1px solid #F1F1F1",padding:"10px 10px"}}>
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
               
            </div>
            {
                    this.state.show?
                    <div>
                        <div style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"black",opacity:"0.3"}}>
                            </div>
                                <div style={{position:"fixed",top:"30%",left:0,width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <div style={{width:"226px",height:"163px",background:"white",opacity:1,borderRadius:"5px" }}>
                                        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                            <img src={tanhao} alt="" style={{width:"33px",height:"33px"}}/>
                                        </div>
                                        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                            <p style={{fontSize:"15px",color:"#2B2B2B"}}>您本月有{this.state.videoTicketsCount}张视频点播券可用</p>
                                        </div>
                                        <div style={{width:"100%",display:"flex",justifyContent:"space-around",marginTop:"20px"}}>
                                            <button onClick={this.ticketsPlay} style={{background:"#F4B639",color:"white",width:"96px",height:"30px",textAlign:"center",lineHeight:"30px",border:"0",borderRadius:"3px"}}>使用观看</button>

                                            <button onClick={this.close} style={{background:"#D0D0D0",color:"white",width:"96px",height:"30px",textAlign:"center",lineHeight:"30px",border:"0",borderRadius:"3px"}}>关闭</button>
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