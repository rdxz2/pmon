import Axios from 'axios';
import decode from 'jwt-decode';
import { stringify } from 'querystring';

import { IDENTITY_CONFIGURATION } from '../constants/ConstIdentityConfigurations';
import { isEmptyObject } from '../utilities/UtlDataManipulator';

export default class SvsApiPmon {
  constructor(apiInformation) {
    this.baseUrl = apiInformation.baseUrl;
    this.name = apiInformation.name;
  }

  // send request to api
  async send(endPointName, method, data, errorMessage) {
    const authorization = this.isAuthenticated() ? `Bearer ${this.getToken()}` : null;

    try {
      return await Axios(`${this.baseUrl}/${endPointName}`, {
        method,
        data,
        headers: { Authorization: authorization }
      });
    } catch (err) {
      let message = '';

      // if response is received from api
      if (err.response) {
        switch (err.response.status) {
          // bad request -> get error message from server's response
          case 400:
            message = err.response.data;
            break;
          // unauthorized
          case 401:
            message = 'Your are currently not authorized, please log in again';
            this.logout();
            window.location = '/login';
            break;
          // not found
          case 404:
            message = 'Server not found';
            break;
          // internal server error
          case 500:
            message = 'There are errors in server';
            break;
          default:
            message = 'Failed to get response from server';
            break;
        }
      }
      // failed sending request
      else message = errorMessage;

      throw new Error(message);
    }
  }

  // send request (table)
  async getTable(endPointName = '', show = 0, page = 0, search = {}, sort = {}) {
    try {
      const res = await this.send(
        `${endPointName}/table`,
        'post',
        { show, page, search, sort },
        'Failed getting table data'
      );
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
      const res = await this.send(
        `${endPointName}/dd`,
        'post',
        { search, requiredIds, alreadyIds, show },
        'Failed getting dropdown data'
      );
      return res.data;
    } catch (err) {
      throw err.message;
    }
  }

  // send request (anything)
  async sendRequest(endPointName = '', method = '', data = {}, errorMessage) {
    try {
      // cleanse empty array element only if data is not empty
      if (!isEmptyObject(data || {})) {
        let key;
        for (key in data)
          if (data.hasOwnProperty(key)) if (Array.isArray(data[key])) data[key] = data[key].filter(v => v !== null);
      }

      const res = await this.send(endPointName, method, data, errorMessage || 'Failed sending request to server');
      return res.data;
    } catch (err) {
      throw err.message;
    }
  }

  // log in to identity server
  login = async dataLogin => {
    try {
      const res = await Axios.post(
        // server's token endpoint
        this.baseUrl + '/connect/token',
        // oidc data + user login
        stringify({ ...IDENTITY_CONFIGURATION, ...dataLogin }),
        // x-www-form-urlencoded request format
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      this.setToken(res.data.access_token);
    } catch (err) {
      throw new Error('Wrong username/password').message;
    }
  };

  // log ouut from identity server
  logout = () => this.removeToken();
  // get user profile from access token
  getProfile = () => decode(this.getToken());
  // check if access token is valid
  isAuthenticated = () => {
    const token = this.getToken();
    return !!token && !this.isExpired(token);
  };

  // utils
  // token setter
  setToken = token => localStorage.setItem('pmon_access_token', token);
  // token getter
  getToken = () => localStorage.getItem('pmon_access_token');
  // token remover
  removeToken = () => localStorage.removeItem('pmon_access_token');
  // check if token is expired
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
