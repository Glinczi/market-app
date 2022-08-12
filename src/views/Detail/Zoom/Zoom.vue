<template>
  <!-- TIPS 对于一些网速慢,数据请求慢的,可以设置v-if监测数据有没有,如果有就渲染页面,没有就不显示DOM节点 -->
  <div class="spec-preview" v-if="skuImageList">
    <img :src="skuImageList[defaultIndex].imgUrl" />
    <div class="event" @mousemove="setMask"></div>
    <div class="big">
      <img :src="skuImageList[defaultIndex].imgUrl" ref="bigImg" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  computed: {
    defaultIndex() {
      let nowSelect;
      this.skuImageList.forEach((item, index) => {
        if (item.isDefault == "1") {
          nowSelect = index;
        }
      });
      return nowSelect;
    },
  },
  methods: {
    setMask(event) {
      // 获取鼠标在当前元素内的坐标(offsetX,offsetY)
      // 获取元素的宽高(offsetWidth,offsetHeight)
      let mask = this.$refs.mask;
      let bigImg = this.$refs.bigImg;

      // mask左侧大小
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;

      // 判断边界条件
      if (left < 0) {
        // 当左测超出就会变负值
        left = 0;
      }
      if (left > mask.offsetWidth) {
        // 当右侧超出mask的宽度(正常情况下,mask的两倍宽度就是图片显示的宽度)
        left = mask.offsetWidth;
      }
      if (top < 0) {
        top = 0;
      }
      if (top > mask.offsetHeight) {
        top = mask.offsetWidth;
      }

      // 修改mask的style属性
      // TIPS 记得加px
      mask.style.left = left + "px";
      mask.style.top = top + "px";

      // 修改bigImg的style属性
      // 属性是两倍，方向相反
      bigImg.style.left = -2 * left + "px";
      bigImg.style.top = -2 * top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>