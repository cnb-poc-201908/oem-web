<template>
  <div class="home">
    <Header></Header>

    <v-chart :options="options" auto-resize />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import api from "@/http";
import Header from "@/components/header.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Header
  },
  data() {
    return {
      options: {
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  },
  created() {
    console.log(this.$moment().format("YYYY-MM-DD"));
    api.getData().then(res => {
      console.log(res.data);
    });
  }
};
</script>
