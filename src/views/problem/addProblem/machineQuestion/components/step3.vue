<template>
  <div>
    <div class="title">{{ problemData.title }}</div>
    <RichText label="Description" :description="problemData.description" :multiple="false" />
    <RichText label="Input" :description="problemData.inputDescription" :multiple="false" />
    <RichText label="Output" :description="problemData.outputDescription" :multiple="false" />
    <RichText :samples="problemData.samples" :multiple="true" />
    <RichText label="Hint" :description="problemData.hint" :multiple="false" />
    <RichText label="Source" :description="problemData.source" :multiple="false" />
  </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { useProblemStore } from "@/stores/modules/problem";
import { getMachineDetail } from "@/api/modules/problem";
import RichText from "./richtext.vue";

const problemStore = useProblemStore();
const problemData: any = ref({});
const props = defineProps({
  number: Number
});
const editorConfig = {
  placeholder: "",
  MENU_CONF: {}
};
watchEffect(async () => {
  if (props.number) {
    const res = await getMachineDetail(props.number);
    problemData.value = { ...res.data };
  } else problemData.value = { ...problemStore.getStep1Data, ...problemStore.getStep2Data };
});
</script>
<style scoped lang="scss">
.title {
  font: 30px bolder;
}
.caption {
  margin-left: 5vh;
  font-family: monospace;
  font-size: 18px;
  .content {
    color: rgb(0 150 136);
  }
}
</style>
