import http from "@/utils/http"
import {EApiSite} from '@/serviceType/index'

class UserInfoService {
  // POST请求示例
  postDemo(data:any) {
    return http({
      url:`${EApiSite.BASE}/test/post`,
      method:'POST',
      data
    })
  }

  // GET请求示例
  getDemo(params:any) {
    return http({
      url: `${EApiSite.BASE}/test/get?params=${params}`
    })
  }
}
export default new UserInfoService();
