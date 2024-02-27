<template>
  <!-- 分页组件 -->
  <el-pagination
    :current-page="pageable.pageNum"
    :page-size="pageable.pageSize"
    :page-sizes="[10, 25, 50, 100]"
    :background="true"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pageable.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
defineOptions({
  name:"pagination"
})

defineProps({
  pageable:Object,
  handleSizeChange: Function,
  handleCurrentChange: Function,
});



</script>
