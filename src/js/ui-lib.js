import { pipe } from 'ramda';
import { qs, qsa, addClass, addEvent, removeClass } from './helpers';
import 'clipboard';
import Prism from 'prismjs';
import NormalizeWhitespace from 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import Toolbar from 'prismjs/plugins/toolbar/prism-toolbar';
import Copy from 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import { ee } from '../index';
import 'prismjs/components/prism-scss';
// loadLanguages(['scss']);

Prism.plugins = { NormalizeWhitespace, Toolbar, Copy, ...Prism.plugins };

Prism.plugins.NormalizeWhitespace.setDefaults({
  'remove-trailing': true,
  'remove-indent': true,
  'left-trim': true,
  'right-trim': true,
});

export function UiLib() {
  var elCodeArr = qsa('.ui-lib__example');
  var elArrBlocks = qsa('.ui-lib__block');

  var menuButton = qs('.menu-button');
  var body = qs('.ui-lib__body');

  var blocksMap = new Map();

  init();

  // functions

  function init() {
    initBlockMap();
    initListeners();

    insertCodeBlocks();
    // initMenu();
  }

  function initListeners() {
    ee.on('side-bar-item-selected', onSideBarLinkClick);
  }

  function initBlockMap() {
    elArrBlocks.forEach(function TODO(elBlock) {
      blocksMap.set(elBlock.id, elBlock);
    });
  }

  function insertCodeBlocks() {
    elCodeArr.forEach((elCode) => {
      var elPre = pipe(
        removeAttr,
        htmlToString,
        // tidyWhitespace,
        highlight,
        // logger,
        pre
        // copyButton
      )(elCode);
      elCode.appendChild(elPre);
    });
  }

  function onSideBarLinkClick(id) {
    resetBlocks();
    var elSelectedBlock = blocksMap.get(id);
    addClass(elSelectedBlock, '_active');
  }

  function resetBlocks() {
    elArrBlocks.forEach((elBlock) => {
      removeClass(elBlock, '_active');
    });
  }

  function removeAttr(el) {
    var elCopy = el.cloneNode(true);
    elCopy.childNodes[1].removeAttribute('data');
    return elCopy;
  }

  function htmlToString(el) {
    return el.innerHTML;
  }

  function highlight(elStr) {
    return Prism.highlight(elStr, Prism.languages.markup, 'markup');
  }

  function pre(elStr) {
    var elPre = document.createElement('pre');
    var elCode = document.createElement('code');
    addClass(elCode, 'language-html');
    elCode.innerHTML = elStr;
    elPre.appendChild(elCode);
    return elPre;
  }

  function copyButton({ el, elStr }) {
    var elCopy = el.cloneNode(true);
    var copyButton = document.createElement('button');
    copyButton.addEventListener('click', (e) => copyCode(e, elStr));
    copyButton.innerText = 'copy';
    elCopy.appendChild(copyButton);
    return elCopy;
  }

  function copyCode(e, elStr) {
    navigator.permissions
      .query({ name: 'clipboard-write' })
      .then(checkPermission)
      .then(() => copyToClipboard(elStr))
      .then(() => notify(e.target))
      .catch((err) => console.error(err));
  }

  function checkPermission(result) {
    return new Promise((res, rej) => {
      if (result.state == 'granted' || result.state == 'prompt') {
        res();
      }
      rej();
    });
  }

  function notify(el) {
    var notification = document.createElement('span');
    notification.innerText = 'copied!';
    el.appendChild(notification);
    setTimeout(() => el.removeChild(notification), 3000);
  }

  function copyToClipboard(string) {
    return navigator.clipboard.writeText(string);
  }
}
