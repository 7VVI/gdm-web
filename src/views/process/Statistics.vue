<template>
  <div class="content">
    <div class="header_name">
      <a-card :bordered="false" title="审计流程">
        <a-steps :direction=" 'horizontal'" :current="3" progressDot>
          <a-step>
            <template v-slot:title>
              <span>发布题目</span>
            </template>
            <template v-slot:description>
            </template>
          </a-step>
          <a-step>
            <template v-slot:title>
              <span>系负责人初审</span>
            </template>
            <template v-slot:description>
            </template>
          </a-step>
          <a-step title="院负责人审核"/>
          <a-step title="完成"/>
        </a-steps>
      </a-card>
    </div>
    <div class="content_middle">
      <div class="trend">
        <div ref="pillar" class="chart"></div>
      </div>
      <div class="pi">
        <div ref="chart" class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import * as echarts from 'echarts';
import {designProjectAuditFlowPercent} from "@/api/designProjectAuditFlow";

// 获取 DOM 节点的引用
const chart = ref<HTMLDivElement | null>(null);
const pillar = ref<HTMLDivElement | null>(null);


// 初始化 Echarts 图表
const initChart = (container: HTMLElement) => {
  const myChart = echarts.init(container);

  // 配置选项
  const option = {
    title: {
      text: '选题审核详情',
      subtext: '',
      left: 'left'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      // top: '5%',
      left: 'center',
      top: 'bottom',
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    series: [
      {
        name: '选题',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  };

  // 使用配置选项显示图表
  myChart.setOption(option);
};

// 初始化 Echarts 图表
const initPillar = (container: HTMLElement) => {
  const myChart = echarts.init(container);

  // 配置选项
  let option = {
    title: {
      text: '选题审核详情',
      subtext: '',
      left: 'left'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };

  // 使用配置选项显示图表
  myChart.setOption(option);
};

let data = reactive({})


onMounted(async () => {
  let response = await designProjectAuditFlowPercent()
  data = response.data
  if (chart.value) {
    initChart(chart.value);
  }
  if (pillar.value) {
    initPillar(pillar.value)
  }
})

</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  //display: flex;
  //flex-direction: column;

  .header_name {
    border: 1px solid 1px;
    border-radius: 4px;
    box-shadow: 0 0 6px #0003;
    box-sizing: border-box;
  }

  .content_middle {
    margin-top: 20px;
    height: 450px;
    background-color: #edeff2;
    display: flex;

    .trend {
      border: 1px solid 1px;
      border-radius: 4px;
      box-shadow: 0 0 6px #0003;
      box-sizing: border-box;
      background-color: white;
      height: 100%;
      flex: 3;
      margin-right: 20px;

      .chart {
        width: 100%;
        height: 100%;
      }
    }

    .pi {
      border: 1px solid 1px;
      border-radius: 4px;
      box-shadow: 0 0 6px #0003;
      box-sizing: border-box;
      background-color: white;
      flex: 1;

      .chart {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>