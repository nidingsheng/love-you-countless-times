<template>
  <a-button type="primary" class="add-todo" @click="visible = true">添加待办</a-button>
  <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
      <a-form
        :model="formState"
        name="time_related_controls"
        v-bind="formItemLayout"
      >
        <a-form-item name="date-picker" label="DatePicker" v-bind="config">
          <a-date-picker v-model:value="formState['date-picker']" value-format="YYYY-MM-DD" />
        </a-form-item>
      </a-form>
    </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);

const handleOk = () => {
  visible.value = false;
}



const formItemLayout = ref({
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
});
const config = ref({
  rules: [{ type: 'string' as const, required: true, message: 'Please select time!' }],
});

interface FormState {
  'date-picker': string;
  'date-time-picker': string;
  'month-picker': string;
  'range-picker': [string, string];
  'range-time-picker': [string, string];
  'time-picker': string;
}
const formState = reactive({} as FormState);
</script>

<style scoped lang="less">
.add-todo {
  position: absolute;
  top: 6px;
  right: 10px;
  z-index: 2;
}
</style>
