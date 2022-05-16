import request from "@/utils/request";

export function alarm_get(query) {
  return request({
    url: "/tools/v1/alarm",
    method: "get",
    params: query,
  });
}

export function alarm_cud(method, data) {
  return request({
    url: "/tools/v1/alarm",
    method: method,
    data: data,
  });
}