<template>
  <div class="center-container">
    <h1 class="title">{{ title }}</h1>
    <Input.Search
      v-model:value="value"
      enter-button="简单的问百度，难的问升哥"
      size="large"
      @search="onSearch"
    />
    <table>
      <thead>
        <tr>
          <td>{{ years }}</td>
          <td>{{ months }}</td>
          <td>{{ days }}</td>
          <td>{{ totals }}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Years</td>
          <td>Months</td>
          <td>Days</td>
          <td>Total</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Input } from 'ant-design-vue';

const years = ref(0);
const months = ref(0);
const days = ref(0);
const totals = ref(0);
const value = ref('');

const props = defineProps<{
  title: string,
  memoryDate: string
}>();

const calcDate = (memoryDate: string) => {
  const startYear = Number(memoryDate.split('-')[0]);
  const startMonth = Number(memoryDate.split('-')[1]);
  const startDay = Number(memoryDate.split('-')[2]);
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDay = now.getDay();
  if (nowMonth >= startMonth) {
    years.value = nowYear - startYear;
  } else {
    years.value = nowYear - startYear - 1;
  }
  if (nowMonth >= startMonth) {
    months.value = nowMonth - startMonth
  } else {
    months.value = 12 + (nowMonth - startMonth)
  }
  if (nowDay >= startDay) {
    days.value = nowDay - startDay
  } else if (nowMonth > 1) {
    days.value = (Number(new Date(`${nowYear}-${nowMonth}-${nowDay}`)) -
      Number(new Date(`${nowYear}-${nowMonth - 1}-${startDay}`))) / 86400000 + 1
  } else {
    days.value = (Number(new Date(`${nowYear}-${nowMonth}-${nowDay}`)) -
      Number(new Date(`${nowYear - 1}-12-${startDay}`))) / 86400000 + 1
  }
  totals.value = (Number(new Date(`${nowYear}-${nowMonth}-${nowDay}`)) -
    Number(new Date(`${startYear}-${startMonth}-${startDay}`))) / 86400000 + 1
}

const onSearch = (searchValue: string) => {
  location.href = 'https://www.baidu.com/s?wd=' + searchValue
};

calcDate(props.memoryDate);
</script>


<style scoped lang="less">
.center-container {
  display: inline-block;
  width: 600px;
  text-align: center;
  .title {
    font-size: 36px;
    background: url("text_bg.webp");
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 600;
    animation: moveBg 30s linear infinite;
  }
  table {
    margin: 20px auto 0 auto;
    text-align: center;
    width: 400px;
    color: #d99c3b;
  }
  thead {
    font-size: 24px;
    font-weight: 600;
  }
}

@keyframes moveBg {
  0% {
    background-position: 0% 30%;
  }

  100% {
    background-position: 1000% 500%;
  }
}
</style>
