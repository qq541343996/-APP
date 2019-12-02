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
import back from '../Img/activityback2.png'
import {url} from '../url'
class activetyList extends Component {
    constructor(props) {
        super(props);
        this.state={
            list:[],
            banner:[],
            refreshing: false,
            num:1,
            loading:true,
            showBottom:false
        }
    }
    

    componentWillMount(){

        document.body.style.backgroundColor="transparent"
    }
    componentDidMount(){
        const homelist = sessionStorage.getItem("homeList")
        const homeScroll = sessionStorage.getItem("homeScroll")
        if(homelist!=null){
            this.setState({
                list:JSON.parse(homelist),
                loading:false,
            },()=>{
                const PullToRefresh = document.getElementById('PullToRefresh')
                PullToRefresh.scrollTop=homeScroll
            })
        }else{
            this.getList()
        }
        

    }
    getNewList=()=>{
        const _that =this
        setTimeout(() => {
            _that.setState({ 
                refreshing: false,
                num: _that.state.num+1
            },()=>{
                const city = sessionStorage.getItem("city")
                _that.getList(city)
            });
        }, 300);
    }
    getList=(city)=>{
        HttpClientpost(url+'/appAct/act/actList',{
            pageSize:10,
            pageIndex:this.state.num,
            userLocation:""
        }).then((e)=>{
            console.log(e)
            if(e==""){
                this.setState({
                    loading:false,
                    showBottom:true
                })
                return
            }
            this.setState({
                list:[...this.state.list,...e],
                loading:false,
            },()=>{
                
            })
        })
    }

    refresh=()=>{
        sessionStorage.removeItem("homeList")
        sessionStorage.removeItem("homeScroll")
        window.location.reload()
    }
   
 
    goSecond=(item)=>{
        // const homeScroll = document.getElementById('PullToRefresh').scrollTop
        // sessionStorage.setItem('homeList',JSON.stringify(this.state.list))
        // sessionStorage.setItem('homeScroll',homeScroll)
        const id = item.id
        window.android.jsStartWebViewActivity("http://museum.renneng.net/museumAPP/index.html#/activityDetail?a&userId=&id="+id)

    }
   
