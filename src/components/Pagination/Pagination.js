import {createNode} from "../../utils/utils";

export default class Pagination {
  constructor(handlers) {
    this.handlers = handlers;
  }

  _createContainer(activePage, pages) {
    const className = 'pagination';
    const itIsAlready = document.querySelector(`.${className}`);
    if (itIsAlready) itIsAlready.remove();

    const container = document.createElement('ul');
    container.className = className;

    for (let i = 1; i <= pages; i++) {
      const className = activePage === i ? 'pagination__item pagination__item--active' : 'pagination__item';

      const paginationItem = createNode(className, 'li', i);

      paginationItem.addEventListener('click', () => {
        if (i !== activePage) this.handlers.changeActivePage(i)
      });

      container.appendChild(paginationItem);
    }

    const fragment = document.createDocumentFragment();
    return fragment.appendChild(container);
  }

  render({activePage, pages}) {
    return this._createContainer(activePage, pages);
  }

}