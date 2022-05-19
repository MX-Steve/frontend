import request from "@/utils/request";

export function choices_get(query) {
  return request({
    url: "/assets/v1/choices",
    method: "get",
    params: query,
  });
}
