import {
	HashRouter as Router,
	Route,
	Redirect,
	Switch
} from "react-router-dom"

import React from "react" //react必须导入
import App from "../Container/App"
import Home from '../Components/home'
import List from '../Components/list'
import Detail from '../Components/detail'
import Location from '../Components/location'
import Spreadtrum1 from '../Components/spreadtrum1'
import Spreadtrum2 from '../Components/spreadtrum2'
import Spreadtrum3 from '../Components/spreadtrum3'
import comment from '../Components/comment'
import rate from '../Components/rate'
import activityList from '../Components/activityList'
import activityDetail from '../Components/activityDetail'
import subscribe from '../Components/subscribe'
import videoList from '../Components/videoList'
import videoDetail from '../Components/videoDetail'
import museumDetail from '../Components/museumDetail'
import collDetail from '../Components/collDetail'
import recommend from '../Components/recommend'
import recommend2 from '../Components/recommend2'

import sponsor from '../Components/sponsor'



const router =(
	<Router>
		<App>
			<Switch>
				<Route path="/home" component={Home}/>
				<Route path="/list" component={List}/>
				<Route path="/detail" component={Detail}/>
				<Route path="/location" component={Location}/>
				<Route path="/spreadtrum1" component={Spreadtrum1}/>
				<Route path="/spreadtrum2" component={Spreadtrum2}/>
				<Route path="/spreadtrum3" component={Spreadtrum3}/>
				<Route path="/comment" component={comment}/>
				<Route path="/rate" component={rate}/>
				<Route path="/activityList" component={activityList}/>
				<Route path="/activityDetail" component={activityDetail}/>
				<Route path="/subscribe" component={subscribe}/>
				<Route path="/videoList" component={videoList}/>
				<Route path="/videoDetail" component={videoDetail}/>
				<Route path="/museumDetail" component={museumDetail}/>
				<Route path="/collDetail" component={collDetail}/>
				<Route path="/recommend" component={recommend}/>
				<Route path="/recommend2" component={recommend2}/>

				<Route path="/sponsor" component={sponsor}/>

				<Redirect from='*' to='/list' />
			</Switch>
		</App>
	</Router>

)
export default router;
