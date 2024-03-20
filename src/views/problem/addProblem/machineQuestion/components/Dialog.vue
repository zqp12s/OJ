<template>
  <el-dialog v-model="dialogFormVisible" title="添加标签" width="500">
    <el-form :model="form">
      <el-form-item label="请输入标签名" :label-width="formLabelWidth">
        <el-input v-model="form.TagsName" autocomplete="off" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="Submit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { addRootTags, addTags } from "@/api/modules/problem";
import { ElMessage } from "element-plus";
import { reactive, ref, watchEffect } from "vue";
import mittBus from "@/utils/mittBus";
export interface AddTagsProps {
  parentId?: number;
  category?: string;
}
const props = withDefaults(defineProps<AddTagsProps>(), {
  parentId: undefined,
  category: undefined
});
const Submit = async () => {
  dialogFormVisible.value = false;
  console.log(props);
  if (props.parentId) {
    const parentId = props.parentId;
    const name = form.TagsName;
    if (!name) {
      ElMessage("请输入标签名");
      return;
    }
    const data = await addTags({ parentId, name });
    form.TagsName = "";
    console.log(data);
    mittBus.emit("tagAdded", data);
  }
  if (props.category) {
    const category = props.category;
    const name = form.TagsName;
    if (!name) {
      ElMessage("请输入标签名");
      return;
    }
    const data = await addRootTags({ name, category });
    form.TagsName = "";
    console.log(data);
    mittBus.emit("tagAdded", data);
  }
};
const dialogFormVisible = ref(false);
const openDialog = () => {
  dialogFormVisible.value = true;
};
const form = reactive({
  TagsName: ""
});

const formLabelWidth = "140px";
defineExpose({
  openDialog
});
</script>
