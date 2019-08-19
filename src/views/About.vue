<template>
  <div class="about">
    <Header></Header>
    <div class="content">
      <div class="header">
        <div class="title">{{name}}</div>
        <Cascader :data="cityList" change-on-select @on-change="selectCity"></Cascader>
      </div>
      <!-- <Tabs value="name1">
        <TabPane label="潜在关联表" name="name1"> -->
      <div class="container">
        <Card :bordered="false">
          <!-- <p slot="title">库存基本信息</p> -->
          <Table :columns="columns1" :data="data1"></Table>
        </Card>
        <!-- <Card :bordered="false">
          <p slot="title">经销商信息</p>
          <Table :columns="columns2" :data="data2"></Table>
        </Card> -->
      </div>
      <!-- </TabPane>
        <TabPane label="潜在关联图" name="name2">
          <Card class="sankey" :bordered="false">
            <v-chart :options="sankeyOptions" :autoresize="true" />
          </Card>
        </TabPane>
      </Tabs> -->
    </div>
  </div>
</template>
<script>
  import Header from "@/components/header.vue";
  import api from "@/http"
  export default {
    name: "about",
    data() {
      return {
        region: '',
        province: '',
        cityList: [
        {
          value: '华北区',
          label: '华北区',
          children: [
          {
            value: '北京市',
            label: '北京市'
          },
          {
            value: '河北省',
            label: '河北省'
          }]
        }, {
          value: '华东区',
          label: '华东区',
          children: [
          {
            value: '上海市',
            label: '上海市'
          },
          {
            value: '江苏省',
            label: '江苏省',
          },
          {
            value: '浙江省',
            label: '浙江省',
          }],
        }],
        columns1: [
        {
          title: "物料号",
          key: "materialsId",
          width: 90,
        },
        {
          title: "车型",
          key: "configDesc"
        },
        {
          title: "外观颜色",
          key: "colorDesc"
        },
        {
          title: "内饰",
          key: "upholsteryDesc"
        },
        {
          title: "配置",
          key: "addDescs"
        },
        {
          title: "车架号",
          key: "vin"
        },
        {
          title: " ",
          key: "blank",
          width: 5,
          className: 'black'
        },
        {
          title: "供应商名称",
          key: "dealerName"
        },
        {
          title: "订单号",
          key: "orderId",
          width: 90,
        },
        {
          title: "车型",
          key: "configDescT"
        },
        {
          title: "外观颜色",
          key: "colorDescT"
        },
        {
          title: "内饰",
          key: "upholsteryDescT"
        },
        {
          title: "配置",
          key: "addDescsT"
        }, ],
        data1: [],
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
          }]
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
      // sankeyData() {
      //   return this.$store.state.sankeyData;
      // },
      // sankeyLinks() {
      //   return this.$store.state.sankeyLinks;
      // },
      // sankeyOptions() {
      //   let options = this.deepClone(this.option);
      //   let data = [];
      //   let links = [];
      //   options.series[0].data = this.sankeyData;
      //   options.series[0].links = this.sankeyLinks;
      //   return options;
      // }
    },
    mounted() {
      // this.$nextTick(() => {
      //   // console.log("this :", this);
      // });
    },
    created() {
      this.getData();
    },
    methods: {
      getData(r, i) {
        this.data1 = [],
          this.data2 = [],
          api.getTable(this.mappingType, r, i).then((res) => {
            // this.data1 = res.data.data;
            res.data.data.forEach(element => {
              this.data1.push({
                "materialsId": element.materialsId,
                "configDesc": element.configDesc,
                "colorDesc": element.colorDesc,
                "upholsteryDesc": element.upholsteryDesc,
                "addDescs": element.addDescs.join(" / "),
                "vin": element.vin,
                "blank": "",
                "dealerName": element.dealerName,
                "orderId": element.orderId,
                "configDescT": element.configDescT,
                "colorDescT": element.colorDescT,
                "upholsteryDescT": element.upholsteryDescT,
                "addDescsT": element.addDescsT.join(" / "),
                "cellClassName": element.cellClassName
              })
            });
            console.log(this.data1);
          })
      },
      selectCity(value) {
        const [r, i] = value;
        this.getData(r, i);
      },
      deepClone(obj) {
        let _obj = JSON.stringify(obj),
          objClone = JSON.parse(_obj);
        return objClone;
      }
    }
  };

</script>
<style lang="scss">
  .different {
    color: rgb(247, 183, 47);
  }

  .ivu-table td {
    padding: 5px 0;
  }

  .ivu-table th.black, .ivu-table td.black {
    background: #171717 !important;
  }

  .header {
    margin-bottom: 20px;
  }

  .ivu-cascader {
    width: 200px;
    display: inline-block;
    margin-left: 20px;

    .ivu-cascader-menu-item {
      color: #c6c6c6;

      &:hover {
        color: #515a6e;
      }
    }

    .ivu-cascader-menu-item-active {
      color: #515a6e;
    }

    .ivu-cascader-menu {
      border: 0 none;
    }

    .ivu-input {
      border: 1px solid #dcdee2 !important;
      font-size: 12px !important;
      letter-spacing: .18px;
      color: #c6c6c6 !important;
      line-height: 32px !important;
    }
  }

  .ivu-select-item, .ivu-select-selected-value {
    color: #bcbcbc;
  }

  .ivu-select-item:hover, .ivu-select-item-selected {
    color: #515a6e;
  }

  .title {
    display: inline-block;
    vertical-align: middle;
  }

  .ivu-select {
    margin-left: 20px;
    vertical-align: middle;
    display: inline-block;
  }

  .ivu-select-selection {
    width: 150px;
  }

  .ivu-table {
    border-right: 1px solid #282828;
    background-color: #282828;
  }

  .ivu-table:after, .ivu-table:before {
    background-color: transparent;
  }

  .ivu-card-head {
    border-bottom: 0 none;

    p {
      color: #8c8c8c;
    }
  }

  .ivu-card-body {
    background-color: #282828;
    height: 100%;
    overflow: auto;
  }


  .container {
    height: calc(100% - 60px);
    display: flex;

    .ivu-card-body {
      .ivu-table-wrapper {
        height: 100%;
      }
    }

    .ivu-card {
      &:first-child {
        flex: 1;

        // .ivu-table-header {
        //   border-top: 2px solid #0062ff;
        // }
      }

      .ivu-table-body {
        height: calc(100% - 40px);
        overflow: auto;
      }

      // &:last-child {
      //   flex: 1;
      //   margin-left: 10px;

      //   .ivu-table-header {
      //     border-top: 2px solid #20d5d2;
      //   }
      // }

      .ivu-card-head {
        color: #8c8c8c;
      }
    }
  }

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
        color: #fff;
        letter-spacing: .18px;
        // margin-bottom: 12px;
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
