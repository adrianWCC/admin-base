<template>
  <div class="img-canvas" :style="{height: canvasHeight + 'px'}">
    <canvas
      ref="mycanvas"
      :width="canvasWidth"
      :height="canvasHeight"
      @click="changeCode"
    >
    </canvas>
  </div>
</template>

<script>
import { defineComponent, toRefs, onMounted, ref, watch } from 'vue'
export default defineComponent({
  name: 'ImgCode',
  props: {
    // 验证码宽度
    canvasWidth: {
      type: Number,
      default: 112
    },
    // 验证码高度
    canvasHeight: {
      type: Number,
      default: 32
    }
  },
  emits: ['getResult'], // 返回验证码
  setup(props, context) {
    const { canvasWidth, canvasHeight } = toRefs(props)
    // 默认值设置
    const defaultData = {
      identifyCode: 'dk47', // 验证码值，未加密的
      identifyCodes: '1234567890abcdefghijklmnopqrstuvwxyz', // 生成验证码的元素，数字和字母
      fontSizeMin: 24, // 图片上验证文字的最小值
      fontSizeMax: canvasHeight.value, // 图片上验证文字的最大值
      backgroundColorMin: 180, // 图片背景色值最小
      backgroundColorMax: 240, // 图片背景色值最大
      colorMin: 50, // 文字色值最小
      colorMax: 160, // 文字色值最大
      lineColorMin: 40, // 干扰线色值最小
      lineColorMax: 120, // 干扰线色值最大
      dotColorMin: 0, // 干扰点色值最小
      dotColorMax: 255, // 干扰点色值最大
      lineSum: 4, // 干扰线数量
      dotSum: 40 // 干扰点数量
    }
    // 获取父组件传的数据，具有响应式
    const mycanvas = ref(null)
    // 获取随机数
    const getRandomNum = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min)
    }
    // 获取随机颜色
    const getRandomColor = (min, max) => {
      const r = getRandomNum(min, max)
      const g = getRandomNum(min, max)
      const b = getRandomNum(min, max)
      return `rgb(${r},${g},${b})`
    }
    // 创建验证码图形
    const drawPic = () => {
      // 获取dom元素
      const canvas = mycanvas.value
      // 创建绘图环境
      const ctx = canvas.getContext('2d')
      // 设置当前文本基线
      ctx.textBaseline = 'bottom'
      ctx.fillStyle = getRandomColor(
        defaultData.backgroundColorMin,
        defaultData.backgroundColorMax
      )
      ctx.fillRect(0, 0, canvasWidth.value, canvasHeight.value)
      drawLine(ctx)
      drawPoint(ctx)
      for (let i = 0; i < defaultData.identifyCode.length; i++) {
        drawWord(ctx, defaultData.identifyCode[i], i)
      }
    }
    // 绘制文字
    const drawWord = (ctx, txt, index) => {
      ctx.fillStyle = getRandomColor(
        defaultData.colorMin,
        defaultData.colorMax
      )
      const fontSize = getRandomNum(defaultData.fontSizeMin, defaultData.fontSizeMax)
      ctx.font = fontSize + 'px SimHei'
      // x轴偏移值
      const offsetX = canvasWidth.value / defaultData.identifyCode.length * index + 5
      const offsetY = getRandomNum(
        Math.min(canvasHeight.value, fontSize),
        canvasHeight.value
      )
      const deg = getRandomNum(-30, 30)
      ctx.translate(offsetX, offsetY)
      // // 修改坐标原点和旋转角度
      ctx.rotate(deg * Math.PI / 180)
      ctx.fillText(txt, 0, 0)
      // // 还原坐标原点和旋转角度
      ctx.rotate(-deg * Math.PI / 180)
      ctx.translate(-offsetX, -offsetY)
    }
    // 绘制干扰线
    const drawLine = (ctx) => {
      for (let i = 0; i < defaultData.identifyCode.length; i++) {
        ctx.strokeStyle = getRandomColor(
          defaultData.lineColorMin,
          defaultData.lineColorMax
        )
        ctx.beginPath()
        ctx.moveTo(
          getRandomNum(0, canvasWidth.value),
          getRandomNum(0, canvasHeight.value)
        )
        ctx.lineTo(
          getRandomNum(0, canvasWidth.value),
          getRandomNum(0, canvasHeight.value)
        )
        ctx.stroke()
      }
    }
    // 绘制干扰点
    const drawPoint = (ctx) => {
      for (let i = 0; i < 50; i++) {
        ctx.fillStyle = getRandomColor(0, 255)
        ctx.beginPath()
        ctx.arc(
          getRandomNum(0, canvasWidth.value),
          getRandomNum(0, canvasHeight.value),
          1,
          0,
          2 * Math.PI
        )
        ctx.fill()
      }
    }
    // 生成随机验证码
    const getRandomCode = () => {
      defaultData.identifyCode = ''
      for (let i = 0; i < 4; i++) {
        defaultData.identifyCode +=
          defaultData.identifyCodes[
            getRandomNum(0, defaultData.identifyCodes.length)
          ]
      }
      // 绘制图片
      drawPic()
      context.emit('getResult', defaultData.identifyCode)
    }
    onMounted(() => {
      getRandomCode()
    })
    return {
      mycanvas,
      getRandomCode
    }
  },
  methods: {
    changeCode() {
      this.getRandomCode()
    }
  }
})
</script>
