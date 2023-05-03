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
          <template v-for="i in 4" :key="i">
            <template v-if="searchField[i].field==='major'">
              <a-col v-show="expand || i <=3" :span="8">
                <a-form-item
                    :name="searchField[i].field"
                    :label="searchField[i].title"
                    :rules="[{ required: false, message: '请输入内容' }]"
                >
                  <a-select v-model:value="formState[searchField[i].field]" placeholder="请选择专业">
                    <template v-for="item in majorInfo" :key="item.code">
                      <a-select-option :value="item.code">{{ item.name }}</a-select-option>
                    </template>
                  </a-select>
                </a-form-item>
              </a-col>
            </template>
            <template v-else-if="searchField[i].field==='studentType'">
              <a-col v-show="expand || i <=3" :span="8">
                <a-form-item
                    :name="searchField[i].field"
                    :label="searchField[i].title"
                    :rules="[{ required: false, message: '请输入内容' }]"
                >
                  <a-select v-model:value="formState[searchField[i].field]" placeholder="请选择学生类型">
                    <template v-for="item in studentTypeInfo" :key="item.code">
                      <a-select-option :value="item.code">{{ item.name }}</a-select-option>
                    </template>
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
            <a style="font-size: 12px" @click="expand = !expand">
              <template v-if="expand">
                <UpOutlined/>
              </template>
              <template v-else>
                <DownOutlined/>
              </template>
              展开
            </a>
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
          <a-button type="primary" @click="showModal()">审核</a-button>
          <a-modal v-model:visible="visible" title="题目审核" @ok="handleOk(record)">
            <a-form :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-form-item label="审核">
                <a-radio-group v-model:value="modelRef.schoolAuditResult">
                  <a-radio value="1">通过</a-radio>
                  <a-radio value="0">不通过</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="审核意见" required>
                <a-textarea v-model:value="modelRef.schoolAuditUserOpinion" placeholder="请输入审核意见"/>
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
const formState = reactive({});

let modelRef = reactive({
  departmentAuditOpinion: '',
  schoolAuditUserOpinion: undefined,
  id: null,
});
import {DownOutlined, UpOutlined} from '@ant-design/icons-vue';
import {getSchoolAudit, schoolAudit} from "@/api/designProjectAuditFlow";
import {getMajor, getStudentType} from "@/api/topic.selection";

//审核对话框
const visible = ref<boolean>(false);
const showModal = () => {
  visible.value = true;
};

const handleOk = async (record: any) => {
  visible.value = false;
  visible.value = false;
  modelRef.id = record.id
  await schoolAudit(modelRef)
  let response = await getSchoolAudit(formState)
  data.value = response.data
  let responseMajor = await getMajor();
  majorInfo = responseMajor.data
  let studentTypeResponse = await getStudentType();
  studentTypeInfo = studentTypeResponse.data
  data.value?.forEach(e => {
    e.studentType = getNameByCode(e.studentType, studentTypeInfo)
    e.major = getNameByCode(e.major, majorInfo)
    e.key = e.id
  })
};

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14},
};


let loading = ref(false)
//顶部搜索执行
const onFinish = async (values: any) => {
  loading.value = true
  let response = await getSchoolAudit(formState)
  data.value = response.data
  let responseMajor = await getMajor();
  majorInfo = responseMajor.data
  let studentTypeResponse = await getStudentType();
  studentTypeInfo = studentTypeResponse.data
  data.value?.forEach(e => {
    e.studentType = getNameByCode(e.studentType, studentTypeInfo)
    e.major = getNameByCode(e.major, majorInfo)
    e.key = e.id
  })
  loading.value = false
};

//顶部搜索字段
const searchField = [
  {
    field: "",
    title: ""
  },
  {
    field: "title",
    title: "毕设题目"
  },
  {
    field: "direction",
    title: "研究方向"
  }, {
    field: "studentType",
    title: "学生类型"
  },
  {
    field: "major",
    title: "适合专业"
  },
]

//表格字段
const columns = [
  {
    title: '毕设题目',
    dataIndex: 'title',
  },
  {
    title: '指导老师',
    dataIndex: 'teacherName',
  },
  {
    title: '学生数量',
    dataIndex: 'studentNum',
  },
  {
    title: '研究方向',
    dataIndex: 'direction',
  },
  {
    title: '学生类型',
    dataIndex: 'studentType',
  },
  {
    title: '适合专业',
    dataIndex: 'major',
  },
  {
    title: '系负责人审核意见',
    dataIndex: 'departmentAuditOpinion',
  },
  {
    title: '系负责人审核结果',
    dataIndex: 'departmentAuditResult',
  },
  {
    title: '系负责人审核时间',
    dataIndex: 'departmentAuditTime',
  },
  ,
  {
    title: '系负责人',
    dataIndex: 'departmentAuditUserName',
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
let data = ref<API.DesignProjectAuditFlow>();
onMounted(async () => {
  loading.value = true
  let response = await getSchoolAudit({})
  data.value = response.data
  let responseMajor = await getMajor();
  majorInfo = responseMajor.data
  let studentTypeResponse = await getStudentType();
  studentTypeInfo = studentTypeResponse.data
  data.value?.forEach(e => {
    e.studentType = getNameByCode(e.studentType, studentTypeInfo)
    e.major = getNameByCode(e.major, majorInfo)
    e.key = e.id
  })
  loading.value = false
})

function getNameByCode(code: string, data: { code: string, name: string }[]): string | undefined {
  const obj = data.find(item => item.code == code);
  return obj && obj.name;
}


const confirm = async (record: any) => {
  console.log(record);
  visible.value = true;
};

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