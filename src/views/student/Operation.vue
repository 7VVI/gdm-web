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
          <template v-for="i in 5" :key="i">
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
          <a-popconfirm
              title="是否确认选择?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="confirm(record)"
              @cancel="cancel"
          >
            <a-button type="primary">选择题目</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
  </div>

</template>

<script setup lang="ts">
import {ref, reactive, onMounted, computed, toRefs} from "vue";
import type {FormInstance} from "ant-design-vue";

let loading = ref(false)
const expand = ref(false);
const formRef = ref<FormInstance>();
const formState = reactive({
  title: null,
  teacherName: null,
  major: null,
  studentType: null,
  direction: null
});
import {DownOutlined, UpOutlined} from '@ant-design/icons-vue';
import {projectAdd, projectListAll} from "@/api/project";
import {getMajor, getStudentType} from "@/api/topic.selection";

const confirm = async (record: any) => {
  console.log(record);
  let {id: topicId,startDate,endDate} = record
  let response = await projectAdd({
    topicId,
    startDate,
    endDate
  })
  if(response.data==1){
    console.log("添加成功")
  }
  let responseProject = await projectListAll({});
  data.value = responseProject.data
  let responseMajor = await getMajor();
  majorInfo = responseMajor.data
  let studentTypeResponse = await getStudentType();
  studentTypeInfo = studentTypeResponse.data
  data.value?.forEach(project => {
    project.studentType = getNameByCode(project.studentType, studentTypeInfo)
    project.major = getNameByCode(project.major, majorInfo)
    project.key = project.id
  })
};

const cancel = (e: MouseEvent) => {
  console.log(e);
};

const onFinish =async (values: any) => {
  console.log('Received values of form: ', values);
  console.log('formState: ', formState);
  let response = await projectListAll(formState);
  data.value = response.data
  let responseMajor = await getMajor();
  majorInfo = responseMajor.data
  let studentTypeResponse = await getStudentType();
  studentTypeInfo = studentTypeResponse.data
  data.value?.forEach(project => {
    project.studentType = getNameByCode(project.studentType, studentTypeInfo)
    project.major = getNameByCode(project.major, majorInfo)
    project.key = project.id
  })
};
const searchField = [
  {
    field: "",
    title: ""
  },
  {
    field: "title",
    title: "毕设题目",
  },
  {
    field: "teacherName",
    title: "指导老师"
  },
  {
    field: "major",
    title: "适合专业"
  },
  {
    field: "studentType",
    title: "学生类型"
  },
  {
    field: "direction",
    title: "研究方向"
  }
]

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
    title: '专业',
    dataIndex: 'major',
  },
  {
    title: '学生类型',
    dataIndex: 'studentType',
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
    title: "操作",
    key: "操作",
    dataIndex: "key",
    align: "center",
    slots: {customRender: "name"},//绑定插槽
  }
];

type Key = string | number;

let data = ref<API.TopicSelection[]>();
let majorInfo = reactive({})
let studentTypeInfo = reactive({})
onMounted(async () => {
  loading.value = true
  let response = await projectListAll({});
  data.value = response.data
  let responseMajor = await getMajor();
  majorInfo = responseMajor.data
  let studentTypeResponse = await getStudentType();
  studentTypeInfo = studentTypeResponse.data
  data.value?.forEach(project => {
    project.studentType = getNameByCode(project.studentType, studentTypeInfo)
    project.major = getNameByCode(project.major, majorInfo)
    project.key = project.id
  })
  loading.value = false
})

function getNameByCode(code: string, data: { code: string, name: string }[]): string | undefined {
  const obj = data.find(item => item.code == code);
  return obj && obj.name;
}

const state = reactive<{
  selectedRowKeys: Key[];
  loading: boolean;
}>({
  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
});
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