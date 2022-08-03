<template>
  <Button @click="visible = true">待办</Button>
  <Drawer
    v-model:visible="visible"
    title="待办"
    size="large"
    placement="right"
  >
    <div class="todo">
      <AddTodo />
      <Tabs v-model:activeKey="activeKey">
        <Tabs.TabPane key="1" tab="全部">Content of Tab Pane 1</Tabs.TabPane>
        <Tabs.TabPane key="2" tab="今日待办">Content of Tab Pane 2</Tabs.TabPane>
        <Tabs.TabPane key="3" tab="已完成">Content of Tab Pane 3</Tabs.TabPane>
        <Tabs.TabPane key="4" tab="未完成">Content of Tab Pane 3</Tabs.TabPane>
        <Tabs.TabPane key="5" tab="未开始">Content of Tab Pane 3</Tabs.TabPane>
      </Tabs>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button, Drawer, Tabs } from 'ant-design-vue';
import AddTodo from './AddTodo.vue';

const visible = ref(false);
const activeKey = ref('2')

</script>

<style scoped lang="less">
.todo {
  position: relative;
  &-add {
    position: absolute;
    top: 6px;
    right: 10px;
    z-index: 2;
  }
}
</style>
