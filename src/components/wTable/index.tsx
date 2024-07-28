/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ComponentInternalInstance,
  getCurrentInstance,
  defineComponent,
  toRefs,
  onMounted,
} from "vue";
import { IPageParams, ITableColumnParams } from "@/types";
import "./index.less";

export default defineComponent({
  name: "wTable",
  components: {},
  props: {
    // 表格数据
    data: {
      default: [],
      type: Array<ITableColumnParams>,
    },
    // 是否分页
    isPage: {
      default: true,
      type: Boolean,
    },
    // 列
    column: {
      default: [],
      type: Array<ITableColumnParams>,
    },
    // 每页显示条目个数
    pageSize: {
      default: 10,
      type: Number,
    },
    // 当前页数
    currentPage: {
      default: 1,
      type: Number,
    },
    // 总数
    total: {
      default: 0,
      type: Number,
    },
    // 每页显示个数选择器的选项设置
    sizes: {
      default: [10, 50, 100, 500],
      type: Array<number>,
    },
    columnFormat: Function,
  },
  setup(props, { attrs, slots, emit, expose }) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;

    // 属性
    const { data, isPage, column, pageSize, currentPage, sizes, total } = toRefs(props);

    // 分页每页数量调整
    const handleSizeChange = (val: number) => {
      const response: IPageParams = {
        pageSize: val,
        currentPage: 1,
      };
      emit("change", response);
    };

    // 分页页码调整
    const handleCurrentChange = (val: number) => {
      const response: IPageParams = {
        pageSize: pageSize.value,
        currentPage: val,
      };
      emit("change", response);
    };

    onMounted(async () => {});

    // 插槽
    const renderSlots = () => {
      return <div class="w-table-slots">{slots.default?.()}</div>;
    };

    // 表格
    const renderTable = () => {
      const columnItem = column.value?.map((item: ITableColumnParams) => {
        return (
          <el-table-column
            prop={item.prop}
            label={item.label}
            width={item.width}
            formatter={proxy?.columnFormat}
            v-model:align={item.align}
            v-model:fixed={item.fixed}
            show-overflow-tooltip
          />
        );
      });
      return (
        <el-table class="table-main" border v-model:data={data.value}>
          {columnItem}
        </el-table>
      );
    };

    // 分页
    const renderPagination = () => {
      return (
        <el-pagination
          class="table-footer"
          total={total.value}
          page-sizes={sizes.value}
          v-model:page-size={pageSize.value}
          v-model:current-page={currentPage.value}
          background
          layout="total, sizes, prev, pager, next, jumper"
          onCurrent-change={handleCurrentChange}
          onSize-change={handleSizeChange}
        />
      );
    };

    return () => (
      <div class="wTable">
        {renderSlots()}
        {renderTable()}
        {isPage.value && renderPagination()}
      </div>
    );
  },
});
