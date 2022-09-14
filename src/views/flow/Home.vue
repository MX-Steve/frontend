<template>
    <div class="super-flow-base-demo">
        <el-select v-model="jobName" placeholder="请选择业务架构" @change="changeFlow()">
            <el-option v-for="(item,i) in jobs" :key="i" :label="item.name" :value="item.name">
            </el-option>
        </el-select>
        <el-button @click="dialogVisible = true" style="margin-left:10px;" type="success" icon="el-icon-plus" circle
            size="small"></el-button>
        <el-button @click="delFlow()" type="danger" icon="el-icon-delete" circle size="small"></el-button>
        <super-flow ref="superFlow" :node-list="nodeList" :link-list="linkList" :origin="origin"
            :graph-menu="graphMenuList" :node-menu="nodeMenuList" :link-menu="linkMenuList"
            :enter-intercept="enterIntercept" :output-intercept="outputIntercept" :link-desc="linkDesc">
            <template v-slot:node="{meta}">
                <div :class="`flow-node flow-node-${meta.prop}`">
                    <header class="ellipsis">
                        {{ meta.name }}
                    </header>
                    <section>
                        {{ meta.desc }}
                    </section>
                </div>
            </template>
        </super-flow>
        <el-dialog :title="drawerConf.title" :visible.sync="drawerConf.visible" :close-on-click-modal="false"
            width="500px">
            <el-form @keyup.native.enter="settingSubmit" @submit.native.prevent
                v-show="drawerConf.type === drawerType.node" ref="nodeSetting" :model="nodeSetting">
                <el-form-item label="节点名称" prop="name">
                    <el-input v-model="nodeSetting.name" placeholder="请输入节点名称" maxlength="30">
                    </el-input>
                </el-form-item>
                <el-form-item label="节点描述" prop="desc">
                    <el-input v-model="nodeSetting.desc" placeholder="请输入节点描述" maxlength="30">
                    </el-input>
                </el-form-item>
            </el-form>
            <el-form @keyup.native.enter="settingSubmit" @submit.native.prevent
                v-show="drawerConf.type === drawerType.link" ref="linkSetting" :model="linkSetting">
                <el-form-item label="连线描述" prop="desc">
                    <el-input v-model="linkSetting.desc" placeholder="请输入连线描述">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="drawerConf.cancel">
                    取 消
                </el-button>
                <el-button type="primary" @click="settingSubmit">
                    确 定
                </el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加flow面板" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form ref="flowForm" :model="flowForm" label-width="80px">
                <el-form-item label="面板名称">
                    <el-input v-model="flowForm.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addName()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import SuperFlow from 'vue-super-flow'
import 'vue-super-flow/lib/index.css'
import { MessageBox, Message } from "element-ui"
import { GetFlow, GetFlowNames, FlowCud } from '@/api/flow'

