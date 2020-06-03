import {createFullAddress} from "../utils/utils";
import {ERROR_MESSAGE, STORAGE_TYPES} from "../types/types";
import {handleError} from "../utils/errorHandler";

export default class Storage {
  setUserPosts(data) {
    this._setData(STORAGE_TYPES.USER_POSTS, JSON.stringify(data));
  }

  setUserData(data) {
    const userInfo = {
      firstName: data.name.first,
      lastName: data.name.last,
      email: data.email,
      phone: data.phone,
      fullAddress: createFullAddress(data.location)
    };

    this._setData(STORAGE_TYPES.USER_INFO, JSON.stringify(userInfo));
  }

  setUserAvatar(url) {
    this._setData(STORAGE_TYPES.USER_AVATAR, url);
  }

  setUserFriends(data) {
    const userFriends = {
      data: data.data,
      pages: data.total_pages,
      activePage: data.page
    };

    this._setData(STORAGE_TYPES.USER_FRIENDS, JSON.stringify(userFriends));
  }

  getUserFriends() {
    return JSON.parse(localStorage.getItem(STORAGE_TYPES.USER_FRIENDS));
  }

  getUserData(type) {
    let result = {};

    switch (type) {
      case STORAGE_TYPES.USER_INFO:
        result = this._selectUserInfo(JSON.parse(localStorage.getItem(type)));
        break;
      case STORAGE_TYPES.USER_AVATAR:
        result = localStorage.getItem(type);
        break;
      default:
        result = {};
    }

    return result;
  }

  getUserPosts() {
    return JSON.parse(localStorage.getItem(STORAGE_TYPES.USER_POSTS));
  }

  _selectUserInfo(data) {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      fullAddress: data.fullAddress
    }
  }

  _setData(dataName, data) {
    try {
      localStorage.setItem(dataName, data);
    }
    catch (e) {
      handleError(ERROR_MESSAGE.TOO_LARGE_SIZE_AVATAR, e);
    }
  }
}