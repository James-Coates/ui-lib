import { qsa, addClass, removeClass, addEvent } from './helpers';
import { ee } from '../index';

export function Sidebar(elRoot) {
  var elSideBarItems = qsa('li', elRoot);

  init();

  // Functions

  function init() {
    elSideBarItems.forEach(addSideBarLinkEvent);
  }

  function addSideBarLinkEvent(elSideBarItem) {
    addEvent(elSideBarItem, 'click', onSideBarLinkClick);
  }

  function onSideBarLinkClick(e) {
    resetSidebar();
    var id = e.target.id.replace('nav-', '');
    addClass(e.target, '_active');
    ee.emit('side-bar-item-selected', id);
  }

  function resetSidebar() {
    elSideBarItems.forEach((elSideBarItem) => {
      removeClass(elSideBarItem, '_active');
    });
  }
}
