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
          <template v-for="i in 1" :key="i">
            <a-col v-show="expand || i <=1" :span="8">
              <a-form-item
                  :name="searchField[i].field"
                  :label="searchField[i].title"
                  :rules="[{ required: false, message: '请输入内容' }]"
              >
                <a-input v-model:value="formState[searchField[i].field]" placeholder="请输入内容"></a-input>
              </a-form-item>
            </a-col>
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
          :columns="columns"
          :data-source="data"
          :loading="loading"
      >
        <template #name="{ record }">
          <a-button type="primary"   @click="showModal()">审核</a-button>
          <a-modal v-model:visible="visible" title="题目审核" @ok="handleOk(record)">
            <a-form :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-form-item label="审核">
                <a-radio-group v-model:value="modelRef.agree">
                  <a-radio value="1">同意</a-radio>
                  <a-radio value="0">不同意</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="审核意见" required>
                <a-textarea v-model:value="modelRef.noAnswerOpinion" placeholder="请输入审核意见"/>
              </a-form-item>
            </a-form>
          </a-modal>
        </template>
      </a-table>
    </div>
  </div>

</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import type {FormInstance} from "ant-design-vue";

const expand = ref(false);
const formRef = ref<FormInstance>();
const formState = reactive({
  title: null
});

import {noAnswerAdd, noAnswerListAll} from "@/api/project";
import {getMajor, getStudentType} from "@/api/topic.selection";
let loading=ref(false)

let data=ref<API.NoAnswer>()

const onFinish =async (values: any) => {
  loading.value=true
  let response=await noAnswerListAll(formState)
  data.value=response.data
  let responseMajor = await getMajor();
  majorInfo = responseMajor.data
  let studentTypeResponse = await getStudentType();
  studentTypeInfo = studentTypeResponse.data
  data.value?.forEach(e=>{
    e.studentType = getNameByCode(e.studentType, studentTypeInfo)
    e.major = getNameByCode(e.major, majorInfo)
  })
  loading.value=false
};

let modelRef = reactive({
  noAnswerOpinion: '',
  agree: undefined,
  id:null,
  topicId:null
});

//审核对话框
const visible = ref<boolean>(false);
const showModal = () => {
  visible.value = true;
};

const handleOk =async (record:any) => {
  loading.value=true
  visible.value = false;
  modelRef.id=record.id
  modelRef.topicId=record.topicId
  await noAnswerAdd(modelRef);
  let response=await noAnswerListAll({})
  data.value=response.data
  let responseMajor = await getMajor();
  majorInfo = responseMajor.data
  let studentTypeResponse = await getStudentType();
  studentTypeInfo = studentTypeResponse.data
  data.value?.forEach(e=>{
    e.studentType = getNameByCode(e.studentType, studentTypeInfo)
    e.major = getNameByCode(e.major, majorInfo)
  })
  loading.value=false
};

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14},
};

const searchField = [
  {
    field: "",
    title: ""
  },
  {
    field: "title",
    title: "毕设题目"
  }
]

const columns = [
  {
    title: '学生',
    dataIndex: 'studentName',
  },
  {
    title: '毕设题目',
    dataIndex: 'title',
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
  },
  {
    title: '结束时间',
    dataIndex: 'endDate',
  },
  {
    title: '研究方向',
    dataIndex: 'direction',
  },
  {
    title: '专业',
    dataIndex: 'major',
  },
  {
    title: '学生类型',
    dataIndex: 'studentType',
  },
  {
    title: '指导老师',
    dataIndex: 'teacherName',
  },
  {
    title: "操作",
    key: "操作",
    dataIndex: "key",
    align: "center",
    slots: {customRender: "name"},//绑定插槽
  }
];

let majorInfo = reactive({})
let studentTypeInfo = reactive({})
onMounted(async ()=>{
  loading.value=true
  let response=await noAnswerListAll({})
  data.value=response.data
  let responseMajor = await getMajor();
  majorInfo = responseMajor.data
  let studentTypeResponse = await getStudentType();
  studentTypeInfo = studentTypeResponse.data
  data.value?.forEach(e=>{
    e.studentType = getNameByCode(e.studentType, studentTypeInfo)
    e.major = getNameByCode(e.major, majorInfo)
  })
  loading.value=false
})

function getNameByCode(code: string, data: { code: string, name: string }[]): string | undefined {
  const obj = data.find(item => item.code == code);
  return obj && obj.name;
}
</script>

<style lang="less" scoped>

@--ant-div-background-color: #ffffff;
@--el-border-color-light: 1px;

.content{

  .-header-search {
    padding: 20px;
    background-color: @--ant-div-background-color;
    box-shadow: 0 0 6px #0003;
    border: 1px solid var(--el-border-color-light);
    border-radius: 5px;
  }

  .--middle-table{
    margin-top: 20px;
    background-color: @--ant-div-background-color;
    box-shadow: 0 0 6px #0003;
    border: 1px solid var(--el-border-color-light);
    border-radius: 5px;
  }
}

</style>