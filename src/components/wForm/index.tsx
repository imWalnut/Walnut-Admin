/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ComponentInternalInstance,
  getCurrentInstance,
  defineComponent,
  ref,
  toRefs,
  onBeforeMount,
  onMounted,
} from "vue";
import {
  CLabelWidth,
  EFormComponentType,
  IFormConfigParams,
  IOptionType,
} from "@/types";
import "./index.less";

export default defineComponent({
  name: "wForm",
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

    const form = ref({});
    const radio = ref("1");
    const dialogUpload = ref(false);
    const dialogImageUrl = ref("");

    // 属性
    const { configs } = toRefs(props);

    // 初始化
    const handleInit = () => {
      configs.value.forEach((item) => {
        form.value[item.key] = item.value
      });
    };

    // upload preview
    const handleUploadPreview = () => {};

    // upload remove
    const handleUploadRemove = () => {};

    // 提交
    const handleSubmit = () => {
      emit("submit", form.value);
    };

    onBeforeMount(async () => {
      handleInit();
    });

    onMounted(() => {});

    // 输入框
    const renderInput = (val: IFormConfigParams) => {
      return (
        <el-input
          v-model={form.value[val.key]}
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
          v-model={form.value[val.key]}
          placeholder={proxy?.$t("common.pleaseSelect")}
          filterable
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
          v-model={form.value[val.key]}
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
          v-model={form.value[val.key]}
          v-model:type={val.subtype}
          placeholder={proxy?.$t("common.pleaseSelect")}
        />
      );
    };

    // 单选框
    const renderRadio = (val: IFormConfigParams) => {
      const option = val.options?.map((item: IOptionType) => {
        return <el-radio label={item.value}>{item.label}</el-radio>;
      });
      return (
        <el-radio-group v-model={form.value[val.key]}>{option}</el-radio-group>
      );
    };

    // 多选框
    const renderCheckBox = (val: IFormConfigParams) => {
      const option = val.options?.map((item: IOptionType) => {
        return <el-checkbox label={item.value}>{item.label}</el-checkbox>;
      });
      return (
        <el-checkbox-group v-model={form.value[val.key]}>
          {option}
        </el-checkbox-group>
      );
    };

    // 开关
    const renderSwitch = (val: IFormConfigParams) => {
      return <el-switch v-model={form.value[val.key]} />;
    };

    // 上传
    const renderUpload = (val: IFormConfigParams) => {
      return (
        <div>
          <el-upload
            v-model:file-list={val.files}
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            list-type="picture-card"
            onPreview={handleUploadPreview}
            onRemove={handleUploadRemove}
          >
            <wIcon icon="Plus" />
          </el-upload>

          <el-dialog v-model={dialogUpload.value}>
            <img w-full src={dialogImageUrl.value} alt="Preview Image" />
          </el-dialog>
        </div>
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
          case EFormComponentType.RADIO:
            component = renderRadio(item);
            break;
          case EFormComponentType.CHECKBOX:
            component = renderCheckBox(item);
            break;
          case EFormComponentType.SWITCH:
            component = renderSwitch(item);
            break;
          case EFormComponentType.UPLOAD:
            component = renderUpload(item);
            break;
        }
        return (
          <el-form-item label={item.label + "："} label-width={CLabelWidth}>
            {component}
          </el-form-item>
        );
      });
      return (
        <el-form model={form} ref="refForm">
          {formItem}
        </el-form>
      );
    };

    expose({ handleSubmit });

    return () => <div class="wForm">{renderForm()}</div>;
  },
});
