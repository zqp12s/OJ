<template>
  <!-- 分页组件 -->
  <el-pagination
    :background="true"
    :current-page="pageable.pageNumber"
    :page-size="pageable.pageSize"
    :page-sizes="paginationSizes || [10, 25, 50, 100]"
    :total="pageable.totalElements"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script setup lang="ts" name="Pagination">
interface Pageable {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
}

interface PaginationProps {
  paginationSizes?: number[];
  pageable: Pageable;
  handleSizeChange: (size: number) => void;
  handleCurrentChange: (currentPage: number) => void;
}

defineProps<PaginationProps>();
</script>
