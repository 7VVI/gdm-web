<template>
  <template v-if="spinning">
    <Spin :tip="tip" :spinning="spinning">
      <p class="spin-content"></p>
    </Spin>
  </template>
  <template v-else>
    <div class="content">
      <div class="--header">
        <div class="header_left">
          <div class="air_card">
            <svg t="1682514494128" class="icon_air" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2490"   width="50%" height="50%">
              <path
                  d="M236.6 792.7h550.5c65.9 0 119.5-53.6 119.5-119.5v-4.4c0-42.4-22.8-82-59.5-103.3-9.1-5.3-14.1-15.5-12.7-25.9 0.7-5.5 1.1-10.1 1.1-14.3 0-47.7-31.8-88.2-75.4-101.3 26.4 25.5 51.1 77.5 41.8 125-2.3 11.8 1.6 24 9.3 33.2 43.8 41.8 41 95.3 17.4 139.3-11.7 21.8-34.4 35.5-59.1 35.5h-618c21.7 22 51.9 35.7 85.1 35.7z"
                  fill="#FFD524" p-id="2491"></path>
              <path
                  d="M222.6 406.4c4.8 3.7 10.4 5.6 16 5.6 7.7 0 15.3-3.4 20.4-9.9 1.5-1.9 3-3.7 4.5-5.5 9.3-10.9 8-27.3-2.9-36.6s-27.3-8-36.6 2.9c-2 2.3-3.9 4.7-5.8 7.1-8.8 11.2-6.9 27.5 4.4 36.4z"
                  fill="#333333" p-id="2492"></path>
              <path
                  d="M887.5 529.8c0.1-1.5 0.1-3 0.1-4.5 0-87-70.7-157.7-157.7-157.7-48.9 0-93 22.8-122 58.3-33.6-83.7-115.5-142.9-211-142.9-33 0-64.9 6.9-94.7 20.6-13 6-18.8 21.4-12.8 34.4s21.4 18.8 34.4 12.8c23-10.5 47.5-15.9 73-15.9 96.6 0 175.2 78.6 175.2 175.2 0 3.8-0.2 7.7-0.4 11.4-0.5 7.2 2.4 14.2 7.3 19.4 4.9 5.2 12.1 8.2 19.2 8.2 14.2 0 25.8-11.4 26-25.6 0.9-57.4 48.3-104.2 105.7-104.2 10.6 0 20.8 1.6 30.4 4.5 43.5 13.1 75.4 53.5 75.4 101.3 0 4.2-0.3 8.7-1.1 14.3-1.4 10.4 3.6 20.6 12.7 25.9 36.7 21.4 59.5 61 59.5 103.3v4.4c0 65.9-53.6 119.5-119.5 119.5H236.6c-33.3 0-63.4-13.7-85.1-35.7-21.3-21.6-34.5-51.2-34.5-83.8v-4.4c0-53.1 35.6-100.4 86.7-114.9 12-3.4 19.9-14.9 18.7-27.4-0.5-5.7-0.8-11.1-0.8-16.3 0-17 2.4-33.8 7.2-50 4.1-13.8-3.8-28.2-17.5-32.3-13.8-4.1-28.2 3.8-32.3 17.5-6.2 20.9-9.4 42.7-9.4 64.7v0.7C107.1 537.1 65 599.4 65 668.5v4.4c0 94.6 76.9 171.5 171.5 171.5H787c94.6 0 171.5-76.9 171.5-171.5v-4.4c0.1-54.9-26.8-106.7-71-138.7zM510.4 282c11.2 8.9 27.6 7.1 36.5-4.1 19.5-24.5 48.7-38.6 80-38.6 48.4 0 90.5 34.3 100.2 81.6 2.5 12.3 13.3 20.8 25.4 20.8 1.7 0 3.5-0.2 5.2-0.5 14.1-2.9 23.1-16.6 20.2-30.7-14.6-71.3-78.1-123.1-151-123.1-47.2 0-91.2 21.2-120.6 58.1-8.9 11.2-7.1 27.5 4.1 36.5z"
                  fill="#333333" p-id="2493"></path>
            </svg>
            <div class="air_card_content">
              <span>温度：23°</span>
              <span>天气：晴天</span>
            </div>
            <div class="flower"></div>
            <div class="flower_2"></div>
          </div>
          <div class="ip-card">
            <svg t="1682514669385" class="icon_ip" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="4579"  width="50%" height="50%">
              <path
                  d="M376.967 345.239h56.905v258.789h-56.905zM540.793 511.24h59.805c16.186 0 29.958-2.356 41.319-7.067 11.354-4.712 20.597-10.93 27.727-18.667 7.125-7.73 12.323-16.61 15.586-26.64 3.262-10.024 4.893-20.235 4.893-30.627 0-10.63-1.631-20.897-4.893-30.808-3.263-9.905-8.461-18.723-15.586-26.459-7.13-7.73-16.372-13.954-27.727-18.666-11.361-4.712-25.134-7.068-41.319-7.068H483.889v258.789h56.904V511.24z m0-121.782h44.219c6.524 0 12.805 0.487 18.848 1.45 6.037 0.969 11.354 2.843 15.948 5.618 4.587 2.781 8.273 6.705 11.055 11.779 2.774 5.075 4.168 11.723 4.168 19.935 0 8.217-1.394 14.86-4.168 19.935-2.781 5.074-6.468 9.004-11.055 11.78-4.594 2.78-9.911 4.655-15.948 5.618-6.043 0.968-12.323 1.45-18.848 1.45h-44.219v-77.565z"
                  fill="" p-id="4580"></path>
              <path
                  d="M864 128.542H159c-17.673 0-32 14.327-32 32v598.979c0 17.673 14.327 32 32 32h321v115.522c0 17.673 14.327 32 32 32 17.673 0 32-14.327 32-32V791.521h320c17.673 0 32-14.327 32-32V160.542c0-17.673-14.327-32-32-32z m-32 598.979H191V192.542h641v534.979z"
                  fill="" p-id="4581"></path>
            </svg>
            <div class="ip_card_content">
              <span>IP：192.168.11.1</span>
              <span>地址：湖北荆州</span>
            </div>
            <div class="flower"></div>
            <div class="flower_2"></div>
          </div>
        </div>
        <div class="header_right">
          <QuickAccess  :items="quickAccessItems" />
        </div>
      </div>
      <div class="--middle">
        <div class="announcement">

          <div>
            <div class="card-container">
              <a-tabs v-model:activeKey="activeKey" type="card">
                <a-tab-pane key="1" tab="当前公告">
                  <p>Content of Tab Pane 1</p>
                  <p>Content of Tab Pane 1</p>
                  <p>Content of Tab Pane 1</p>
                </a-tab-pane>
                <a-tab-pane key="2" tab="历史公告">
                  <List :items="items" />
                </a-tab-pane>
              </a-tabs>
            </div>
          </div>

        </div>
        <div class="calendar">
          <span>日历</span>
          <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange"/>
        </div>
      </div>
    </div>
  </template>

