// @ts-ignore
import dragLine from './modules/DragLine.js';
import copy from './modules/copy.js';
import waterMarker from './modules/waterMarker.js';
import draggable from './modules/draggable.js';
import debounce from './modules/debounce.js';
import throttle from './modules/throttle.js';
import longpress from './modules/longpress.js';

const directivesList = {
  // Custom directives
  copy,
  waterMarker,
  draggable,
  debounce,
  throttle,
  longpress,
  dragLine: dragLine(),
};

const directives = {
  install: function (app) {
    Object.keys(directivesList).forEach((key) => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key]);
    });
  },
};
export * from './modules/index.js';
export default directives;
