<template>
  <div class="alarm-clock">
    <div v-if="!is_mobile">
      <div class="sub-title">闹钟列表</div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>闹钟列表</span>
          <el-button v-if="add_btn_show" type="primary" style="float: right; padding: 3px 10px" @click="create_btn()">
            <i class="el-icon-plus" />
            新建
          </el-button>
        </div>
        <el-table v-loading="loading" :data="alarm_list" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="55" />
          <el-table-column prop="name" label="闹钟名称" width="150" />
          <el-table-column prop="desc" label="描述信息" />
          <el-table-column prop="music" label="是否播放音乐">
            <template slot-scope="scope">
              {{ scope.row.music === 1 ? "开启" : "不开启" }}
            </template>
          </el-table-column>
          <el-table-column prop="alarm_time" label="闹钟时间" />
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button type="text" v-if="edit_btn_show" @click="edit_btn(scope.row)">
                编辑
              </el-button>
              <el-button v-if="del_btn_show" type="text" style="color: red" @click="del_btn(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination small layout="prev, pager, next" :page-size="page_size" :total="total"
          @current-change="handleCurrentChange" />
      </el-card>
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form ref="alarm" :model="alarm" label-width="100px">
          <el-form-item label="闹钟名称">
            <el-input v-model="alarm.name" placeholder="请输入闹钟名称" />
          </el-form-item>
          <el-form-item label="闹钟时间">
            <el-date-picker style="width: 100%" v-model="alarm.alarm_time" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="闹钟描述">
            <el-input v-model="alarm.desc" placeholder="请输入闹钟描述" />
          </el-form-item>
          <el-form-item label="开启音乐">
            <el-select v-model="alarm.music" placeholder="请选择" style="width: 100%">
              <el-option label="不开启" value="0"></el-option>
              <el-option label="开启" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialog_cancel()">取 消</el-button>
            <el-button type="primary" @click="dialog_confirm()">
              确 定
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div v-if="is_mobile">

    </div>
  </div>
</template>

<script>
import config from "@/utils/config";
import { alarm_get, alarm_cud } from "@/api/tools/alarm";
import { btn_check } from "@/api/btn";
import { AlarmPage } from "@/utils/auth";
export default {
  name: "AlarmClock",
  data() {
    return {
      dialogVisible: false,
      dialogTitle: "",
      is_mobile: config.isMobile,
      loading: true,
      alarm_list: [],
      alarm: {
        name: "",
        desc: "",
        music: 0,
        alarm_time: ""
      },
      page_no: 1,
      page_size: 10,
      total: 1,
      env_list: [],
      AlarmPage: AlarmPage,
      del_btn_show: 0,
      add_btn_show: 0,
      edit_btn_show: 0,
    };
  },
  mounted() {
    this.init_data()
  },
  methods: {
    response_func(response) {
      if (response.code === 200) {
        this.dialogVisible = false;
        this.$message({
          message: response.msg,
          type: "success",
        });
      } else {
        this.$message({
          message: response.msg,
          type: "warning",
        });
      }
    },
    response_refresh_func(response) {
      if (response.code == 200) {
        this.dialogVisible = false;
        this.$message({
          message: response.msg,
          type: "success",
        });
        location.reload(0);
      } else {
        this.$message({
          message: response.msg,
          type: "warning",
        });
      }
    },
    handleCurrentChange(val) {
      this.now_page = val;
      this.init_data();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => { });
    },
    init_data() {
      btn_check(this.AlarmPage).then(response => {
        if (response.code === 200) {
          this.add_btn_show = response.data.add;
          this.edit_btn_show = response.data.edit;
          this.del_btn_show = response.data.del;
        }
      })
      const query = {
        page_no: this.page_no,
        page_size: this.page_size,
      };
      alarm_get(query).then((response) => {
        if (response.code === 200) {
          this.alarm_list = response.data.alarms;
          this.total = response.data.total;
        } else {
          this.alarm_list = [];
        }
        this.loading = false;
      });
    },
    create_btn() {
      this.dialogTitle = "创建闹钟";
      this.alarm = {
        name: "",
        desc: "",
        music: 0,
        alarm_time: ""
      };
      this.dialogVisible = true;
    },
    edit_btn(row) {
      this.alarm = row;
      this.dialogTitle = "更新闹钟";
      this.dialogVisible = true;
    },
    del_btn(row) {
      alarm_cud("delete", row).then((response) => {
        this.response_refresh_func(response);
      });
    },
    dialog_confirm() {
      if (this.dialogTitle === "更新闹钟") {
        alarm_cud("put", this.alarm).then((response) => {
          this.response_func(response);
        });
      } else if (this.dialogTitle === "创建闹钟") {
        alarm_cud("post", this.alarm).then((response) => {
          this.response_refresh_func(response);
        });
      }
    },
    dialog_cancel() {
      this.alarm = {
        name: "",
        desc: "",
        music: 0,
        alarm_time: ""
      };
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.alarm-clock {
  min-height: 450px;
  width: 98%;
  margin: 15px auto;
  background-color: #fff;
  padding: 15px;

  .sub-title {
    padding-top: 20px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 2px solid #ccc;
  }

  .box-card {
    margin: 15px auto;
  }
}
</style>
