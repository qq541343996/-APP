import React, { Component } from 'react';
import { PullToRefresh, ListView,Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../Style/all.css'
function genData() {
    const dataArr = [];
    for (let i = 0; i < 20; i++) {
      dataArr.push(i);
    }
    return dataArr;
  }
class List extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 === row2,
        });
        this.state={
            list:[],
            loading:false,
            refreshing: true,
            dataSource,

        }
    }
    componentWillMount() {
       const {list} = this.state
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(list),
        })
         
    }
    componentDidMount(){
       
    }
    componentWillUnmount(){
        this.setState = () => { return; };
    }
    goDetail=()=>{
        this.props.history.push(`/detail`)
    }
    onEndReached = (event) => {
        const data = [
            {
                title:"中国当代陶瓷艺术展览（北京场）",
                address:"北京古代建筑博物馆",
                price:"1500",
                time:"2019/06/09-2019/06/15",
                status:"1"
            },
            {
                title:"中国当代陶瓷艺术展览（北京场）",
                address:"北京古代建筑博物馆",
                price:"1500",
                time:"2019/06/09-2019/06/15",
                status:"2"
            },
            {
                title:"中国当代陶瓷艺术展览（北京场）",
                address:"北京古代建筑博物馆",
                price:"1500",
                time:"2019/06/09-2019/06/15",
                status:"3"
            }
        ]
        const newList = [...this.state.list,...data]
        this.setState({
            list:newList
        },()=>{
            const {list} = this.state
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(list)
            })
        })
    };

    onRefresh = () => {
        this.setState({
            refreshing: true,
            isLoading: true,
        });
        setTimeout(() => {
            this.setState({
                refreshing: false,
                isLoading: false,
            });
        }, 600);
    };

    render() {
        const {list} = this.state;
            let index = 0;//data.length -1;
            const row = (rowData,sectionID,rowID) =>{

                if(index>0 && index<list.length){
                    if(index==list.length-1){
                        var item = list[index];
                        index = index
                    }else{
                        item = list[index];
                        index = index+1
                    }

                }else if(index==0){
                    item = list[index];
                    index++
                }
                return(

                    <div key={index} className="ul" style={{marginBottom:"8px",background:"white"}}> 
                                <div style={{fontSize:"13px",color:"#2B2B2B",marginBottom:"10px"}}>展览时间:{item.time}</div>
                                <div style={{width:"100%",borderBottom:"1px solid #DEDEDE"}}></div>
                                <div className="content" style={{display:"flex",paddingTop:"8px"}}>
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
                                    </div>
                                    <div>
                                        <div className="title" >{item.title}</div>
                                        <p className="address" style={{marginTop:"8px",color:"grey",fontSize:"11px"}}>{item.address}</p>
                                        <div style={{display:"flex",justifyContent:"space-between",marginTop:"13px"}}>
                                            <p style={{color:"#FF2828",fontSize:"12px",marginTop:"5px"}}>￥{item.price}</p>
                                            {
                                                item.status==1?<button className="btn" onClick={this.goDetail}>立即预约</button>
                                                :<button className="btn1" onClick={this.goDetail}>前往查看</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                )
            };
        return (
            <div className="app" style={{width:"100%",height:"100%",background:"#F7F7F7"}}>
            

            {/* <PullToRefresh
                damping={60}
                ref={el => this.ptr = el}
                style={{
                    height:"100%",
                overflow: 'auto',
                }}
                indicator={'上拉可以刷新' }
                direction={'up'}
                refreshing={this.state.refreshing}
                onRefresh={() => {
                const data = [
                    {
                        title:"中国当代陶瓷艺术展览（北京场）",
                        address:"北京古代建筑博物馆",
                        price:"1500",
                        time:"2019/06/09-2019/06/15",
                        status:"1"
                    },
                    {
                        title:"中国当代陶瓷艺术展览（北京场）",
                        address:"北京古代建筑博物馆",
                        price:"1500",
                        time:"2019/06/09-2019/06/15",
                        status:"2"
                    },
                    {
                        title:"中国当代陶瓷艺术展览（北京场）",
                        address:"北京古代建筑博物馆",
                        price:"1500",
                        time:"2019/06/09-2019/06/15",
                        status:"3"
                    }
                ]
                const newList = [...this.state.list,...data]
                this.setState({ refreshing: true ,list:newList});
                setTimeout(() => {
                    this.setState({ refreshing: false });
                }, 1000);
                }}
            >
                {
                this.state.list.map((item,index)=>{
                  return   <div key={index} className="ul" style={{marginBottom:"8px",background:"white"}}> 
                                <div style={{fontSize:"13px",color:"#2B2B2B",marginBottom:"10px"}}>展览时间:{item.time}</div>
                                <div style={{width:"100%",borderBottom:"1px solid #DEDEDE"}}></div>
                                <div className="content" style={{display:"flex",paddingTop:"8px"}}>
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
                                        <img src={img} alt="" style={{width:"107px",height:"69px",marginRight:"20px"}}/>
                                    </div>
                                    <div>
                                        <div className="title" >{item.title}</div>
                                        <p className="address" style={{marginTop:"8px",color:"grey",fontSize:"11px"}}>{item.address}</p>
                                        <div style={{display:"flex",justifyContent:"space-between",marginTop:"13px"}}>
                                            <p style={{color:"#FF2828",fontSize:"12px",marginTop:"5px"}}>￥{item.price}</p>
                                            {
                                                item.status==1?<button className="btn" onClick={this.goDetail}>立即预约</button>
                                                :<button className="btn1" onClick={this.goDetail}>前往查看</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                    })
            }
            </PullToRefresh> */}
               

            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderRow={row}
                className="am-list"
                pageSize={70}
                initialListSize={60}
                useBodyScroll
                scrollRenderAheadDistance={1000}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={1000}
                pullToRefresh={<PullToRefresh
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />}
            />
             <div>正在加载中...</div>
            </div>

        ) 
    }
   
}

export default List;