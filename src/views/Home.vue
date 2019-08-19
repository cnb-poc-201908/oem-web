<template>
  <div class="home">
    <Header></Header>
    <div class="content">
      <div class="content_left">
        <div class="left_top">
          <div class="board material">
            <div class="board_content">
              <div class="title sp_title">物料</div>
              <div class="count sp_count">
                {{material}}
                <span class="unit">台</span>
              </div>
            </div>
          </div>
          <div class="board">
            <div class="board_content">
              <div class="title">完全匹配</div>
              <div class="count">
                {{completeMapping}}
                <span class="unit">台</span>
              </div>
            </div>
          </div>
          <div class="board pointer" @click="potentialMapping('2')">
            <div class="board_content">
              <div class="title">最优匹配</div>
              <div class="count">
                {{optimalMapping}}
                <span class="unit">台</span>
              </div>
            </div>
          </div>
          <div class="board pointer" @click="potentialMapping('3')">
            <div class="board_content">
              <div class="title">推荐匹配</div>
              <div class="count">
                {{recommendMapping}}
                <span class="unit">台</span>
              </div>
            </div>
          </div>
        </div>
        <div class="left_bottom">
          <div class="bottom_left">
            <div class="mapping">分配概览</div>
            <v-chart :options="pieOptions" auto-resize />
          </div>
          <div class="bottom_right">
            <Tabs value="name1">
              <TabPane label="厂商" name="name1">
                <div class="scroll">
                  <div class="tagName">
                    <div class="param">参数</div>
                    <div class="dealerIcon">
                      <img style="margin-right: 10px;" src="../assets/16.svg" @click="editParam" />
                      <img src="../assets/12.svg" @click="increaseDom" />
                    </div>
                  </div>
                  <div width="100%" style="margin: 11px 16px 40px 16px;">
                    <Select
                      v-model="dealerId"
                      height="40px"
                      placement="bottom"
                      @on-change="chooseItem"
                    >
                      <Option
                        v-for="item in dealerList"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </div>
                  <div class="weight_item tagList list_title">
                    <span style="width:80px">属性</span>
                    <span>经销商KPI</span>
                    <span>权重</span>
                  </div>
                  <div class="weight_item" v-for="(val, key, i) in weightList" :key="i">
                    <!-- <img
                      v-if="val.weight >= 8 && val.weight <= 10"
                      class="weight_icon"
                      src="../assets/weight.svg"
                    /> -->
                    <div class="weightClass" height="60px">
                      <div v-if="edit" class="tagList">
                        <span class="weightName" style="width: 100px">{{key}}</span>
                        <i-input v-model="val.weight" style="width: 50px"></i-input>
                        <i-input v-model="val.value" style="width: 50px"></i-input>
                      </div>
                      <div v-if="!edit" class="tagList">
                        <span class="weightName" style="width: 100px">{{key}}</span>
                        <span class="weightName" style="width: 50px">{{val.weight}}</span>
                        <span class="weightValue" style="width: 50px">{{val.value}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="weight_item" v-if="add">
                    <div class="weightClass" height="60px" style="background: #3D3D3D;">
                      <div class="tagList">
                        <i-input v-model="name" style="width: 100px"></i-input>
                        <i-input v-model="weight" style="width: 50px"></i-input>
                        <i-input v-model="value" style="width: 50px"></i-input>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="button_part">
                  <button v-if="edit" class="againMapping" width="100%" @click="update">更新</button>
                  <button
                    v-if="!edit && !add"
                    class="againMapping"
                    width="100%"
                    @click="afresh"
                  >重新匹配</button>
                  <button v-if="add" class="againMapping" width="100%" @click="addParam">保存</button>
                </div>
              </TabPane>
              <TabPane label="经销商" name="name2">
                <div class="scroll">
                  <div class="tagName" style="margin-bottom: 10px;">
                    <div class="param">参数</div>
                    <div class="dealerIcon">
                      <img style="margin-right: 10px;" src="../assets/16.svg" @click="editOem" />
                      <img src="../assets/12.svg" />
                    </div>
                  </div>
                  <div class="weight_item tagList list_title">
                    <span style="width:80px">属性</span>
                    <span style="width:30px">权重</span>
                    <!-- <span>权值</span> -->
                  </div>
                  <div class="weight_item" v-for="(val, key, i) in modelsOemList" :key="i">
                    <!-- <img
                      v-if="val.weight >= 8 && val.weight <= 10"
                      class="weight_icon"
                      src="../assets/weight.svg"
                    /> -->
                    <div class="weightClass" height="60px" style="background: #3D3D3D;">
                      <div v-if="editOemFlag" class="tagList">
                        <span class="weightName" style="width: 100px">{{key}}</span>
                        <i-input v-model="val.weight" style="width: 60px"></i-input>
                        <!-- <i-input v-model="val.value" style="width: 50px"></i-input> -->
                      </div>
                      <div v-if="!editOemFlag" class="tagList">
                        <span class="weightName" style="width: 100px">{{key}}</span>
                        <span class="weightName" style="width: 45px">{{val.weight}}</span>
                        <!-- <span class="weightValue" style="width: 50px">{{val.value}}</span> -->
                      </div>
                    </div>
                  </div>
                </div>
                <div class="button_part">
                  <button v-if="editOemFlag" class="againMapping" width="100%" @click="updateOem">更新</button>
                  <button
                    v-if="!editOemFlag && !add"
                    class="againMapping"
                    width="100%"
                    @click="afresh"
                  >重新匹配</button>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
      <div class="content_right">
        <div class="right_top">
          <div class="title—top">匹配不准确</div>
          <div class="top-content">TOP 10</div>
          <Slider v-model="value2" range></Slider>
        </div>
        <div class="right_bottom">
          <Card :padding="0">
            <div class="dealer">
              <span>经销商名称</span>
              <span>比率</span>
            </div>
            <ul>
              <li
                class="top_li"
                @click="openModel(item)"
                v-for="(item, i) in dealerReportList"
                :key="i"
              >
                <div class="top_form">
                  <span>{{i+1}}. {{item.name}}</span>
                  <span>{{item.ratio}}%</span>
                </div>
              </li>
            </ul>
          </Card>
          <Card :padding="0">
            <Row>
              <Col span="12">
                <div class="checkbox">
                  <Checkbox v-model="single">机器学习</Checkbox>
                </div>
              </Col>
              <Col span="12">
                <button class="btn-primary" @click="goToAbout">确认分配</button>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <Modal v-model="dealerModal" :title="dealerName" :footer-hide="true" width="800px">
      <Table :columns="columns1" :data="dealerData"></Table>
      <div style="margin-top:40px;">
        <button class="correct">矫正模型</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import api from "@/http";
import Header from "@/components/header.vue";

export default {
  name: "home",
  components: {
    Header
  },
  data() {
    return {
      spinShow: false,
      name: "",
      weight: "",
      value: "",
      add: false,
      edit: false,
      editOemFlag: false,
      value2: [20, 50],
      // 经销商弹框
      dealerModal: false,
      columns1: [
        {
          title: "匹配度",
          key: "matchRate"
        },
        {
          title: "数量",
          key: "amount"
        },
        {
          title: "匹配数量",
          key: "matchedAmount"
        },
        {
          title: "描述",
          key: "description"
        }
      ],
      value: "",
      dealerList: [
        { value: "D0001", label: "北京宝泽行" },
        { value: "D0002", label: "北京京宝行" },
        { value: "D0003", label: "北京博得宝" },
        { value: "D0004", label: "北京汇宝行" },
        { value: "D0005", label: "上海宝诚尊悦" },
        { value: "D0006", label: "天津荣宝行" },
        { value: "D0007", label: "天津天宝" },
        { value: "D0008", label: "天津运通宝翔" },
        { value: "D0009", label: "唐山市浩丰宝" },
        { value: "D0010", label: "保定东澜誉宝" },
        { value: "D0011", label: "石家庄宝和" },
        { value: "D0012", label: "上海众国宝泓" },
        { value: "D0013", label: "上海宝景" },
        { value: "D0014", label: "上海宝景星诚" },
        { value: "D0015", label: "南京宁宝" },
        { value: "D0016", label: "苏州市宝景" },
        { value: "D0017", label: "常熟宝信" },
        { value: "D0018", label: "杭州和诚之宝" },
        { value: "D0019", label: "杭州骏宝行" },
        { value: "D0020", label: "慈溪宝恒" }
      ],
      single: false,
      options: {
        title: {
          show: true,
          text: "",
          subtext: "推荐分配",
          textStyle: {
            color: "#ffffff",
            fontSize: 35,
            fontWeight: "normal",
            fontFamily: "PingFangSC-Regular",
            formatter: "{d}%"
          },
          subtextStyle: {
            color: "#666",
            fontSize: 20
          },
          x: "center",
          y: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "经销商: {c} ({d}%)"
        },
        // legend: {
        //   orient: "horizontal",
        //   bottom: "bottom",
        //   left: "center",
        //   // data: ["推荐匹配", "最优匹配", "完全匹配"]
        //   data: [
        //     { name: "推荐匹配", icon: "cirlcle" },
        //     { name: "最优匹配", icon: "cirlcle" },
        //     { name: "完全匹配", icon: "cirlcle" }
        //   ]
        // },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [100, 150],
            center: ["50%", "50%"],
            data: [
              {
                value: "",
                name: "推荐匹配",
                itemStyle: {
                  color: "#20D5D2"
                },
                label: {
                  color: "#20D5D2",
                  fontSize: 14,
                  formatter: "推荐匹配",
                  rich: {
                    a: {
                      color: "#20D5D2",
                      fontSize: 20,
                      lineHeight: 30
                    }
                  }
                }
              },
              {
                value: "",
                name: "最优匹配",
                itemStyle: {
                  color: "#0062FF"
                },
                label: {
                  color: "#0062FF",
                  fontSize: 14,
                  formatter: "最优匹配",
                  rich: {
                    a: {
                      color: "#0062FF",
                      fontSize: 20,
                      lineHeight: 30
                    }
                  }
                }
              },
              {
                value: "",
                name: "完全匹配",
                itemStyle: {
                  color: "#8A3FFC"
                },
                label: {
                  color: "#8A3FFC",
                  fontSize: 14,
                  formatter: "完全匹配",
                  rich: {
                    a: {
                      color: "#8A3FFC",
                      fontSize: 20,
                      lineHeight: 30
                    }
                  }
                }
              }
            ]
          },
          
        ]
      }
    };
  },
  created() {
    this.spinShow = true;
    this.$store.commit("setDealerId", this.dealerList[0].value);
    this.chooseItem(this.dealerList[0].value);
    api.getReport().then(res => {
      this.$store.commit("setMaterial", res.data.data.summary);
      this.$store.commit("setCompleteMapping", res.data.data.best);
      this.$store.commit("setOptimalMapping", res.data.data.prefer);
      this.$store.commit("setRecommendMapping", res.data.data.recommand);
    });
    api.getDealerReport().then(res => {
      res.data.data.forEach(element => {
        this.dealerList.forEach(item => {
          if (element.dealerId == item.value) {
            element.name = item.label;
          }
        });
      });
      this.$store.commit("setDealerReportList", res.data.data);
    });
    api.getModelsOem().then(res => {
      // res.data.datacolor = '颜色';
      // Object.defineProperty(res.data.data, 'color', '颜色')
      res.data.data["颜色"] = res.data.data.color;
      delete res.data.data.color;
      res.data.data["配置"] = res.data.data.config;
      delete res.data.data.config;
      res.data.data["内饰"] = res.data.data.upholstery;
      delete res.data.data.upholstery;
      console.log(res.data.data);
      this.$store.commit("setModelsOemList", res.data.data);
      this.spinShow = false;
    });
  },
  computed: {
    dealerData() {
      return this.$store.state.dealerData;
    },
    dealerName() {
      return this.$store.state.dealerName;
    },
    weightList() {
      return this.$store.state.weightList;
    },
    dealerId: {
      get() {
        return this.$store.state.dealerId;
      },
      set(value) {
        this.$store.commit("setDealerId", value);
      }
    },
    material() {
      return this.$store.state.material;
    },
    completeMapping() {
      return this.$store.state.completeMapping;
    },
    optimalMapping() {
      return this.$store.state.optimalMapping;
    },
    recommendMapping() {
      return this.$store.state.recommendMapping;
    },
    dealerReportList() {
      return this.$store.state.dealerReportList;
    },
    pieOptions() {
      let options = this.deepClone(this.options);
      let data = [];
      let links = [];
      options.series[0].data[0].value = this.$store.state.recommendMapping;
      options.series[0].data[1].value = this.$store.state.optimalMapping;
      options.series[0].data[2].value = this.$store.state.completeMapping;
      // options.series[1].data[0].value = this.$store.state.recommendMapping;
      // options.series[1].data[1].value = this.$store.state.optimalMapping;
      // options.series[1].data[2].value = this.$store.state.completeMapping;
      options.title.text = `${this.$store.state.recommendMapping}台`;
      return options;
    },
    modelsOemList() {
      return this.$store.state.modelsOemList;
    }
  },
  methods: {
    deepClone(obj) {
      let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
      return objClone;
    },
    goToAbout() {
      this.$store.commit("setMappingType", "all");
      this.$router.push({ name: "about" });
    },
    openModel(item) {
      this.$store.commit("setDealerName", item.name);
      api.getOrderGroups(item.dealerId).then(res => {
        this.$store.commit("setDealerData", res.data.data);
      });
      this.dealerModal = true;
    },
    potentialMapping(type) {
      this.$store.commit("setMappingType", type);
      api.getSankey(type).then(res => {
        this.$store.commit("setSankeyData", res.data.data.data);
        this.$store.commit("setSankeyLinks", res.data.data.links);
      });
      this.$router.push({ name: "about" });
    },
    chooseItem(dealerId) {
      this.$store.commit("setDealerId", dealerId);
      api.getModels(dealerId).then(res => {
        console.log(res.data.data);
        this.edit = false;
        res.data.data["目标完成率"] = res.data.data.SalesAbility;
        delete res.data.data.SalesAbility;
        res.data.data["经销商征信"] = res.data.data.FundStatus;
        delete res.data.data.FundStatus;
        res.data.data["库存深度"] = res.data.data.StockDepth;
        delete res.data.data.StockDepth;
        this.$store.commit("setWeightList", res.data.data);
      });
    },
    increaseDom() {
      this.add = true;
      this.edit = false;
      console.log(this.add);
    },
    update() {
      // this.spinShow = true;
      console.log(this.weightList);
      this.weightList["SalesAbility"] = this.weightList["目标完成率"];
        delete this.weightList["目标完成率"];
        this.weightList["FundStatus"] = this.weightList["经销商征信"];
        delete this.weightList["经销商征信"];
        this.weightList["StockDepth"] = this.weightList["库存深度"];
        delete this.weightList["库存深度"];
      api.putModels(this.dealerId, this.weightList).then(res => {
        console.log(res.data);
        this.edit = false;
        this.spinShow = false;
      });
    },
    editParam() {
      this.edit = this.edit === true ? false : true;
      console.log(this.edit);
    },
    updateOem() {
      // this.spinShow = true;
      this.modelsOemList['color'] = this.modelsOemList['颜色'];
      delete this.modelsOemList['颜色'];
      this.modelsOemList['config'] = this.modelsOemList['配置'];
      delete this.modelsOemList['配置'];
      this.modelsOemList['upholstery'] = this.modelsOemList['内饰'];
      delete this.modelsOemList['内饰'];
      api.putModelsOem(this.modelsOemList).then(res => {
        console.log(res.data);
        this.editOemFlag = false;
        // this.spinShow = false;
      });
    },
    addParam() {
      let body = {};
      let childbody = {
        weight: this.weight,
        value: this.value
      };
      let x = `${this.name}`;
      let n = body[x];
      body[x] = childbody;
      console.log(body);
      api.postModels(this.dealerId, body).then(res => {
        console.log(res.data);
      });
    },
    editOem() {
      this.editOemFlag = this.editOemFlag === true ? false : true;
      console.log(this.editOemFlag);
    },
    afresh() {
      this.spinShow = true;
      api.getSmartEngine().then(res => {
        console.log(res.data.data);
        api.getDealerReport().then(res => {
          res.data.data.forEach(element => {
            this.dealerList.forEach(item => {
              if (element.dealerId == item.value) {
                element.name = item.label;
              }
            });
          });
          this.$store.commit("setDealerReportList", res.data.data);
        });
        api.getReport().then(res => {
          this.$store.commit("setMaterial", res.data.data.summary);
          this.$store.commit("setCompleteMapping", res.data.data.best);
          this.$store.commit("setOptimalMapping", res.data.data.prefer);
          this.$store.commit("setRecommendMapping", res.data.data.recommand);
        });

        this.spinShow = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  background-color: #171717;
  height: 100%;

  .content {
    padding: 90px 30px 30px;
    height: 100%;
    display: flex;
    justify-content: space-between;

    // align-items: center;
    .content_left {
      width: 75%;
      height: 100%;
      margin-right: 20px;

      .left_top {
        width: 100%;
        height: 150px;
        display: flex;
        flex: 1;
        justify-content: space-between;
        margin-bottom: 20px;
        .board {
          width: 25%;
          height: 100%;
          background: #282828;

          .board_content {
            width: 100%;
            height: 100%;
            padding: 10%;
            color: #fff;

            .title {
              color: #8c8c8c;
              font-size: 16px;
              letter-spacing: 0.21px;
            }

            .sp_title {
              color: #fff;
            }

            .count {
              font-size: 50px;
              letter-spacing: 0.64px;

              .unit {
                font-size: 24px;
                letter-spacing: 0.27px;
              }
            }

            .sp_count {
              font-weight: bold;
            }
          }
        }
        .pointer {
          cursor: pointer;
          &:hover {
            opacity: 0.6;
          }
        }
        .material {
          background-image: linear-gradient(-32deg, #bb8eff 0%, #0062ff 100%);
        }
      }

      .left_bottom {
        width: 100%;
        height: calc(100% - 170px);
        display: flex;
        justify-content: space-between;

        .bottom_left {
          margin-right: 20px;
          padding: 20px 40px;
          background: #282828;
          width: 65%;
          height: 100%;

          .echarts {
            width: 100%;
            // height: 100%;
          }
        }

        .bottom_right {
          width: 35%;
          height: 100%;
          background: #282828;

          // overflow: auto;
          .button_part {
            height: 60px;
          }

          .scroll {
            height: calc(100% - 65px);
            overflow: auto;
            overflow-x: hidden;
          }

          .tagName {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 16px;

            .dealerIcon {
              cursor: pointer;
            }

            .param {
              font-size: 14px;
              color: #8c8c8c;
              letter-spacing: 0.16px;
            }
          }
        }
      }
    }

    .content_right {
      width: 25%;
      height: 100%;

      .right_top {
        background: #282828;
        width: 100%;
        height: 150px;
        padding: 15px 30px;
        margin-bottom: 6px;

        .title—top {
          font-size: 16px;
          color: #8c8c8c;
          letter-spacing: 0.18px;
        }
      }

      .right_bottom {
        width: 100%;
        height: calc(100% - 156px);
        background: #282828;

        .ivu-card:first-child {
          height: calc(100% - 65px);

          .ivu-card-body {
            height: 100%;

            ul {
              height: calc(100% - 42px);
              overflow: auto;
            }
          }
        }
      }
    }

    .top-content {
      font-family: PingFangSC-Medium;
      font-size: 36px;
      color: #fff;
      letter-spacing: 0.41px;
    }

    .title—top {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #8c8c8c;
      letter-spacing: 0.18px;
    }

    .card-title {
      // background: #565656;
      font-family: PingFangSC-Medium;
      font-size: 12px;
      color: #bebebe;
      letter-spacing: 0.14px;
    }

    .dealer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 42px;
      padding: 10px 50px 10px 30px;
      border-bottom: 1px solid #3d3d3d;
      background: #565656;
      font-family: PingFangSC-Medium;
      font-size: 12px;
      color: #bebebe;
      letter-spacing: 0.14px;
    }

    .top_li {
      &:hover {
        background-image: linear-gradient(270deg, #282828 0%, #0062ff 98%);
      }

      &:active {
        background-image: linear-gradient(270deg, #282828 0%, #0062ff 98%);
      }

      .top_form {
        border: 1px solid #3d3d3d;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #fff;
        letter-spacing: 0.16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 42px;
        padding: 10px 50px 10px 30px;
      }
    }
  }

  .board {
    .material {
      background-image: linear-gradient(-32deg, #bb8eff 0%, #0062ff 100%);
    }

    .cardShow {
      margin: 16px 20px;
      cursor: pointer;

      &:hover {
        opacity: 0.6;
      }
    }
  }

  .title {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #8c8c8c;
    letter-spacing: 0.21px;
  }

  .title1 {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0.21px;
  }

  .count {
    font-family: PingFangSC-Regular;
    font-size: 50px;
    color: #fff;
    letter-spacing: 0.64px;
  }

  .unit {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #fff;
    letter-spacing: 0.27px;
  }

  .ivu-card {
    background-color: #282828;
    // margin-bottom: 20px;
  }

  .ivu-card-bordered {
    border: none;
  }

  .mapping {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #8c8c8c;
    letter-spacing: 0.18px;
  }

  // .echarts {
  //   width: 100%;
  //   // height: 450px;
  //   // height: calc(100% - 203px);
  //   // margin-top: -40px;
  // }
  .btn-primary {
    width: 100%;
    background: #0062ff;
    border: none;
    height: 60px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0.18px;
  }

  .checkbox {
    display: flex;
    height: 60px;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
    font-family: PingFangSC-Regular;
    color: #f3f3f3;
    letter-spacing: 0.16px;
    line-height: 18px;

    .ivu-checkbox-wrapper {
      font-size: 14px;
    }

    .ivu-checkbox-inner {
      background-color: #3d3d3d !important;
      border-radius: 2px;
    }

    .ivu-checkbox-checked .ivu-checkbox-inner {
      background-color: #3d3d3d !important;
    }

    .ivu-checkbox-checked .ivu-checkbox-inner {
      background-color: #3d3d3d !important;
    }
  }

  .ivu-checkbox-inner {
    background-color: #3d3d3d !important;
    border-radius: 2px;
  }

  .tagName {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 16px;

    .dealerIcon {
      cursor: pointer;
    }

    .param {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #8c8c8c;
      letter-spacing: 0.16px;
    }
  }

  .weight_item {
    margin: 0 16px 20px;
    position: relative;
    .weightClass {
      background: #3d3d3d;
      border-radius: 0.5px;
      width: 100%;
      display: flex;
      padding: 16px;
      height: 64px;
    }

    .weight_icon {
      position: absolute;
      top: -5px;
      left: -5px;
      z-index: 30;
    }
  }

  .list_title {
   padding:  0 75px 0 20px;
   color: #ffffff;
   font-size: 14px;
  }

  .tagList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .weightName {
      font-size: 16px;
      color: #fff;
      letter-spacing: 0.18px;
      line-height: 32px;
    }

    .weightValue {
      font-size: 16px;
      color: #009c98;
      letter-spacing: 0.18px;
      line-height: 32px;
    }
  }

  .againMapping {
    width: 100%;
    height: 60px;
    background: #0062ff;
    border: none;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0.18px;
  }

  .ivu-tabs-nav .ivu-tabs-tab-active {
    color: #fff !important;
  }
}

.correct {
  width: 100%;
  height: 60px;
  background: #0062ff;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #fff;
  letter-spacing: 0.18px;
  border: none;
}
.dealer_table {
  overflow: auto;
}

.ivu-tabs {
  height: 100%;
}

.ivu-tabs-tabpane {
  height: 100%;
}
</style>
