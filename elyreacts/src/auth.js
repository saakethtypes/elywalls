class Auth {
  constructor() {
    let jwt = localStorage.getItem('jwt')
    if(jwt)
      this.logged = true;
    else
      this.logged =false;
  }
  login(cb) {
    this.logged = true;
    cb();
  }
  logout(cb) {
    this.logged = false;
    cb();
  }
  islogged() {
    return this.logged;
  }
}

export default new Auth();
