<template>
  <div class="container">
    <Background v-if="0" />
    <Todo />
    <div class="center" v-if="0">
      <Center
        :title="'Love You Countless Times'"
        :memoryDate="'2018-10-7'"
      ></Center>
    </div>
  </div>
</template>

<script setup lang="ts">
import Background from './components/Background/index.vue';
import Center from './components/Center/index.vue';
import Todo from './components/Todo/index.vue';
import { Button } from 'ant-design-vue';
</script>

<style scoped lang="less">
.container {
  position: relative;
  height: 100%;
  .center {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
