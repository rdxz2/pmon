import decode from 'jwt-decode';

class SvsJwt {
  getJwt = jwtString => localStorage.getItem(jwtString);
  setJwt = (jwtString, token) => localStorage.setItem(jwtString, token);
  clearJwt = jwtString => localStorage.removeItem(jwtString);
  getUserProfile = jwtString => decode(this.getJwt(jwtString));
  authenticate = jwtString => {
    const token = this.getJwt(jwtString);
    return !!token && !this.isExpired(token);
  };
  isExpired = token => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  };
}

export default SvsJwt;
