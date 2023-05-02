<template>
  <div class="content">
    <div class="-header-search">
      <a-form
          ref="formRef"
          name="advanced_search"
          class="ant-advanced-search-form"
          :model="formState"
          @finish="onFinish"
      >
        <a-row :gutter="24">
          <template v-for="i in 3" :key="i">
            <template v-if="searchField[i].type==='select'">
              <a-col v-show="expand || i <=3" :span="8">
                <a-form-item
                    :name="searchField[i].field"
                    :label="searchField[i].title"
                    :rules="[{ required: false, message: '请输入内容' }]"
                >
                <a-select v-model:value="formState[searchField[i].field]" placeholder="请选择毕设状态">
                  <a-select-option value="0"> 进行中 </a-select-option>
                  <a-select-option value="1"> 已完成 </a-select-option>
                  <a-select-option value="2"> 已取消 </a-select-option>
                </a-select>
                </a-form-item>
              </a-col>
            </template>
            <template v-else>
              <a-col v-show="expand || i <=3" :span="8">
                <a-form-item
                    :name="searchField[i].field"
                    :label="searchField[i].title"
                    :rules="[{ required: false, message: '请输入内容' }]"
                >
                  <a-input v-model:value="formState[searchField[i].field]" placeholder="请输入内容"></a-input>
                </a-form-item>
              </a-col>
            </template>
          </template>
        </a-row>
        <a-row>
          <a-col :span="24" style="text-align: right">
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button style="margin: 0 8px" @click="() => formRef.resetFields()">清空</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="--middle-table">
      <a-table
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :columns="columns"
          :data-source="data"
          :loading="loading"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
            <a>修改</a>
          </template>
        </template>
      </a-table>
    </div>
  </div>

</template>

<script setup lang="ts">
import {ref, reactive, computed, toRefs, onMounted} from "vue";
import type {FormInstance} from "ant-design-vue";
import {projectListAll} from "@/api/topic.selection";

const expand = ref(false);
const formRef = ref<FormInstance>();
const formState = reactive({
  status: null,
  studentName: null,
  teacherName: null,
});

let loading=ref(false)

const onFinish = async (values: any) => {
  console.log('Received values of form: ', values);
  console.log('formState: ', formState);
  loading.value=true
  let reaponse = await projectListAll(formState)
  data.value = reaponse.data;
  data.value?.forEach(project => {
    if (project.status == 0) {
      project.status = "进行中"
    } else if (project.status == 1) {
      project.status = '已完成'
    } else {
      project.status = '已取消'
    }
  })
  loading.value=false
};
const searchField = [
  {
    field: "",
    title: ""
  },
  {
    field: "status",
    title: "毕设状态",
    type: 'select'
  },
  {
    field: "studentName",
    title: "选题学生",
    type: 'input'
  },
  {
    field: "teacherName",
    title: "指导老师",
    type: 'input'
  }
]

const columns = [
  {
    title: '毕设题目',
    dataIndex: 'title',
  },
  {
    title: '当前进度',
    dataIndex: 'status',
  },
  {
    title: '开始时间',
    dataIndex: 'startDate',
  },
  {
    title: '结束时间',
    dataIndex: 'endDate',
  },
  {
    title: '选题学生',
    dataIndex: 'studentName',
  },
  {
    title: '指导老师',
    dataIndex: 'teacherName',
  },
];

interface DataType {
  key: Key;
  id: number;
  title: string;
  status: number;
  startDate: string;
  endDate: string;
  studentName: string;
  teacherName: string;
}

let data = ref<DataType[]>();

const cancel = (e: MouseEvent) => {
  setTimeout(() => {
    state.loading = false;
    state.selectedRowKeys = [];
  }, 1000);
};
type Key = string | number;
const state = reactive<{
  selectedRowKeys: Key[];
  loading: boolean;
}>({
  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);


const onSelectChange = (selectedRowKeys: Key[]) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};
let {selectedRowKeys} = toRefs(state)

onMounted(async () => {
  loading.value=true
  let reaponse = await projectListAll({})
  data.value = reaponse.data;
  data.value?.forEach(project => {
    if (project.status == 0) {
      project.status = "进行中"
    } else if (project.status == 1) {
      project.status = '已完成'
    } else {
      project.status = '已取消'
    }
  })
  loading.value=false
})
</script>

<style lang="less" scoped>

@--ant-div-background-color: #ffffff;
@--el-border-color-light: 1px;

.content {

  .-header-search {
    padding: 20px;
    background-color: @--ant-div-background-color;
    box-shadow: 0 0 6px #0003;
    border: 1px solid var(--el-border-color-light);
    border-radius: 5px;
  }

  .--middle-table {
    margin-top: 20px;
    background-color: @--ant-div-background-color;
    box-shadow: 0 0 6px #0003;
    border: 1px solid var(--el-border-color-light);
    border-radius: 5px;
  }
}

</style>