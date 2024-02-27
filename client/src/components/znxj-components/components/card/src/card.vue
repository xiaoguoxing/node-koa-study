<template>
  <div :class="['kr-card', border ? 'kr-card--border' : '']">
    <div
      v-if="$slots.header || header || $slots.headerRight"
      :class="['kr-card__header', 'flx-justify-between', headerBorder ? 'kr-card__header--border' : '']"
    >
      <slot name="header">
        <span class="title kr-font-medium">{{ header }}</span>
        <slot name="headerRight"></slot>
      </slot>
    </div>

    <div class="kr-card__body" :style="bodyStyle">
      <slot name="default"></slot>
    </div>
    <div v-if="$slots.footer" class="kr-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import '../../style/index.scss';
import '../style/index.scss';
defineOptions({
  name:'KrCard'
})
defineProps({
  border: Boolean,
  headerBorder: Boolean,
  header:String,
  bodyStyle: Object,
})
</script>
