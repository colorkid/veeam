import errorHandler from "./errorHandler";
import {ERROR_MESSAGE, STORAGE_TYPES} from "../types/types";

export const createFullAddress = location => {
  return `${location.country} ${location.city} ${location.street.name} ${location.street.number}`;
};

export const validationTypeFileAvatar = fileName => {
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.webp|\.gif)$/i;
  return !allowedExtensions.exec(fileName) && true;
};

export const createNode = (className, tag, data, type, kids) => {
  const element = document.createElement(tag);
  element.className = className;

  if (type === 'search') element.placeholder = data.placeholder;
  if (type === 'email') element.href = `mailto:${data}`;
  if (type === 'button') element.type = type;

  if (tag === 'input') element.vaue = data.value;
  if (tag === 'img') {
    element.src = data.avatar;
    element.alt = `${data.firstName} ${data.lastName}`
  }

  if (data && tag !== 'img' && tag !== 'input') element.textContent = data;

  if (kids) kids.forEach(child => element.appendChild(child));

  const fragment = document.createDocumentFragment();
  return fragment.appendChild(element);
};

export const appendCreatedNode = (el, tag, className, data, type) => {
  if (tag === 'img') {
    const waitingNode = el.querySelector(`.${className}__${tag}`);
    if (waitingNode) waitingNode.remove();
  } else {
    const waitingNode = el.querySelector(`.${className}__${tag}--waiting`);
    if (waitingNode) waitingNode.remove();
  }

  const element = document.createElement(tag);

  if (tag === 'img') {
    element.src = data.src;
    element.alt = data.alt;
  }

  element.className = data ? `${className}__${tag}` : `${className}__${tag}--waiting`;

  if (tag !== 'img') element.textContent = `${data || '...'}`;
  if (tag === 'a' && type === 'email') element.href = `mailto:${data}`;
  if (tag === 'a' && type === 'phone') element.href = `tel:${data}`;

  const fragment = document.createDocumentFragment();
  fragment.appendChild(element);
  el.appendChild(fragment);
};

export const filterFriendsList = (arr, subStr) => {
  return arr.filter(friend => {
    if (friend.email.toLowerCase().startsWith(subStr)) return true;
    if (friend.first_name.toLowerCase().startsWith(subStr)) return true;
    if (friend.last_name.toLowerCase().startsWith(subStr)) return true;
  });
};

export const loadNewAvatar = (file, getUserData, setUserAvatar, renderAvatar) => {
  const reader = new FileReader();

  if (validationTypeFileAvatar(file.name)) {
    errorHandler.handleError(ERROR_MESSAGE.INVALID_FORMAT_AVATAR, ERROR_MESSAGE.INVALID_FORMAT_AVATAR);
    return;
  }

  reader.onerror = () => errorHandler.handleError(ERROR_MESSAGE.LOADING_ERROR, reader.error);
  reader.onload = () => {
    setUserAvatar(reader.result);
    renderAvatar(getUserData(STORAGE_TYPES.USER_AVATAR))
  };

  reader.readAsDataURL(file);
};