import { computed, unref } from 'vue';
// 命名前缀
export const defaultNamespace = 'kr';
const statePrefix = 'is-';
// BEM 命名字符拼接函数
const _bem = (namespace, block, blockSuffix, element, modifier) => {
  // 默认是 Block
  let cls = `${namespace}-${block}`;
  // 如果存在 Block 前缀，也就是 Block 里面还有 Block，例如：el-form 下面还有一个 el-form-item
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  // 如果存在元素
  if (element) {
    cls += `__${element}`;
  }
  // 如果存在修改器
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};

export const useNamespace = (block) => {
  // 命名前缀也就是命名空间
  const namespace = computed(() => defaultNamespace);
  // 创建块 例如：el-form
  const b = (blockSuffix = '') => _bem(unref(namespace), block, blockSuffix, '', '');
  // 创建元素 例如：el-input__inner
  const e = (element) => (element ? _bem(unref(namespace), block, '', element, '') : '');
  // 创建块修改器 例如：el-form--default
  const m = (modifier) => (modifier ? _bem(unref(namespace), block, '', '', modifier) : '');
  // 创建前缀块元素 例如：el-form-item
  const be = (blockSuffix,element) =>
    blockSuffix && element ? _bem(unref(namespace), block, blockSuffix, element, '') : '';
  // 创建元素修改器 例如：el-scrollbar__wrap--hidden-default
  const em = (element,modifier) =>
    element && modifier ? _bem(unref(namespace), block, '', element, modifier) : '';
  // 创建块前缀修改器 例如：el-form-item--default
  const bm = (blockSuffix,modifier) =>
    blockSuffix && modifier ? _bem(unref(namespace), block, blockSuffix, '', modifier) : '';
  // 创建块元素修改器 例如：el-form-item__content--xxx
  const bem = (blockSuffix, element, modifier) =>
    blockSuffix && element && modifier ? _bem(unref(namespace), block, blockSuffix, element, modifier) : '';
  // 动作状态 例如：is-success is-required
  const is = (name, ...args) => {
    const state = args.length >= 1 ? args[0] : true;
    return name && state ? `${statePrefix}${name}` : '';
  };

  // for css var
  // --el-xxx: value;
  const cssVar = (object) => {
    const styles = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${key}`] = object[key];
      }
    }
    return styles;
  };
  // with block
  const cssVarBlock = (object) => {
    const styles = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${block}-${key}`] = object[key];
      }
    }
    return styles;
  };

  const cssVarName = (name) => `--${namespace.value}-${name}`;
  const cssVarBlockName = (name) => `--${namespace.value}-${block}-${name}`;

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName,
  };
};
