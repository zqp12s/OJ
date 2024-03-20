<template>
  <div class="caption">
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
  samples: Array
});
watchEffect(() => {
  data.value = { ...props };
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
