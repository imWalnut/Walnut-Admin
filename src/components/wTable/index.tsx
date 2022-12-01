import {
  getCurrentInstance,
  defineComponent,
  ref,
  toRefs,
  onMounted, reactive,
} from "vue"
import {IListParams, ITableColumnParams} from "@/serviceType";
import './index.less'

export default defineComponent({
  name: "wTable",
  components: {},
  props: {
    // 表格数据
    data: {
      default: [],
      type: Array<any>
    },
    // 是否分页
    isPage: {
      default: true,
      type: Boolean
    },
    // 是否分页
    column: {
      default: [],
      type: Array<ITableColumnParams>
    },
    // 每页显示条目个数
    size: {
      default: 10,
      type: Number
    },
    // 当前页数
    current: {
      default: 1,
      type: Number
    },
    // 总数
    total: {
      default: 0,
      type: Number
    },
    // 每页显示个数选择器的选项设置
    sizes: {
      default: [10, 50, 100, 500],
      type: Array<number>
    },
    columnFormat: Function
  },
  setup(props, {attrs, slots, emit, expose}) {
    const currentInstance: any = getCurrentInstance()
    const proxy: any = currentInstance.proxy

    // 属性
    const {data, isPage, column, size, current, sizes, total} = toRefs(props)
    let pageSize = ref(size.value)
    let pageNum = ref(current.value)

    // 分页每页数量调整
    const handleSizeChange = (val: number) => {
      let response:IListParams = {
        pageSize: val,
        pageNum: 1
      }
      emit('change', response)
    }

    // 分页页码调整
    const handleCurrentChange = (val: number) => {
      let response:IListParams = {
        pageSize: size.value,
        pageNum: val
      }
      emit('change', response)
    }

    onMounted(async () => {})

    // 表格
    const renderTable = () => {
      const columnItem = column.value?.map((item: ITableColumnParams) => {
        return (
          <el-table-column
            prop={item.prop}
            label={item.label}
            width={item.width}
            formatter={proxy.columnFormat}/>
        )
      })
      return (
        <el-table class="table-main" border data={data.value}>
          {columnItem}
        </el-table>
      )
    }

    // 分页
    const renderPagination = () => {
      return (
        <el-pagination
          class="table-footer"
          total={total.value}
          page-sizes={sizes.value}
          v-model:page-size={pageSize}
          v-model:currentPage={pageNum}
          background
          layout="total, sizes, prev, pager, next, jumper"
          onCurrent-change={handleCurrentChange}
          onSize-change={handleSizeChange}/>
      )
    }

    return () => (
      <div class="wTable">
        {renderTable()}
        {isPage.value && renderPagination()}
      </div>
    )
  }
})
