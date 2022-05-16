<template>
  <div class="dashboard-container">
    <div v-if="!is_mobile" class="web">
      <div class="head">
        <el-row>
          <el-col :span="6">
            <el-card shadow="hover">
              <div slot="header" class="clearfix card-head">
                <span> <i class="el-icon-s-home" /> 人生意义 </span>
              </div>
              <div class="card-box">
                <div class="number">求得好死</div>
                <div class="info">人无完人</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div slot="header" class="clearfix card-head">
                <span> <i class="el-icon-magic-stick" /> 神的概念 </span>
              </div>
              <div class="card-box">
                <div class="number online">合理定位</div>
                <div class="info">正确预判不久将要发生的事</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div slot="header" class="clearfix card-head">
                <span> <i class="el-icon-shopping-cart-full" /> 个人追求 </span>
              </div>
              <div class="card-box">
                <div class="number">能力机遇</div>
                <div class="info">在适当的时机、位置，做适当的事</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div slot="header" class="clearfix card-head">
                <span> <i class="el-icon-coin" /> 对待他人 </span>
              </div>
              <div class="card-box">
                <div class="number">心平气和</div>
                <div class="info">害人之心不可有，防人之心不可无</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="body">
        <el-row>
          <el-col :span="24" style="min-height: 340px">
            <el-card shadow="hover" style="min-height: 340px">
              <div slot="header" class="clearfix">
                <span>美好事物</span>
              </div>
              <div class="card-box">
                <el-carousel :interval="4000" type="card" height="300px">
                  <el-carousel-item>
                    <h3 class="medium" style="text-align:center">行走在路上</h3>
                    <el-row>
                      <el-col>
                        <img :src="p1" width="540" height="280" alt="Girl has dropped her ice cream.">
                      </el-col>
                    </el-row>
                  </el-carousel-item>
                  <el-carousel-item>
                    <h3 class="medium" style="text-align:center">经历风雨</h3>
                    <el-row>
                      <el-col>
                        <img :src="p2" width="540" height="280" alt="Girl has dropped her ice cream.">
                      </el-col>
                    </el-row>
                  </el-carousel-item>
                  <el-carousel-item>
                    <h3 class="medium" style="text-align:center">就一定会见到彩虹</h3>
                    <el-row>
                      <el-col>
                        <img :src="p3" width="540" height="280" alt="Girl has dropped her ice cream.">
                      </el-col>
                    </el-row>
                  </el-carousel-item>
                  <el-carousel-item>
                    <h3 class="medium" style="text-align:center">不辜负自己</h3>
                    <el-row>
                      <el-col>
                        <img :src="p4" width="540" height="280" alt="Girl has dropped her ice cream.">
                      </el-col>
                    </el-row>
                  </el-carousel-item>
                  <el-carousel-item>
                    <h3 class="medium" style="text-align:center">不辜负他人</h3>
                    <el-row>
                      <el-col>
                        <img :src="p5" width="540" height="280" alt="Girl has dropped her ice cream.">
                      </el-col>
                    </el-row>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </el-card>
          </el-col>
          <el-col :span="24" style="min-height: 340px">
            <el-card shadow="hover" style="min-height: 340px">
              <div slot="header" class="clearfix">
                <span>心里是她</span>
              </div>
              <div class="card-box">
                <el-carousel :interval="4000" type="card" height="300px">
                  <el-carousel-item style="text-align:center">
                    <el-row>
                      <el-col>
                        <img :src="t1" height="300" alt="Girl has dropped her ice cream.">
                      </el-col>
                    </el-row>
                  </el-carousel-item>
                  <el-carousel-item style="text-align:center">
                    <el-row>
                      <el-col>
                        <img :src="t2" height="300" alt="Girl has dropped her ice cream.">
                      </el-col>
                    </el-row>
                  </el-carousel-item>
                  <el-carousel-item style="text-align:center">
                    <el-row>
                      <el-col>
                        <img :src="t3" height="300" alt="Girl has dropped her ice cream.">
                      </el-col>
                    </el-row>
                  </el-carousel-item>
                  <el-carousel-item style="text-align:center">
                    <el-row>
                      <el-col>
                        <img :src="t4" height="300" alt="Girl has dropped her ice cream.">
                      </el-col>
                    </el-row>
                  </el-carousel-item>
                  <el-carousel-item style="text-align:center">
                    <el-row>
                      <el-col>
                        <img :src="t5" height="300" alt="Girl has dropped her ice cream.">
                      </el-col>
                    </el-row>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-if="is_mobile" class="mobile">
      
    </div>
  </div>
