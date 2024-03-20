<template>
  <template v-if="drawerVisible">
    <el-drawer
      v-model="drawerVisible"
      :title="props.isEdit ? '编辑' : '新增'"
      :before-close="handleClose"
      style="min-width: 280px"
    >
      <el-form
        ref="ruleFormRef"
        :model="formData"
        :rules="rules"
        label-width="auto"
        label-position="right"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="标题：" prop="title">
          <el-input v-model="formData.title" placeholder="请输入" maxlength="15" show-word-limit />
        </el-form-item>
        <el-form-item label="描述：" prop="description">
          <el-input :autosize="{ minRows: 4, maxRows: 8 }" v-model="formData.description" type="textarea" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="题目类型：" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio value="Machine">机试</el-radio>
            <el-radio value="Pencil">笔试</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="规则类型：" prop="ruleType">
          <el-radio-group v-model="formData.ruleType">
            <el-radio value="ACM">ACM</el-radio>
            <el-radio value="OI">OI</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否可见：" prop="visible">
          <el-switch v-model="formData.visible" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button v-if="props.isEdit" type="primary" @click="editProblemSet(ruleFormRef)"> 编辑 </el-button>
        <el-button v-else type="primary" @click="addProblemSet(ruleFormRef)"> 新增 </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </template>
    </el-drawer>
  </template>
</template>
<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { createProblemSet, editProblemSetInfo } from "@/api/modules/problemSet";
const drawerVisible = ref<boolean>(false);
const props = defineProps<{ currentRow: any; isEdit: boolean }>();
const formData = ref();
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<{}>>({
  title: [
    { type: "string", required: true, message: "请输入标题", trigger: "blur" },
    { max: 15, message: "标题长度不得多于15个字符", trigger: "blur" }
  ],
  description: [{ message: "请输入描述", trigger: "blur" }],
  type: [{ required: true, message: "请选择规则类型" }],
  ruleType: [{ required: true, message: "请选择规则类型" }],
  visible: [{ type: "boolean", required: true, message: "请选择是否可见" }]
});
const openDrawer = () => {
  drawerVisible.value = true;
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const handleClose = done => {
  ElMessageBox.confirm("关闭后编辑内容将不会保存，确定关闭吗？")
    .then(() => {
      console.log(done);
      done();
      ruleFormRef.value?.resetFields();
      drawerVisible.value = false;
    })
    .catch(() => {});
};
const editProblemSet = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { id, ...data } = formData.value;
      const res = await editProblemSetInfo(id, data);
      if (+res.code === 200) {
        ElMessage({ message: "编辑成功", type: "success", duration: 1000 });
        drawerVisible.value = false;
      }
    } else {
      return false;
    }
  });
};
const addProblemSet = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { id, ...data } = formData.value;
      const res = await createProblemSet(data);
      if (+res.code === 200) {
        ElMessage({ message: "创建成功", type: "success", duration: 1000 });
      } else {
        ElMessage({ message: "创建失败,1s后自动关闭页面", type: "error", duration: 1000 });
      }
      setTimeout(() => {
        ruleFormRef.value?.resetFields();
        drawerVisible.value = false;
      }, 1000);
    } else {
      return false;
    }
  });
};
watchEffect(() => {
  formData.value = props.currentRow;
});
defineExpose({
  openDrawer
});
</script>
<style scoped lang="scss"></style>
