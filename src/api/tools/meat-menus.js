import request from "@/utils/request";

export function meat_menus_get(query) {
  return request({
    url: "/tools/v1/meat-menus",
    method: "get",
    params: query,
  });
}

export function meat_menus_cud(method, data) {
  return request({
    url: "/tools/v1/meat-menus",
    method: method,
    data: data,
  });
}