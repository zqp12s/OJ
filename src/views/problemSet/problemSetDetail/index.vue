<template>
  <el-tabs type="border-card">
    <template v-if="query.type === 'Machine'">
      <machine-set-detail :id="query.id" />
    </template>
    <template v-else-if="query.type === 'Pencil'">
      <pencil-set-detail :id="query.id" />
    </template>
  </el-tabs>
</template>
<script setup lang="ts">
import MachineSetDetail from "./machineSetDetail/index.vue";
import PencilSetDetail from "./pencilSetDetail/index.vue";
import { useRoute } from "vue-router";
import { toRefs } from "vue";
const route = useRoute();
const { query } = toRefs(route);
</script>
<style scoped lang="scss"></style>
