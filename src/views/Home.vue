<template>
  <div class="home">
    <Header></Header>
    <div class="content">
      <div class="content_left">
        <div class="left_top">
          <div class="board material" @click="potentialMapping('all')">
            <div class="board_content">
              <div class="title sp_title">物料</div>
              <div class="count sp_count">
                {{material}}
                <span class="unit">台</span>
              </div>
            </div>
          </div>
          <div class="board" @click="potentialMapping('1')">
            <div class="board_content">
              <div class="title">完全匹配</div>
              <div class="count">
                {{completeMapping}}
                <span class="unit">台</span>
              </div>
            </div>
          </div>
          <div class="board" @click="potentialMapping('2')">
            <div class="board_content">
              <div class="title">最优匹配</div>
              <div class="count">
                {{optimalMapping}}
                <span class="unit">台</span>
              </div>
            </div>
          </div>
          <div class="board" @click="potentialMapping('3')">
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
            <Tabs value="name2">
              <TabPane label="厂商" name="name2">
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
                    <span style="width:50px">权重</span>
                    <!-- <span>权值</span> -->
                  </div>
                  <div class="weight_item" v-for="(val, key, i) in modelsOemList" :key="i">
                    <img
                      v-if="val.weight >= 8 && val.weight <= 10"
                      class="weight_icon"
                      src="../assets/weight.svg"
                    />
                    <Card width="270px" height="60px" style="background: #3D3D3D;">
                      <div v-if="editOemFlag" class="tagList">
                        <span class="weightName" style="width: 100px">{{key}}</span>
                        <i-input v-model="val.weight" style="width: 50px"></i-input>
                        <!-- <i-input v-model="val.value" style="width: 50px"></i-input> -->
                      </div>
                      <div v-if="!editOemFlag" class="tagList">
                        <span class="weightName" style="width: 100px">{{key}}</span>
                        <span class="weightName" style="width: 50px">{{val.weight}}</span>
                        <!-- <span class="weightValue" style="width: 50px">{{val.value}}</span> -->
                      </div>
                    </Card>
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
              <TabPane label="经销商" name="name1">
                <div class="scroll">
                  <div class="tagName">
                    <div class="param">参数</div>
                    <div class="dealerIcon">
                      <img style="margin-right: 10px;" src="../assets/16.svg" @click="editParam" />
                      <img src="../assets/12.svg" @click="increaseDom" />
                    </div>
                  </div>
                  <div style="margin: 11px 16px 40px 16px;">
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
                    <span>权重</span>
                    <span>权值</span>
                  </div>
                  <div class="weight_item" v-for="(val, key, i) in weightList" :key="i">
                    <img
                      v-if="val.weight >= 8 && val.weight <= 10"
                      class="weight_icon"
                      src="../assets/weight.svg"
                    />
                    <Card width="270px" height="60px" style="background: #3D3D3D;">
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
                    </Card>
                  </div>
                  <div class="weight_item" v-if="add">
                    <Card width="270px" height="60px" style="background: #3D3D3D;">
                      <div class="tagList">
                        <i-input v-model="name" style="width: 100px"></i-input>
                        <i-input v-model="weight" style="width: 50px"></i-input>
                        <i-input v-model="value" style="width: 50px"></i-input>
                      </div>
                    </Card>
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
              <li class="top_li" @click="openModel" v-for="(item, i) in dealerReportList" :key="i">
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
    <Modal v-model="dealerModal" title="经销商名称" :footer-hide="true" width="560px">
      <Table :columns="columns1" :data="data1"></Table>
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
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ],
      value: "",
      dealerList: [
        { value: "D0001", label: "D09L 武汉江宝南湖" },
        { value: "D0002", label: "D17U 西安中宝" },
        { value: "D0003", label: "D18G 安阳安德宝" },
        { value: "D0004", label: "D26D 德州申宝" },
        { value: "D0005", label: "D29N 沈阳宝晋" },
        { value: "D0006", label: "D40H 朝阳 汇华宝" },
        { value: "D0007", label: "D43D 福清德宝" },
        { value: "D0008", label: "D44 济南大友宝" },
        { value: "D0009", label: "D45H 昆明宝瀚" },
        { value: "D0010", label: "D46F 岳阳美宝行" },
        { value: "D0011", label: "D46M 浏阳美宝行" },
        { value: "D0012", label: "D47C 眉山长宝" },
        { value: "D0013", label: "D61B 滨州宝通" },
        { value: "D0014", label: "D65A 北京卡森" },
        { value: "D0015", label: "D66G 重庆新宝" },
        { value: "D0016", label: "D66K 岳阳岳宝" },
        { value: "D0017", label: "D82A 焦作东宝行" },
        { value: "D0018", label: "D96A 张家港龙之宝" },
        { value: "D0019", label: "DA7D 滁州宝晋" },
        { value: "D0020", label: "DB4A 包头宝霆" }
      ],
      single: false,
      options: {
        title: {
          show: true,
          text: "100" + "%",
          subtext: "推荐分配",
          textStyle: {
            color: "#ffffff",
            fontSize: 45,
            fontWeight: "normal",
            fontFamily: "华文细黑"
          },
          x: "center",
          y: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "经销商: {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          bottom: "bottom",
          left: 0,
          data: ["推荐匹配", "最优匹配", "完全匹配"]
        },
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
                  color: "transparent"
                }
              },
              {
                value: "",
                name: "完全匹配",
                itemStyle: {
                  color: "transparent"
                }
              }
            ]
          },
          {
            name: "面积模式",
            type: "pie",
            radius: [100, 130],
            center: ["50%", "50%"],
            data: [
              {
                value: "",
                name: "推荐匹配",
                itemStyle: {
                  color: "transparent"
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
          }
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
      this.$store.commit("setModelsOemList", res.data.data);
      this.spinShow = false;
    });
  },
  computed: {
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
      options.series[0].data[1].value = this.$store.state.completeMapping;
      options.series[0].data[2].value = this.$store.state.optimalMapping;
      options.series[1].data[0].value = this.$store.state.recommendMapping;
      options.series[1].data[1].value = this.$store.state.completeMapping;
      options.series[1].data[2].value = this.$store.state.optimalMapping;
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
    openModel() {
      this.dealerModal = true;
    },
    potentialMapping(type) {
      this.$store.commit("setMappingType", type);
      api.getSankey(type).then(res => {
        this.$store.commit("setSankeyData", res.data.data.data);
        this.$store.commit("setSankeyLinks", res.data.data.links);
        console.log(res.data.data);
      });
      this.$router.push({ name: "about" });
    },
    chooseItem(dealerId) {
      this.$store.commit("setDealerId", dealerId);
      api.getModels(dealerId).then(res => {
        console.log(res.data.data);
        this.edit = false;
        this.$store.commit("setWeightList", res.data.data);
      });
    },
    increaseDom() {
      this.add = true;
      this.edit = false;
      console.log(this.add);
    },
    update() {
      this.spinShow = true;
      console.log(this.weightList);
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
      this.spinShow = true;
      api.putModelsOem(this.modelsOemList).then(res => {
        console.log(res.data);
        this.editOemFlag = false;
        this.spinShow = false;
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
          cursor: pointer;

          &:hover {
            opacity: 0.6;
          }

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

    .weight_icon {
      position: absolute;
      top: -5px;
      left: -5px;
      z-index: 30;
    }
  }

  .list_title {
    padding: 0 20px;
  }

  .tagList {
    display: flex;
    justify-content: space-between;
    align-items: center;

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

.ivu-tabs {
  height: 100%;
}

.ivu-tabs-tabpane {
  height: 100%;
}
</style>
