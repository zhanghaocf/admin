<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      stripe
      highlight-current-row>
      <el-table-column align="center" label="序号" width="95" prop="id" />
      <el-table-column label="链接" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank">{{ scope.row.url }}</a>
        </template>
      </el-table-column>
      <el-table-column width="370" label="图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.img" class="bannerImg">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="120"
      layout="total, prev, pager, next"
      class="fenye"
      background
      @current-change="currentchange()"/>
  </div>
</template>

<script>
import { getBannerList } from '@/api/banner'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  watch: {
    '$route'(to, from) {
      console.log(to.params.id)
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getBannerList(this.listQuery).then(response => {
        console.log(response.data.items)
        this.list = response.data.items
        this.listLoading = false
      })
    },
    currentchange(e) {
      console.log(e)
    }
  }
}
</script>
<style scoped>
.bannerImg{
  width:100%;
	max-height:300px;
	object-fit: cover;
}
.fenye{
	margin:15px 0;
}
</style>
