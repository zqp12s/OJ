<template>
  <el-tabs type="border-card">
    <el-tab-pane label="机试题">
      <ProTable
        ref="proTable"
        :columns="columns"
        :request-api="getTableList"
        :init-param="initParam"
        :data-callback="dataCallback"
        @darg-sort="sortTable"
      >
        <template #tableHeader="scope">
          <el-button type="primary" :icon="CirclePlus">添加题目</el-button>
          <el-button type="warning" :icon="Pointer" plain @click="proTable?.element?.toggleAllSelection">全选/全不选</el-button>
          <el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected" @click="() => {}"> 批量删除 </el-button>
        </template>
        <template #operation="scope">
          <!-- <el-button
            type="primary"
            link
            :icon="View"
            @click="
              () => {
                console.log(scope);
              }
            "
            >查看</el-button
          > -->
          <el-button type="primary" link :icon="EditPen" @click="() => console.log(scope)">编辑</el-button>
          <el-button type="primary" link :icon="Delete" @click="() => {}">删除</el-button>
        </template>
      </ProTable>
    </el-tab-pane>
    <el-tab-pane label="笔试题">
      <ProTable
        ref="writtenTable"
        :columns="writtenColumns"
        :request-api="getWrittenList"
        :init-param="initParam"
        :data-callback="dataCallback"
        @darg-sort="sortTable"
      >
        <template #tableHeader="scope">
          <el-button type="primary" :icon="CirclePlus" @click="addWrittenProblem()">添加题目</el-button>
          <el-button type="warning" :icon="Pointer" plain @click="writtenTable?.element?.toggleAllSelection"
            >全选/全不选</el-button
          >
          <el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected" @click="() => {}"> 批量删除 </el-button>
        </template>
        <template #operation="scope">
          <el-button type="primary" link :icon="EditPen" @click="() => console.log(scope)">编辑</el-button>
          <el-button type="primary" link :icon="Delete" @click="() => {}">删除</el-button>
        </template>
      </ProTable>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup name="" lang="tsx">
import ProTable from "@/components/ProTable/index.vue";
import { getMachineProblems, getWrittenProblems } from "@/api/modules/problem";
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { ProTableInstance, ColumnProps, HeaderRenderScope } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, View, Refresh, Pointer } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

onMounted(() => {});

const route = useRouter();
const proTable: any = ref(null);
const writtenTable: any = ref(null);
const initParam = reactive({ type: 1 });
const columns = reactive<ColumnProps<any>[]>([
  { type: "selection", fixed: "left", width: 70 },
  { type: "sort", label: "Sort", width: 80 },
  {
    prop: "number",
    label: "题号",
    search: { el: "input", tooltip: "输入题号进行搜索" },
    render: scope => {
      return (
        <el-button type="primary" link onClick={() => ElMessage.success("我是通过 tsx 语法渲染的内容")}>
          {scope.row.number}
        </el-button>
      );
    }
  },
  { prop: "title", label: "标题", search: { el: "input", tooltip: "输入标题进行搜索" } },
  { prop: "operation", label: "操作", fixed: "right", width: 220 }
]);
const writtenColumns = reactive<ColumnProps<any>[]>([
  { type: "selection", fixed: "left", width: 70 },
  { type: "sort", label: "sort", width: 80 },
  {
    prop: "number",
    label: "题号",
    search: { el: "input", tooltip: "输入题号进行搜索" },
    render: scope => {
      return (
        <el-button type="primary" link onClick={() => ElMessage.success("我是通过 tsx 语法渲染的内容")}>
          {scope.row.number}
        </el-button>
      );
    }
  },
  { prop: "score", label: "分值" },
  { prop: "operation", label: "操作", fixed: "right", width: 220 }
]);
const addWrittenProblem = () => {
  route.push("/problem/addWrittenProblem");
};
const dataCallback = data => {
  return { ...data };
};
const sortTable = ({ newIndex, oldIndex }: { newIndex?: number; oldIndex?: number }) => {
  console.log(newIndex, oldIndex);
  console.log(proTable.value?.tableData);
  ElMessage.success("修改列表排序成功");
};

const getTableList = (params: any) => {
  return getMachineProblems(params);
};
const getWrittenList = (params: any) => {
  return getWrittenProblems(params);
};
</script>
<style scoped lang="scss"></style>
