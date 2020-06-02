export default class Tabs {
  constructor(handlers) {
    this.handlers = handlers;

    this.tabs = document.querySelectorAll('.tabs__item');

    this._handleClick();
  }

  _handleClick() {
    this.tabs.forEach(tab => tab.addEventListener('click', e => {
      this.handlers.changeActiveTab(e.target.id);
      this._changeActiveTab(e.target);
    }));
  }

  _changeActiveTab(el) {
    this.tabs.forEach(tab => this._removeActiveClass(tab));
    this._addActiveClass(el);
  }

  _addActiveClass(el) {
    el.classList.add('tabs__item--active');
  }

  _removeActiveClass(el) {
    el.classList.remove('tabs__item--active');
  }

  turnOnOffTabs(action) {
    this.tabs.forEach(tab => {
      if (action) {
        tab.classList.add('tabs__item--disabled')
      } else {
        tab.classList.remove('tabs__item--disabled')
      }
    })
  }
}