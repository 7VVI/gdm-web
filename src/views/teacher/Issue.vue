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
            <template v-if="searchField[i].type==='input'">
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
            <template v-else-if="searchField[i].type==='major'">
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
            <template v-else>
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
          </template>
        </a-row>
        <a-row>
          <a-col :span="24" style="text-align: right">
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button style="margin: 0 8px" @click="() => formRef.resetFields()">清空</a-button>
            <a style="font-size: 12px" @click="expand = !expand">
              <template v-if="expand">
                <UpOutlined/>
                收起
              </template>
              <template v-else>
                <DownOutlined/>
                展开
              </template>

            </a>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="--middle-table">
      <div class="button-table">
        <a-button type="primary" @click="showModal">新建</a-button>
        <a-button style="margin-left: 10px" type="primary" :disabled="!hasSelected" @click="deleteTopicSelection">
          删除
        </a-button>
        <a-modal v-model:visible="visible" title="新建题目" @cancel="resetFields" @ok="handleOk">
          <a-form :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-form-item label="毕设题目" required>
              <a-input v-model:value="modelRef.title" placeholder="请输入毕设题目"/>
            </a-form-item>
            <a-form-item label="适合专业" required>
              <a-select v-model:value="modelRef.major" placeholder="请选择专业">
                <template v-for="item in majorInfo" :key="item.code">
                  <a-select-option :value="item.code">{{ item.name }}</a-select-option>
                </template>
              </a-select>
            </a-form-item>
            <a-form-item label="学生类型" required>
              <a-select v-model:value="modelRef.studentType" placeholder="请选择学生类型">
                <template v-for="item in studentTypeInfo" :key="item.code">
                  <a-select-option :value="item.code">{{ item.name }}</a-select-option>
                </template>
              </a-select>
            </a-form-item>
            <a-form-item label="研究方向" required>
              <a-input v-model:value="modelRef.direction" placeholder="请输入研究方向"/>
            </a-form-item>
            <a-form-item label="学生数量" required>
              <a-form-item name="input-number" no-style>
                <a-input-number v-model:value="modelRef.studentNum" :min="1" :max="10"/>
              </a-form-item>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
      <a-table
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :columns="columns"
          :data-source="data"
          :loading="loading"
      >
        <template #bodyCell="{ column ,text, record }">
          <template v-if="['title', 'major', 'direction','student','studentNum'].includes(column.dataIndex)">
            <div>
              <a-input
                  v-if="editableData[record.key]"
                  v-model:value="editableData[record.key][column.dataIndex]"
                  style="margin: -5px 0"
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>

          <template v-if="column.key === 'operation'">
            <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)" style="margin-right: 10px">保存</a-typography-link>
            <a-popconfirm title="确认取消?" @confirm="cancel(record.key)">
              <a>取消</a>
            </a-popconfirm>
          </span>
              <span v-else>
                <template v-if="(record.departmentAuditResult!==1&&record.schoolAuditResult!==1)||record.schoolAuditResult==0">
            <a @click="edit(record.key)">修改</a>
                  </template>
          </span>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </div>

</template>

<script setup lang="ts">
import {ref, reactive, toRaw, computed, toRefs, onMounted, UnwrapRef} from "vue";
import type {FormInstance} from "ant-design-vue";
import {DownOutlined, UpOutlined} from '@ant-design/icons-vue';
import {toArray} from 'lodash-es';
import {Form, message} from 'ant-design-vue';
import Swal from 'sweetalert2';
import {cloneDeep} from 'lodash-es';
import {
  addTopicSelection,
  getMajor,
  getStudentType,
  topicSelectionDelete,
  topicSelectionListAll, updateTopic
} from "@/api/topic.selection";

const expand = ref(false);
const formRef = ref<FormInstance>();
const formState = reactive({
  title: null,
  major: null,
  direction: null,
  studentType: null,
  teacher: null
});
const useForm = Form.useForm;
let modelRef = reactive({
  title: '',
  major: undefined,
  direction: "",
  studentNum: 1,
  studentType: undefined,
});
const rulesRef = reactive({
  name: [
    {
      required: true,
      message: 'Please input name',
    },
  ],
  region: [
    {
      required: true,
      message: 'Please select region',
    },
  ],
  type: [
    {
      required: true,
      message: 'Please select type',
      type: 'array',
    },
  ],
});
const {resetFields, validate, validateInfos, mergeValidateInfo} = useForm(modelRef, rulesRef);

const errorInfos = computed(() => {
  return mergeValidateInfo(toArray(validateInfos));
});

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14},
};