const drawerType = {
    node: 0,
    link: 1
}
export default {
    data() {
        return {
            flowForm: {
                name: ""
            },
            dialogVisible: false,
            jobs: [{ "id": 1, "name": "demo" }],
            jobId: 1,
            jobName: "demo",
            drawerType,
            drawerConf: {
                title: '',
                visible: false,
                type: null,
                info: null,
                open: (type, info) => {
                    const conf = this.drawerConf
                    conf.visible = true
                    conf.type = type
                    conf.info = info
                    if (conf.type === drawerType.node) {
                        conf.title = '节点'
                        if (this.$refs.nodeSetting) this.$refs.nodeSetting.resetFields()
                        this.$set(this.nodeSetting, 'name', info.meta.name)
                        this.$set(this.nodeSetting, 'desc', info.meta.desc)
                    } else {
                        conf.title = '连线'
                        if (this.$refs.linkSetting) this.$refs.linkSetting.resetFields()
                        this.$set(this.linkSetting, 'desc', info.meta ? info.meta.desc : '')
                    }
                },
                cancel: () => {
                    this.drawerConf.visible = false
                    if (this.drawerConf.type === drawerType.node) {
                        this.$refs.nodeSetting.clearValidate()
                    } else {
                        this.$refs.linkSetting.clearValidate()
                    }
                }
            },
            linkSetting: {
                desc: ''
            },
            //默认节点新信息
            nodeSetting: {
                name: '节点名称',
                desc: '节点描述'
            },
            //二维坐标系原点
            origin: [1000, 465],
            //节点列表
            nodeList: [],
            //连接线列表
            linkList: [],
            //鼠标右键功能列表
            graphMenuList: [
                [
                    {
                        label: '开始节点',
                        disable(graph) {
                            return !!graph.nodeList.find(node => node.meta.prop === 'start')
                        },
                        selected: (graph, coordinate) => {
                            const start = graph.nodeList.find(node => node.meta.prop === 'start')
                            if (!start) {
                                graph.addNode({
                                    width: 100,
                                    height: 80,
                                    coordinate: coordinate,
                                    meta: {
                                        prop: 'start',
                                        name: '开始节点'
                                    }
                                })
                            }
                        }
                    },
                    {
                        label: '红色节点',
                        disable: false,
                        selected: (graph, coordinate) => {
                            graph.addNode({
                                width: 160,
                                height: 80,
                                coordinate: coordinate,
                                meta: {
                                    prop: 'condition',
                                    name: '红色节点'
                                }
                            })
                        }
                    },
                    {
                        label: '黄色节点',
                        disable: false,
                        selected: (graph, coordinate) => {
                            graph.addNode({
                                width: 160,
                                height: 80,
                                coordinate: coordinate,
                                meta: {
                                    prop: 'approval',
                                    name: '黄色节点'
                                }
                            })
                        }
                    },
                    {
                        label: '绿色节点',
                        disable: false,
                        selected: (graph, coordinate) => {
                            graph.addNode({
                                width: 160,
                                height: 80,
                                coordinate: coordinate,
                                meta: {
                                    prop: 'cc',
                                    name: '绿色节点'
                                }
                            })
                        }
                    },
                    {
                        label: '结束节点',
                        disable(graph) {
                            return !!graph.nodeList.find(node => node.meta.prop === 'end')
                        },
                        selected: (graph, coordinate) => {
                            graph.addNode({
                                width: 100,
                                height: 80,
                                coordinate: coordinate,
                                meta: {
                                    prop: 'end',
                                    name: '结束节点'
                                }
                            })
                        }
                    }
                ],
                [
                    {
                        label: '保存数据',
                        selected: (graph, coordinate) => {
                            // var job = JSON.stringify(graph.toJSON(), null, 2)
                            var job = JSON.stringify(graph.toJSON())
                            for (var i = 0; i < this.jobs.length; i++) {
                                var item = this.jobs[i]
                                if (item.id === Number(this.jobId)) {
                                    this.flowForm.name = item.name
                                    break
                                }
                            }
                            FlowCud("put", { "name": this.flowForm.name, "job": job }).then(res => {
                                if (res.code !== 200) {
                                    this.$message({
                                        type: 'error',
                                        message: "保存job失败"
                                    })
                                } else {
                                    this.$message({
                                        type: 'success',
                                        message: res.msg
                                    })
                                }
                            })
                        }
                    },
                    {
                        label: '全选',
                        selected: (graph, coordinate) => {
                            graph.selectAll()
                        }
                    }
                ]
            ],
            that: this,
            //选中鼠标右键功能列表--节点
            nodeMenuList: [
                [
                    {
                        label: '删除',
                        disable: false,
                        hidden(node) {
                            return node.meta.prop === 'start'
                        },
                        selected(node, coordinate) {
                            MessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                Message.success('删除成功!');
                                node.remove()
                            }).catch(() => {
                                Message.info('已取消操作!');
                            });

                        }
                    }
                ],
                [
                    {
                        label: '编辑',
                        selected: (node, coordinate) => {
                            this.drawerConf.open(drawerType.node, node)
                        }
                    }
                ]
            ],
            //选中鼠标右键功能列表--连接线
            linkMenuList: [
                [
                    {
                        label: '删除',
                        disable: false,
                        selected: (link, coordinate) => {
                            link.remove()
                        }
                    }
                ],
                [
                    {
                        label: '编辑',
                        disable: false,
                        selected: (link, coordinate) => {
                            this.drawerConf.open(drawerType.link, link)
                        }
                    }
                ]
            ]
        }
    },
    components: { SuperFlow },
    created() {
        this.getFNames()
        this.initData()
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        changeFlow() {
            for (var i = 0; i < this.jobs.length; i++) {
                var item = this.jobs[i]
                if (item.name === this.jobName) {
                    this.jobId = item.id
                    break
                }
            }
            this.gf(this.jobId)
        },
        addName() {
            var name = this.flowForm.name
            var job = "UseDemo"
            FlowCud("put", { "name": name, "job": job }).then(res => {
                if (res.code !== 200) {
                    this.$message({
                        type: 'error',
                        message: "保存job失败"
                    })
                } else {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                    this.dialogVisible = false
                    this.$router.go(0);
                }
            })
        },
        delFlow() {
            var data = { "id": this.jobId }
            if (this.jobId == 1) {
                this.$message({
                    type: 'error',
                    message: "Demo 不能删除"
                })
            } else {
                FlowCud("delete", data).then(res => {
                    if (res.code !== 200) {
                        this.$message({
                            type: 'error',
                            message: "存取job失败"
                        })
                    } else {
                        this.$message({
                            type: 'success',
                            message: res.msg
                        })
                        this.$router.go(0);
                    }
                })
            }
        },
        getFNames() {
            GetFlowNames().then(res => {
                var data = res.data
                if (res.code === 200) {
                    var jobs = data
                    console.log(jobs)
                    this.jobs = jobs
                }
            })
        },
        gf(jobId) {
            GetFlow(jobId).then(res => {
                var data = res.data
                if (res.code !== 200) {
                    this.$message({
                        type: 'error',
                        message: "存取job失败"
                    })
                } else {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                    var job = data.job
                    this.jobId = data.id
                    job = job.replaceAll('\\', '')
                    var jobObj = JSON.parse(job)
                    const origin = jobObj.origin
                    const nodeList = jobObj.nodeList
                    const linkList = jobObj.linkList
                    setTimeout(() => {
                        this.nodeList = nodeList
                        this.linkList = linkList
                        this.origin = origin
                    }, 100)
                }
            })
        },
        initData() {
            this.gf(this.jobId)
        },
        //连线进入节点限制函数
        enterIntercept(formNode, toNode, graph) {
            const formType = formNode.meta.prop
            switch (toNode.meta.prop) {
                //开始节点--只出不进
                case 'start':
                    return false
                case 'approval':
                    return [
                        'start',
                        'approval',
                        'condition',
                        'cc'
                    ].includes(formType)
                case 'condition':
                    return [
                        'start',
                        'approval',
                        'condition',
                        'cc'
                    ].includes(formType)
                case 'end':
                    return [
                        'approval',
                        'cc'
                    ].includes(formType)
                default:
                    return true
            }
        },
        //节点生成连线限制
        outputIntercept(node, graph) {
            return !(node.meta.prop === 'end')
        },
        //生成 link 定制描述文字（连接线描述）
        linkDesc(link) {
            return link.meta ? link.meta.desc : ''
        },
        //描述确定按钮
        settingSubmit() {
            const conf = this.drawerConf
            if (this.drawerConf.type === drawerType.node) {
                if (!conf.info.meta) conf.info.meta = {}
                Object.keys(this.nodeSetting).forEach(key => {
                    this.$set(conf.info.meta, key, this.nodeSetting[key])
                })
                this.$refs.nodeSetting.resetFields()
            } else {
                if (!conf.info.meta) conf.info.meta = {}
                Object.keys(this.linkSetting).forEach(key => {
                    this.$set(conf.info.meta, key, this.linkSetting[key])
                })
                this.$refs.linkSetting.resetFields()
            }
            conf.visible = false
        }
    }
}
</script>
<style lang="scss" scoped>
.tips {
    color: red;
}

.ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: break-word;
}

.super-flow-base-demo {
    width: 100%;
    height: 800px;
    margin: 0 auto;
    background-color: #f5f5f5;

    .super-flow__node {
        .flow-node {
            >header {
                font-size: 14px;
                height: 32px;
                line-height: 32px;
                padding: 0 12px;
                color: #ffffff;
            }

            >section {
                text-align: center;
                line-height: 20px;
                overflow: hidden;
                padding: 6px 12px;
                word-break: break-all;
            }

            &.flow-node-start {
                >header {
                    background-color: #55abfc;
                }
            }

            &.flow-node-condition {
                >header {
                    background-color: #BC1D16;
                }
            }

            &.flow-node-approval {
                >header {
                    background-color: rgba(188, 181, 58, 0.76);
                }
            }

            &.flow-node-cc {
                >header {
                    background-color: #30b95c;
                }
            }

            &.flow-node-end {
                >header {
                    height: 32px;

                    background-color: rgb(0, 0, 0);
                }
            }
        }
    }
}
</style>