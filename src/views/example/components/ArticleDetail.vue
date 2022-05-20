<template>
  <div class="createPost-container">
    <el-form ref="article" :model="article" class="form-container">

      <el-row :z-index="10" style="margin-top: 15px;">
        <el-col :offset="22" :span="2">
          <el-button style="margin-left: 10px;" type="success" @click="submitForm">
            {{isEdit?"更新":"发布"}}
          </el-button>
        </el-col>
      </el-row>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="article.title" :maxlength="100" name="name" required>
                标题
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="margin-bottom: 40px;" label-width="70px" label="类型:">
          <el-select v-model="article.type" clearable placeholder="请选择">
            <el-option v-for="item in types" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="article.content" :height="400" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { article_get, article_cud } from "@/api/tools/article"
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'


export default {
  name: 'ArticleDetail',
  components: { Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      types: ["frontend", "backend", "db", "structure", "other", "security", "network"],
      article: {
        title: "",
        content: "",
        type: ""
      },
    }
  },
  computed: {
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
  },
  methods: {
    fetchData(id) {
      article_get({ id: id }).then(response => {
        this.article = response.data.articles[0]
      })
    },
    submitForm() {
      if (this.isEdit) {
        article_cud("put", this.article).then(response => {
          if (response.code === 200) {
            this.$notify({
              title: '成功',
              message: '更新文章成功',
              type: 'success',
              duration: 2000
            })
            location.reload(0)
          } else {
            this.$notify({
              title: '失败',
              message: '更新文章失败',
              type: 'error',
              duration: 2000
            })
            location.reload(0)
          }
        })
      } else {
        article_cud("post", this.article).then(response => {
          if (response.code === 200) {
            this.$notify({
              title: '成功',
              message: '发布文章成功',
              type: 'success',
              duration: 2000
            })
            location.reload(0)
          } else {
            this.$notify({
              title: '失败',
              message: '发布文章失败',
              type: 'error',
              duration: 2000
            })
            location.reload(0)
          }
        })
      }

      // this.$refs.postForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     this.$notify({
      //       title: '成功',
      //       message: '发布文章成功',
      //       type: 'success',
      //       duration: 2000
      //     })
      //     this.postForm.status = 'published'
      //     this.loading = false
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
