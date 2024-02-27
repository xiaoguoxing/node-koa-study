<template>
  <div>
    <el-dialog
      :title="title"
      v-model="visible"
      :draggable="draggable"
      :append-to-body="appendTobody"
      :close-on-click-modal="false"
      :fullscreen="fullscreen"
      :width="width"
      :modal="modal"
      :show-close="showClose"
      class="kr-public-dialog"
      :style="style"
      :lock-scroll="lockScroll"
      @close="$emit('doClose', true)"
      align-center
    >
      <template #header>
        <slot name="dialog-title"></slot>
      </template>

      <slot></slot>

      <template v-if="!noFootBtn" #footer>
        <div class="dialog-footer" ref="addReceptionForm">
          <slot name="footer">
            <el-button v-if="singleClose" class="dialog-footer__btn" @click="$emit('doClose', true)">{{
              btnText[0]
            }}</el-button>
            <template v-else>
              <el-button class="dialog-footer__btn" @click="$emit('doClose', true)">{{ btnText[0] }}</el-button>
              <el-button
                type="primary"
                class="dialog-footer__btn"
                v-debounce="
                  () => {
                    $emit('doSubmit', true);
                  }
                "
                >{{ btnText[1] }}</el-button
              >
            </template>
          </slot>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { debounce as vDebounce } from '@/components/znxj-components/directives';
import { addUnit } from '@/components/znxj-components/utils';
import { computed, onBeforeMount, ref, watch } from 'vue';
import '../style/index.scss';
defineOptions({
  name:'KrPublicDialog'
})
// 接受父组件参数，配置默认值
const props = defineProps({
  singleClose: {
    type:Boolean,
    default:false
  },
  title: {
    type:String,
    default:'标题'
  },
  modelValue:  {
    type:Boolean,
    default:false
  },
  appendTobody:  {
    type:Boolean,
    default:false
  },
  noFootBtn:  {
    type:Boolean,
    default:false
  },
  fullscreen:  {
    type:Boolean,
    default:false
  },
  showClose:  {
    type:Boolean,
    default:true
  },
  modal:  {
    type:Boolean,
    default:true
  },
  btnText: {
    type:[String, String],
    default(){
      return ['取消', '确定']
    }

  },
  width: {
    type:String,
    default:''
  },
  height: {
    type:String,
    default:''
  },
  draggable:  {
    type:Boolean,
    default:false
  },
});
const emit = defineEmits(['update:modelValue', 'doSubmit', 'doClose']);
const visible = ref(false);
const lockScroll = ref(false);
const style = computed(() => {
  const style = {};
  if (!props.fullscreen) {
    if (props.height) {
      style[`height`] = addUnit(props.height);
    }
  }
  return style;
});
watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
  },
  {
    immediate: true,
  }
);
watch(
  () => visible,
  (val) => {
    if (!val) {
      emit('update:modelValue', false);
    }
  },
  {
    deep: true,
  }
);
onBeforeMount(() => {
  visible.value = props.modelValue;
});
</script>
