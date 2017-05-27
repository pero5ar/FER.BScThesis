class Auth {

    static authenticateUser(token, id) {
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
    }

    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    static deauthenticateUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static getId() {
        return localStorage.getItem('id');
    }

}

export default Auth;