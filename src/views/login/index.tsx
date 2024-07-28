/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ComponentInternalInstance,
  getCurrentInstance,
  defineComponent,
  ref,
  reactive,
} from "vue";
import classes from "./index.module.less";
import type { TabsPaneContext, FormRules, FormInstance } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";
import wSlider from "@/components/wSlider";
import { ERoutePath, ETrigger, CPlaceholderEnter } from "@/types";
import type { ILoginParams } from '@/types/instance/login'
import https from "@/service";
import useUserStore from '@/store/user';

export default defineComponent({
  name: "Login",
  components: {
    User,
    Lock,
    wSlider,
  },
  props: {},
  setup(props, { attrs, slots, emit, expose }) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;

    const userStore = useUserStore()

    // 变量
    const activeTab = ref("account"); // 当前激活的tab
    const isKeep = ref(false); // 记住密码单选框状态
    const isAgree = ref(true); // 是否已验证
    const form = reactive<ILoginParams>({
      // 登录表单信息
      login: "admin",
      password: "123456",
    });
    const rules = ref<FormRules>({
      // 登陆表单验证规则
      login: [
        {
          required: true,
          message: CPlaceholderEnter,
          trigger: ETrigger.CHANGE,
        },
      ],
      password: [
        {
          required: true,
          message: CPlaceholderEnter,
          trigger: ETrigger.CHANGE,
        },
      ],
    });

    // tabs切换事件
    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event);
    };

    // 滑动验证组件回调
    const handleVerification = (val: boolean) => {
      isAgree.value = !val;
    };

    // 登陆
    const handleLogin = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate(async (valid, fields) => {
        if (valid) {
          const res = await https.AuthService.loginAPI(form);
          if (res) {
            userStore.setUserInfo(res.data.userInfo)
            proxy?.$router.push(ERoutePath.HOME);
          }
        } else {
          console.log("error submit!", fields);
        }
      });
    };

    // 账号密码登陆表单
    const renderAccount = () => {
      const refForm = proxy?.$refs.refForm as FormInstance
      const slotsUser = { prepend: () => <wIcon icon="User" /> };
      const slotsLock = { prepend: () => <wIcon icon="Lock" /> };
      return (
        <div class={classes.tabs_form}>
          <el-form model={form} rules={rules} ref="refForm">
            <el-form-item prop="login">
              <el-input
                v-model={form.login}
                v-slots={slotsUser}
                prefixIcon="User"
                size="large"
                placeholder={proxy?.$t("login.pleaseEnterAccount")}
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model={form.password}
                v-slots={slotsLock}
                type="password"
                show-password
                prefixIcon="Lock"
                size="large"
                placeholder={proxy?.$t("login.pleaseEnterPwd")}
              />
            </el-form-item>
          </el-form>
          <wSlider onChange={(e: boolean) => handleVerification(e)} />
          <el-button
            onClick={() => handleLogin(refForm)}
            disabled={isAgree.value}
            class={classes.tabs_form_btn}
            size="large"
            type="primary"
          >
            {proxy?.$t("login.login")}
          </el-button>
          <div class={classes.tabs_form_pwd}>
            <el-checkbox v-model={isKeep.value}>
              {proxy?.$t("login.keepPassword")}
            </el-checkbox>
            <el-button text>{proxy?.$t("login.forgetPassword")}</el-button>
          </div>
        </div>
      );
    };

    // 手机验证登陆表单
    const renderPhone = () => {
      return <div>Config</div>;
    };

    // 登陆框
    const renderLogin = () => {
      return (
        <div class={classes.login_box}>
          <div class={classes.box_header}>
            {proxy?.$t("login.welcomeToLogin")}
          </div>
          <el-tabs
            v-model={activeTab.value}
            class={classes.box_tabs}
            onTabClick={handleClick}
          >
            <el-tab-pane
              label={proxy?.$t("login.loginByAccount")}
              name="account"
            >
              {renderAccount()}
            </el-tab-pane>
            <el-tab-pane label={proxy?.$t("login.loginByPhone")} name="phone">
              {renderPhone()}
            </el-tab-pane>
          </el-tabs>
        </div>
      );
    };

    return () => <div class={classes.login}>{renderLogin()}</div>;
  },
});
