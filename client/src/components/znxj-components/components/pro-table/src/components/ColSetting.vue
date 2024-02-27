<template>
  <!-- 列设置 -->
  <div class="kr-protable" ref="colTableRef">
    <el-table
      :data="colSetting"
      :border="true"
      row-key="prop"
      default-expand-all
      max-height="50vh"
      :tree-props="{ children: '_children' }"
    >
      <el-table-column prop="label" align="center" label="列名" />
      <el-table-column prop="isShow" align="center" label="显示" v-slot="scope">
        <el-switch v-model="scope.row.isShow" />
      </el-table-column>
      <el-table-column prop="sortable" align="center" label="排序" v-slot="scope">
        <el-switch v-model="scope.row.sortable" />
      </el-table-column>
      <template #empty>
        <div class="table-empty">
          <img src="../assets/images/notData.png" alt="notData" />
          <div>暂无可配置列</div>
        </div>
      </template>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineOptions({
  name:"colSetting"
})
defineProps({
  colSetting:{
    type:Array,
    default(){
      return []
    }

  }
});

const drawerVisible = ref(false);
// 打开列设置
const openColSetting = () => {
  drawerVisible.value = true;
};

defineExpose({
  openColSetting,
});
</script>
