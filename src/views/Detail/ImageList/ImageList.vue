<template>
  <div class="swiper-container" v-if="skuImageList" ref="swp">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(skuImage, index) in skuImageList"
        :key="skuImage.id"
      >
        <img
          :src="skuImage.imgUrl"
          :class="{ active: skuImage.isDefault == '1' }"
          @click="changeNowActive(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  watch: {
    // 监听数据,可以保证数据是ok的,但是不能确定v-for遍历结构是否完成了
    skuImageList: {
      handler: function () {
        this.$nextTick(() => {
          new Swiper(this.$refs.swp, {
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 设置显示的数量
            slidesPerView: 3,
            // 一点切换三个
            slidesPerGroup: 2,
          });
        });
      },
    },
  },
  methods: {
    // 改变当前选中图片
    changeNowActive(index) {
      this.skuImageList.forEach((item) => {
        item.isDefault = "0";
      });
      // 为了影响放大镜图片的显示,需要修改当前选中图片的 isDefault
      this.skuImageList[index].isDefault = "1";
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>