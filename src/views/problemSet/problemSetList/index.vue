<template>
  <el-tabs type="border-card">
    <ProTable ref="proTable" :columns="columns" :request-api="getTableList" :init-param="initParam" :data-callback="dataCallback">
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="addProblemSet">新增题组</el-button>
        <!-- <el-button type="warning" :icon="Pointer" plain @click="proTable?.element?.toggleAllSelection">全选/全不选</el-button>
        <el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected" @click="() => {}"> 批量删除 </el-button> -->
      </template>
      <template #operation="scope">
        <el-button type="primary" link :icon="EditPen" @click="editProblemSet(scope.row)">编辑</el-button>
        <el-button type="primary" link :icon="Tickets" @click="toProblemSetDetail(scope.row)">详情</el-button>
        <el-button type="primary" link :icon="Delete" @click="delProblemSet(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <Drawer ref="drawer" v-model:current-row="currentRow" v-model:is-edit="isEdit" />
  </el-tabs>
</template>
<script setup name="" lang="tsx">
import ProTable from "@/components/ProTable/index.vue";
import Drawer from "./components/Drawer.vue";
import { getProblemSets, deleteProblemSet } from "@/api/modules/problemSet";
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, Pointer, Tickets } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const route = useRouter();
const proTable: any = ref(null);
const drawer = ref();
const isEdit = ref(false);
const currentRow = ref();
const initParam = reactive({ type: 1 });
const columns = reactive<ColumnProps<any>[]>([
  // { type: "selection", fixed: "left", width: 70 },
  {
    prop: "title",
    label: "标题",
    sortable: true,
    isFilterEnum: false,
    search: {
      el: "input",
      tooltip: "输入标题进行搜索",
      props: { placeholder: "请输入标题查询", filterable: true }
    }
  },
  {
    prop: "type",
    label: "题目类型",
    render: scope => {
      return <el-tag type={scope.row.type === "Machine" ? "primary" : "success"}>{scope.row.type}</el-tag>;
    }
  },
  {
    prop: "ruleType",
    label: "规则类型",
    render: scope => {
      return <el-tag type={scope.row.ruleType === "ACM" ? "primary" : "success"}>{scope.row.ruleType}</el-tag>;
    }
  },
  {
    prop: "visible",
    label: "是否可见",
    render: scope => {
      return <el-switch disabled v-model={scope.row.visible}></el-switch>;
    }
  },
  { prop: "operation", label: "操作", fixed: "right", width: 220 }
]);
const editProblemSet = row => {
  drawer.value.openDrawer();
  currentRow.value = row;
  isEdit.value = true;
};
const addProblemSet = () => {
  drawer.value.openDrawer();
  currentRow.value = {
    description: "",
    id: "",
    ruleType: "ACM",
    title: "",
    type: "Machine",
    visible: true
  };
  isEdit.value = false;
};
const delProblemSet = async row => {
  ElMessageBox.confirm("操作不可恢复，确定删除吗？")
    .then(async () => {
      const res = await deleteProblemSet(row.id);
      if (+res.code === 200) {
        ElMessage.success("删除成功");
        proTable.value.getTableList();
      }
    })
    .catch(() => {});
};
const toProblemSetDetail = row => {
  route.push({ name: "problemSetDetail", query: { id: row.id, type: row.type } });
};
const dataCallback = data => {
  return { ...data };
};
const getTableList = (params: any) => {
  return getProblemSets(params);
};
</script>
<style scoped lang="scss"></style>
