<template>
  <div class="about">
    <Header></Header>
    <div class="content">
      <div class="title">最优匹配</div>
      <Card class="sankey" :bordered="false">
        <v-chart :options="sankeyOptions" auto-resize />
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
      option: {
        series: [
          {
            type: "sankey",
            data: [],
            links: [],
            // width: '100%',
            height: "100%",
            top: "10%",
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
    sankeyOptions() {
      let options = this.deepClone(this.option);
      let data = [
        {
          name: "a"
        },
        {
          name: "b"
        },
        {
          name: "a1"
        },
        {
          name: "a2"
        },
        {
          name: "b1"
        },
        {
          name: "c"
        }
      ];
      options.series[0].data = data;
      let links = [
        {
          source: "a",
          target: "a1",
          value: 5
        },
        {
          source: "a",
          target: "a2",
          value: 3
        },
        {
          source: "b",
          target: "b1",
          value: 8
        },
        {
          source: "a",
          target: "b1",
          value: 3
        },
        {
          source: "b1",
          target: "a1",
          value: 1
        },
        {
          source: "b1",
          target: "c",
          value: 2
        }
      ];
      options.series[0].links = data;
      return options;
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log("this :", this);
    });
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
  height: 100vh;
  .content {
    padding: 20px 30px;
    width: 100%;
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
      height: calc(100% - 90px);
      .echarts {
        width: 100%;
        // height: calc(100% - 200px);
        // height: 60%;
      }
    }
  }
}
</style>