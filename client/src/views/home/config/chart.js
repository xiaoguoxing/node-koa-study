import * as echarts from 'echarts';
export default {
  lineOptions: (x1, yName, seriesList) => {
    let seriesListCopy = seriesList.map((v) => {
      return {
        name: v.name,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 2,
        itemStyle: {
          color: v.color,
        },
        data: v.data || [],
      };
    });
    let legendList = seriesList.map((v) => {
      return {
        name: v.name,
      };
    });
    return {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '7px', // 网格左边距
        right: '10px', // 网格右边距
        top: '30px', // 网格上边距
        bottom: '0', // 网格下边距
        containLabel: true,
      },
      legend: {
        right: '35%', // 图例距离右侧的距离
        top: 0, // 图例距离顶部的距离
        icon: 'rect',
        itemWidth: 24,
        itemHeight: 2,
        itemGap: 13,
        data: legendList,
        textStyle: {
          color: '#666666', // 设置图例字体的颜色
        },
        //
      },
      xAxis: [
        {
          type: 'category',
          data: x1,
          axisPointer: {
            type: 'shadow',
          },
          axisLabel: {
            color: '#666666', // 设置刻度标签的颜色
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          nameTextStyle: {
            color: '#666666', // 设置 Y 轴名称的颜色
          },
          min: function (value) {
            return parseInt(value.min);
          },
          type: 'value',
          name: yName,
          axisLabel: {
            color: '#666666', // 设置刻度标签的颜色
          },
          axisTick: {
            show: false, // 显示刻度线
            alignWithLabel: false, // 刻度线与刻度标签对齐
            lineStyle: {
              color: '#666666', // 刻度线的颜色
            },
          },
          axisLine: {
            show: true,
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: seriesListCopy,
    };
  },
};
