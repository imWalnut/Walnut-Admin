/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ComponentInternalInstance,
  getCurrentInstance,
  defineComponent,
  ref,
  toRefs,
  onBeforeMount,
  reactive,
  onMounted,
} from "vue";
import {
  CLabelWidth,
  ECommentType,
  EFormComponentType,
  IFormConfigParams,
  IOptionType,
} from "@/types";
import "./index.less";
import type { FormInstance } from "element-plus";

export default defineComponent({
  name: "wSearch",
  components: {},
  props: {
    // 表单配置
    configs: {
      default: [],
      type: Array<IFormConfigParams>,
    },
  },
  setup(props, { attrs, slots, emit, expose }) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;

    const form = reactive({});
    const isFold = ref(true); // 是否折叠
    const isOverflow = ref(false); // 是否溢出

    // 属性
    const { configs } = toRefs(props);

    // 初始化
    const handleInit = () => {
      configs.value.forEach((item) => {
        form[item.key] = item.value});
    };

    // 判断是否折叠筛选栏
    const handleIsFold = () => {
      const refForm = proxy!.$refs.refForm as FormInstance
      let overflow: boolean = false;
      const nodes = refForm.$el.querySelectorAll(".el-form-item");
      for (const [index, dom] of nodes.entries()) {
        const _offsetTop = dom.offsetTop - refForm.$el.offsetTop;
        if (_offsetTop > 10) {
          overflow = true;
        }
      }
      isOverflow.value = overflow;
      isFold.value = true;
    };

    // 折叠、展开
    const handleFold = () => {
      isFold.value = !isFold.value;
    };

    // 查询
    const handleSearch = () => {
      emit("search", form);
    };

    onBeforeMount(async () => {
      handleInit();
    });

    onMounted(() => {
      handleIsFold();
      handleSearch();
    });

    // 输入框
    const renderInput = (val: IFormConfigParams) => {
      return (
        <el-input
          v-model={form[val.key]}
          placeholder={proxy?.$t("common.pleaseEnter")}
        ></el-input>
      );
    };

    // 选择框
    const renderSelect = (val: IFormConfigParams) => {
      const option = val.options?.map((item: IOptionType) => {
        return <el-option label={item.label} value={item.value}></el-option>;
      });
      return (
        <el-select
          v-model={form[val.key]}
          placeholder={proxy?.$t("common.pleaseSelect")}
          clearable
        >
          {option}
        </el-select>
      );
    };

    // 级联选择器
    const renderCascader = (val: IFormConfigParams) => {
      const props = { multiple: true };
      return (
        <el-cascader
          v-model={form[val.key]}
          collapse-tags-tooltip
          collapse-tags
          filterable
          props={props}
          options={val.options}
          placeholder={proxy?.$t("common.pleaseSelect")}
          clearable
        />
      );
    };

    // 日期选择器
    const renderDatePicker = (val: IFormConfigParams) => {
      return (
        <el-date-picker
          v-model={form[val.key]}
          v-model:type={val.subtype}
          placeholder={proxy?.$t("common.pleaseSelect")}
        />
      );
    };

    // 表单
    const renderForm = () => {
      const formItem = configs.value?.map((item: IFormConfigParams) => {
        let component;
        switch (item.type) {
          case EFormComponentType.INPUT:
            component = renderInput(item);
            break;
          case EFormComponentType.SELECT:
            component = renderSelect(item);
            break;
          case EFormComponentType.CASCADER:
            component = renderCascader(item);
            break;
          case EFormComponentType.DATE_PICKER:
            component = renderDatePicker(item);
            break;
        }
        return (
          <el-form-item label={item.label + "："} label-width={CLabelWidth}>
            {component}
          </el-form-item>
        );
      });
      const formClass = isFold.value ? "search_bar_fold" : "";
      return (
        <el-form model={form} inline ref="refForm" class={formClass}>
          {formItem}
        </el-form>
      );
    };

    // 按钮
    const renderButton = () => {
      const Search = <wIcon icon="Search" />;
      const Refresh = <wIcon icon="Refresh" />;
      const ArrowDown = <wIcon icon="ArrowDown" />;
      const ArrowUp = <wIcon icon="ArrowUp" />;
      return (
        <div class="btn-list">
          <el-button
            icon={Search}
            v-model:type={ECommentType.PRIMARY}
            onClick={handleSearch}
          >
            {proxy?.$t("common.search")}
          </el-button>
          <el-button onClick={handleInit} icon={Refresh}>
            {proxy?.$t("common.reset")}
          </el-button>
          {isOverflow.value && (
            <>
              {isFold.value && (
                <el-button
                  v-model:type={ECommentType.PRIMARY}
                  onClick={handleFold}
                  link
                  icon={ArrowDown}
                >
                  展开
                </el-button>
              )}
              {!isFold.value && (
                <el-button
                  v-model:type={ECommentType.PRIMARY}
                  onClick={handleFold}
                  link
                  icon={ArrowUp}
                >
                  收起
                </el-button>
              )}
            </>
          )}
        </div>
      );
    };

    return () => (
      <div class="wSearch">
        {renderForm()}
        {renderButton()}
      </div>
    );
  },
});
