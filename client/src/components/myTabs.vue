<template>
  <div class="tabs" :class="`tabs-${buttonType}`">
    <div
      class="tabs-item flx-center"
      :class="{ active: item[valueKey] === (modelValue ?? tabActive) }"
      v-for="(item, index) in options"
      :key="index"
      @click="tabClick(item)"
    >
      {{ item[labelKey] }}
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps( {
  modelValue:  {
    type:String,
    default:'value'
  },
  buttonType: {
    type:String,
    validator(value, props) {
      return ['line','bottom-line','default'].includes(value)
    },
    default:'default'
  },
  options: Array,
  labelKey:  {
    type:String,
  default:'label'
  },
  valueKey: {
    type:String,
    default:'value'
  }
})
const emit = defineEmits(['change','update:model-value']);

const tabClick = function (value) {
  emit('change', value);
  emit('update:model-value', value[props.valueKey]);
  tabActive.value = value[props.valueKey];
};

let tabActive = ref();
onMounted(() => {
  tabActive.value = props.options?.[0][props.valueKey];
});
</script>
<style scoped lang="scss">
.tabs {
  display: flex;
  width: 100%;
  height: var(--el-component-size);
  &.tabs-default {
    gap: 12px;
    .tabs-item {
      background: #efefef;
      &.active {
        color: var(--el-color-white);
        background: var(--el-color-primary);
      }
    }
  }
  &.tabs-line {
    .tabs-item {
      height: calc(var(--el-component-size) - 2px);
      border-top: 1px solid var(--el-border-color-hover);
      border-bottom: 1px solid var(--el-border-color-hover);
      &:first-child {
        border-left: 1px solid var(--el-border-color-hover);
        border-radius: 4px 0 0 4px;
      }
      &:last-child {
        border-right: 1px solid var(--el-border-color-hover);
        border-radius: 0 4px 4px 0;
      }
      &.active {
        color: var(--el-color-white);
        background: var(--el-color-primary);
        border-color: var(--el-color-primary);
      }
    }
  }
  &.tabs-bottom-line {
    gap: 12px;
    .tabs-item {
      height: calc(var(--el-component-size) - 2px);
      border-bottom: 2px solid transparent;
      &.active {
        color: var(--el-color-primary);
        border-color: var(--el-color-primary);
      }
    }
  }
  .tabs-item {
    height: inherit;
    padding: 0 16px;
    font-size: 14px;
    color: var(--el-text-color-regular);
    cursor: pointer;
  }
}
</style>
