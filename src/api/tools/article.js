import request from "@/utils/request";

export function article_get(query) {
  return request({
    url: "/tools/v1/articles",
    method: "get",
    params: query,
  });
}

export function article_cud(method, data) {
  return request({
    url: "/tools/v1/articles",
    method: method,
    data: data,
  });
}