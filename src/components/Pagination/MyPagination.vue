<template>
  <div class="my-pagination">
    <div class="pagination">
      <!-- 如果当前页面是第一页,不可以被点击 -->
      <!-- 当点击上一页的时候,告诉父组件当前页面-1 -->
      <button
        :disabled="pageValue.pageNow == 1"
        @click="$emit('getPageNow', pageValue.pageNow - 1)"
      >
        上一页
      </button>
      <!-- 点击第一页,告诉父组件当前页面就是第一页 -->
      <button
        v-show="startNumAndEndNum.start != 1"
        @click="$emit('getPageNow', 1)"
        :class="{ active: pageValue.pageNow == 1 }"
      >
        1
      </button>
      <!-- 假设当前总页数是18,如果start页数是3,省略号就要显示 -->
      <button v-show="startNumAndEndNum.start > 2">···</button>

      <div
        v-for="(page, index) in startNumAndEndNum.end"
        :key="index"
        class="btn"
      >
        <!-- 当页数比开始值相等或大就显示 -->
        <button
          v-if="page >= startNumAndEndNum.start"
          @click="$emit('getPageNow', page)"
          :class="{ active: pageValue.pageNow == page }"
        >
          {{ page }}
        </button>
      </div>
      <!-- 假设当前总页数是18,如果end页数是16,省略号就要显示 -->
      <button v-show="startNumAndEndNum.end < totalPage - 1">···</button>
      <button
        v-show="startNumAndEndNum.end != totalPage"
        @click="$emit('getPageNow', totalPage)"
        :class="{ active: pageValue.pageNow == totalPage }"
      >
        {{ totalPage }}
      </button>
      <!-- 当前页面是最后一页,不能被点击 -->
      <!-- 点击下一页,告诉父组件当前页面+1 -->
      <button
        :disabled="pageValue.pageNow == totalPage"
        @click="$emit('getPageNow', pageValue.pageNow + 1)"
      >
        下一页
      </button>

      <button style="margin-left: 30px">共 {{ pageValue.total }} 条</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyPagination",
  props: ["pageValue"],
  computed: {
    totalPage() {
      return Math.ceil(this.pageValue.total / this.pageValue.pageSize);
    },
    startNumAndEndNum() {
      const { pageNow, continues, total } = this.pageValue;
      let start;
      let end;
      // 特殊情况,数据量不足连续的页面数
      if (this.totalPage < continues) {
        start = 1;
        end = this.totalPage;
      } else {
        // 计算连续显示页的开始(结束) = 当前显示页 -(+) parseInt(连续显示页 / 2)
        start = pageNow - parseInt(continues / 2);
        end = pageNow + parseInt(continues / 2);
        // 开始出现负数的情况
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 如果结束页号大于总页数
        if (end > this.totalPage) {
          end = this.totalPage;
          start = end - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.my-pagination {
  text-align: center;
}
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.btn {
  display: inline-flex;
}
</style>