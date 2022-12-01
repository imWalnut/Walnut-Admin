import http from "@/utils/http"
import { EHttpMethod, EApiSite } from "@/serviceType/index";

class UserInfoService {
  // POST请求示例
  postDemo(data:any) {
    return http({
      url:`${EApiSite.BASE}/test/post`,
      method: EHttpMethod.POST,
      data
    })
  }

  // GET请求示例
  getDemo(params:any) {
    return http({
      url: `${EApiSite.BASE}/test/get?params=${params}`,
      method: EHttpMethod.GET,
    })
  }
}
export default new UserInfoService();
