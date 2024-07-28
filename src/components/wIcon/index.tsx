/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

export default defineComponent({
  name: "wIcon",
  components: {},
  props: {
    // 图标
    icon: {
      default: "",
      type: String,
    },
    // 图标颜色
    color: {
      default: "",
      type: String,
    },
    // 图标大小
    size: {
      default: 14,
      type: Number,
    },
  },
  setup(props, { attrs, slots, emit, expose }) {
    const ElementPlusIcons = ElementPlusIconsVue; // 引用element icon
    const icon = ref("");
    const size = ref(14);
    const color = ref("");

    onMounted(async () => {});

    watchEffect(() => {
      icon.value = props.icon;
      size.value = props.size;
      color.value = props.color;
    });

    return () => {
      const component = ElementPlusIcons[icon.value]; // 动态生成icon
      return (
        <el-icon color={color.value} size={size.value}>
          {icon.value && <component />}
        </el-icon>
      );
    };
  },
});
