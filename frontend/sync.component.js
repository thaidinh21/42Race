import React from "react";
import logo from './logo.png';
const SyncComponent = (props) =>{
    return <div className="center" >
        <div className="center" style={{width: '100%', marginBottom: '2em'}}>
            <img class="center" src={logo} width="178"></img>
        </div>
        <div className="center" style={{width: '100%', marginBottom: '2em'}}>
            <a className="alt-link center" href="https://www.strava.com/athletes/50617568" >https://www.strava.com/athletes/50617568</a>
        </div>
        <div className="center" style={{width: '100%', marginBottom: '2em'}}>
            <a className="button transparent-btn">Disconnect</a>
        </div>
        <a className="button">Sync</a>
    </div>
}

export default SyncComponent