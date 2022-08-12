<template>
  <div class="cart" v-if="cartList">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartList" :key="item.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked == 1"
              @change="switchCheck(item.skuId, item.isChecked, item)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum('del', -1, item)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              disabled
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkuNum('add', 1, item)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.cartPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="delItems(item.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isCheckAll"
          @click="updAllItemIsChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="delAllItemIsChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import debounce from "lodash/debounce.js";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  computed: {
    // 获取cartList
    ...mapGetters(["cartList"]),
    // 计算总费用
    totalPrice() {
      let arr = this.cartList.filter((item) => {
        return item.isChecked == 1;
      });
      let total = arr.reduce((prev, next) => {
        return prev + next.cartPrice * next.skuNum;
      }, 0);
      return total;
    },
    // 检测是否全选
    isCheckAll() {
      return this.cartList.every((item) => {
        return item.isChecked == 1;
      });
    },
  },
  methods: {
    async getData() {
      let result = await this.$store.dispatch("cartList");
      return result;
    },
    /**
     * @description:  改变商品数量
     * @param {*} item -- 商品信息对象
     * @param {*} type -- 触发的类别,是减少,增加
     * @param {*} num -- 发请求携带的参数
     * @return {*}
     */
    // 防抖
    changeSkuNum: debounce(async function (type, num, item) {
      switch (type) {
        case "del":
          // 减少的情况,要检测商品数量是不是不能再减了(1)
          // console.log(item);
          if (item.skuNum > 1) {
            let data = {
              goodsId: item.skuId,
              buyNum: num,
            };
            try {
              await this.$store.dispatch("addOrUpdata", data);
              // 成功以后重新获取购物车数据
              this.getData();
            } catch (error) {
              alert(error);
            }
          }
          break;

        case "add":
          let data = {
            goodsId: item.skuId,
            buyNum: num,
          };
          try {
            await this.$store.dispatch("addOrUpdata", data);
            // 成功以后重新获取购物车数据
            this.$store.dispatch("cartList");
          } catch (error) {
            alert(error);
          }
          break;
      }
    }, 1000),

    // 改变check的状态
    async switchCheck(skuId, isChecked, item) {
      console.log(item);
      let data = {
        skuId: skuId,
        isChecked: isChecked ? "0" : "1",
      };
      try {
        await this.$store.dispatch("switchGoodsCheck", data);
        // 成功重新获取数据
        this.getData();
      } catch (error) {
        alert(error);
      }
    },
    // 删除商品
    async delItems(skuId) {
      try {
        await this.$store.dispatch("deleteItems", skuId);
        this.getData();
      } catch (error) {
        alert(error);
      }
    },
    // 删除所有选中的商品
    async delAllItemIsChecked() {
      try {
        await this.$store.dispatch("deleteAllItemIsChecked");
        // 删除成功以后返回最终的购物车数据
        this.getData();
      } catch (error) {
        alert(error);
      }
    },
    // 修改所有商品的选中状态
    async updAllItemIsChecked(event) {
      console.log(event.target.checked);
      let checked = event.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch("updataAllItemIsChecked", checked);
        this.getData();
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>