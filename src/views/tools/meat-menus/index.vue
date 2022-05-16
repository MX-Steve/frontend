<template>
    <div class="meat-menus">
        <div v-if="!is_mobile">
            <el-card class="box-card" shadow="always">
                <el-form :inline="true" :model="meat" class="demo-form-inline">
                    <el-form-item label="食谱内容">
                        <el-input v-model="meat.content" placeholder="请输入食谱内容" />
                    </el-form-item>
                    <el-form-item label="日期">
                        <el-date-picker style="width: 100%" v-model="meat.meat_date" value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchMeat">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>食谱列表</span>
                    <el-button v-if="add_btn_show" type="primary" style="float: right; padding: 3px 10px"
                        @click="create_btn()">
                        <i class="el-icon-plus" />
                        新建
                    </el-button>
                </div>
                <el-table v-loading="loading" :data="menus_list" border style="width: 100%">
                    <el-table-column prop="id" label="ID" width="55" />
                    <el-table-column prop="type" label="类型" width="100">
                        <template slot-scope="scope">
                            {{ scope.row.type === "morning" ? "早餐" :
                                    scope.row.type === "noon" ? "午餐" : "晚餐"
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="content" label="内容" />
                    <el-table-column prop="meat_date" label="日期" width="150" />
                    <el-table-column prop="meat_day" label="星期" width="150" />
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
                <el-form ref="meat" :model="meat" label-width="100px">
                    <el-form-item label="食谱名称">
                        <el-input v-model="meat.content" placeholder="请输入食谱名称" />
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="meat.type" placeholder="请选择" style="width: 100%">
                            <el-option label="早餐" value="morning"></el-option>
                            <el-option label="午餐" value="noon"></el-option>
                            <el-option label="晚餐" value="evening"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="日期">
                        <el-date-picker style="width: 100%" v-model="meat.meat_date" value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd" type="date" placeholder="选择日期">
                        </el-date-picker>
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
import { meat_menus_get, meat_menus_cud } from "@/api/tools/meat-menus";
import { btn_check } from "@/api/btn";
import { MeatMenusPage } from "@/utils/auth";
export default {
    name: "MeatMenus",
    data() {
        return {
            dialogVisible: false,
            dialogTitle: "",
            is_mobile: config.isMobile,
            loading: true,
            menus_list: [],
            meat: {
                type: "",
                content: "",
                meat_date: "",
                meat_day: ""
            },
            page_no: 1,
            page_size: 10,
            total: 1,
            env_list: [],
            MeatMenusPage: MeatMenusPage,
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
        searchMeat() {
            this.page_data()
        },
        handleCurrentChange(val) {
            this.page_no = val;
            this.page_data();
        },
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                })
                .catch((_) => { });
        },
        page_data() {
            var query = {
                page_no: this.page_no,
                page_size: this.page_size,
            };
            if (this.meat["content"] !== "") {
                query["content"] = this.meat["content"]
            }
            if (this.meat["meat_date"] !== "") {
                query["meat_date"] = this.meat["meat_date"]
            }

            meat_menus_get(query).then((response) => {
                if (response.code === 200) {
                    this.menus_list = response.data.menus;
                    this.total = response.data.total;
                } else {
                    this.menus_list = [];
                }
                this.loading = false;
            });
        },
        init_data() {
            btn_check(this.MeatMenusPage).then(response => {
                if (response.code === 200) {
                    this.add_btn_show = response.data.add;
                    this.edit_btn_show = response.data.edit;
                    this.del_btn_show = response.data.del;
                }
            })
            this.page_data()
        },
        create_btn() {
            this.dialogTitle = "创建食谱";
            this.meat = {
                type: "",
                content: "",
                meat_date: "",
                meat_day: ""
            };
            this.dialogVisible = true;
        },
        edit_btn(row) {
            this.meat = row;
            this.dialogTitle = "更新食谱";
            this.dialogVisible = true;
        },
        del_btn(row) {
            meat_menus_cud("delete", row).then((response) => {
                this.response_refresh_func(response);
            });
        },
        dialog_confirm() {
            var dateArray = this.meat["meat_date"].split("-")
            var date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
            var meat_day = "星期" + "日一二三四五六".charAt(date.getDay());
            this.meat["meat_day"] = meat_day
            if (this.dialogTitle === "更新食谱") {
                meat_menus_cud("put", this.meat).then((response) => {
                    this.response_func(response);
                });
            } else if (this.dialogTitle === "创建食谱") {
                meat_menus_cud("post", this.meat).then((response) => {
                    this.response_refresh_func(response);
                });
            }
        },
        dialog_cancel() {
            this.meat = {
                id: "",
                type: "",
                content: "",
                meat_date: "",
                meat_day: ""
            };
            this.dialogVisible = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.meat-menus {
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
