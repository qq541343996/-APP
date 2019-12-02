import React,{ Component } from 'react';
import ReactDOM from 'react-dom'
import { Carousel, WingBlank,Toast,PullToRefresh, Button } from 'antd-mobile';
import {HttpClient, HttpClientget, HttpClientpost,HttpClientput,HttpClientdelete,FetchApi} from '../AxiosUtils';
import 'antd-mobile/dist/antd-mobile.css';
import '../Style/all.css'
import loading from '../Img/loading.gif'
import bianup from '../Img/bianup.png'
import biandown from '../Img/biandown.png'
import refresh from '../Img/refresh.png'
import bofang2 from '../Img/播放2.png'

import {url} from '../url'
// function randomsort(a, b) {
//     return Math.random()>.5 ? -1 : 1;
//  }
//  var arr = [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13];
// arr.sort(randomsort);
// console.log(arr)

class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            list:[],
            banner:[],
            // height: document.documentElement.clientHeight,
            refreshing: false,
            num:1,
            loading:true,
            showBottom:false,
            list2:[1,2,3,4,5,6,7,8,9,10]
        }
    }
    

    componentWillMount(){
        const query = this.props.location.search==""?this.props.location.pathname:this.props.location.search
        const arr = query.split('&') 
        const city = arr[1].substr(5)
        this.setState({
            city:city
        },()=>{
            this.getList(city)

        })
        console.log(city)
    }
    
    componentDidMount(){
        
        
        // const hei =this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop
        // setTimeout(() => this.setState({
        //     height: hei,
        //   },()=>{
              
        //   }), 0);

    }
    getList=(city)=>{
        HttpClientpost(url+'/appBase/common/homePageRecom',{
            userLocation:"",
        }).then((e)=>{
            console.log(e.list)
            if(e.list==""){
                this.setState({
                    loading:false,
                    showBottom:true
                })
                return
            }
            this.setState({
                list:e.list,
            },()=>{
                setTimeout(this.setState({
                    loading:false,

                }),200)
            })
        })
    }

    refresh=()=>{
        sessionStorage.removeItem("homeList")
        sessionStorage.removeItem("homeScroll")
   
            this.getList()
      

        // window.location.reload()
    }
   
   
    goSecond=(item)=>{
        if(item.type==1){
            const homeScroll = document.getElementById('PullToRefresh').scrollTop
            sessionStorage.setItem('homeList',JSON.stringify(this.state.list))
            sessionStorage.setItem('homeScroll',homeScroll)
            const id = item.id
            window.android.jsStartWebViewActivity("http://museum.renneng.net/museumAPP/index.html#/detail?a&userId=&id="+id)
    
        }
        if(item.type==2){
            const homeScroll = document.getElementById('PullToRefresh').scrollTop
            sessionStorage.setItem('homeList',JSON.stringify(this.state.list))
            sessionStorage.setItem('homeScroll',homeScroll)
            const id = item.id
            window.android.jsStartWebViewActivity("http://museum.renneng.net/museumAPP/index.html#/activityDetail?a&userId=&id="+id)
    
        }
        if(item.type==3){
            const homeScroll = document.getElementById('PullToRefresh').scrollTop
            sessionStorage.setItem('homeList',JSON.stringify(this.state.list))
            sessionStorage.setItem('homeScroll',homeScroll)
            const id = item.id
            window.android.jsStartWebViewActivity("http://museum.renneng.net/museumAPP/index.html#/videoDetail?a&userId=&id="+id)
    
        }

        
        
        // if(item.type==2){
        //     this.props.history.push({pathname:`/activity`,state:item})
        // }
        // if(item.type==1||item.type==0){
        //     const id = item.id
            
        // }

    }
   
   
    render() {
        const _that = this
        return (
            <div>
            {
                this.state.loading?
                <div className="app" style={{width:"100%",background:"white"}}>
                                {/* 骨架屏 */}
                            <div style={{position:"relative",display:"flex"}} id="PullToRefresh">
                                <div className="left" style={{width:"50%"}}>
                                    {
                                        this.state.list2.map((item,index)=>{
                                            if(index%2 ==0){
                                                return <div key={index+"left"} style={{width:"100%",padding:"10px 0",display:"flex",flexDirection:"column",alignItems:"center"}} onClick={this.goSecond.bind(this,item)}>
                                                        
                                                        <div style={{width:"90%",height:"150px",background:"#EFEFEF"}}></div>
                                                        <div  className="homeTitle" style={{width:"90%",height:"15px",fontSize:"12px",marginTop:"5px",marginBottom:"5px",background:"#EFEFEF"}}>

                                                        </div>
                                                        <div style={{width:"90%",display:"flex",justifyContent:"space-between"}}>
                                                            <div style={{width:"30%",height:"15px",background:"#EFEFEF"}}>

                                                            </div>
                                                            <div style={{width:"30%",height:"15px",background:"#EFEFEF"}}>

                                                            </div>
                                                        </div>
                                                    </div>
                                            }
                                        })
                                    }
                                </div>
                                <div className="right" style={{width:"50%"}}>
                                        {
                                            this.state.list2.map((item,index)=>{
                                                if(index%2 !=0){
                                                    return <div key={index+"right"} style={{width:"100%",padding:"10px 0",display:"flex",flexDirection:"column",alignItems:"center"}}>
                                                            <div style={{width:"90%",height:"150px",background:"#EFEFEF"}}></div>
                                                            <div  className="homeTitle" style={{width:"90%",height:"15px",fontSize:"12px",marginTop:"5px",marginBottom:"5px",background:"#EFEFEF"}}>

                                                            </div>
                                                            <div style={{width:"90%",display:"flex",justifyContent:"space-between"}}>
                                                                    <div style={{width:"30%",height:"15px",background:"#EFEFEF"}}>

                                                                    </div>
                                                                    <div style={{width:"30%",height:"15px",background:"#EFEFEF"}}>

                                                                    </div>
                                                            </div>
                                                        </div>
                                                }
                                            })
                                        }
                                </div>
                            </div>
                        </div>
                :<div className="app" style={{width:"100%",background:"rgba(254,249,237,1)"}}>
                        
                <div className="newBackground">
                        <img src={refresh} onClick={this.refresh} alt="" style={{width:"24px",height:"24px",marginBottom:"45px",marginRight:"20px"}}/>
                </div>

                <div style={{position:"relative",top:-30,display:"flex"}} id="PullToRefresh">
                <div className="left" style={{width:"50%"}}>
                    {
                        this.state.list.map((item,index)=>{
                            if(index%2 ==0){
                                if(item.type==1){
                                    return <div key={index+"left"} style={{width:"96%",padding:"10px 0"}} onClick={this.goSecond.bind(this,item)}>
                                                <div style={{position:"relative",borderLeft:"1px solid #AD8B52",borderRight:"1px solid #AD8B52",marginLeft:"5px",marginBottom:"7px"}}>
                                                    {/* <p style={{position:"absolute",left:0,bottom:15,background:"#D09C35",color:"white",display:item.price==0?"none":"block"}}>￥{item.price}</p> */}
                                                    <img src={biandown} alt="" style={{position:"absolute",bottom:0,width:"100%"}}/>
                                                    <img src={bianup} alt="" style={{position:"absolute",top:0,width:"100%"}}/>
                                                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"5px 0"}}>
                                                        <img src={item.picture} alt="" style={{width:"90%"}}/>
                                                    </div>                                                    
                                                </div>
                                                <div  className="homeTitle" style={{fontSize:"12px",marginTop:"5px",marginLeft:"5px",marginBottom:"5px"}}>
                                                {item.title.length>27?item.title.slice(0,27)+"...":item.title}

                                                </div>
                                                <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px"}}>
                                                    <p style={{fontSize:"9px",color:"grey"}}>{item.museumName}</p>
                                                </div>
                                                <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px"}}>
                                                    <p style={{fontSize:"10px",color:"black"}}>{item.time}</p>
                                                </div>
                                            </div>
                                }
                                if(item.type==2){
                                    return <div key={index+"left"} style={{width:"96%",padding:"10px 0"}} onClick={this.goSecond.bind(this,item)}>
                                                <div style={{position:"relative",borderLeft:"1px solid #AD8B52",borderRight:"1px solid #AD8B52",marginLeft:"5px",marginBottom:"7px"}}>
                                                    <p style={{position:"absolute",left:0,bottom:15,background:"#D09C35",color:"white",display:item.price==0?"none":"block",minWidth:"50px",opacity:0.8,fontSize:"12px",textAlign:"center"}}>￥{item.price}</p>
                                                    <img src={biandown} alt="" style={{position:"absolute",bottom:0,width:"100%"}}/>
                                                    <img src={bianup} alt="" style={{position:"absolute",top:0,width:"100%"}}/>
                                                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"5px 0"}}>
                                                        <img src={item.picture} alt="" style={{width:"90%"}}/>
                                                    </div>                                                    
                                                </div>
                                                <div  className="homeTitle" style={{fontSize:"12px",marginTop:"5px",marginLeft:"5px",marginBottom:"5px"}}>
                                                {item.title.length>27?item.title.slice(0,27)+"...":item.title}

                                                </div>
                                                <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px"}}>
                                                    <p style={{fontSize:"9px",color:"grey"}}>{item.museumName}</p>
                                                </div>
                                                <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px"}}>
                                                    <p style={{fontSize:"10px",color:"black"}}>{item.time}</p>
                                                </div>
                                            </div>
                                }
                                if(item.type==3){
                                    return <div key={index+"left"} style={{width:"96%",padding:"10px 0"}} onClick={this.goSecond.bind(this,item)}>
                                                <div style={{position:"relative",borderLeft:"1px solid #AD8B52",borderRight:"1px solid #AD8B52",marginLeft:"5px",marginBottom:"7px"}}>
                                                    <p style={{position:"absolute",left:"40%",bottom:"30%",color:"white"}}>  <img src={bofang2} alt="" style={{width:"40px",height:"40px"}}/>   </p>
                                                    <p style={{position:"absolute",right:0,bottom:5,color:"white",zIndex:100,width:"50px",textAlign:"center"}}>{item.time}</p>
                                                    <p style={{position:"absolute",right:0,bottom:5,background:"#D09C35",opacity:0.5,color:"black",width:"50px",textAlign:"center"}}>{item.time}</p>
                                                    <img src={biandown} alt="" style={{position:"absolute",bottom:0,width:"100%"}}/>
                                                    <img src={bianup} alt="" style={{position:"absolute",top:0,width:"100%"}}/>
                                                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"5px 0"}}>
                                                        <img src={item.picture} alt="" style={{width:"90%"}}/>
                                                    </div>                                                    
                                                </div>
                                                <div  className="homeTitle" style={{fontSize:"12px",marginTop:"5px",marginLeft:"5px",marginBottom:"5px"}}>
                                                {item.title.length>27?item.title.slice(0,27)+"...":item.title}

                                                </div>
                                                <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px"}}>
                                                    <p style={{fontSize:"9px",color:"grey"}}>{item.museumName}</p>
                                                </div>
                                                
                                            </div>
                                }
                                
                            }
                        })
                    }
                </div>
                <div className="right" style={{width:"50%"}}>
                        {
                            this.state.list.map((item,index)=>{
                                if(index%2 !=0){
                                    if(item.type==1){
                                        return <div key={index+"right"} style={{width:"96%",padding:"10px 0",marginLeft:"3px"}} onClick={this.goSecond.bind(this,item)}>
                                                <div>
                                                <div style={{position:"relative",borderLeft:"1px solid #AD8B52",borderRight:"1px solid #AD8B52",marginBottom:"7px"}}>
                                                    {/* <p style={{position:"absolute",left:0,bottom:15,background:"#D09C35",color:"white",display:item.price==0?"none":"block"}}>￥{item.price}</p> */}
                                                    <img src={biandown} alt="" style={{position:"absolute",bottom:0,width:"100%"}}/>
                                                    <img src={bianup} alt="" style={{position:"absolute",top:0,width:"100%"}}/>
                                                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"5px 0"}}>
                                                        <img src={item.picture} alt="" style={{width:"90%"}}/>
                                                    </div>
                                                </div>
                                                    <div className="homeTitle" style={{fontSize:"12px",marginTop:"5px",marginBottom:"5px"}}>
                                                    {item.title.length>27?item.title.slice(0,27)+"...":item.title}
                                                    </div>
                                                    <div style={{display:"flex",justifyContent:"flex-end"}}>
                                                        <p style={{fontSize:"9px",color:"grey"}}>{item.museumName}</p>
                                                    </div>
                                                    <div style={{display:"flex",justifyContent:"flex-end"}}>
                                                        <p style={{fontSize:"10px",color:"black"}}>{item.time}</p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                    }
                                    if(item.type==2){
                                        return <div key={index+"left"} style={{width:"96%",padding:"10px 0"}} onClick={this.goSecond.bind(this,item)}>
                                                    <div style={{position:"relative",borderLeft:"1px solid #AD8B52",borderRight:"1px solid #AD8B52",marginLeft:"5px",marginBottom:"7px"}}>
                                                        <p style={{position:"absolute",left:0,bottom:15,background:"#D09C35",color:"white",display:item.price==0?"none":"block",minWidth:"50px",opacity:0.8,fontSize:"12px",textAlign:"center"}}>￥{item.price}</p>
                                                        <img src={biandown} alt="" style={{position:"absolute",bottom:0,width:"100%"}}/>
                                                        <img src={bianup} alt="" style={{position:"absolute",top:0,width:"100%"}}/>
                                                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"5px 0"}}>
                                                            <img src={item.picture} alt="" style={{width:"90%"}}/>
                                                        </div>                                                    
                                                    </div>
                                                    <div  className="homeTitle" style={{fontSize:"12px",marginTop:"5px",marginLeft:"5px",marginBottom:"5px"}}>
                                                    {item.title.length>27?item.title.slice(0,27)+"...":item.title}
    
                                                    </div>
                                                    <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px"}}>
                                                        <p style={{fontSize:"9px",color:"grey"}}>{item.museumName}</p>
                                                    </div>
                                                    <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px"}}>
                                                        <p style={{fontSize:"10px",color:"black"}}>{item.time}</p>
                                                    </div>
                                                </div>
                                    }
                                    if(item.type==3){
                                        return <div key={index+"left"} style={{width:"96%",padding:"10px 0"}} onClick={this.goSecond.bind(this,item)}>
                                                    <div style={{position:"relative",borderLeft:"1px solid #AD8B52",borderRight:"1px solid #AD8B52",marginLeft:"5px",marginBottom:"7px"}}>
                                                        <p style={{position:"absolute",left:"40%",bottom:"30%",color:"white"}}>  <img src={bofang2} alt="" style={{width:"40px",height:"40px"}}/>   </p>
                                                        <p style={{position:"absolute",right:0,bottom:5,color:"white",zIndex:100,width:"50px",textAlign:"center"}}>{item.time}</p>
                                                        <p style={{position:"absolute",right:0,bottom:5,background:"#D09C35",opacity:0.5,color:"black",width:"50px",textAlign:"center"}}>{item.time}</p>
                                                        <img src={biandown} alt="" style={{position:"absolute",bottom:0,width:"100%"}}/>
                                                        <img src={bianup} alt="" style={{position:"absolute",top:0,width:"100%"}}/>
                                                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"5px 0"}}>
                                                            <img src={item.picture} alt="" style={{width:"90%"}}/>
                                                        </div>                                                    
                                                    </div>
                                                    <div  className="homeTitle" style={{fontSize:"12px",marginTop:"5px",marginLeft:"5px",marginBottom:"5px"}}>
                                                    {item.title.length>27?item.title.slice(0,27)+"...":item.title}
    
                                                    </div>
                                                    <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px"}}>
                                                        <p style={{fontSize:"9px",color:"grey"}}>{item.museumName}</p>
                                                    </div>
                                                    
                                                </div>
                                    }
                                   
                                }
                            })
                        }
                </div>
            </div>
                
             <div style={{width:"100%",textAlign:"center",color:"#57717C"}}>
                <p>{this.state.showBottom?"已经到底了 ↑":""}</p>
            </div>

            {/* <PullToRefresh
                id="PullToRefresh"
                damping={60}
                ref={el => this.ptr = el}
                style={{
                height:this.state.height,
                overflow: 'auto',
                position:"relative",
                top:-40
                }}
                indicator={'加载更多'}
                direction={'up'}
                refreshing={this.state.refreshing}
                onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => {
                    this.setState({ 
                        refreshing: false,
                        num: _that.state.num+1
                    },()=>{
                        const city = sessionStorage.getItem("city")
                        this.getList(city)
                    });
                }, 300);
                }}
            >
            
            </PullToRefresh> */}
         
            
    </div>

            }
            </div>
        ) 
    }
   
}

export default Home;