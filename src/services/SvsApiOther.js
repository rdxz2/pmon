import Axios from 'axios';
import SvsJwt from './SvsJwt';
import { SERVER_ADDRESSES } from '../utils/UtlServerAddresses';
import { stringify } from 'querystring';
import { IDENTITY_CONFIGURATION } from '../utils/UtlIdentityConfigurations';

export default class SvsApiOther extends SvsJwt {
  constructor(apiInformation) {
    super(apiInformation);

    this.baseUrl = apiInformation.baseUrl;
    this.jwtString = `jwt${apiInformation.name}`;
  }

  // send request to api
  async send(endPointName, method, data, errorMessage) {
    const authorization = this.isAuthenticated() ? `Bearer ${this.getJwt(this.jwtString)}` : null;

    try {
      return await Axios(`${this.baseUrl}/${endPointName}`, { method, data, headers: { Authorization: authorization } });
    } catch (err) {
      let message = '';

      // response is received from api
      if (err.response) {
        switch (err.response.status) {
          // bad request
          case 400:
            message = err.response.data;
            break;
          // unauthorized
          case 401:
            message = 'your are currently not authorized, please log in again';
            this.logOut();
            // if (this.jwtString === 'pmonapijwt') window.location.reload();
            break;
          // internal server error
          case 500:
            message = 'there are errors in server';
            break;
          default:
            message = 'failed to fetch response from server';
            break;
        }
      }
      // failed sending request
      else message = errorMessage;

      throw new Error(message);
    }
  }

  // send request (tabel)
  async getTable(endPointName = '', show = 0, page = 0, search = {}, sort = {}) {
    try {
      const res = await this.send(`${endPointName}/table`, 'post', { show, page, search, sort }, 'failed getting table data');
      const tableData = {
        // kasih key untuk setiap row
        rows: res.data.data.map((v, k) => ({ ...v, key: k })),
        total: res.data.totalData
      };

      return tableData;
    } catch (err) {
      throw err.message;
    }
  }

  // send request (dropdown)
  async getDropdown(endPointName = '', search = '', requiredIds = {}, alreadyIds = [], show = 100) {
    try {
      const res = await this.send(`${endPointName}/dropdown`, 'post', { search, requiredIds, alreadyIds, show }, 'failed getting dropdown data');
      return res.data;
    } catch (err) {
      throw err.message;
    }
  }

  // send request (anything)
  async sendRequest(endPointName = '', method = '', data = {}) {
    try {
      const res = await this.send(endPointName, method, data, 'failed sending request to server');
      return res.data;
    } catch (err) {
      throw err.message;
    }
  }

  // utils
  login = async dataLogin => {
    if (this.jwtString !== 'pmonidentityjwt') throw new Error('cannot do identity login on non pmonapi identity server').message;

    try {
      const res = await Axios.post(
        // server's token endpoint
        SERVER_ADDRESSES.pmonidentity + '/connect/token',
        // oidc data + user login
        stringify({ ...IDENTITY_CONFIGURATION, ...dataLogin }),
        // x-www-form-urlencoded request format
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      localStorage.setItem(this.jwtString, res.data.access_token);
    } catch (err) {
      throw new Error('wrong username/password').message;
    }
  };
  login = token => this.setJwt(this.jwtString, token);
  logout = () => this.clearJwt(this.jwtString);
  isAuthenticated = () => this.authenticate(this.jwtString);
  getProfile = () => this.getUserProfile(this.jwtString);
}
