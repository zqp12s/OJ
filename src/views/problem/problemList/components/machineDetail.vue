<template>
  <el-card style="max-width: 200vh">
    <step3 :number="number" />
  </el-card>
</template>
<script setup lant="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import step3 from "../../addProblem/machineQuestion/components/step3.vue";

const route = useRoute();
const number = ref(route.query?.number);

onMounted(() => {
  console.log(route.query);
});
</script>
