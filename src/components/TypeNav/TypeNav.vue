<template>
  <div>
    <!-- 商品分类导航 -->
    <div class="type-nav">
      <div class="container" @mouseleave="defaultIndex">
        <!-- 通过鼠标移入和移出,控制三级联动的显示和隐藏 -->
        <h2 class="all" @mouseenter="showNav" @mouseleave="hideNav">
          全部商品分类
        </h2>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
        <!-- NEW 通过transtion组件控制过渡动画(可以设置name属性,指定动画对应的部分) -->
        <!-- 通过show来控制显示还是隐藏 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 通过事件委托开跳转到搜索页面 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(l1, index) in categoryList"
                :key="l1.categoryId"
                :class="{ now: nowIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 一级路由跳转 -->
                  <a
                    :data-categoryName="l1.categoryName"
                    :data-category1Id="l1.categoryId"
                    >{{ l1.categoryName }}</a
                  >
                </h3>
                <!-- 二级,三级 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: nowIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="l2 in l1.categoryChild"
                    :key="l2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <!-- 二级路由跳转 -->
                        <a
                          :data-categoryName="l2.categoryName"
                          :data-category2Id="l2.categoryId"
                          >{{ l2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="l3 in l2.categoryChild" :key="l3.categoryId">
                          <!-- 三级路由跳转 -->
                          <a
                            :data-categoryName="l3.categoryName"
                            :data-category3Id="l3.categoryId"
                            >{{ l3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入 throttle 函数
import throttle from "lodash/throttle.js";
export default {
  // 这个组件要多次复用
  // 将组件注册成全局组件
  // Vue.
  name: "TypeNav",
  // 组件挂载完毕,可以向服务器发请求
  mounted() {
    // 挂载完毕,判断当前是不是search页面,是就隐藏三级联动
    if (!this.$route.path.includes("/home")) {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        // 这个state是大仓库的数据
        return state.home.categoryList;
      },
    }),
  },
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      nowIndex: -1,
      // 控制三级联动的显示和隐藏,在Search页面使用
      show: true,
    };
  },
  methods: {
    // ----------------------------------
    // 鼠标进入,修改nowIndex的数据
    // 这里为了防止页面卡顿,需要采用节流的方式处理一下(引入lodash的throttle函数)
    // !!!!这里的写法要注意以下
    changeIndex: throttle(function (index) {
      this.nowIndex = index;
    }, 50),
    // ----------------------------------

    // 修改nowIndex为默认值
    defaultIndex() {
      this.nowIndex = -1;
    },

    // 跳转到搜索页面
    goSearch(event) {
      // 问题点:1.确定点击的是不是a标签 2.传递参数
      // {可以通过event.target判断点击的是不是a标签(只有a标签才会跳转)}
      console.log(event);
      if (event.target.nodeName == "A") {
        // 整理数据
        let location = {
          name: "search",
        };
        console.log(event.target.dataset);
        let { categoryname, category1id, category2id, category3id } =
          event.target.dataset;
        // console.log(categoryname, category1id, category2id, category3id);
        let query = {
          categoryName: categoryname,
        };
        // 动态添加所选的层级
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 将最后确定的query放入location中
        location.query = query;
        // 判断有没有params参数,如果有就顺便带上
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        // 最后的跳转
        this.$router.push(location);
      } else {
        return;
      }
    },
    // ----------------------------------
    // 移入显示三级联动
    showNav() {
      this.show = true;
    },
    // 移出隐藏三级联动
    hideNav() {
      // 如果是search页面才能触发
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
    // ----------------------------------
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            a {
              color: #333;
              cursor: pointer;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   // background-color: yellowgreen;
          //   .item-list {
          //     // 通过display控制显示和隐藏
          //     display: block;
          //   }
          // }
        }
        .now {
          background-color: steelblue;
        }
      }
    }
    // ------------------------------------------
    // NEW Vue过渡动画
    .sort-enter {
      // 定义进入过渡的开始状态
      height: 0px;
    }
    .sort-enter-to {
      // 定义进入过渡的结束状态
      height: 461px;
    }
    .sort-enter-active {
      // 定义进入过渡生效时的状态
      // 个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
      transition: height 0.1s linear;
    }
    // ------------------------------------------
  }
  a {
    cursor: pointer;
  }
}
</style>