<template>
  <div class="card content-box" style="border: none; box-shadow: none">
    <el-form ref="step1FormRules" :model="form" label-width="auto" style="width: 100%" :rules="rules" :inline="true">
      <el-checkbox v-model="aotunumber">是否自定义题号</el-checkbox>
      <el-form-item v-if="aotunumber" label="题号" prop="number" style="width: 100%">
        <el-input placeholder="请输入内容..." />
      </el-form-item>
      <el-form-item label="题目标题" prop="title" style="width: 100%">
        <el-input v-model="form.title" placeholder="请输入内容..." />
      </el-form-item>
      <el-form-item label="已选标签" prop="tagIds" style="width: 100%">
        <div style="display: flex; flex-flow: row wrap">
          <el-tag @close="handleCloseTag(tag)" style="margin: 3px" v-for="tag in selectTags" :key="tag.id" closable>
            {{ tag.name }}
          </el-tag>
        </div>
      </el-form-item>
      <el-row justify="center">
        <el-col :span="10">
          <!-- 添加题目标签 -->
          <el-form-item label="题目标签" prop="tags" style="width: 100%">
            <el-button style="margin: 5px 0" type="danger" :icon="Delete" size="small" @click="clickDeleteTags">
              删除标签
            </el-button>
            <el-tabs type="border-card" style="width: 100%; height: 260px">
              <el-tab-pane v-for="item in Tags" :key="item.category" :label="item.categoryName">
                <el-tabs
                  @tab-remove="handDeleteTags"
                  v-if="item.category === 'Algorithm'"
                  style="height: 200px"
                  tab-position="left"
                  v-model="activeAlgorithmTab"
                >
                  <el-tab-pane
                    :closable="isDelete"
                    v-for="child in item.tags"
                    :name="child.id"
                    :key="child.id"
                    :label="child.name"
                  >
                    <div style="display: flex; justify-content: flex-end">
                      <el-button
                        @click="clickAddTags({ Category: item.category })"
                        style="margin: 3px"
                        size="small"
                        type="primary"
                        :icon="Plus"
                        >添加根标签</el-button
                      >
                      <el-button
                        @click="clickAddTags({ id: child.id })"
                        style="margin: 3px"
                        size="small"
                        type="primary"
                        :icon="Plus"
                        >添加子标签</el-button
                      >
                    </div>
                    <el-tag
                      :closable="isDelete"
                      @click="handSelectTag(tag)"
                      @close="handDeleteTags(tag.id)"
                      style="margin: 3px"
                      v-for="tag in child.children"
                      :key="tag.id"
                      type="primary"
                      >{{ tag.name }}</el-tag
                    >
                    <!-- <el-tag style="margin: 3px" v-for="i in 100" :key="i">{{ i }}</el-tag> -->
                  </el-tab-pane>
                </el-tabs>
                <div v-else>
                  <div style="display: flex; justify-content: flex-end">
                    <el-button
                      @click="clickAddTags({ Category: item.category })"
                      style="margin: 3px"
                      size="small"
                      type="primary"
                      :icon="Plus"
                      >添加标签</el-button
                    >
                  </div>
                  <el-tag
                    :closable="isDelete"
                    @click="handSelectTag(tag)"
                    @close="handDeleteTags(tag.id)"
                    style="margin: 3px"
                    v-for="tag in item.tags"
                    :key="tag.id"
                    type="primary"
                    >{{ tag.name }}</el-tag
                  >
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="难度" prop="level" style="width: 100%">
            <el-radio-group v-model="form.level" size="large">
              <el-radio-button label="入门" value="Beginner" />
              <el-radio-button label="简单" value="Simple" />
              <el-radio-button label="中等" value="Medium" />
              <el-radio-button label="较难" value="Difficult" />
              <el-radio-button label="困难" value="Hard" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="题目是否可见" prop="visible" style="width: 100%">
            <el-switch v-model="form.visible" />
          </el-form-item>
          <el-form-item label="时间(ms)" prop="timeLimit" style="width: 100%">
            <el-input type="number" v-model="form.timeLimit" />
          </el-form-item>
          <el-form-item label="内存(MB)" prop="memoryLimit" style="width: 100%">
            <el-input type="number" v-model="form.memoryLimit" />
          </el-form-item>
          <el-form-item label="语言" prop="language" style="width: 100%">
            <el-select multiple collapse-tags placeholder="Select" style="width: 240px">
              <el-option v-for="item in language" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="题目描述" prop="description" style="width: 100%">
        <WangEditor v-model:value="form.description" height="300px" />
      </el-form-item>

      <el-form-item label="输入描述" prop="inputDescription" style="width: 100%">
        <WangEditor v-model:value="form.inputDescription" height="300px" />
      </el-form-item>
      <el-form-item label="输出描述" prop="outputDescription" style="width: 100%">
        <WangEditor v-model:value="form.outputDescription" height="300px" />
      </el-form-item>
      <el-form-item label="提示" prop="hint" style="width: 100%">
        <WangEditor v-model:value="form.hint" height="300px" />
      </el-form-item>

      <Dialog ref="dialog" :category="category" :parent-id="parentId"></Dialog>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="wangEditor">
