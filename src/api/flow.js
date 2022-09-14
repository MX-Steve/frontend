import request from "@/utils/request";

export function GetFlow(id) {
    return request({
        url: "/tools/v1/flow",
        method: "get",
        params: { id: id },
    });
}
export function GetFlowNames() {
    return request({
        url: "/tools/v1/flow",
        method: "get",
        params: { type: "names" },
    });
}
export function FlowCud(method, data) {
    return request({
        url: "/tools/v1/flow",
        method: method,
        data: data,
    });
}