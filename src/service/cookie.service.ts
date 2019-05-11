export class CookieManager {

    constructor() {

    }

    public readCookie() {
        return JSON.parse(sessionStorage.getItem('userInfo'));
    }

    public setCookie = cookieDetails => {
        // tslint:disable-next-line:max-line-length
        sessionStorage.setItem('userInfo', `{"userDetails":{"name":"${cookieDetails.name}","room":"${cookieDetails.channel}","isAdmin":"${cookieDetails.isAdmin}"}}`);
    }

    public clearCookies = () => {
        sessionStorage.removeItem('userInfo');
    }

}
