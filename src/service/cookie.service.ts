export class CookieManager {

    constructor() {

    }

    public readCookie() {
        return JSON.parse(document.cookie.split(';').find(cookie => cookie.includes('userDetails')))
    }

    public setCookie = cookieDetails => {
        // tslint:disable-next-line:max-line-length
        document.cookie = `{"userDetails":{"name":"${cookieDetails.name}","room":"${cookieDetails.channel}","isAdmin":"${cookieDetails.isAdmin}"}}`;
    }

    public clearCookies = () => {
        document.cookie = '';
    }

}
