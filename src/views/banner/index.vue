<template>
  <div class="app-container">
    <div class="filter-container"><el-button class="filter-item" size="small" style="float:right" type="primary" icon="el-icon-edit" @click="handleCreate()">新增</el-button></div>
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
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      :current-page.sync="pageIndex"
      layout="total, prev, pager, next"
      class="fenye"
      background
      @current-change="currentchange($event)"/>
  </div>
</template>

<script>
import { getBannerList, getBannerCount, deleteBanner } from '@/api/banner'
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
      listLoading: true,
      pageIndex: 1,
      total: 0
    }
  },
  watch: {
    '$route'(to, from) {
      var id = Number(to.params.id)
      this.pageIndex = !id ? 1 : id
      this.fetchData()
    }
  },
  created() {
    this.getCount()
  },
  methods: {
    getCount() {
      this.listLoading = true
      getBannerCount().then(res => {
        var id = Number(this.$route.params.id)
        this.pageIndex = id
        this.total = res.data.totalCount
        this.listLoading = false
      }).then(res => {
        this.fetchData()
      })
    },
    fetchData() {
      this.listLoading = true
      var pageIndex = this.pageIndex
      var obj = { pageIndex }
      getBannerList(obj).then(response => {
        console.log(response.data.items)
        this.list = response.data.items
        this.listLoading = false
      })
    },
    currentchange(e) {
      const index = e
      this.$router.push({ name: 'list', params: { id: index }})
    },
    deleteitem(id) {
      var list = this.list
      for (var i = 0, len = list.length; i < len; i++) {
        if (list[i].id === id) {
          list.splice(i, 1)
          break
        }
      }
    },
    handleDelete(index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBanner(Number(index)).then(res => {
          if (res.data.success) {
            this.deleteitem(Number(index))
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleUpdate(id) {
      this.$router.push({ name: 'edit', params: { id: id }})
    },
    handleCreate() {
      this.$router.push({ name: 'edit', params: { id: 0 }})
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
