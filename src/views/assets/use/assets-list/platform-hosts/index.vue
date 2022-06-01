<template>
    <div class="platform-hosts">
        <div v-if="!is_mobile">
            <div class="sub-title">机器列表</div>
            <el-card class="box-card" shadow="always">
                <el-form :inline="true" :model="host" class="demo-form-inline">
                    <el-form-item label="主机名">
                        <el-input v-model="host.hostname" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="虚拟磁盘池">
                        <el-input v-model="host.v_pool" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="zone">
                        <el-input v-model="host.zone" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="租户">
                        <el-input v-model="host.tenant" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="vpc">
                        <el-input v-model="host.vpc" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="uuid">
                        <el-input v-model="host.uuid" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="主机地址">
                        <el-input v-model="host.host_ip" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="主机VIP">
                        <el-input v-model="host.vip" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchHost">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>机器列表</span>
                    <el-button v-if="add_btn_show" type="primary" style="float: right; padding: 3px 10px"
                        @click="create_btn()">
                        <i class="el-icon-plus" />
                        新建
                    </el-button>
                </div>
                <el-table v-loading="loading" :data="hosts_list" border style="width: 100%">
                    <el-table-column prop="id" label="ID" width="55" fixed />
                    <el-table-column prop="v_pool" label="虚拟云盘池" width="100" fixed />
                    <el-table-column prop="zone" label="所属区" />
                    <el-table-column prop="tenant" label="所属租户" width="120" fixed />
                    <el-table-column prop="hostname" label="主机名" width="180" />
                    <el-table-column prop="host_type" label="主机类型" />
                    <el-table-column prop="ssh_user" label="ssh账号" />
                    <el-table-column prop="ssh_pwd" label="ssh账号密码" />
                    <el-table-column prop="ssh_port" label="ssh端口" />
                    <el-table-column prop="vpc" label="VPC" width="200" />
                    <el-table-column prop="iso" label="镜像" width="180" />
                    <el-table-column prop="system_disk_size" label="系统盘" />
                    <el-table-column prop="cpus" label="cpu核数" />
                    <el-table-column prop="memery" label="内存" />
                    <el-table-column prop="data_disk_size" label="数据盘" />
                    <el-table-column prop="data_disk_type" label="数据盘类型" />
                    <el-table-column prop="host_ip" label="主机IP" />
                    <el-table-column prop="uuid" label="UUID" />
                    <el-table-column prop="vip" label="VIP" />
                    <el-table-column prop="system_type" label="操作系统类型" />
                    <el-table-column prop="description" label="描述" width="200" />
                    <el-table-column label="操作" width="150">
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
            <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
                <el-form ref="host" :model="host" label-width="100px">
                    <el-form-item label="虚拟云盘池">
                        <el-input v-model="host.v_pool" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="zone区">
                        <el-input v-model="host.zone" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="所属租户">
                        <el-input v-model="host.tenant" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="主机名">
                        <el-input v-model="host.hostname" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="主机类型">
                        <el-input v-model="host.host_type" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="ssh账号">
                        <el-input v-model="host.ssh_user" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="ssh账号密码">
                        <el-input v-model="host.ssh_pwd" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="ssh端口">
                        <el-input v-model="host.ssh_port" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="VPC">
                        <el-input v-model="host.vpc" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="镜像">
                        <el-input v-model="host.iso" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="系统盘">
                        <el-input v-model="host.system_disk_size" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="cpu核数">
                        <el-input v-model="host.cpus" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="内存">
                        <el-input v-model="host.memery" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="数据盘">
                        <el-input v-model="host.data_disk_size" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="数据盘类型">
                        <el-input v-model="host.data_disk_type" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="主机IP">
                        <el-input v-model="host.host_ip" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="UUID">
                        <el-input v-model="host.uuid" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="VIP">
                        <el-input v-model="host.vip" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="操作系统类型">
                        <el-input v-model="host.system_type" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="host.description" placeholder="请输入" />
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
import { platform_hosts_get, platform_hosts_cud } from "@/api/assets/platforms";
import { btn_check } from "@/api/btn";
import { PlatformHostsPage } from "@/utils/auth";
export default {
    name: "PlatformHosts",
    data() {
        return {
            dialogVisible: false,
            dialogTitle: "",
            is_mobile: config.isMobile,
            loading: true,
            hosts_list: [],
            host: {
                id: "",
                v_pool: "",
                zone: "",
                tenant: "",
                hostname: "",
                host_type: "",
                ssh_user: "",
                ssh_pwd: "",
                ssh_port: "",
                vpc: "",
                iso: "",
                system_disk_size: "",
                cpus: "",
                memery: "",
                data_disk_size: "",
                data_disk_type: "",
                host_ip: "",
                uuid: "",
                vip: "",
                system_type: "",
                description: "",
                del_tag: "",
            },
            page_no: 1,
            page_size: 10,
            total: 1,
            env_list: [],
            PlatformHostsPage: PlatformHostsPage,
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
        searchHost() {
            this.page_no = 1
            this.page_data()
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
            btn_check(this.PlatformHostsPage).then(response => {
                if (response.code === 200) {
                    this.add_btn_show = response.data.add;
                    this.edit_btn_show = response.data.edit;
                    this.del_btn_show = response.data.del;
                }
            })
            this.page_data()
        },
        page_data() {
            var query = this.host
            query["page_no"] = this.page_no
            query["page_size"] = this.page_size
            platform_hosts_get(query).then((response) => {
                if (response.code === 200) {
                    this.hosts_list = response.data.hosts;
                    this.total = response.data.total;
                } else {
                    this.hosts_list = [];
                }
                this.loading = false;
            });
        },
        create_btn() {
            this.dialogTitle = "创建机器";
            this.host = {
                id: "",
                v_pool: "",
                zone: "",
                tenant: "",
                hostname: "",
                host_type: "",
                ssh_user: "",
                ssh_pwd: "",
                ssh_port: "",
                vpc: "",
                iso: "",
                system_disk_size: "",
                cpus: "",
                memery: "",
                data_disk_size: "",
                data_disk_type: "",
                host_ip: "",
                uuid: "",
                vip: "",
                system_type: "",
                description: "",
                del_tag: "",
            };
            this.dialogVisible = true;
        },
        edit_btn(row) {
            this.host = row;
            this.dialogTitle = "更新机器";
            this.dialogVisible = true;
        },
        del_btn(row) {
            platform_hosts_cud("delete", row).then((response) => {
                this.response_refresh_func(response);
            });
        },
        dialog_confirm() {
            if (this.dialogTitle === "更新机器") {
                platform_hosts_cud("put", this.host).then((response) => {
                    this.response_func(response);
                });
            } else if (this.dialogTitle === "创建机器") {
                delete this.host["id", "del_tag"]
                platform_hosts_cud("post", this.host).then((response) => {
                    this.response_refresh_func(response);
                });
            }
        },
        dialog_cancel() {
            this.host = {
                id: "",
                v_pool: "",
                zone: "",
                tenant: "",
                hostname: "",
                host_type: "",
                ssh_user: "",
                ssh_pwd: "",
                ssh_port: "",
                vpc: "",
                iso: "",
                system_disk_size: "",
                cpus: "",
                memery: "",
                data_disk_size: "",
                data_disk_type: "",
                host_ip: "",
                uuid: "",
                vip: "",
                system_type: "",
                description: "",
                del_tag: "",
            };
            this.dialogVisible = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.platform-hosts {
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
