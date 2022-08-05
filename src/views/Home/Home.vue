<template>
  <div>
    <type-nav></type-nav>
    <list-container></list-container>
    <today-recommend></today-recommend>
    <rank></rank>
    <like></like>
    <floor></floor>
    <floor></floor>
    <brand></brand>
  </div>
</template>

<script>
import Brand from "./Brand.vue";
import Floor from "./Floor.vue";
import Like from "./Like.vue";
import ListContainer from "./ListContainer.vue";
import Rank from "./Rank.vue";
import TodayRecommend from "./TodayRecommend.vue";
import TypeNav from "../../components/TypeNav/TypeNav.vue";

export default {
  components: {
    TypeNav,
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
};
</script>

<style lang="scss" scoped>
</style>