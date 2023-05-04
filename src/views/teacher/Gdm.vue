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
                    <a-select-option value="0"> 进行中</a-select-option>
                    <a-select-option value="1"> 已完成</a-select-option>
                    <a-select-option value="2"> 已取消</a-select-option>
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
        <template #name="{ record }">
          <template v-if="record.status==='已完成'">
            <a-button type="primary" @click="download(record)" style="margin-right: 10px">论文下载</a-button>
            <a-button type="primary" @click="showModal()">评分</a-button>
            <a-modal v-model:visible="visible" title="题目审核" @ok="handleOk(record)">
              <a-form :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
                <a-form-item label="评审">
                  <a-radio-group v-model:value="modelRef.result">
                    <a-radio value="1">通过</a-radio>
                    <a-radio value="0">不通过</a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item label="分数" :rules="[{ type: 'float', min: 0, max: 99 }]">
                  <a-input-number v-model:value="modelRef.score"/>
                </a-form-item>
                <a-form-item label="评分指标" required>
                  <a-textarea v-model:value="modelRef.opinion" placeholder="请输入评分指标"/>
                </a-form-item>
              </a-form>
            </a-modal>
          </template>
        </template>
      </a-table>
    </div>
  </div>

</template>

<script setup lang="ts">
import {ref, reactive, computed, toRefs, onMounted} from "vue";
import type {FormInstance} from "ant-design-vue";
import {getMajor, getStudentType, projectListAll} from "@/api/topic.selection";
import {departmentAudit, getDepartmentAudit} from "@/api/designProjectAuditFlow";
import {scoreAdd} from "@/api/score";
import {HttpManager} from "@/api/system";
import axios from "axios";
import {userStore} from "@/stores/userStore";
import {storeToRefs} from "pinia";

const expand = ref(false);
const formRef = ref<FormInstance>();
const formState = reactive({
  status: null,
  studentName: null,
  teacherName: null,
});

let modelRef = reactive({
  opinion: '',
  projectId: null,
  result: undefined,
  score: null,
});

let store=userStore()
const { token } = storeToRefs( store )

let header={
  'Authorization': `Bearer ${token.value}`, // 设置Authorization
}

let download = async (record: any) => {
  console.log(record)
  await HttpManager.downloadFile(record.studentId)
      .then((res) => {
    // 创建a标签
    const link = document.createElement('a');
    // 构造一个blob对象来处理数据, 并设置文件类型
    // const url = window.URL.createObjectURL(new Blob([res]), {
    //   type: 'application/vnd.ms-excel',
    // });
    // 文件类型可写可不写,如果不知道文件类型该使用什么,直接不写即可
    const url = window.URL.createObjectURL(new Blob([res]));
    // 指定下载链接
    link.href = url;
    console.log(res.headers)
    // 指定下载文件名
    // link.download = res.headers['content-disposition'].match(/filename=(.*)/)[1];
    link.download="毕业论文.docx"
    // 把a标签加到页面中
    document.body.appendChild(link);
    // 触发a标签下载
    link.click();
    // 下载完成移除元素
    document.body.removeChild(link);
    // 释放掉blob对象
    window.URL.revokeObjectURL(url);
  });
}

//审核对话框
const visible = ref<boolean>(false);
const showModal = () => {
  visible.value = true;
};

const handleOk = async (record: any) => {
  visible.value = false;
  modelRef.projectId = record.id
  let res = await scoreAdd(modelRef)
  console.log(res.data)
};

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14},
};

let loading = ref(false)

const onFinish = async (values: any) => {
  loading.value = true
  let reaponse = await projectListAll(formState)
  data.value = reaponse.data;
  data.value?.forEach(project => {
    project.key = project.id;
    if (project.status == 0) {
      project.status = "进行中"
    } else if (project.status == 1) {
      project.status = '已完成'
    } else if (project.status == 4) {
      project.status = '已评分'
    } else {
      project.status = '已取消'
    }
  })
  loading.value = false
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
  }, {
    title: '操作',
    dataIndex: 'operation',
    key: "operation"
  },
  {
    title: "操作",
    key: "操作",
    dataIndex: "key",
    align: "center",
    slots: {customRender: "name"},//绑定插槽
  }
];

interface DataType {
  key: Key;
  id: number;
  studentId: number;
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
  loading.value = true
  let reaponse = await projectListAll({})
  data.value = reaponse.data;
  data.value?.forEach(project => {
    project.key = project.id;
    if (project.status == 0) {
      project.status = "进行中"
    } else if (project.status == 1) {
      project.status = '已完成'
    } else if (project.status == 4) {
      project.status = '已评分'
    } else {
      project.status = '已取消'
    }
  })
  loading.value = false
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