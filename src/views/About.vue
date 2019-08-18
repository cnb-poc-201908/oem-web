<template>
  <div class="about">
    <Header></Header>
    <div class="content">
      <div class="title">{{name}}</div>
      <Card class="sankey" :bordered="false">
        <v-chart :options="sankeyOptions" :autoresize="true"/>
      </Card>
    </div>
  </div>
</template>
<script>
import Header from "@/components/header.vue";
export default {
  name: "about",
  data() {
    return {
      color: [
        "#78b4ff",
        "#f66bc7",
        "#2bcba7",
        "#ff8896",
        "#79c628",
        "#6c93ee",
        "#a9abff",
        "#f7a23f",
        "#27bae7",
        "#ff6d9d",
        "#cb79ff",
        "#f95b5a",
        "#ccaf27",
        "#38b99c",
        "#93d0ff",
        "#bd74e0",
        "#fd77da",
        "#dea700"
      ],
      city: [
        {
          name: "深圳市",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "广州市",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "珠海市",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "汕头市",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "佛山市",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "深圳市2",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "广州市2",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "珠海2市",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "汕头市2",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "佛山市2",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "深圳市3",
          plts: [
            { name: "PM25", rate: 95 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "广州市3",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "珠海3市",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "汕头市3",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "佛山市3",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "深圳市4",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "广州市4",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "珠海市4",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "汕头市4",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "佛山市4",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "深圳市5",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 35 }
          ]
        },
        {
          name: "广州市5",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 35 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "珠海市5",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "汕头市5",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 45 },
            { name: "O3", rate: 15 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        },
        {
          name: "佛山市5",
          plts: [
            { name: "PM25", rate: 25 },
            { name: "PM10", rate: 15 },
            { name: "O3", rate: 35 },
            { name: "CO", rate: 15 },
            { name: "NO2", rate: 15 },
            { name: "SO2", rate: 15 }
          ]
        }
      ],
      option: {
        series: [
          {
            type: "sankey",
            data: [],
            links: [],
            // width: '100%',
            // height: '100%',
            top: "20px",
            right: "10%",
            left: "10%",
            bottom: "5%",
            focusNodeAdjacency: "allEdges",
            itemStyle: {
              normal: {
                borderWidth: 0,
                borderColor: "#fff",
                opacity: 1
              }
            },
            label: {
              normal: {
                fontSize: "14",
                color: "#fff"
              }
            },
            lineStyle: {
              normal: {
                curveness: 0.5,
                opacity: 1
              }
            }
          }
        ]
      }
    };
  },
  components: {
    Header
  },
  computed: {
    mappingType() {
      return this.$store.state.mappingType;
    },
    name() {
      if (this.mappingType === 'all') {
        return '全部物料';
      }
      if (this.mappingType === '1') {
        return '完全匹配';
      }
      if (this.mappingType === '2') {
        return '最优匹配';
      }
      if (this.mappingType === '3') {
        return '推荐匹配';
      } 
    },
    sankeyData() {
      return this.$store.state.sankeyData;
    },
    sankeyLinks() {
      return this.$store.state.sankeyLinks;
    },
    sankeyOptions() {
      let options = this.deepClone(this.option);
      let data = [];
      let links = [];
      options.series[0].data = this.sankeyData;
      options.series[0].links = this.sankeyLinks;
      return options;
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   // console.log("this :", this);
    // });
  },
  created() {

  },
  methods: {
    deepClone(obj) {
      let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
      return objClone;
    }
  }
};
</script>
<style lang="scss">
.about {
  background-color: #171717;
  height: 100%;
  .content {
    padding: 90px 30px 20px;
    width: 100%;
    // height: calc(100% - 126px);
    height: 100%;
    .title {
      font-weight: bold;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: 0.18px;
      margin-bottom: 12px;
    }
    .ivu-card {
      background: #282828;
    }
    .sankey {
      width: 100%;
      height: 100%;
      .echarts {
        width: 100%;
        // height: calc(100% - 200px);
        height: 5000px;
      }
    }
  }
}
</style>