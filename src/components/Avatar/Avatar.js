import {appendCreatedNode} from "../../utils/utils";

export default class Avatar {
  constructor(handlers) {
    this.handlers = handlers;

    this.avatar = document.querySelector('#avatar');
    this.avatarInput = document.querySelector('#avatar-upload');

    this._onChangeFileInput();
  }

  _onChangeFileInput() {
    this.avatarInput.addEventListener('change', (e) => this.handlers.changeAvatar(e));
  }

  render(avatar = '') {
    appendCreatedNode(this.avatar, 'img', 'avatar', {
      src: avatar,
      alt: 'user-avatar'
    });
  }
}