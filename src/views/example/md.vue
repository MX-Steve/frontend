<template>
  <el-card class="box-card" shadow="always">
    <el-form :inline="true" :model="article" class="demo-form-inline">
      <el-form-item label="脚本名">
        <el-input v-model="article.title" placeholder="脚本名"></el-input>
      </el-form-item>
      <el-form-item label="脚本类型">
        <el-select v-model="article.type" placeholder="脚本类型">
          <el-option v-for="item in types" :label="item" :value="item" :key="item"></el-option>
        </el-select>
      </el-form-item>
      <markdown-editor ref="markdownEditor" v-model="article.content"
      :options="{ hideModeSwitch: true, previewStyle: 'tab' }" height="350px" />
      <el-form-item>
        <el-button type="primary" @click="article_post">
          {{isEdit?"更新":"发布"}}
        </el-button>
      </el-form-item>
    </el-form>
    

  </el-card>

</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import { article_cud, article_get } from "@/api/tools/article"

export default {
  name: 'MarkdownDemo',
  components: { MarkdownEditor },
  data() {
    return {
      isEdit: false,
      id: "",
      types: ["shell", "python"],
      article: {
        title: "",
        content: "",
        type: ""
      },
      languageTypeList: {
        'en': 'en_US',
        'zh': 'zh_CN',
        'es': 'es_ES'
      }
    }
  },
  computed: {
    language() {
      return this.languageTypeList['en']
    }
  },
  mounted(){
    if(this.$route.query.id){
      this.fetchData(this.$route.query.id)
    }
  },
  methods: {
    fetchData(id) {
      article_get({ id: Number(id) }).then(response => {
        this.article = response.data.articles[0]
      })
    },
    getHtml() {
      this.html = this.$refs.markdownEditor.getHtml()
      console.log(this.html)
    },
    article_post(){
      article_cud("post", this.article).then(response=>{
        if (response.code === 200) {
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
          location.reload(0)
        } else {
          this.$notify({
            title: '失败',
            message: '创建失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.editor-container {
  margin-bottom: 30px;
}

.tag-title {
  margin-bottom: 5px;
}
</style>
