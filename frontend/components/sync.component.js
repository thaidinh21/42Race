import React from "react";
import logo from '../logo.png';
const SyncComponent = (props) => {
    const {user, disconnector, sync} = props;
    const url =  `https://www.strava.com/athletes/${user.id}`;
    return <div className="center" >
        <div className="center" style={{width: '100%', marginBottom: '2em'}}>
            <img class="center" src={logo} width="178"></img>
        </div>
        <div className="center" style={{width: '100%', marginBottom: '2em'}}>
        <a className="alt-link center" href={url}>{url}</a>
        </div>
        <div className="center" style={{width: '100%', marginBottom: '2em'}}>
            <a className="button transparent-btn" onClick={disconnector}>Disconnect</a>
        </div>
        <a className="button" onClick={sync}>Sync</a>
    </div>
}

export default SyncComponent