import React, { Component } from 'react';
import {  Picker, List, Toast,DatePicker, Switch, Calendar } from 'antd-mobile';
import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';
import 'antd-mobile/dist/antd-mobile.css';
import '../Style/all.css'
import left from "../Img/左.png";
import ren from "../Img/ren.png";
import shouji from "../Img/shouji.png";
import shuzi from "../Img/shuzi.png";
import xingbie from "../Img/xingbie.png";
import yzm from "../Img/yzm.png";
import zhengjian from "../Img/zhengjian.png";
import gou from "../Img/gou.png";
import rili from "../Img/日历.png";
import {url} from '../url'
import {HttpClient, HttpClientget, HttpClientpost,HttpClientput,HttpClientdelete,FetchApi} from '../AxiosUtils';
const nowTimeStamp = Date.now();
const now1 = new Date(nowTimeStamp);
function formatDate(date) {
    /* eslint no-confusing-arrow: 0 */
    const pad = n => n < 10 ? `0${n}` : n;
    const dateStr = `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    return `${dateStr} ${timeStr}`.substr(0,10);
  }

  const extra = {
    '2017/07/15': { info: 'Disable', disable: true },
  };
  
  const now = new Date();
  extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = { info: 'Disable', disable: true };
  extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = { info: 'Disable', disable: true };
  extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = { info: 'Disable', disable: true };
  extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = { info: 'Disable', disable: true };
  
  Object.keys(extra).forEach((key) => {
    const info = extra[key];
    const date = new Date(key);
    if (!Number.isNaN(+date) && !extra[+date]) {
      extra[+date] = info;
    }
  });
class subscribe extends Component {
    originbodyScrollY = document.getElementsByTagName('body')[0].style.overflowY;
    constructor(props) {
        super(props);
     
        this.state={
            showGerden:false,
            showCard:false,
            gender:"请选择性别",
            cardType:"请选择证件类型",
            success:false,
            countDown:60,
            showCountDown:false,
            joinTime:this.props.location.state.joinTime,
            endTime:this.props.location.state.endTime,
            date: formatDate(now),
            time: now,
            visible: false,
            en: false,
            show: false,
            config: {},
        }
    }
    renderBtn(zh, en, config = {}) {
        config.locale = this.state.en ? enUS : zhCN;
    
        return (
          <List.Item arrow="horizontal"
            onClick={() => {
              document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
              this.setState({
                show: true,
                config,
              });
            }}
          >
            {this.state.en ? en : zh}
          </List.Item>
        );
      }
      onConfirm = (startTime, endTime) => {
          console.log(formatDate(startTime))
          
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
          show: false,
          startTime,
          date:formatDate(startTime)
        });
      }
    
      onCancel = () => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
          show: false,
          startTime: undefined,
        });
      }
    componentWillMount() {
       console.log(new Date(this.state.endTime).getTime())
       
    }
    componentDidMount(){
        
    }
    goBack=()=>{
        this.props.history.goBack()
    }
    showGerden=()=>{
        this.setState({
            showGerden:true
        })
    }
    showCard=()=>{
        this.setState({
            showCard:true
        })
    }
    selectGerden(type){
        if(type==1){
            this.setState({
                gender:"男",
                showGerden:false
            })
        }else{
            this.setState({
                gender:"女",
                showGerden:false
            })
        }
    }
    selectCard(type){
        if(type==1){
            this.setState({
                cardType:"身份证",
                showCard:false
            })
        }
        if(type==2){
            this.setState({
                cardType:"学生证",
                showCard:false
            })
        }
        if(type==3){
            this.setState({
                cardType:"军官证",
                showCard:false
            })
        }
        if(type==4){
            this.setState({
                cardType:"护照",
                showCard:false
            })
        }
        if(type==5){
            this.setState({
                cardType:"户口本",
                showCard:false
            })
        }
        if(type==6){
            this.setState({
                cardType:"社保卡",
                showCard:false
            })
        }
    }
//获取验证码
getVerification=()=>{

    const phone = document.getElementById("phoneNumber").value
    const phone2=/^[1][3,4,5,7,8][0-9]{9}$/;
    const _that = this
    if(phone==""||phone==null){
        Toast.info("手机号码不能为空",1.5,"",false)
        return
    }
    if(!phone2.test(phone)){
        Toast.info("手机号码格式不对",1.5,"",false)
        return

    }
    
    this.setState({
        showCountDown:true,
    },()=>{
        HttpClientget(url+"/appBiz/verify/getVerifyCode/"+phone).then((e)=>{
            console.log(e)
            if(e.rspCode==1){
                Toast.success("验证码已发送",1.5,"",false)
                    this.state.interval = setInterval(() => 
                    {
                        this.setState({
                            countDown:this.state.countDown-1
                        },()=>{
                            console.log(this.state.countDown)
                            if(this.state.countDown==0){
                                clearInterval(this.state.interval)
                                this.setState({
                                    showCountDown:false,
                                    countDown:60
                                })
                            }
                        })
                    }

                    , 1000);
            }
            if(e.rspCode==3){
                Toast.success("验证码发送失败，请检查手机格式",1.5,"",false)
            }
        })
    })
    
}
submit=()=>{
    
    const name = document.getElementById("name").value
    const phoneNumber = document.getElementById("phoneNumber").value
    const verification = document.getElementById("verification").value
    const cardNumber = document.getElementById("cardNumber").value

    
    if(new Date(this.state.date).getTime()>new Date(this.state.endTime).getTime()){
        Toast.info("选择时间不得超过活动结束时间",1.5,"",false)
        return
    }
    if(name==""){
        Toast.info("请填写名字",1.5,"",false)
        return
    }
    if(this.state.gender=="请选择性别"){
        Toast.info("请选择性别",1.5,"",false)
        return
    }
    if(phoneNumber==""){
        Toast.info("请填写手机号",1.5,"",false)
        return
    }
    
    if(verification==""){
        Toast.info("请填写验证码",1.5,"",false)
        return
    }
    if(this.state.cardType=="请选择证件类型"){
        Toast.info("请选择证件类型",1.5,"",false)
        return
    }
    if(cardNumber==""){
        Toast.info("请填写证件号",1.5,"",false)
        return
    }
    if(this.state.date==""){
        Toast.info("请选择参加时间",1.5,"",false)
        return
    }
    
    const userId= this.props.location.state.userId
    const id = this.props.location.state.id
    const from = name+","+this.state.gender+","+phoneNumber+","+verification+","+this.state.cardType+","+cardNumber+","+this.state.date

    console.log(name,phoneNumber,verification,cardNumber)
    HttpClientget(url+"/appBase/verify/checkVerifyCode/"+phoneNumber+"/"+verification,{
    }).then((e)=>{
        console.log(e)
        if(e.rspCode==1){
            HttpClientpost(url+"/appAct/act/bookAct",{
                userId:userId,
                bookInfo:from,
                actId:id,
                joinTime:this.state.joinTime.substr(0,10)
            }).then((e)=>{
                console.log(e)
                if(e.rspCode==1){
                    this.setState({
                        success:true
                    })
                }else{
                    Toast.fail("预约失败",1.5,"",false)
                }
            })
        }else{
            Toast.fail("验证码错误",1.5,"",false)
        }
    })
    
    
}
close=()=>{
    this.setState({
        success:false
    })
}
kong=()=>{

}
//我的活动
goAct=()=>{
    window.android.jsStartMyActivityOrder()
}
close=()=>{
    this.setState({
        showCard:false,
        showGerden:false,
        success:false
    })
}
close2=()=>{
    this.setState({
        showCard:false,
        showGerden:false,
        success:false
    },()=>{
        this.props.history.goBack()
    })
}



    render() {
        const {showGerden,showCard,success,showCountDown,countDown} =this.state
        return (
            <div className="app" style={{width:"100%",height:"100%",background:"white"}}>
                <div  style={{display:"flex",width:"100%",lineHeight:"55px",height:"50px",justifyContent:"space-between",background:"white"}}>
                        <img src={left} alt="" style={{width:"20px",height:"20px",marginLeft:"10px",marginTop:"20px"}} onClick={this.goBack}/>
                        <p style={{color:"black",fontSize:"16px"}}>
                            预约报名
                        </p>
                        <button style={{border:0,marginRight:"10px",background:"white"}}></button>
                </div>
                <div style={{width:"100%",height:"38px",background:"#E6DFCF",textAlign:"center",lineHeight:"38px",color:"#A99059"}}>
                真实有效的信息才能更好的通过审核哦！
                </div>
                <div style={{display:"flex",justifyContent:"space-around",width:"100%"}}>
                    <div style={{borderBottom:"1px solid #D1D1D1",width:"96%",padding:"10px",background:"white"}}>
                        <img src={ren} alt="" style={{width:"17px",height:"17px",marginLeft:"10px"}}/>
                        <input type="text" placeholder="请输入真实姓名" style={{border:"0",marginLeft:"30px",color:"grey",caretColor:"#a99059"}} id="name"/>                
                    </div>
                </div>

                <div style={{display:"flex",justifyContent:"space-around",width:"100%"}}>
                    <div style={{borderBottom:"1px solid #D1D1D1",width:"96%",padding:"10px",background:"white",position:"relative"}} onClick={this.showGerden}>
                        <img src={xingbie} alt="" style={{width:"17px",height:"17px",marginLeft:"10px"}}/>
                        <input type="text"  style={{border:"0",marginLeft:"30px",color:"grey"}} value={this.state.gender}/>
                        <div style={{position:"absolute",width:"80%",height:"100%",zIndex:"100",top:0}}></div>
                    </div>
                </div>

                <div style={{display:"flex",justifyContent:"space-around",width:"100%"}}>
                    <div style={{borderBottom:"1px solid #D1D1D1",width:"96%",padding:"10px",background:"white"}}>
                        <img src={shouji} alt="" style={{width:"17px",height:"17px",marginLeft:"10px"}}/>
                        <input type="number" placeholder="请输入电话号码" style={{border:"0",marginLeft:"30px",color:"grey",caretColor:"#a99059"}} id="phoneNumber"/>                
                    </div>
                </div>

                <div style={{display:"flex",justifyContent:"space-around",width:"100%"}}>
                    <div style={{borderBottom:"1px solid #D1D1D1",width:"96%",padding:"10px",background:"white",display:"flex"}}>
                        <img src={yzm} alt="" style={{width:"17px",height:"17px",marginLeft:"10px"}}/>
                        <input type="text" placeholder="请输入验证码" style={{border:"0",marginLeft:"30px",width:"50%",color:"grey",caretColor:"#a99059"}} id="verification"/>
                        <div onClick={showCountDown?this.kong:this.getVerification} style={{color:"#A99059"}}>{showCountDown?countDown+"秒":"获取验证码"}</div>                
                    </div>
                </div>

                <div style={{display:"flex",justifyContent:"space-around",width:"100%"}}>
                    <div style={{borderBottom:"1px solid #D1D1D1",width:"96%",padding:"10px",background:"white",position: "relative"}} onClick={this.showCard}>
                        <img src={zhengjian} alt="" style={{width:"17px",height:"17px",marginLeft:"10px"}}/>
                        <input type="text"  style={{border:"0",marginLeft:"30px",color:"grey"}} value={this.state.cardType}/>  
                        <div style={{position:"absolute",width:"80%",height:"100%",zIndex:"100",top:0}}></div>
                    </div>
                </div>
                
                <div style={{display:"flex",justifyContent:"space-around",width:"100%"}}>
                    <div style={{borderBottom:"1px solid #D1D1D1",width:"96%",padding:"10px",background:"white"}}>
                        <img src={shuzi} alt="" style={{width:"17px",height:"17px",marginLeft:"10px"}}/>
                        <input type="text" placeholder="请输入证件号" style={{border:"0",marginLeft:"30px",color:"grey",caretColor:"#a99059"}} id="cardNumber"/>                
                    </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-around",width:"100%"}}>
                    <div style={{display:"flex",borderBottom:"1px solid #D1D1D1",width:"96%",background:"white"}}>
                        <img src={rili} alt="" style={{width:"17px",height:"17px",marginLeft:"10px",marginTop:"10px",marginLeft:"20px"}}/>
                        {/* <DatePicker
                        value={this.state.date}
                        onChange={date => this.setState({ date },()=>{
                            console.log(date,new Date(this.state.date).getTime())
                        })}
                        onValueChange={date => console.log(date)}
                        mode="date"
                        style={{width:"100%"}}
                        >
                        <List.Item arrow="horizontal">请选择参加时间</List.Item>
                        </DatePicker> */}
                        {this.renderBtn('选择参加日期', 'Select Date', { type: 'one' })}
                        <input type="text" value={this.state.date} disabled={true} style={{width:"40%",textAlign:"center",backgroundColor:"white"}}/>
                        <Calendar
                        {...this.state.config}
                        visible={this.state.show}
                        onCancel={this.onCancel}
                        onConfirm={this.onConfirm}
                        onSelectHasDisableDate={this.onSelectHasDisableDate}
                        getDateExtra={this.getDateExtra}
                        defaultDate={now}
                        minDate={new Date(+now - 5184000000)}
                        maxDate={new Date(+now + 31536000000)}
                        />
                    </div>
                </div>
                <div style={{width:"100%",display:"flex",justifyContent:"center",position:"fixed",bottom:"20px"}} onClick={this.submit}>
                    <div style={{width:"96%",height:"42px",background:"#A99059",borderRadius:"20px",color:"white",textAlign:"center",lineHeight:"42px",fontSize:"20px"}}>
                            提交
                    </div>

                </div>

                <div style={{width:"100%",position:"fixed",bottom:"0",display:showGerden?"block":"none",background:"white",zIndex:"100"}}>
                    <div style={{width:"100%",borderBottom:"1px solid black",padding:"10px 0",textAlign:"center",background:"white"}} onClick={this.selectGerden.bind(this,1)}>
                        男
                    </div>
                    <div style={{width:"100%",padding:"10px 0",textAlign:"center",background:"white"}} onClick={this.selectGerden.bind(this,2)}>
                        女
                    </div>
                </div>

                {showCard==true||showGerden==true||success==true?
                <div onClick={this.close} style={{position:"absolute",top:0,width:"100%",height:"100%",background:"black",opacity:"0.3"}}>
                </div>:""}
                

                <div style={{width:"100%",position:"fixed",bottom:"0",display:showCard?"block":"none",background:"#F1F1F1"}}>
                    <div style={{width:"100%",padding:"10px 0",background:"#F1F1F1",display:"flex",justifyContent:"center"}} onClick={this.selectCard.bind(this,1)}>
                        <div style={{textAlign:"center",borderBottom:"1px solid #D1D1D1",width:"90%"}}>
                            身份证
                        </div>
                    </div>
                    <div style={{width:"100%",padding:"10px 0",textAlign:"center",background:"#F1F1F1",display:"flex",justifyContent:"center"}} onClick={this.selectCard.bind(this,2)}>
                        <div style={{textAlign:"center",borderBottom:"1px solid #D1D1D1",width:"90%"}}>
                            学生证
                        </div>
                    </div>
                    <div style={{width:"100%",padding:"10px 0",textAlign:"center",background:"#F1F1F1",display:"flex",justifyContent:"center"}} onClick={this.selectCard.bind(this,3)}>
                        <div style={{textAlign:"center",borderBottom:"1px solid #D1D1D1",width:"90%"}}>
                            军官证
                        </div>
                    </div>
                    <div style={{width:"100%",padding:"10px 0",textAlign:"center",background:"#F1F1F1",display:"flex",justifyContent:"center"}} onClick={this.selectCard.bind(this,4)}>
                        <div style={{textAlign:"center",borderBottom:"1px solid #D1D1D1",width:"90%"}}>
                            护照
                        </div>
                    </div>
                    <div style={{width:"100%",padding:"10px 0",textAlign:"center",background:"#F1F1F1",display:"flex",justifyContent:"center"}} onClick={this.selectCard.bind(this,5)}>
                        <div style={{textAlign:"center",borderBottom:"1px solid #D1D1D1",width:"90%"}}>
                            户口本
                        </div>
                    </div>
                    <div style={{width:"100%",padding:"10px 0",textAlign:"center",background:"#F1F1F1",display:"flex",justifyContent:"center"}} onClick={this.selectCard.bind(this,6)}>
                            社保卡
                    </div>
                </div>
       
                <div style={{position:"fixed",top:"30%",width:"100%",display:success?"flex":"none",justifyContent:"center",alignItems:"center"}}>
                    <div style={{width:"226px",height:"173px",background:"white",opacity:1,borderRadius:"5px" }}>
                        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                            <img src={gou} alt="" style={{width:"33px",height:"33px"}}/>
                        </div>
                        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                            <p style={{fontSize:"18px",color:"black"}}>已提交</p>
                        </div>
                        <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
                            <p style={{fontSize:"14px",color:"black"}}>您的预约已提交审核</p>
                        </div>
                        <div style={{width:"100%",display:"flex",justifyContent:"space-around"}}>
                            <button onClick={this.goAct} style={{background:"#F4B639",color:"white",width:"90px",height:"30px",textAlign:"center",lineHeight:"30px",border:"0",borderRadius:"3px"}}>我的活动</button>

                            <button onClick={this.close2} style={{background:"#D0D0D0",color:"white",width:"90px",height:"30px",textAlign:"center",lineHeight:"30px",border:"0",borderRadius:"3px"}}>关闭</button>
                        </div>
                    </div>
                </div>
           
            
        </div>
        ) 
    }
   
}

export default subscribe;