import {APP_MESSAGES} from "../../types/types";
import {createNode} from "../../utils/utils";

export default class Search {
  constructor(handlers) {
    this.handlers = handlers;
  }

  _handleKeyUp(e) {
    this.handlers.filterFriends(e.target.value);
  }

  _createContainer() {
    const className = 'search';
    const itIsAlready = document.querySelector(`.${className}`);
    if (itIsAlready) itIsAlready.remove();

    const container = document.createElement('div');
    container.className = className;

    const searchInput = createNode('search__input', 'input', {
      value: '',
      placeholder: APP_MESSAGES.INPUT_SEARCH
    }, 'search');

    searchInput.addEventListener('keyup', this._handleKeyUp.bind(this));

    container.appendChild(searchInput);

    const fragment = document.createDocumentFragment();
    return fragment.appendChild(container);
  }

  render() {
    return this._createContainer();
  }
}