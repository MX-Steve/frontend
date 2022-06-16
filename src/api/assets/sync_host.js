import request from "@/utils/request";

export function sync_hosts() {
  return request({
    url: "/assets/v1/sync-hosts",
    method: "post"
  });
}