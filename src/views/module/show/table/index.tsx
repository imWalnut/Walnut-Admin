import {
  getCurrentInstance,
  defineComponent,
  onMounted,
  ref,
  reactive,
  onBeforeMount,
} from "vue"
import './index.less'
import wTable from '@/components/wTable'
import {EDateFormat, IListParams, ITableColumnParams} from "@/serviceType";

export default defineComponent({
  name: "table",
  components: {
    wTable
  },
  props: {},
  setup(props, { attrs, slots, emit, expose }) {
    const currentInstance: any = getCurrentInstance()
    const proxy: any = currentInstance.proxy

    let tableColumn:Array<ITableColumnParams> = reactive([])  // wTable组件属性
    let tableData:any = ref([])  // wTable组件數據
    let params:IListParams = reactive({  // 列表查询条件
      pageNum: 1,
      pageSize: 10
    })
    let total:any = ref(0)

    // wTable组件属性配置
    const handleTableProp = () => {
      tableColumn = [
        {
          label: '日期',
          prop: 'date',
          width: ''
        },
        {
          label: '姓名',
          prop: 'name',
          width: ''
        },
        {
          label: '地址',
          prop: 'address',
          width: ''
        }
      ]
    }

    // wTable组件数据
    const handleTableData = () => {
      let arr:Array<any> = [
        {
          date: '2016-05-03 14:02:22',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-02 14:02:22',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01 14:02:22',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01 14:02:22',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01 14:02:22',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01 14:02:22',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01 14:02:22',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01 14:02:22',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01 14:02:22',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01 14:02:22',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01 14:02:22',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
      ]
      total.value = arr.length
      tableData.value = arr.splice((params.pageNum - 1) * params.pageSize, params.pageNum * params.pageSize)
    }

    // wTable组件分页
    const handlePagination = (val:IListParams) => {
      params.pageNum = val.pageNum
      params.pageSize = val.pageSize
      handleTableData()
    }

    // wTable组件列格式化
    const handleColumnFormat = (row: any, column: any, cellValue: any, index: number) => {
      let value:any
      switch (column.property) {
        case 'date':
          value = proxy.$dayjs(row.date).format(EDateFormat.DATE)
          break
        default:
          value = cellValue
      }
      return value
    }

    onBeforeMount( ()=> {
      handleTableProp()
      handleTableData()
    })

    onMounted(async ()=> {})

    return () => (
      <div class="page-table">
        <wTable
          column={tableColumn}
          data={tableData}
          total={total.value}
          size={params.pageSize}
          page={params.pageNum}
          columnFormat={handleColumnFormat}
          onChange={handlePagination} />
      </div>
    )
  }
})
