import React from "react";
import logo from './logo.png';
const ConnectComponent = (props) =>{
    return <div className="center" >
        <div className="center" style={{width: '100%', marginBottom: '2em'}}>
            <img class="center" src={logo} width="178"></img>
        </div>
        
        <a className="button" href="https://www.strava.com/oauth/authorize?client_id=83020&response_type=code&redirect_uri=http://localhost:8888&approval_prompt=auto&scope=activity%3Awrite%2Cread%2Cactivity%3Aread">Connect</a>
    </div>
}

export default ConnectComponent