    render() {
        const _that = this
        return (
            <div style={{width:"100%",background:"#F0E3CE"}}>
                        
                        {/* <div className="newBackground3">

                        </div> */}
                        <img src={back} alt="" style={{width:"100%",height:"110px"}}/>
                        <div style={{display:"flex",position:"relative",top:-60}}>
                        <div className="left" style={{width:"50%"}}>
                            {
                                this.state.list.map((item,index)=>{
                                    if(index ==0){
                                        return <div key={index+"left"} style={{width:"96%",padding:"10px 0px"}} onClick={this.goSecond.bind(this,item)}>
                                                    <div style={{position:"relative",borderLeft:"1px solid #AD8B52",borderRight:"1px solid #AD8B52",marginLeft:"5px",marginBottom:"7px"}}>
                                                        <p style={{position:"absolute",left:0,bottom:15,background:"#D09C35",color:"white",display:item.price==null?"none":"block",minWidth:"50px",opacity:0.8,fontSize:"12px",textAlign:"center"}}>￥{item.price}</p>
                                                        <img src={biandown} alt="" style={{position:"absolute",bottom:0,width:"100%"}}/>
                                                        <img src={bianup} alt="" style={{position:"absolute",top:0,width:"100%"}}/>
                                                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"5px 0"}}>
                                                            <img src={item.imgUrl} alt="" style={{width:"90%"}}/>
                                                        </div>
                                                    </div>
                                                    <div className="homeTitle" style={{fontSize:"12px",marginTop:"5px",marginLeft:"5px",marginBottom:"5px"}}>
                                                        {item.actName.length>27?item.actName.slice(0,27)+"...":item.actName}

                                                    </div>
                                                    {/* <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px",marginBottom:"5px"}}>
                                                        <p style={{fontSize:"9px",color:"grey"}}>{item.museumName}</p>
                                                    </div> */}
                                                    <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px"}}>
                                                        <p style={{fontSize:"10px",color:"black"}}>{item.startTime}</p>
                                                    </div>
    
                                                </div>
                                    }
                                })
                            }{
                                this.state.list.map((item,index)=>{
                                    if(index%2 ==0&&index !=0){
                                        return <div key={index+"left"} style={{width:"96%",padding:"10px 0"}} onClick={this.goSecond.bind(this,item)}>
                                                    <div style={{position:"relative",borderLeft:"1px solid #AD8B52",borderRight:"1px solid #AD8B52",marginLeft:"5px",marginBottom:"7px"}}>
                                                        <p style={{position:"absolute",left:0,bottom:15,background:"#D09C35",color:"white",display:item.price==null?"none":"block",minWidth:"50px",opacity:0.8,fontSize:"12px",textAlign:"center"}}>￥{item.price}</p>
                                                        <img src={biandown} alt="" style={{position:"absolute",bottom:0,width:"100%"}}/>
                                                        <img src={bianup} alt="" style={{position:"absolute",top:0,width:"100%"}}/>
                                                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"5px 0"}}>
                                                            <img src={item.imgUrl} alt="" style={{width:"90%"}}/>
                                                        </div>                                                    
                                                    </div>
                                                    <div  className="homeTitle" style={{fontSize:"12px",marginTop:"5px",marginLeft:"5px",marginBottom:"5px"}}>
                                                    {item.actName.length>27?item.actName.slice(0,27)+"...":item.actName}

                                                    </div>
                                                    {/* <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px",marginBottom:"5px"}}>
                                                        <p style={{fontSize:"9px",color:"grey"}}>{item.museumName}</p>
                                                    </div> */}
                                                    <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px"}}>
                                                        <p style={{fontSize:"10px",color:"black"}}>{item.startTime}</p>
                                                    </div>
                                                </div>
                                    }
                                })
                            }
                        </div>
                        <div className="right" style={{width:"50%"}}>
                                {
                                    this.state.list.map((item,index)=>{
                                        if(index%2 !=0){
                                            return <div key={index+"right"} style={{width:"96%",padding:"10px 0",marginLeft:"3px"}} onClick={this.goSecond.bind(this,item)}>
                                                    <div>
                                                    <div style={{position:"relative",borderLeft:"1px solid #AD8B52",borderRight:"1px solid #AD8B52",marginBottom:"7px"}}>
                                                        <p style={{position:"absolute",left:0,bottom:15,background:"#D09C35",color:"white",display:item.price==null?"none":"block",minWidth:"50px",opacity:0.8,fontSize:"12px",textAlign:"center"}}>￥{item.price}</p>
                                                        <img src={biandown} alt="" style={{position:"absolute",bottom:0,width:"100%"}}/>
                                                        <img src={bianup} alt="" style={{position:"absolute",top:0,width:"100%"}}/>
                                                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"5px 0"}}>
                                                            <img src={item.imgUrl} alt="" style={{width:"90%"}}/>
                                                        </div>
                                                    </div>
                                                        <div className="homeTitle" style={{fontSize:"12px",marginTop:"5px",marginBottom:"5px"}}>
                                                        {item.actName.length>27?item.actName.slice(0,27)+"...":item.actName}
                                                        </div>
                                                        {/* <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"5px"}}>
                                                            <p style={{fontSize:"9px",color:"grey"}}>{item.museumName}</p>
                                                        </div> */}
                                                        <div style={{display:"flex",justifyContent:"flex-end"}}>
                                                            <p style={{fontSize:"10px",color:"black"}}>{item.startTime}</p>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                        }
                                    })
                                }
                        </div>
                    </div>
                    <div style={{width:"100%",textAlign:"center",color:"#57717C"}}>
                        <p style={{padding:"10px 0"}}>已经到底了</p>
                    </div>
                     {/* <div style={{width:"100%",textAlign:"center",color:"#57717C"}}>
                        <p style={{padding:"10px 0"}}>{this.state.showBottom?"已经到底了 ↑":""}</p>
                    </div> */}
                    {/* <PullToRefresh
                        className="PullToRefreshActivity"
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
                            });
                        }, 300);
                        }}
                    >
                    
                    
                    </PullToRefresh> */}
                 
                

            </div>

        ) 
    }
   
}

export default activetyList;