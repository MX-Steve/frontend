import request from "@/utils/request";

export function platform_hosts_get(query) {
  return request({
    url: "/assets/v1/platform-hosts",
    method: "get",
    params: query,
  });
}

export function platform_hosts_cud(method, data) {
  return request({
    url: "/assets/v1/platform-hosts",
    method: method,
    data: data,
  });
}