import { ref, reactive, watchEffect, onMounted } from "vue";
import WangEditor from "@/components/WangEditor/index.vue";
import Dialog from "./Dialog.vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { useProblemStore } from "@/stores/modules/problem";
import { getTags, addTags, addRootTags, deleteTags } from "@/api/modules/problem";
import { Category, Tag, TagData } from "@/api/interface";
import { ta } from "element-plus/es/locale";
import { Plus, Delete } from "@element-plus/icons-vue";
import { number } from "echarts";
import mittBus from "@/utils/mittBus";
const activeAlgorithmTab = ref<number | undefined>(undefined);
const problemStore = useProblemStore();
const step1FormRules = ref<FormInstance>();
const language = ref(["C", "C++", "Python", "Java"]);
const allTags = ref<Tag[]>([]); //所有标签
const selectTags = ref<Tag[]>([]); //已选标签
const Tags = ref<Category[]>();
//初始化标签列表
const getTablist = async () => {
  const res = await getTags();
  // Tags.value = data.data;
  // console.log(Tags.value);
  const list = res.data;
  Tags.value = buildTree(list);
  console.log(Tags.value);
  activeAlgorithmTab.value = Tags.value.find(item => item.category === "Algorithm")?.tags[0].id;
};
//解构标签
function buildTree(data: TagData): Category[] {
  const tagMap: { [id: number]: Tag } = {};
  const rootTags: { [key: string]: Tag[] } = {};
  // 首先将所有标签放入 tagMap 中
  for (const category in data) {
    rootTags[category] = [];
    for (const item of data[category]) {
      for (const child of item.children) {
        tagMap[child.id] = { ...child, children: [] };
      }
    }
  }
  // 构建树结构
  for (const category in data) {
    for (const item of data[category]) {
      for (const child of item.children) {
        if (item.parentId === 0) {
          rootTags[category].push(tagMap[child.id]);
          if (category != "Algorithm") {
            allTags.value.push(tagMap[child.id]);
          }
        } else {
          const parent = tagMap[item.parentId];
          if (parent) {
            parent.children!.push(tagMap[child.id]);
            allTags.value.push(tagMap[child.id]);
          }
        }
      }
    }
  }
  console.log(rootTags);
  console.log(allTags.value);
  // 将 rootTags 转化为对象数组
  const categories: Category[] = [];
  for (const category in rootTags) {
    let categoryName = category;
    if (category === "Algorithm") {
      categoryName = "算法";
    } else if (category === "Other") {
      categoryName = "其它";
    } else if (category === "Origin") {
      categoryName = "来源";
    } else if (category === "Special") {
      categoryName = "特殊";
    } else if (category === "Time") {
      categoryName = "时间";
    } else if (category === "Region") {
      categoryName = "地区";
    }

    categories.push({
      category,
      categoryName: categoryName,
      tags: rootTags[category]
    });
  }
  return categories;
}
//选择标签
const handSelectTag = (tag: Tag) => {
  if (!form.value.tagIds.find(item => item === tag.id.toString())) {
    form.value.tagIds.push(tag.id.toString());
  }
};
//取消选择标签
const handleCloseTag = (tag: Tag) => {
  form.value.tagIds = form.value.tagIds.filter(item => item !== tag.id.toString());
};
//添加标签
const dialog = ref();
const parentId = ref<number>();
const category = ref<string>();
const clickAddTags = (props: { id?: number; Category?: string }) => {
  dialog.value.openDialog();
  if (props.id) {
    parentId.value = props.id;
    category.value = undefined;
  } else {
    category.value = props.Category;
    parentId.value = undefined;
  }
};
//删除标签
const isDelete = ref(false);
const clickDeleteTags = () => {
  isDelete.value = true;
};
const handDeleteTags = async id => {
  const data = await deleteTags(id.toString());
  if (!data) return;
  console.log(data);
  isDelete.value = false;
  // 更新 form.value.tagIds
  form.value.tagIds = form.value.tagIds.filter(item => item !== id.toString());
  // 重新获取标签数据
  getTablist();
};

const aotunumber = ref(false);
const form = ref({
  title: "",
  inputDescription: "",
  description: "",
  outputDescription: "",
  hint: "",
  level: "Beginner",
  source: "",
  tagIds: [] as string[],
  visible: false,
  timeLimit: 1000,
  memoryLimit: 128
});
const rules = reactive<FormRules>({
  title: [{ required: true, message: "请输入题目" }]
});
watchEffect(() => {
  form.value = problemStore.getStep1Data;
  console.log(form.value.description);
});
// 监听 form.value.tagIds 的变化，并更新 selectTags(已选标签)
watchEffect(() => {
  selectTags.value = form.value.tagIds
    .map(tagId => {
      const tag = allTags.value.find(tag => tag.id.toString() === tagId);
      return tag ? { ...tag } : null;
    })
    .filter(tag => tag !== null) as Tag[];
});
onMounted(() => {
  problemStore.changeStep1Status(false);
  getTablist();
  mittBus.on("tagAdded", tag => {
    // 更新标签内容
    getTablist();
  });
});
defineExpose({
  form,
  step1FormRules
});
</script>

<style scoped lang="scss">
@import "./step1";
</style>
