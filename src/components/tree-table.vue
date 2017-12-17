<template>
  <div>
    <div>数据是使用 Mock.js 随机生成的，并非真实的省市区。</div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="区域">
        <template slot-scope="scope">
          <!--这里对等级进行循环，循环出相应的空格，在视图上来表示等级关系；减 1 是因为我们的等级是从1开始的-->
          <span class="space" v-for="i in (scope.row.level - 1)" :key="i"></span>
          <i :class="{'el-icon-caret-right': !scope.row.show, 'el-icon-caret-bottom': scope.row.show}"
             @click="handleRow(scope.$index, scope.row)"
             v-if="scope.row.children"></i>
          <!--当展开箭头不应该显示的时候，这里应该也要有相应的占位，不影响视图显示-->
          <span class="arrow-width" v-else></span>
          <span>{{scope.row.area}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="level"
        label="级别">
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import tableData from '../assets/table-data.js'
  export default {
    data() {
      return {
        tableData: []
      }
    },
    created(){
      this.getData();
    },
    methods: {
      getData(){
        // 获取模拟数据
        this.$http.get('http://api.a.com/area')
          .then(result => {
            this.tableData = result.data;
            console.log(this.tableData)
          })
      },
      handleRow(index, row){
        // 因为数组的 splice 方法会从传递的开始位置进行操作，我们这里展开位置应该不变，所以加 1 从下一位开始操作。
        index++;
        // 有子集才对其进行操作
        if(row.level < 3 && row.children.length > 0){
          if(row.show){
            // 当列表处于展开状态时，只需要在tableData里从点击位置开始删除子集长度个数的元素。
            this.tableData.splice(index, row.children.length);
            row.show = false;
          }else {
            // 当需要展开时，其实是取出子集元素添加到父级里
            row.children.forEach(value => {
              this.tableData.splice(index, 0, value);
              index++;
            });
            row.show = true;
          }
        }
      }
    }
  }
</script>
<style>
  .space{
    width: 20px;
    display: inline-block;
  }
  .arrow-width{
    width: 14px;
    display: inline-block;
  }
</style>