</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";
import type {Dayjs} from 'dayjs';
import QuickAccess from "@/components/card/QuickAccess.vue";

let tip = '加载中...';
let spinning = ref(false)

onBeforeMount(() => {
  spinning.value = true;
})

onMounted(() => {
  spinning.value = false;
})

const value = ref<Dayjs>();
const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value, mode);
};

const  items=  Array.from({ length: 10 }, (v, i) => ({
  id: i + 1,
  title: `示例标题${i + 1}`,
  time: `2021-10-${i + 1} 10:00:00`,
  link: `https://example.com/${i + 1}.html`
}))


import img from "@/assets/img/百度.svg";
let quickAccessItems= [
  {
    name: 'Bai du',
    link: 'https://www.baidu.com',
    image: img
  },
  {
    name: 'GitHub',
    link: 'https://github.com',
    image: ''
  },
  {
    name: 'Vue.js',
    link: 'https://vuejs.org',
    image: ''
  },
  {
    name: 'React',
    link: 'https://reactjs.org',
    image: ''
  }
]

let activeKey=ref('1')
</script>

<style lang="less" scoped>

@--el-border-color-light: 1px;
@--ant-content-background-color: #f0f2f5;
@--ant-div-background-color: #ffffff;


body, html {
  margin: 0;
  padding: 0;

  .content {
    background-color: @--ant-content-background-color;
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .--header {
      display: flex;
      align-content: space-between;
      justify-content: space-around;
      flex-wrap: wrap;
      height: 25%;

      .header_left {
        background-color:#f0f2f5;
        flex: 2;
        height: 100%;
        margin: 0 10px 10px 0;

        border-radius: 4px;

        box-sizing: border-box;
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        .air_card {
          box-shadow: 0 0 6px #0003;
          border: 1px solid var(--el-border-color-light);
          border-radius: 5px;
          margin: 0 10px 0 0;
          background-color: rgba(112, 241, 176, 0.3);
          display: flex;
          height: 100%;
          flex: 1;
          position: relative;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          .icon_air{
            position: absolute;
            left: 1%;
          }
          .flower{
            background-color: rgba(192, 210, 227, 0.4);
            width: 100px;
            height: 100px;
            border-radius: 50%;
            position: absolute;
            right: 0px;
            top: -50px;
          }
          .flower_2{
            background-color: rgba(241, 215, 230, 0.4);
            width: 150px;
            height: 150px;
            border-radius: 50%;
            position: absolute;
            right: 50px;
            top: -50px;
          }
          .air_card_content {
            span {
              display: block;
              font-weight: bold;
              margin-top: 10px;
            }
          }
        }

        .ip-card {
          box-shadow: 0 0 6px #0003;
          border: 1px solid @--el-border-color-light;
          border-radius: 5px;
          margin: 0 0 0 10px;
          background-color: rgba(209, 241, 112, 0.3);
          display: flex;
          height: 100%;
          flex: 1;
          position: relative;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          .icon_ip{
            position: absolute;
            left: 1%;
          }
          .flower{
            background-color: rgba(192, 210, 227, 0.4);
            width: 100px;
            height: 100px;
            border-radius: 50%;
            position: absolute;
            right: 0px;
            top: -50px;
          }
          .flower_2{
            background-color: rgba(241, 215, 230, 0.4);
            width: 150px;
            height: 150px;
            border-radius: 50%;
            position: absolute;
            right: 50px;
            top: -50px;
          }
          .ip_card_content {
            span {
              display: block;
              font-weight: bold;
              margin-top: 10px;
            }
          }
        }
      }

      .header_right {
        background-color: @--ant-div-background-color;
        flex: 1;
        height: 100%;
        margin: 0 0 10px 10px;
        border: 1px solid var(--el-border-color-light);
        border-radius: 4px;
        box-shadow: 0 0 6px #0003;
        box-sizing: border-box;
        //display: flex;
        //justify-content: center;
        //align-items: center;
      }
    }

    .--middle {
      display: flex;
      align-content: space-between;
      justify-content: space-around;
      flex-wrap: wrap;
      height: 70%;
      //background-color:@--ant-div-background-color;
      box-sizing: border-box;

      .announcement {
        flex: 2;
        background-color: @--ant-div-background-color;
        height: 100%;
        margin: 20px 10px 10px 0;
        padding: 20px;
        border: 1px solid var(--el-border-color-light);
        border-radius: 4px;
        box-shadow: 0 0 6px #0003;
        box-sizing: border-box;
      }

      .calendar {
        background-color: @--ant-div-background-color;
        height: 100%;
        flex: 1;
        margin: 20px 0 10px 10px;
        border: 1px solid @--el-border-color-light;
        border-radius: 4px;
        box-shadow: 0 0 6px #0003;
        box-sizing: border-box;

        span {
          font-size: large;
          //background-color: #a6c1ee;
          margin: 40px 0 0 20px;
          font-weight: bold;
        }
      }

    }


  }
}
.card-container p {
  margin: 0;
}
.card-container > .ant-tabs-card .ant-tabs-content {
  height: 120px;
  margin-top: -16px;
}
.card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
  padding: 16px;
  background: #fff;
}
.card-container > .ant-tabs-card > .ant-tabs-nav::before {
  display: none;
}
.card-container > .ant-tabs-card .ant-tabs-tab,
[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab {
  background: transparent;
  border-color: transparent;
}
.card-container > .ant-tabs-card .ant-tabs-tab-active,
[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
  background: #fff;
  border-color: #fff;
}
#components-tabs-demo-card-top .code-box-demo {
  padding: 24px;
  overflow: hidden;
  background: #f5f5f5;
}
[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-content {
  height: 120px;
  margin-top: -8px;
}
[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab {
  background: transparent;
  border-color: transparent;
}
[data-theme='dark'] #components-tabs-demo-card-top .code-box-demo {
  background: #000;
}
[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
  background: #141414;
}
[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
  background: #141414;
  border-color: #141414;
}

</style>