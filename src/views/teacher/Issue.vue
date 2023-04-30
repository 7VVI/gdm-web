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
        <a-button style="margin-left: 10px" type="primary" :disabled="!hasSelected">
          删除
        </a-button>
        <a-modal v-model:visible="visible" title="新建题目" @cancel="resetFields" @ok="handleOk">
          <a-form :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-form-item label="毕设题目" required>
              <a-input v-model:value="modelRef.name" placeholder="请输入毕设题目"/>
            </a-form-item>
            <a-form-item label="适合专业" required>
              <a-select v-model:value="modelRef.region" placeholder="请选择专业">
                <a-select-option value="shanghai">Zone one</a-select-option>
                <a-select-option value="beijing">Zone two</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="学生类型" required>
              <a-select v-model:value="modelRef.region" placeholder="请选择学生类型">
                <a-select-option value="shanghai">Zone one</a-select-option>
                <a-select-option value="beijing">Zone two</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="研究方向" required>
              <a-input v-model:value="modelRef.name"  placeholder="请输入研究方向" />
            </a-form-item>
            <a-form-item label="学生数量" required>
              <a-form-item name="input-number" no-style>
                <a-input-number v-model:value="formState['input-number']" :min="1" :max="10" />
              </a-form-item>
            </a-form-item>
<!--            <a-form-item class="error-infos" :wrapper-col="{ span: 14, offset: 4 }" v-bind="errorInfos">-->
<!--              <a-button type="primary" @click.prevent="onSubmit">Create</a-button>-->
<!--              <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>-->
<!--            </a-form-item>-->
          </a-form>
        </a-modal>
      </div>
      <a-table
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :columns="columns"
          :data-source="data"
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
import {ref, reactive, toRaw, computed, toRefs} from "vue";
import type {FormInstance} from "ant-design-vue";
import {DownOutlined, UpOutlined} from '@ant-design/icons-vue';
import { toArray } from 'lodash-es';
import { Form } from 'ant-design-vue';
const expand = ref(false);
const formRef = ref<FormInstance>();
const formState = reactive({
  title: null,
  content: null
});
const useForm = Form.useForm;
const modelRef = reactive({
  name: '',
  region: undefined,
  type: [],
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
const { resetFields, validate, validateInfos, mergeValidateInfo } = useForm(modelRef, rulesRef);
const onSubmit = () => {
  validate()
      .then(() => {
        console.log(toRaw(modelRef));
      })
      .catch(err => {
        console.log('error', err);
      });
};
const errorInfos = computed(() => {
  return mergeValidateInfo(toArray(validateInfos));
});

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const onFinish = (values: any) => {
  console.log('Received values of form: ', values);
  console.log('formState: ', formState);
};
const searchField = [
  {
    field: "",
    title: ""
  },
  {
    field: "name",
    title: "题目"
  },
  {
    field: "content",
    title: "专业"
  },
  {
    field: "teacher",
    title: "老师"
  },
  {
    field: "teacher",
    title: "老师"
  },
  {
    field: "teacher",
    title: "老师"
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
    dataIndex: 'teacher',
  },  {
    title: '学生类型',
    dataIndex: 'studentType',
  }, {
    title: '学生数量',
    dataIndex: 'studentNum',
  }
];

const visible = ref<boolean>(false);

const showModal = () => {
  visible.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  visible.value = false;
};

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
let { selectedRowKeys} = toRefs(state)

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

    .button-table{
      padding: 10px;
    }
  }
}

</style>