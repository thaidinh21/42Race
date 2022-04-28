
export function loginWithCode(code) {
    return fetch("/auth/exchange",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code })
        }
    ).then(data=>data.json());
}

export function loginWithAccessToken(accessToken) {
    return fetch("/auth/login",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ accessToken })
        }
    ).then(data=>data.json());
}

export function disconnect(accessToken) {
    return fetch("/auth/disconnect",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    );
}