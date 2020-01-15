import React,{ Component } from 'react';
import ReactDOM from 'react-dom'
import { Carousel, WingBlank,Toast,PullToRefresh, Button } from 'antd-mobile';
import {HttpClient, HttpClientget, HttpClientpost,HttpClientput,HttpClientdelete,FetchApi} from '../AxiosUtils';
import 'antd-mobile/dist/antd-mobile.css';
import '../Style/all.css'
import loading from '../Img/loading.gif'
import bianup from '../Img/lankuangup.png'
import biandown from '../Img/lankuangdown.png'
import refresh from '../Img/refresh.png'
import {url} from '../url'
window.getNewList = function() {
    if(window.callback != undefined) {
        window.callback.getNewList();
    }
}

window.setCallback = function(callback) {
    window.callback = callback;
}
class spreadtrum3 extends Component {
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
        window.setCallback(this);
    }
    componentDidMount(){
        const homelist = sessionStorage.getItem("homeList")
        const homeScroll = sessionStorage.getItem("homeScroll")
        const query = this.props.location.search==""?this.props.location.pathname:this.props.location.search
        const arr = query.split('&') 
        const city = arr[1].substr(5)
        if(homelist!=null){
            this.setState({
                list:JSON.parse(homelist),
                loading:false,
                city:city
            },()=>{
                const PullToRefresh = document.getElementById('PullToRefresh')
                PullToRefresh.scrollTop=homeScroll
                sessionStorage.removeItem("homeList")
                sessionStorage.removeItem("homeScroll")
            })
        }else{
            this.getList(city)
        }
      
    }
    getNewList=()=>{
        const _that =this
        setTimeout(() => {
            _that.setState({ 
                refreshing: false,
                num: _that.state.num+1
            },()=>{
                const city = _that.state.city
                _that.getList()
            });
        }, 300);
    }
    getList=(city)=>{
        HttpClientpost(url+'/appShow/showMsg/historyList',{
            pageSize:10,
            pageIndex:this.state.num,
            userLocation:city
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
                list:[...this.state.list,...e.list],
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
   
 
    // goSecond=(item)=>{
    //     const homeScroll = document.getElementById('PullToRefresh').scrollTop
    //     sessionStorage.setItem('homeList',JSON.stringify(this.state.list))
    //     sessionStorage.setItem('homeScroll',homeScroll)


    //     if(item.type==2){
    //         this.props.history.push({pathname:`/activity`,state:item})
    //     }
    //     if(item.type==1||item.type==0){
            
    //         const id = item.id
    //         HttpClientget("http://219.152.167.194:40080/appBiz/showMsg/"+id).then((e)=>{
    //             console.log(e)
    //             sessionStorage.setItem("SpreadtrumDetail",JSON.stringify(e))
    //             this.props.history.push(`/detail`)
    //         })        
    //     }

    // }
    goSecond=(item)=>{
        const homeScroll = document.getElementById('PullToRefresh').scrollTop
        sessionStorage.setItem('homeList',JSON.stringify(this.state.list))
        sessionStorage.setItem('homeScroll',homeScroll)
        const id = item.id
        window.android.jsStartWebViewActivity("http://museum.renneng.net/museumAPP/index.html#/detail?a&userId=77&id="+id)

    }
   
    render() {
        const _that = this
        return (
            <div className="spreadtrum">
                        
                        {/* <div className="newBackground2">

                        </div> */}
                        <div style={{display:"flex",position:"relative",top:-50}} id="PullToRefresh">
                        <div className="left" style={{width:"50%"}}>
                            {
                                this.state.list.map((item,index)=>{
                                    if(index ==0){
                                        return <div key={index+"left"} style={{width:"96%",padding:"10px 0px"}} onClick={this.goSecond.bind(this,item)}>
                                                    <div style={{position:"relative",borderLeft:"1px solid #207E90",borderRight:"1px solid #207E90",marginLeft:"5px",marginBottom:"7px"}}>
                                                        <p style={{position:"absolute",left:0,bottom:15,background:"#F4B840",color:"white",display:item.price==null?"none":"block"}}>￥{item.price}</p>
                                                        <img src={biandown} alt="" style={{position:"absolute",bottom:0,width:"100%"}}/>
                                                        <img src={bianup} alt="" style={{position:"absolute",top:0,width:"100%"}}/>
                                                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"5px 0"}}>
                                                            <img src={item.picture} alt="" style={{width:"90%"}}/>
                                                        </div>
                                                    </div>
                                                    <div className="homeTitle" style={{fontSize:"12px",marginTop:"5px",marginLeft:"5px",marginBottom:"5px"}}>
                                                        {item.title.length>27?item.title.slice(0,27)+"...":item.title}

                                                    </div>
                                                    <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px"}}>
                                                        <p style={{fontSize:"9px",color:"grey"}}>{item.museumName}</p>
                                                    </div>
                                                    <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px"}}>
                                                        <p style={{fontSize:"10px",color:"black"}}>{item.showTime}</p>
                                                    </div>
    
                                                </div>
                                    }
                                })
                            }{
                                this.state.list.map((item,index)=>{
                                    if(index%2 ==0&&index !=0){
                                        return <div key={index+"left"} style={{width:"96%",padding:"10px 0"}} onClick={this.goSecond.bind(this,item)}>
                                                    <div style={{position:"relative",borderLeft:"1px solid #207E90",borderRight:"1px solid #207E90",marginLeft:"5px",marginBottom:"7px"}}>
                                                        <p style={{position:"absolute",left:0,bottom:15,background:"#F4B840",color:"white",display:item.price==null?"none":"block"}}>￥{item.price}</p>
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
                                                        <p style={{fontSize:"10px",color:"black"}}>{item.showTime}</p>
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
                                                    <div style={{position:"relative",borderLeft:"1px solid #207E90",borderRight:"1px solid #207E90",marginBottom:"7px"}}>
                                                        <p style={{position:"absolute",left:0,bottom:15,background:"#F4B840",color:"white",display:item.price==null?"none":"block"}}>￥{item.price}</p>
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
                                                            <p style={{fontSize:"10px",color:"black"}}>{item.showTime}</p>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                        }
                                    })
                                }
                        </div>
                    </div>
                     <div style={{width:"100%",textAlign:"center",color:"#57717C"}}>
                        <p style={{padding:"10px 0"}}>{this.state.showBottom?"已经到底了 ↑":""}</p>
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
                    
                    {
                            this.state.loading?
                            <div style={{display:"flex",justifyContent:"center"}}>
                                <img src={loading} alt=""/>
                            </div>
                        :
                        <div style={{display:"flex"}}>
                        <div className="left" style={{width:"50%"}}>
                            {
                                this.state.list.map((item,index)=>{
                                    if(index ==0){
                                        return <div key={index+"left"} style={{width:"96%",padding:"10px 0px"}} onClick={this.goSecond.bind(this,item)}>
                                                    <div style={{position:"relative",borderLeft:"1px solid #207E90",borderRight:"1px solid #207E90",marginLeft:"5px",marginBottom:"7px"}}>
                                                        <p style={{position:"absolute",left:0,bottom:15,background:"#F4B840",color:"white",display:item.price==null?"none":"block"}}>￥{item.price}</p>
                                                        <img src={biandown} alt="" style={{position:"absolute",bottom:0,width:"100%"}}/>
                                                        <img src={bianup} alt="" style={{position:"absolute",top:0,width:"100%"}}/>
                                                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"5px 0"}}>
                                                            <img src={item.picture} alt="" style={{width:"90%"}}/>
                                                        </div>
                                                    </div>
                                                    <div className="homeTitle" style={{fontSize:"12px",marginTop:"5px",marginLeft:"5px",marginBottom:"5px"}}>
                                                        {item.title.length>27?item.title.slice(0,27)+"...":item.title}

                                                    </div>
                                                    <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px",marginBottom:"5px"}}>
                                                        <p style={{fontSize:"9px",color:"grey"}}>{item.museumName}</p>
                                                    </div>
                                                    <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px"}}>
                                                        <p style={{fontSize:"10px",color:"black"}}>{item.showTime}</p>
                                                    </div>
    
                                                </div>
                                    }
                                })
                            }{
                                this.state.list.map((item,index)=>{
                                    if(index%2 ==0&&index !=0){
                                        return <div key={index+"left"} style={{width:"96%",padding:"10px 0"}} onClick={this.goSecond.bind(this,item)}>
                                                    <div style={{position:"relative",borderLeft:"1px solid #207E90",borderRight:"1px solid #207E90",marginLeft:"5px",marginBottom:"7px"}}>
                                                        <p style={{position:"absolute",left:0,bottom:15,background:"#F4B840",color:"white",display:item.price==null?"none":"block"}}>￥{item.price}</p>
                                                        <img src={biandown} alt="" style={{position:"absolute",bottom:0,width:"100%"}}/>
                                                        <img src={bianup} alt="" style={{position:"absolute",top:0,width:"100%"}}/>
                                                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"5px 0"}}>
                                                            <img src={item.picture} alt="" style={{width:"90%"}}/>
                                                        </div>                                                    
                                                    </div>
                                                    <div  className="homeTitle" style={{fontSize:"12px",marginTop:"5px",marginLeft:"5px",marginBottom:"5px"}}>
                                                    {item.title.length>27?item.title.slice(0,27)+"...":item.title}

                                                    </div>
                                                    <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px",marginBottom:"5px"}}>
                                                        <p style={{fontSize:"9px",color:"grey"}}>{item.museumName}</p>
                                                    </div>
                                                    <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"5px"}}>
                                                        <p style={{fontSize:"10px",color:"black"}}>{item.showTime}</p>
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
                                                    <div style={{position:"relative",borderLeft:"1px solid #207E90",borderRight:"1px solid #207E90",marginBottom:"7px"}}>
                                                        <p style={{position:"absolute",left:0,bottom:15,background:"#F4B840",color:"white",display:item.price==null?"none":"block"}}>￥{item.price}</p>
                                                        <img src={biandown} alt="" style={{position:"absolute",bottom:0,width:"100%"}}/>
                                                        <img src={bianup} alt="" style={{position:"absolute",top:0,width:"100%"}}/>
                                                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"5px 0"}}>
                                                            <img src={item.picture} alt="" style={{width:"90%"}}/>
                                                        </div>
                                                    </div>
                                                        <div className="homeTitle" style={{fontSize:"12px",marginTop:"5px",marginBottom:"5px"}}>
                                                        {item.title.length>27?item.title.slice(0,27)+"...":item.title}
                                                        </div>
                                                        <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"5px"}}>
                                                            <p style={{fontSize:"9px",color:"grey"}}>{item.museumName}</p>
                                                        </div>
                                                        <div style={{display:"flex",justifyContent:"flex-end"}}>
                                                            <p style={{fontSize:"10px",color:"black"}}>{item.showTime}</p>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                        }
                                    })
                                }
                        </div>
                    </div>
                        }
                     <div style={{width:"100%",textAlign:"center",color:"#57717C"}}>
                        <p style={{padding:"10px 0"}}>{this.state.showBottom?"已经到底了 ↑":""}</p>
                    </div>
                    </PullToRefresh> */}
                 
                

            </div>

        ) 
    }
   
}

export default spreadtrum3;