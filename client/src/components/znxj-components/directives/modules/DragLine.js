class dragLine {
  contDom = null; //容器dom;

  dragDom = null; //拖拽dom

  modalDom = null; //蒙版dom

  start = 0;

  startW = 0;

  domEvent = () => {};

  constructor(dragDom, modalDom) {
    this.dragDom = dragDom;
    this.modalDom = modalDom;
    this.dragDom.addEventListener('mousedown', this.down);
  }

  down = () => {
    let { width } = this.getRect();
    this.start = width;
    this.modalDom.addEventListener('mousemove', this.move);
    this.modalDom.addEventListener('mouseup', this.up);
    this.setStyle(this.modalDom, 'cursor', 'col-resize');
    this.setStyle(this.modalDom, 'pointer-events', 'auto');
  };

  move = (e) => {
    let { left } = this.getRect();
    let x = e.clientX - left - this.start;
    let res = x + this.start;
    this.setStyle(this.contDom, 'width', this.#range(res, this.startW / 2, this.startW * 2) + 'px');
    this.domEvent(res);
  };

  up = () => {
    this.setStyle(this.modalDom, 'cursor', 'auto');
    this.setStyle(this.modalDom, 'pointer-events', 'none');
    this.modalDom.removeEventListener('mousemove', this.move);
    this.modalDom.removeEventListener('mouseup', this.up);
  };

  update(el) {
    this.contDom = el;
    this.startW = this.getRect().width;
  }

  setDomEvent(domEvent = () => {}) {
    this.domEvent = domEvent;
  }

  getRect(propDom = 'contDom') {
    return this[propDom].getBoundingClientRect();
  }

  setStyle(dom, prop, value) {
    dom.style[prop] = value;
  }

  clear() {
    this.dragDom.removeEventListener('mousedown', this.down);
    this.modalDom.removeEventListener('mousemove', this.move);
    this.modalDom.removeEventListener('mouseup', this.up);
  }

  #range(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }
}

export default function () {
  let line = [];
  let key = 0;
  return {
    created(el, binding) {
      el.dataset.dragKey = `${key++}`;
      let div = document.createElement('div');
      div.classList.add('flexible-bar');
      let div2 = document.createElement('div');
      div2.classList.add('flexible-modal-bar');
      el.appendChild(div);
      el.appendChild(div2);
      line.push(new dragLine(div, div2));
      line[el.dataset.dragKey].setStyle(el, 'position', 'relative');
      line[el.dataset.dragKey].setDomEvent(binding.value);
    },
    mounted(el) {
      line[el.dataset.dragKey].update(el);
    },
    updated(el) {
      line[el.dataset.dragKey].update(el);
    },
    beforeUnmount(el) {
      line[el.dataset.dragKey].clear();
    },
    unmounted(el) {
      line[el.dataset.dragKey] = null;
    },
  };
}
