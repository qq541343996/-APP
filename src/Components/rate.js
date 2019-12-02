import React, { Component } from 'react';
import left from "../Img/左.png";
import {Rate,message} from 'antd';
import 'antd/dist/antd.css';
import '../Style/all.css'
import {HttpClient, HttpClientget, HttpClientpost,HttpClientput,HttpClientdelete,FetchApi} from '../AxiosUtils';
import gou from '../Img/gou.png'
import {url} from '../url'
message.config({
    top: 10,
    duration: 1,
    maxCount: 1,
  });
class List extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            content:"",
            show:false,
            score:"",
            personCount:"",
            show:false,
            userId:JSON.parse(sessionStorage.getItem("userId")),
            rate1:0,
            rate2:0,
            rate3:0
        }
    }
    componentWillMount(){
        window.scrollTo(0,0)
        const rate = sessionStorage.getItem("rate")
        this.setState({
                content:JSON.parse(rate)
            },()=>{
                HttpClientpost(url+"/appBase/score/msgScore",{
                type: "1",
                fkId: this.state.content.id
                }).then((e)=>{
                    this.setState({
                        score:e.score,
                        personCount:e.personCount
                    })
                    console.log(e)
                })
            })
        
        
    }
   componentDidMount(){
       console.log(this.state.content)
   }
    submitRate=()=>{
        const {rate1,rate2,rate3,rate4,rate5,rate6,rate7,rate8,rate9,rate10,userId,content} = this.state
        const score = (rate1+rate2+rate3+rate4+rate5+rate6+rate7+rate8+rate9+rate10)/10
        if(rate1==0||rate2==0||rate3==0||rate4==0||rate5==0||rate6==0||rate7==0||rate8==0||rate9==0||rate10==0){
            message.error("您还未评分",1)
            return
        }
        HttpClientpost(url+"/appBase/score",{
            type: 1,
            score: score,
            userId: userId,
            fkId: content.id,
            remark: `${rate1},${rate2},${rate3},${rate4},${rate5},${rate6},${rate7},${rate8},${rate9},${rate10}`
        }).then((e)=>{
            
            console.log(e)
            if(e.rspCode==1){
                this.setState({
                    show:true,
                    score:e.score,
                    personCount:e.personCount
                })
            }
            if(e.rspCode==3){
                message.error("您已经评论过",1)
            }
        })
        
    }
    close=()=>{
        this.setState({
            show:false
        },()=>{
            this.props.history.goBack()
        })
    }
    goComment=()=>{
        const {content,userId} =this.state
        this.props.history.push({pathname:'/comment',state:{"id":content.id,"type":"1","userId":userId}})
    }
    onChange1 = value => {
        this.setState({
            rate1:value*2
        })
      };
    onChange2 = value => {
        this.setState({
            rate2:value*2
        })
      };
    onChange3 = value => {
        this.setState({
            rate3:value*2
        })
      };
    onChange4 = value => {
        this.setState({
            rate4:value*2
        })
      };
    onChange5 = value => {
        this.setState({
            rate5:value*2
        })
      };
    onChange6 = value => {
        this.setState({
            rate6:value*2
        })
      };
    onChange7 = value => {
        this.setState({
            rate7:value*2
        })
      };
    onChange8 = value => {
        this.setState({
            rate8:value*2
        })
      };
    onChange9 = value => {
        this.setState({
            rate9:value*2
        })
      };
    onChange10 = value => {
        this.setState({
            rate10:value*2
        })
      };
    goBack=()=>{
        this.props.history.goBack()
    }
    render() {
        const {content,score,personCount} =this.state
        return (
            <div className="app" style={{width:"100%",height:"100%"}}>
                <div className="rateTitle" style={{display:"flex",width:"100%",lineHeight:"50px",height:"200px",justifyContent:"space-between",marginBottom:"10px"}}>
                        <img src={left} alt="" style={{width:"20px",height:"20px",marginLeft:"10px",marginTop:"10px"}} onClick={this.goBack}/>
                        <p style={{color:"black",fontSize:"16px"}}>
                            添加评分
                        </p>
                        <div src="" alt="" style={{width:"30px",height:"30px",marginRight:"10px",marginTop:"10px"}} />
                </div>
                <div style={{margin:"0 5px",borderRadius:"10px",background:"white",paddingBottom:"30px",position:"relative",top:-90}}>
                    <div style={{width:"100%",display:"flex",justifyContent:"center",position:"relative",top:-50}}>
                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"117px",height:"117px",borderRadius:"50%",background:"white",boxShadow:"0px 1px 10px 0px rgba(0, 0, 0, 0.2)"}}>
                            <div style={{color:"#EFB746",display:"flex",justifyContent:"center"}}>
                                        <span style={{fontSize:"40px",fontWeight:600}}>{score}</span>
                                        <span style={{fontSize:"18px",display:"flex",alignItems:"center",marginTop:"5px",fontWeight:600}}>分</span>
                            </div>
                            <div style={{textAlign:"center"}}>{personCount}人评分</div>
                        </div>
                    </div>
                    
                    <p style={{color:"#7D7C7C",width:"100%",textAlign:"center",position:"relative",top:-30}}>
                    请对本展览进行评分，每个维度５星满分10分！
                    </p>
                    <div style={{display:"flex",margin:"20px 5px 0 0",position:"relative",top:-30}}>
                        <img src={content.picture} alt="" style={{width:"96px",height:"75px",marginLeft:"10px"}}/>
                        <div style={{marginLeft:"10px"}}>
                            <p style={{marginTop:"5px",fontSize:"14px",color:"black"}}> {content.title}</p>
                            <p style={{marginTop:"10px",fontSize:"12px",color:"#7D7C7C"}}>{content.address}</p>
                        </div>
                    </div>
                    {/* <div style={{display:"flex",justifyContent:"center",color:"#2B2B2B",alignItems:"center"}}>
                        <p style={{fontSize:"17px",marginRight:"20px"}}>专业度</p><Rate style={{fontSize:"30px",color:"#F4B639"}} onChange={this.onChange1}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"center",color:"#2B2B2B",alignItems:"center"}}>
                        <p style={{fontSize:"17px",marginRight:"20px"}}>创意度</p><Rate style={{fontSize:"30px",color:"#F4B639"}} onChange={this.onChange2}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"center",color:"#2B2B2B",alignItems:"center"}}>
                        <p style={{fontSize:"17px",marginRight:"20px"}}>满意度</p><Rate style={{fontSize:"30px",color:"#F4B639"}} onChange={this.onChange3}/>
                    </div> */}
                    <div style={{display:"flex",justifyContent:"space-between",color:"#2B2B2B",alignItems:"center",padding:"0 10px"}}>
                        <p style={{fontSize:"15px",marginRight:"10px"}}>展品精美度</p><Rate style={{fontSize:"26px",color:"#F4B639"}} onChange={this.onChange1}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",color:"#2B2B2B",alignItems:"center",padding:"0 10px"}}>
                        <p style={{fontSize:"15px",marginRight:"10px"}}>展品丰富度</p><Rate style={{fontSize:"26px",color:"#F4B639"}} onChange={this.onChange2}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",color:"#2B2B2B",alignItems:"center",padding:"0 10px"}}>
                        <p style={{fontSize:"15px",marginRight:"10px"}}>展览表现形式</p><Rate style={{fontSize:"26px",color:"#F4B639"}} onChange={this.onChange3}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",color:"#2B2B2B",alignItems:"center",padding:"0 10px"}}>
                        <p style={{fontSize:"15px",marginRight:"10px"}}>展览内容清楚易懂</p><Rate style={{fontSize:"26px",color:"#F4B639"}} onChange={this.onChange4}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",color:"#2B2B2B",alignItems:"center",padding:"0 10px"}}>
                        <p style={{fontSize:"15px",marginRight:"10px"}}>讲解服务</p><Rate style={{fontSize:"26px",color:"#F4B639"}} onChange={this.onChange5}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",color:"#2B2B2B",alignItems:"center",padding:"0 10px"}}>
                        <p style={{fontSize:"15px",marginRight:"10px"}}>相关配套活动丰富度</p><Rate style={{fontSize:"26px",color:"#F4B639"}} onChange={this.onChange6}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",color:"#2B2B2B",alignItems:"center",padding:"0 10px"}}>
                        <p style={{fontSize:"15px",marginRight:"10px"}}>策展专业度</p><Rate style={{fontSize:"26px",color:"#F4B639"}} onChange={this.onChange7}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",color:"#2B2B2B",alignItems:"center",padding:"0 10px"}}>
                        <p style={{fontSize:"15px",marginRight:"10px"}}>布展创意度</p><Rate style={{fontSize:"26px",color:"#F4B639"}} onChange={this.onChange8}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",color:"#2B2B2B",alignItems:"center",padding:"0 10px"}}>
                        <p style={{fontSize:"15px",marginRight:"10px"}}>博物馆公共设施齐全度</p><Rate style={{fontSize:"26px",color:"#F4B639"}} onChange={this.onChange9}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",color:"#2B2B2B",alignItems:"center",padding:"0 10px"}}>
                        <p style={{fontSize:"15px",marginRight:"10px"}}>观展满意度</p><Rate style={{fontSize:"26px",color:"#F4B639"}} onChange={this.onChange10}/>
                    </div>

                    <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"60px"}} onClick={this.submitRate}>
                        <div style={{width:"96%",height:"42px",background:"#A99059",borderRadius:"20px",color:"white",textAlign:"center",lineHeight:"42px",fontSize:"20px"}}>
                            提交
                        </div>

                    </div>
                </div>
                
                {
                    this.state.show?
                    <div>
                        <div style={{position:"fixed",top:0,width:"100%",height:"100%",background:"black",opacity:"0.3"}}>
                        </div>
                                <div style={{position:"fixed",top:"30%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <div style={{width:"226px",height:"173px",background:"white",opacity:1,borderRadius:"5px",borderRadius:"5px" }}>
                                        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                            <img src={gou} alt="" style={{width:"33px",height:"33px"}}/>
                                        </div>
                                        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                            <p style={{fontSize:"18px"}}>发布成功</p>
                                        </div>
                                        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                            <p style={{fontSize:"14px"}}>感谢您的评分，赠送10积分</p>
                                        </div>
                                        <div style={{width:"100%",display:"flex",justifyContent:"space-around",marginTop:"20px"}}>
                                            <button onClick={this.goComment} style={{background:"#F4B639",color:"white",width:"90px",height:"30px",textAlign:"center",lineHeight:"30px",border:"0",borderRadius:"3px"}}>去评论</button>

                                            <button onClick={this.close} style={{background:"#D0D0D0",color:"white",width:"90px",height:"30px",textAlign:"center",lineHeight:"30px",border:"0",borderRadius:"3px"}}>关闭</button>
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