import React, { useState, useEffect } from "react";
import ConnectComponent from "./components/connect.component";
import SyncComponent from "./components/sync.component";
import Spinner from "./components/spinner/sprinner.component";
import { loginWithCode, disconnect, loginWithAccessToken } from "./services/authentivate.service";
import { sync } from "./services/activity.service";
import Toast from "./components/toast/toast.component";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState({});
    const [toastContent, setToastContent] = useState('');
    const [toastStatus, setToastStatus] = useState('success');
    const [toastOpen, setToastOpen] = useState(false);

    useEffect(() => {

        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get('code');
        if (code) {
            loginWithCode(code).then(data => {
                afterCallLoginSuccess(data);
            }).catch(err => {
                openToast("Could not connect user.", "error");
                setLoading(false);
                replaceHost();
            });
        } else {
            const accessToken = localStorage.getItem("access_token");
            
            if (accessToken) {
                loginWithAccessToken(accessToken).then(data => {
                    afterCallLoginSuccess(data);
                }).catch(err => {
                    openToast("Could not connect user.", "error");
                    setLoading(false);
                    replaceHost();
                });
            }else{
                setLoading(false);
            }
        }

    }, []);

    const afterCallLoginSuccess = (data) => {
        setLoggedIn(true);
        setLoading(false);
        setToken(data.access_token);
        localStorage.setItem("access_token", data.access_token);
        setUser(data.athlete);
        replaceHost();
        openToast("User connected", "success");
    }

    const disconnector = () => {
        setLoading(true);
        disconnect(token).then(() => {
            setLoading(false);
            setLoggedIn(false);
            setUser({});
            setToken(null);
            openToast("User disconnected", "success");
        }).catch(err => {
            openToast("Could not disconenct user", "error");
        });
    };
    const syncActivities = () => {
        sync(token).then(() => {
            openToast("User activites synced", "success");
        }).catch(err => {
            openToast("Sync activities failed", "error");
        });
    };
    const openToast = (message, status) => {
        setToastOpen(true);
        setToastStatus(status);
        setToastContent(message);
        let timeout = setTimeout(() => {
            closeToast(timeout);
        }, 2500);
    };

    const closeToast = (toastTimeOut) => {
        setToastOpen(false);
        setToastStatus("");
        setToastContent("");
        clearTimeout(toastTimeOut);
    };

    const replaceHost = () => {
        const host = window.location.protocol + "//" + window.location.host;
        window.history.replaceState({}, document.title, host);
    }

    const mainComponent = loggedIn ? <SyncComponent user={user} disconnector={disconnector} sync={syncActivities}></SyncComponent> : <ConnectComponent></ConnectComponent>
    return <>
        {
            loading && <Spinner></Spinner>
        }
        {
            !loading && mainComponent
        }
        <Toast content={toastContent} isOpen={toastOpen} status={toastStatus}></Toast>
    </>
}

export default App