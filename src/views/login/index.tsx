import {
  getCurrentInstance,
  defineComponent,
  ref,
  onMounted,
  reactive
} from "vue"
import './index.less'
import type { TabsPaneContext, FormRules, FormInstance } from 'element-plus'
import {User, Lock} from "@element-plus/icons-vue";
import wSlider from "@/components/wSlider";
import {ERoutePath, ILoginParams} from "@/serviceType";

export default defineComponent({
  name: "Login",
  components: {
    User,
    Lock,
    wSlider
  },
  props: {},
  setup(props, { attrs, slots, emit, expose }) {
    const currentInstance: any = getCurrentInstance()
    const proxy: any = currentInstance.proxy

    const activeTab = ref('account') // 当前激活的tab
    const isKeep = ref(false) // 记住密码单选框状态
    const isAgree = ref(true) // 是否已验证

    const form = reactive<ILoginParams>({ // 登录表单信息
      account: 'amin',
      password: '123456'
    })

    // tabs切换事件
    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }

    // 滑动验证组件回调
    const handleVerification = (val:boolean) => {
      isAgree.value = !val
    }

    // 登陆
    const handleLogin = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          proxy.$router.push(ERoutePath.HOME)
        } else {
          console.log('error submit!', fields)
        }
      })
    }

    onMounted(async ()=> {
    })

    // 账号密码登陆表单
    const renderAccount = () => {
      const rules = reactive<FormRules>({
        account: [
          {
            required: true,
            message: proxy.$t('login.pleaseEnterAccount'),
            trigger: 'change',
          },
        ],
        password: [
          {
            required: true,
            message: proxy.$t('login.pleaseEnterPwd'),
            trigger: 'change',
          },
        ],
      })
      return (
        <div class="tabs-form">
          <el-form model={form} rules={rules} ref="ruleFormRef">
            <el-form-item prop="account">
              <el-input v-model={form.account} v-slots={{prepend: <wIcon icon="User" />}} prefixIcon="User" size="large" placeholder={proxy.$t('login.pleaseEnterAccount')} />
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model={form.password} type="password" v-slots={{prepend: <wIcon icon="Lock" />}} show-password prefixIcon="Lock" size="large" placeholder={proxy.$t('login.pleaseEnterPwd')} />
            </el-form-item>
          </el-form>
          <wSlider onChange={(e:boolean) => handleVerification(e)} />
          <el-button onClick={() => handleLogin(proxy.$refs.ruleFormRef)} disabled={isAgree.value} class="tabs-form-btn" size="large" type="primary">{proxy.$t('login.login')}</el-button>
          <div class="tabs-form-pwd">
            <el-checkbox v-model={isKeep.value}>{proxy.$t('login.keepPassword')}</el-checkbox>
            <el-button text>{proxy.$t('login.forgetPassword')}</el-button>
          </div>
        </div>
      )
    }

    // 手机验证登陆表单
    const renderPhone = () => {
      return (
        <div>
          Config
        </div>
      )
    }

    // 登陆框
    const renderLogin = () => {
      return (
        <div class="login-box">
          <div class="box-header">{proxy.$t('login.welcomeToLogin')}</div>
          <el-tabs v-model={activeTab.value} class="box-tabs" onTabClick={handleClick}>
            <el-tab-pane label={proxy.$t('login.loginByAccount')} name="account">{renderAccount()}</el-tab-pane>
            <el-tab-pane label={proxy.$t('login.loginByPhone')} name="phone">{renderPhone()}</el-tab-pane>
          </el-tabs>
        </div>
      )
    }

    return () => (
      <div class="login">
        {renderLogin()}
      </div>
    )
  }
})
