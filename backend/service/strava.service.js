const url = require('url');
const axios = require('axios');
const configuration = require('../configuration/configuration');
const restClient = new axios.Axios({
    baseURL: configuration.stravaBaseURL || 'https://www.strava.com'
});

function _attachClientInfoToFormData(xEncodedForm) {
    xEncodedForm.append('client_id', configuration.stravaClientID);
    xEncodedForm.append('client_secret', configuration.stravaClientSecret);
}

const exchangeCodeForToken = async (code) => {
    const xEncodedForm = new url.URLSearchParams();
    xEncodedForm.append('code', code);
    xEncodedForm.append('grant_type', 'authorization_code');
    _attachClientInfoToFormData(xEncodedForm);
    const response = await restClient.post('/api/v3/oauth/token', xEncodedForm.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'json'
    });
    return JSON.parse(response.data)
}

const refreshToken = async (refresh_token) => {
    const formData = new FormData();
    formData.append('refresh_token', refresh_token);
    formData.append('grant_type', 'refresh_token');
    _attachClientInfoToFormData(formData);
    const response = await restClient.post('/api/v3/oauth/token', formData);
    return response.data;
}

const deauthorize = async (accessToken) => {
    //oauth/deauthorize
    const response = await restClient.post(`/oauth/deauthorize?access_token=${accessToken}`);
    return response.data;
}

const getAccountInfo = async (accessToken) => {
    const response = await restClient.get('/api/v3/athlete', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return response.data;
}

const getListActivities = async (accessToken, pageOptions = {}) => {
    const before = pageOptions.before || new Date().getTime();
    const after = pageOptions.after || before - (3 * 86400000); // 3 day
    const page = pageOptions.page || 1;
    const perPage = pageOptions.perPage || 100;
    const urlPath = `/api/v3/athlete/activities?before=${before / 1000}&after=${after / 1000}&page=${page}&per_page=${perPage}`;
    const response = await restClient.get(urlPath, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        responseType: 'json'
    });
    return JSON.parse(response.data);
}

module.exports = {
    exchangeCodeForToken,
    refreshToken,
    getAccountInfo,
    deauthorize,
    getListActivities
}