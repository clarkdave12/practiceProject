const apiDomain = 'http://localhost:8000';

export const registerURL = apiDomain + '/api/register'
export const loginURL = apiDomain + '/oauth/token'
export const userURL = apiDomain + '/api/user'


export const getHeader = () => {
    const token = window.localStorage.getItem('access_token')

    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    return headers
}

export const isAuth = () => {
    const token = window.localStorage.getItem('access_token')

    if(token) 
        return true
    else  
        return false
}