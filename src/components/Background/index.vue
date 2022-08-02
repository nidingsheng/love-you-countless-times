<template>
  <canvas
    id="c"
    style="position: absolute; z-index: -1; text-align: center"
  ></canvas>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { InOptions } from './type';

//返回一个介于参数1和参数2之间的随机数
const find_random = (num_one: number, num_two: number): number => {
  return Math.random() * (num_two - num_one) + num_one;
}

//绘制爱心图案的方法，参数x,y是爱心的初始坐标，z是爱心的大小，m是爱心上升的速度
function arc_heart(ctx: CanvasRenderingContext2D, x: number, y: number, z: number, m: number) {
  y -= m * 10;
  z *= 0.05;

  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x, y - 3 * z, x - 5 * z, y - 15 * z, x - 25 * z, y - 15 * z);
  ctx.bezierCurveTo(x - 55 * z, y - 15 * z, x - 55 * z, y + 22.5 * z, x - 55 * z, y + 22.5 * z);
  ctx.bezierCurveTo(x - 55 * z, y + 40 * z, x - 35 * z, y + 62 * z, x, y + 80 * z);
  ctx.bezierCurveTo(x + 35 * z, y + 62 * z, x + 55 * z, y + 40 * z, x + 55 * z, y + 22.5 * z);
  ctx.bezierCurveTo(x + 55 * z, y + 22.5 * z, x + 55 * z, y - 15 * z, x + 25 * z, y - 15 * z);
  ctx.bezierCurveTo(x + 10 * z, y - 15 * z, x, y - 3 * z, x, y);
}

class Heart {
  private x: number;
  private y: number;
  private size: number;
  private size_change: number;
  private opacity: number;
  private opacity_change: number;
  private light: number;
  private color: string;

  private options: InOptions;
  constructor(options: InOptions, style_color: number) {
    this.options = options;

    this.x = 0;
    this.y = 0;
    this.size = 0;
    this.size_change = 0;
    this.opacity = 0;
    this.opacity_change = 0;
    this.light = 0;
    this.color = '';

    this.to_reset(style_color);
  }

  to_reset(style_color: number) {
    const {
      size_min, size_max, size_add_min, size_add_max,
      opacity_min, opacity_max, opacity_prev_min, opacity_prev_max,
      light_min, light_max
    } = this.options;
    var t = this;
    t.x = find_random(0, window.innerWidth);
    t.y = find_random(0, window.innerHeight);
    t.size = find_random(size_min, size_max);
    t.size_change = find_random(
      size_add_min,
      size_add_max
    );
    t.opacity = find_random(
      opacity_min,
      opacity_max
    );
    t.opacity_change = find_random(
      opacity_prev_min,
      opacity_prev_max
    );
    t.light = find_random(light_min, light_max);
    t.color = "hsl(" + style_color + ",100%," + t.light + "%)";
  }

  to_step(ctx: CanvasRenderingContext2D, style_color: number) {
    var t = this;
    t.opacity -= t.opacity_change;
    t.size += t.size_change;
    if (t.opacity <= 0) {
      t.to_reset(style_color);
      return false;
    }
    ctx.fillStyle = t.color;
    ctx.globalAlpha = t.opacity;
    ctx.beginPath();
    arc_heart(ctx, t.x, t.y, t.size, t.size);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

onMounted(() => {
  const canvas = document.getElementById("c") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const all_attribute: InOptions = {
    num: 100, // 个数
    start_probability: 0.1, // 如果数量小于num，有这些几率添加一个新的
    size_min: 1, // 初始爱心大小的最小值
    size_max: 2, // 初始爱心大小的最大值
    size_add_min: 0.3, // 每次变大的最小值（就是速度）
    size_add_max: 0.5, // 每次变大的最大值
    opacity_min: 0.3, // 初始透明度最小值
    opacity_max: 0.5, // 初始透明度最大值
    opacity_prev_min: 0.003, // 透明度递减值最小值
    opacity_prev_max: 0.005, // 透明度递减值最大值
    light_min: 0, // 颜色亮度最小值
    light_max: 90, // 颜色亮度最大值
  };
  let style_color = find_random(0, 360);
  const all_element: Heart[] = [];

  function start() {
    style_color += 0.1;
    //更改背景色hsl(颜色值，饱和度，明度)
    ctx.fillStyle = "hsl(" + style_color + ",100%,97%)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    if (
      all_element.length < all_attribute.num &&
      Math.random() < all_attribute.start_probability
    ) {
      all_element.push(new Heart(all_attribute, style_color));
    }
    all_element.map(function (line) {
      line.to_step(ctx, style_color);
    });
    window.requestAnimationFrame(start);
  }

  start();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  })
});
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