</template>

<script>
import p1 from "@/assets/label1/p1.jpeg";
import p2 from "@/assets/label1/p2.jpeg";
import p3 from "@/assets/label1/p3.jpeg";
import p4 from "@/assets/label1/p4.jpeg";
import p5 from "@/assets/label1/p5.jpeg";
import t1 from "@/assets/label2/p1.jpg";
import t2 from "@/assets/label2/p2.jpg";
import t3 from "@/assets/label2/p3.jpg";
import t4 from "@/assets/label2/p4.jpg";
import t5 from "@/assets/label2/p5.jpg";
import echarts from "echarts";
import {
  summary_machine_get,
  summary_approval_get,
} from "@/api/dashboard/index";
import { user_login_get } from "@/api/user";
import config from "@/utils/config";
export function get_date_time(dt) {
  var date = new Date(dt);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  var day = date.getDate();
  day = day < 10 ? "0" + day : day;
  var hour = date.getHours();
  hour = hour < 10 ? "0" + hour : hour;
  var minute = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  var second = date.getSeconds();
  second = second < 10 ? "0" + second : second;
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  );
}
export default {
  name: "Dashboard",
  data() {
    return {
      p1:p1,
      p2:p2,
      p3:p3,
      p4:p4,
      p5:p5,
      t1:t1,
      t2:t2,
      t3:t3,
      t4:t4,
      t5:t5,
      is_mobile: config.isMobile,
    };
  },
  beforeCreate() { },
  mounted() {
  },
  methods: {
    handleCurrentChange(val) {
      this.page_no = val;
      this.page_data();
    },
    page_data() {
      user_login_get({ page_no: this.page_no, page_size: this.page_size }).then((response) => {
        if (response.code === 200) {
          var table_users = response.data.users;
          for (var i = 0; i < table_users.length; i++) {
            var item = table_users[i]
            var newDate = get_date_time(item.last_login);
            table_users[i]["last_login"] = newDate;
          }
          this.table_users = table_users;
          this.total = response.data.total;
        } else {
          this.table_users = [];
          this.total = 1;
        }
      });
    },
    init_data() {
      summary_machine_get().then((response) => {
        if (response.code == 200) {
          this.header = response.data.header;
          this.idc_total_list = response.data.idc_total_list;
          this.assets_type_list = response.data.assets_type_list;
        }
      });
      var height = document.getElementById("idc_table").clientHeight;
      this.table_height = height;
      this.page_data()
    },
    drawPieChart() {
      var legend_data = [];
      for (var i = 0; i < this.assets_type_list.length; i++) {
        var item = this.assets_type_list[i];
        legend_data.push(item.name);
      }
      this.chartPie = echarts.init(document.getElementById("chartPie"));
      this.chartPie.setOption({
        title: {
          text: "服务器类型",
          subtext: "服务器类型展示",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: legend_data,
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.assets_type_list,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    drawCharts() {
      this.drawPieChart();
    },
    async drawLine(id) {
      const obj = await summary_approval_get();
      this.approvals = obj.data;
      const series = [];
      this.approvalXData = Object.keys(this.approvals[0].data);
      for (let i = 0; i < this.approvals.length; i++) {
        const item = this.approvals[i];
        series.push({
          name: item.approval_name,
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              color: item.color,
            },
          },
          data: Object.values(item.data),
        });
        this.legends.push(item.approval_name);
      }
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: this.legends,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.approvalXData,
        },
        yAxis: {
          type: "value",
        },
        series: series,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dashboard-container {
  width: 99%;
  min-height: 680px;
  margin: 5px auto;
  // background-color: #fff;
  padding: 5px 0;

  .head {
    margin: 15px auto;

    .card-head {
      color: #aaa;
    }

    .card-box {
      .number {
        font-size: 38px;
        color: #666;
      }

      .online {
        color: green;
      }

      .danger {
        color: red;
      }

      .info {
        color: #999;
        font-size: 14px;
        margin-top: 10px;
      }
    }
  }

  .body {
    .title {
      font-size: 18px;
      color: #999;
    }

    .card-box {
      min-height: 150px;
    }
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 20px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}
</style>
