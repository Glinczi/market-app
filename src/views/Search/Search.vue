
<template>
  <div>
    <type-nav></type-nav>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 面包屑,种类名称 -->
            <li class="with-x" v-if="$route.query.categoryName">
              {{ $route.query.categoryName }}<i @click="removeName">×</i>
            </li>
            <!-- 面包屑,关键字 -->
            <li class="with-x" v-if="$route.params.keyword">
              {{ $route.params.keyword }}<i @click="removeKw">×</i>
            </li>
            <!-- 面包屑,品牌名 -->
            <li class="with-x" v-if="searchValue.trademark">
              {{ searchValue.trademark.split(":")[1]
              }}<i @click="removeTM">×</i>
            </li>
            <!-- 面包屑,参数列表 -->
            <!-- TIPS 这里需要注意,因为参数列表是一个数组,需要循环显示 -->
            <li
              class="with-x"
              v-for="(items, index) in searchValue.props"
              :key="index"
            >
              {{ items.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!-- 设置自定义事件用来接收子组件传递的参数 -->
        <search-selector
          @getTradeMark="getTradeMark"
          @getProps="getProps"
        ></search-selector>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: nowNav == 1 }" @click="changeOrder(1)">
                  <a
                    >综合<i v-show="getOrder == 'asc' && nowNav == 1">⬆</i
                    ><i v-show="getOrder == 'desc' && nowNav == 1">⬇</i>
                  </a>
                </li>
                <li :class="{ active: nowNav == 2 }" @click="changeOrder(2)">
                  <a
                    >销量<i v-show="getOrder == 'asc' && nowNav == 2">⬆</i
                    ><i v-show="getOrder == 'desc' && nowNav == 2">⬇</i></a
                  >
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品部分 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 具体商品部分,通过声明式跳转 -->
                    <router-link :to="`/detail/${goods.id}`"
                      ><img :src="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页部分 -->
          <MyPagination :pageValue="pageValue" @getPageNow="getPageNow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TypeNav from "@/components/TypeNav/TypeNav.vue";
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector.vue";
export default {
  components: { TypeNav, SearchSelector, SearchSelector, SearchSelector },
  name: "search",
  // 路由组件可以传递props
  data() {
    return {
      searchValue: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        // 默认综合降序(不合理)
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
      // 监测选择的是综合还是价格
      nowNav: 1,
    };
  },
  watch: {
    // 通过监听路由信息的变化,实现再次发送请求
    $route(to, from) {
      // 发生变化的时候要清空category1Id,category2Id,category3Id
      // 因为当用户点击列表选项的时候,如果不清空,之前的值不会被覆盖
      this.searchValue.category1Id = "";
      this.searchValue.category2Id = "";
      this.searchValue.category3Id = "";
      // 然后合并路由中的参数对象
      Object.assign(this.searchValue, this.$route.params, this.$route.query);
      // 发送请求
      this.getData();
    },
  },
  beforeMount() {
    // 在页面挂载完毕发送请求之前将请求数据修改掉
    let params = this.$route.params;
    let query = this.$route.query;
    Object.assign(this.searchValue, params, query);
    // console.log(this.searchValue);
  },
  mounted() {
    // 派发请求(需要传入数据)
    this.getData();
  },
  computed: {
    ...mapGetters(["goodsList"]),
    // 获取现在是升序还是降序
    getOrder() {
      return this.searchValue.order.split(":")[1];
    },
    // 从仓库获取页面相关的数据
    ...mapState({
      totalSize: (state) => {
        return state.search.searchList.total;
      },
    }),
    // 整合页面数据
    pageValue() {
      return {
        pageNow: this.searchValue.pageNo,
        pageSize: this.searchValue.pageSize,
        total: this.totalSize,
        continues: 5,
      };
    },
  },
  methods: {
    // 向服务器发请求,请求是多次的,所以可以封装成一个方法
    getData() {
      return this.$store.dispatch("searchList", this.searchValue);
    },
    // 删除面包屑种类名
    removeName() {
      // 有以下几种情况需要考虑
      // 1. 删除种类名以后,种类的id也需要删除
      this.searchValue.categoryName = ""; // 也可以是undefined,如果是undefined,下次发送请求就不会有这个参数(优化)
      this.searchValue.category1Id = "";
      this.searchValue.category2Id = "";
      this.searchValue.category3Id = "";
      this.searchValue.trademark = "";
      // 2. 如果有关键词,不能删除
      if (this.$route.params) {
        this.$router.push({
          name: "search",
          params: this.$route.params,
        });
      }
      // 3. 路由要发生变化,直接编程式跳转,然后传递参数
    },
    // 删除面包屑关键词
    removeKw() {
      // TODO 这里为啥要删除关键词,我重新编程式跳转的时候没有传递keyword啊???
      this.searchValue.keyword = "";
      // 删除header中输入框中的值(全局事件总线)
      this.$root.$emit("clearInput");
      // 看看query里面有没有参数,有要保留
      if (this.$route.query) {
        this.$router.push({
          name: "search",
          query: this.$route.query,
        });
      }
    },
    // 获取品牌名
    getTradeMark(TM) {
      // console.log(TM);
      // 整理数据
      // 这里需要注意,参数格式,示例: "1:苹果"
      this.searchValue.trademark = `${TM.tmId}:${TM.tmName}`;
      // 发请求
      this.getData();
    },
    // 删除面包屑品牌名
    removeTM() {
      // 删除数据中的trademark
      this.searchValue.trademark = "";
      this.getData();
    },
    // 获取参数数据
    getProps(props) {
      // console.log("我是父组件", props);
      // 获取数据,整合数据,发送请求
      // TIPS 因为可能数组中已经有点击过的数据,不能继续添加(避免数据重复)
      if (this.searchValue.props.indexOf(props) == -1) {
        this.searchValue.props.push(props);
        this.getData();
      }
    },
    // 移除参数数据
    removeAttr(index) {
      // 移除就是删除props数组中某一项,需要下标
      this.searchValue.props.splice(index, 1);
      // 数据更新,重新发送请求
      this.getData();
    },
    /**
     * @description: 改变请求数据中的排序参数
     * @param {Number} now 当前点击的选项序号
     * @return {*}
     */
    changeOrder(now) {
      // 判断传递过来点击的参数和当前高亮的参数是不是一样
      if (this.nowNav != now) {
        // 不一样就不改变箭头方向,保持默认值,只改变当前要高亮的参数
        this.nowNav = now;
        return;
      }
      // 确定好当前高亮的参数
      // 判断请求数据中排序是升还是降,然后再重新整合请求的数据
      if (this.getOrder === "asc") {
        this.searchValue.order = `${now}:desc`;
      } else {
        this.searchValue.order = `${now}:asc`;
      }
    },
    // 获取分页组件传递传递过来的当前页码值
    getPageNow(pageNo) {
      console.log(pageNo);
      // 获得新的页面值,更新当前显示的页面
      this.searchValue.pageNo = pageNo;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>