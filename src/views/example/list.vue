<template>
  <div class="app-container">
    <el-card class="box-card" shadow="always">
      <el-form :inline="true" :model="article" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="article.title" placeholder="请输入标题" />
        </el-form-item>
        <el-select v-model="article.type" clearable placeholder="请选择">
          <el-option v-for="item in types" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
        <el-form-item>
          <el-button type="primary" @click="searchArticle">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-row>
      <el-col :offset="20" :cols="2" style="margin-top: 5px; margin-bottom: 5px;">
        <router-link :to="'/example/create'">
          <el-button type="primary" size="small">
            文档创建
          </el-button>
        </router-link>
        <router-link :to="'/example/md'">
          <el-button type="success" size="small">
            脚本创建
          </el-button>
        </router-link>
      </el-col>
    </el-row>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="标题">
        <template slot-scope="{row}">
          <router-link :to="'/example/edit/' + row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12">
              <router-link v-if="scope.row.type === 'frontend' ||
              scope.row.type === 'backend' ||
              scope.row.type === 'db'  ||
              scope.row.type === 'structure' || 
              scope.row.type === 'security' ||
              scope.row.type === 'network' ||  
              scope.row.type === 'other'" :to="'/example/edit/' + scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit">
                  编辑
                </el-button>
              </router-link>
              <router-link v-else :to="'/example/md?id=' + scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit">
                  编辑
                </el-button>
              </router-link>
            </el-col>
            <el-col :span="12">
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="delete_btn(scope.row)">
                删除
              </el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="page_no" :limit.sync="page_size" @pagination="getList" />
  </div>
</template>

<script>
import { article_cud, article_get } from "@/api/tools/article"
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      article: {
        id: "",
        title: "",
        created_at: "",
        type: ""
      },
      types: ["frontend", "backend", "db", "structure", "other", "shell", "python", "security", "network"],
      total: 0,
      listLoading: false,
      page_no: 1,
      page_size: 10,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    searchArticle() {
      this.page_no = 1
      this.getList()
    },
    delete_btn(row){
      article_cud("delete", row).then(response=>{
        if (response.code === 200) {
          this.$notify({
            title: '成功',
            message: '删除文章成功',
            type: 'success',
            duration: 2000
          })
          location.reload(0)
        } else {
          this.$notify({
            title: '失败',
            message: '删除文章失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    getList() {
      this.listLoading = true
      var obj = {
        page_no: this.page_no,
        page_size: this.page_size,
        title: this.article.title,
        type: this.article.type
      }
      article_get(obj).then(response => {
        this.list = response.data.articles
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
