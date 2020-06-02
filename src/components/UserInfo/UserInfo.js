import {appendCreatedNode} from "../../utils/utils";

export default class UserInfo {
  constructor() {
    this.firstName = document.querySelector('#userFirstName');
    this.lastName = document.querySelector('#userLastName');
    this.email = document.querySelector('#userEmail');
    this.phone = document.querySelector('#userPhone');
    this.fullAddress = document.querySelector('#userAddress');
  }

  render(data = {}) {
    appendCreatedNode(this.firstName, 'p', 'user-info', data.firstName);
    appendCreatedNode(this.lastName, 'p', 'user-info', data.lastName);
    appendCreatedNode(this.email, 'a', 'user-info', data.email, 'email');
    appendCreatedNode(this.phone, 'a', 'user-info', data.phone, 'phone');
    appendCreatedNode(this.fullAddress, 'address', 'user-info', data.fullAddress);
  }
}