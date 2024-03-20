<template>
  <div v-if="data.iswrittenDetail" style="margin-top: 1vh">
    <WangEditor v-model:value="data.description" height="" :hide-tool-bar="true" :disabled="true" :editor-config="editorConfig" />
  </div>
  <div v-else class="caption">
    <div v-if="data.multiple">
      <p class="content">Sample Input</p>
      <WangEditor
        v-for="(item, index) in data.samples"
        :key="'id' + index"
        v-model:value="data.samples[index].input"
        height=""
        :hide-tool-bar="true"
        :disabled="true"
        :editor-config="editorConfig"
      />
      <p class="content">Sample Output</p>
      <WangEditor
        v-for="(item, index) in data.samples"
        :key="'didd' + index"
        v-model:value="data.samples[index].output"
        height=""
        :hide-tool-bar="true"
        :disabled="true"
        :editor-config="editorConfig"
      />
    </div>
    <div v-else>
      <p class="content">{{ data.label }}</p>
      <WangEditor
        v-model:value="data.description"
        height=""
        :hide-tool-bar="true"
        :disabled="true"
        :editor-config="editorConfig"
      />
    </div>
  </div>
</template>
<script setup>
import WangEditor from "@/components/WangEditor/index.vue";
import { watchEffect, ref } from "vue";

const editorConfig = {
  placeholder: "",
  MENU_CONF: {}
};
const data = ref({});
const props = defineProps({
  label: String,
  description: String,
  multiple: Boolean,
  iswrittenDetail: Boolean,
  samples: Array
});

const baseUrl = "???"; // 前置URL

const processDescription = description => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(description, "text/html");
  const images = doc.querySelectorAll("img");

  images.forEach(img => {
    const src = img.getAttribute("src");
    img.setAttribute("src", baseUrl + src);
  });

  return doc.body.innerHTML;
};

watchEffect(() => {
  data.value = { ...props };
  if (data.value.description) {
    data.value.description = processDescription(data.value.description);
  }
});
</script>
<style>
.caption {
  margin-left: 5vh;
  .content {
    color: rgb(0 150 136);
  }
}
</style>