const auditStatus = ["未审核", "系已审核", "院已审核", "已被选题"]

const onFinish = async (values: any) => {
  let topicSelectionResponse = await topicSelectionListAll(formState);
  data.value = topicSelectionResponse.data
  data.value?.forEach(e => {
    e.key = e.id;
    e.student = getNameByCode(e.studentType, studentTypeInfo as any)!;
    e.majorInfo = getNameByCode(e.major, majorInfo as any)!;
    e.auditState = auditStatus[e.state];
  })
};
const searchField = [
  {
    field: "",
    title: "",
    type: "",
  },
  {
    field: "title",
    title: "毕设题目",
    type: "input",
  },
  {
    field: "teacher",
    title: "指导老师",
    type: "input",
  },
  {
    field: "major",
    title: "适合专业",
    type: "major",
  },
  {
    field: "studentType",
    title: "学生类型",
    type: "studentType",
  },
  {
    field: "direction",
    title: "研究方向",
    type: "input",
  }
]

const columns = [
  {
    title: '题目',
    dataIndex: 'title',
  },
  {
    title: '专业',
    dataIndex: 'major',
  },
  {
    title: '方向',
    dataIndex: 'direction',
  },
  {
    title: '导师',
    dataIndex: 'teacherName',
  },
  {
    title: '学生类型',
    dataIndex: 'student',
  },
  {
    title: '学生数量',
    dataIndex: 'studentNum',
  },
  {
    title: '状态',
    dataIndex: 'auditState',
  },
  {
    title: '审核结果',
    dataIndex: 'result',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: "operation",
    width: '10%',
  },

];

const visible = ref<boolean>(false);

const showModal = () => {
  visible.value = true;
};

const handleOk = async (e: MouseEvent) => {
  let res = await addTopicSelection(modelRef);
  visible.value = false;
  modelRef.direction = '';
  modelRef.title = '';
  modelRef.studentType = undefined;
  modelRef.studentNum = 1;
  modelRef.major = undefined;
  let topicSelectionResponse = await topicSelectionListAll({})
  data.value = topicSelectionResponse.data as any
  data.value?.forEach(e => {
    e.key = e.id;
    e.student = getNameByCode(e.studentType, studentTypeInfo as any)!;
    e.majorInfo = getNameByCode(e.major, majorInfo as any)!;
    e.auditState = auditStatus[e.state];
  })
  // message.success("添加成功")
  // if(res.data==1){
  //   await Swal.fire(
  //       {
  //         title: '新增题目成功',
  //         icon: 'success',
  //       })
  // }else{
  //   await Swal.fire(
  //       {
  //         title: '新增题目失败',
  //         icon: 'error',
  //       })
  // }
};


const deleteTopicSelection = async () => {
  await topicSelectionDelete(state.selectedRowKeys.join(","));
}

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


interface DataType {
  key: Key;
  id: number;
  title: string;
  major: number;
  majorInfo: string;
  direction: string;
  teacher: number;
  studentType: number;
  student: string;
  studentNum: number;
  state: number;
  auditState: string,
  result: string;
}

const editableData: UnwrapRef<Record<string, DataType>> = reactive({});
const edit = (key: string) => {
  if (data.value != null && data.value.length > 0) {
    editableData[key] = cloneDeep(data.value.filter(item => key === item.key)[0]);
  }
};
const save = async (key: string) => {
  if (data.value != null && data.value.length > 0) {
    Object.assign(data.value.filter(item => key === item.key)[0], editableData[key]);
    await updateTopic(editableData[key]);
    delete editableData[key];
  }
};
const cancel = (key: string) => {
  delete editableData[key];
};

let loading = ref(false)
let data = ref<DataType[]>();
let majorInfo = reactive({})
let studentTypeInfo = reactive({})
onMounted(async () => {
  loading.value = true;
  let response = await getMajor();
  majorInfo = response.data
  let studentTypeResponse = await getStudentType();
  studentTypeInfo = studentTypeResponse.data
  let topicSelectionResponse = await topicSelectionListAll({})
  data.value = topicSelectionResponse.data as any;
  data.value?.forEach(e => {
    e.key = e.id;
    e.student = getNameByCode(e.studentType, studentTypeInfo as any)!;
    e.majorInfo = getNameByCode(e.major, majorInfo as any)!;
    e.auditState = auditStatus[e.state];
  })
  loading.value = false;
})

function getNameByCode(code: number, data: { code: string, name: string }[]): string | undefined {
  const obj = data.find(item => item.code == code);
  return obj && obj.name;
}
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

    .button-table {
      padding: 10px;
    }
  }
}

</style>