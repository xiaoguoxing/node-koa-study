<template>
  <component :is="renderLoop(column, index)" />
</template>

<script lang="jsx" setup>
import { inject, ref, useSlots } from 'vue';
import { ElTableColumn, ElTag } from 'element-plus';
import { filterEnum, formatValue, handleRowAccordingToProp } from '@/components/znxj-components/utils';
import { isFunction } from '@/components/znxj-components/utils';
const slots = useSlots();

defineProps({
  column:{
    type:Object,
    default(){
      return {}
    }
  },
  index:Number
});

const enumMap = inject('enumMap', ref(new Map()));
const propFun = (item, index) => {
  return isFunction(item.prop) && item.prop(index) ? item.prop(index) : item.prop;
};
// 渲染表格数据
const renderCellData = (item, scope, index) => {
  return enumMap.value.get(propFun(item, index)) && item.isFilterEnum
    ? filterEnum(
        handleRowAccordingToProp(scope.row, propFun(item, index)),
        enumMap.value.get(propFun(item, index)),
        item.fieldNames
      )
    : formatValue(handleRowAccordingToProp(scope.row, propFun(item, index)));
};

// 获取 tag 类型
const getTagType = (item, scope, index) => {
  return filterEnum(
    handleRowAccordingToProp(scope.row, propFun(item, index)),
    enumMap.value.get(propFun(item, index)),
    item.fieldNames,
    'tag'
  );
};
const filterHandler = (value, row, column) => {
  const property = column['property'];
  return row[property] === value;
};
const renderLoop = (item, index) => {
  if (item.isShow) {
    return (
      <ElTableColumn
        {...item}
        prop={propFun(item, index)}
        align={item.align ?? 'left'}
        showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== 'operation'}
        columnKey={item.prop}
        filterPlacement={item.filterPlacement ?? 'bottom'}
        filterMethod={item.filters ? item.filterMethod ?? filterHandler : undefined}
      >
        {{
          default: (scope) => {
            if (item._children) return item._children.map((child, index) => renderLoop(child, index));
            if (item.render) return item.render(scope);
            if (slots[item.prop]) return slots[item.prop](scope);
            if (item.tag)
              return <ElTag type={getTagType(item, scope, index)}>{renderCellData(item, scope, index)}</ElTag>;
            return renderCellData(item, scope, index);
          },
          header: () => {
            if (item.headerRender) return item.headerRender(item);
            if (slots[`${item.prop}Header`]) return slots[`${item.prop}Header`]({ row: item });
            return item.label;
          },
        }}
      </ElTableColumn>
    );
  }
};
</script>
