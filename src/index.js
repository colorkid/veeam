import Api from "./api/api";
import Storage from "./Storage/Storage";
import {ERROR_MESSAGE, STORAGE_TYPES, TABS} from "./types/types";
import UserInfo from "./components/UserInfo/UserInfo";
import Avatar from "./components/Avatar/Avatar"
import UserFriends from "./components/UserFriends/UserFriends";
import UserPosts from "./components/UserPosts/UserPosts";
import errorHandler from "./utils/errorHandler"
import {filterFriendsList, loadNewAvatar} from "./utils/utils";
import Tabs from "./components/Tabs/Tabs";

class App {
  constructor() {
    this.body = document.querySelector('#body');

    this.api = new Api();
    this.storage = new Storage();
    this.userInfo = new UserInfo();
    this.avatar = new Avatar({
      changeAvatar: this.changeAvatar.bind(this)
    });
    this.tabs = new Tabs({
      changeActiveTab: this.changeActiveTab.bind(this)
    });
    this.userFriends = new UserFriends(this.body, {
      changeActivePage: this.changeActivePage.bind(this),
      filterFriends: this.filterFriends.bind(this)
    });
    this.userPosts = new UserPosts(this.body);

    this._initApp();
  }

  _initApp() {
    Promise.all([this._loadUserInfo(), this._loadUserFriends()])
      .then(() => {
        this._renderUserData();
        this._renderUserFriends();
      });
  }

  _loadUserPosts() {
    return this.api.getUserPosts()
      .then(response => response.json())
      .then(result => {
        this.storage.setUserPosts(result);
      })
      .catch(e => {
        errorHandler.handleError(ERROR_MESSAGE.LOADING_ERROR, e);
      });
  }

  _loadUserFriends(page) {
    return this.api.getUserFriends(page)
      .then(response => response.json())
      .then(result => {
        this.storage.setUserFriends(result);
      })
      .catch(e => {
        errorHandler.handleError(ERROR_MESSAGE.LOADING_ERROR, e);
      });
  }

  _loadUserInfo() {
    this._renderUserInfo();
    return this.api.getUserInfo()
      .then(response => response.json())
      .then(result => {
        this.storage.setUserData(result.results[0]);
        this.storage.setUserAvatar(result.results[0].picture.large);
      })
      .catch(e => {
        errorHandler.handleError(ERROR_MESSAGE.LOADING_ERROR, e);
      });
  }

  _renderUserFriends() {
    this.userFriends.render(this.storage.getUserFriends());
  }

  _renderUserPosts(data) {
    this.userPosts.render(data);
  }

  _removeUserFriends() {
    this.userFriends.removeContainer();
  }

  _removeUserPosts() {
    this.userPosts.removeContainer();
  }

  _renderUserData() {
    this._renderUserInfo(this.storage.getUserData(STORAGE_TYPES.USER_INFO));
    this.renderAvatar(this.storage.getUserData(STORAGE_TYPES.USER_AVATAR));
  }

  _renderUserInfo(data) {
    this.userInfo.render(data);
  }

  _turnOnOffTabs(value) {
    this.tabs.turnOnOffTabs(value);
  }

  renderAvatar(data) {
    this.avatar.render(data);
  }

  changeActiveTab(id) {
    this._turnOnOffTabs(true);
    if (id === TABS.POSTS) {
      this._removeUserFriends();
      this._loadUserPosts()
        .then(() => {
          this._renderUserPosts(this.storage.getUserPosts());
          this._turnOnOffTabs(false);
        })
        .catch(e => {
          errorHandler.handleError(ERROR_MESSAGE.LOADING_ERROR, e);
          this._turnOnOffTabs(false);
        })
    } else {
      this._removeUserPosts();
      this._loadUserFriends()
        .then(() => {
          this._renderUserFriends();
          this._turnOnOffTabs(false);
        })
        .catch(e => {
          errorHandler.handleError(ERROR_MESSAGE.LOADING_ERROR, e);
          this._turnOnOffTabs(false);
      })
    }
  }

  changeAvatar(event) {
    loadNewAvatar(
      event.target.files[0],
      this.storage.getUserData,
      this.storage.setUserAvatar.bind(this.storage),
      this.renderAvatar.bind(this)
    )
  }

  filterFriends(value) {
    const subStr = value.toLowerCase();
    const sortedFriendsList = filterFriendsList(this.storage.getUserFriends().data, subStr);
    this.userFriends.reRenderFriendsList(sortedFriendsList);
  }

  changeActivePage(page) {
    this._loadUserFriends(page).then(() => this._renderUserFriends());
  }
}

new App();