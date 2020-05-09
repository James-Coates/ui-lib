import { qs, qsa } from './js/helpers';
import { UiLib } from './js/ui-lib';
import { Sidebar } from './js/sidebar';
import EventEmitter from 'events';

export var ee = new EventEmitter();

var elUiLib = qs('.ui-lib');
var elSideBar = qs('.ui-lib__side-bar');

if (elUiLib) {
  UiLib();
}

if (elSideBar) {
  Sidebar(elSideBar);
}
