<template>
  <div class="home">
    <Header></Header>
    <div class="content">
      <Row :gutter="16">
        <Col span="18">
          <div height="100%">
            <Row style="margin-bottom: 20px;">
              <!-- 数量展示board -->
              <Col span="24">
                <div class="board">
                  <Card :padding="0">
                    <Row>
                      <Col class="material" span="6">
                        <Row class="cardShow">
                          <div @click="potentialMapping('all')">
                            <Col span="24">
                              <div class="title1">物料</div>
                            </Col>
                            <Col span="24">
                              <div class="count">
                                {{material}}
                                <span class="unit">台</span>
                              </div>
                            </Col>
                          </div>
                        </Row>
                      </Col>
                      <Col span="6">
                        <Row class="cardShow">
                          <div @click="potentialMapping('complete')">
                            <Col span="24">
                              <div class="title">完全匹配</div>
                            </Col>
                            <Col span="24">
                              <div class="count">
                                {{completeMapping}}
                                <span class="unit">台</span>
                              </div>
                            </Col>
                          </div>
                        </Row>
                      </Col>
                      <Col span="6">
                        <Row class="cardShow">
                          <div @click="potentialMapping('optimal')">
                            <Col span="24">
                              <div class="title">最优匹配</div>
                            </Col>
                            <Col span="24">
                              <div class="count">
                                {{optimalMapping}}
                                <span class="unit">台</span>
                              </div>
                            </Col>
                          </div>
                        </Row>
                      </Col>
                      <Col span="6">
                        <Row class="cardShow">
                          <div @click="potentialMapping('recommend')">
                            <Col span="24">
                              <div class="title">推荐匹配</div>
                            </Col>
                            <Col span="24">
                              <div class="count">
                                {{recommendMapping}}
                                <span class="unit">台</span>
                              </div>
                            </Col>
                          </div>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </div>
              </Col>
            </Row>
            <Row :gutter="16" class="chartHight">
              <!-- echart -->
              <Col span="16">
                <Card>
                  <div>
                    <div class="mapping">分配概览</div>
                    <v-chart :options="options" auto-resize />
                  </div>
                </Card>
              </Col>
              <!-- 厂商，经销商 -->
              <Col span="8">
                <Card :padding="0">
                  <div style="text-align:center">
                    <Tabs value="name1">
                      <TabPane label="经销商" name="name1">
                        <div class="tagName">
                          <div class="param">参数</div>
                          <div class="dealerIcon">
                            <img
                              style="margin-right: 10px;"
                              src="../assets/16.svg"
                              @click="edit=true"
                            />
                            <img src="../assets/12.svg" />
                          </div>
                        </div>
                        <div style="margin: 11px 16px 40px 16px;">
                          <Select
                            v-model="model1"
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
                        <div class="weight_item" v-for="(val, key, i) in weightList" :key="i">
                          <img class="weight_icon" src="../assets/weight.svg" />
                          <Card width="270px" height="60px" style="background: #3D3D3D;">
                            <div v-if="edit" class="tagList">
                              <Input
                                v-model="value"
                                placeholder="Enter something..."
                                style="width: 85px"
                              />
                              <Input
                                v-model="value"
                                placeholder="Enter something..."
                                style="width: 50px"
                              />
                            </div>
                            <div v-if="!edit" class="tagList">
                              <span class="weightName">{{key}}</span>
                              <span class="weightValue">{{val}}</span>
                            </div>
                          </Card>
                        </div>
                        <div>
                          <button v-if="edit" class="againMapping" width="100%">更新</button>
                          <button v-if="!edit" class="againMapping" width="100%">重新匹配</button>
                        </div>
                      </TabPane>
                      <TabPane label="厂商" name="name2">
                        <div>Is coming......</div>
                      </TabPane>
                    </Tabs>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
        <!-- 匹配不准确 -->
        <Col span="6">
          <Card>
            <Row class="cardShow">
              <Col span="24">
                <div class="title—top">匹配不准确</div>
              </Col>
              <Col span="24">
                <div class="top-content">TOP 10</div>
              </Col>
              <Col span="24">
                <Slider v-model="value2" range></Slider>
              </Col>
            </Row>
          </Card>
          <div style="margin: 6px 0 0;">
            <Card :padding="0">
              <div class="dealer">
                <span>经销商名称</span>
                <span>比率</span>
              </div>
              <ul>
                <li class="top_li" @click="openModel">
                  <div class="top_form">
                    <span>1. 经销商602</span>
                    <span>10%</span>
                  </div>
                </li>
                <li class="top_li">
                  <div class="top_form">
                    <span>1. 经销商602</span>
                    <span>10%</span>
                  </div>
                </li>
                <li class="top_li">
                  <div class="top_form">
                    <span>1. 经销商602</span>
                    <span>10%</span>
                  </div>
                </li>
                <li class="top_li">
                  <div class="top_form">
                    <span>1. 经销商602</span>
                    <span>10%</span>
                  </div>
                </li>
                <li class="top_li">
                  <div class="top_form">
                    <span>1. 经销商602</span>
                    <span>10%</span>
                  </div>
                </li>
                <li class="top_li">
                  <div class="top_form">
                    <span>1. 经销商602</span>
                    <span>10%</span>
                  </div>
                </li>
                <li class="top_li">
                  <div class="top_form">
                    <span>1. 经销商602</span>
                    <span>10%</span>
                  </div>
                </li>
                <li class="top_li">
                  <div class="top_form">
                    <span>1. 经销商602</span>
                    <span>10%</span>
                  </div>
                </li>
                <li class="top_li">
                  <div class="top_form">
                    <span>1. 经销商602</span>
                    <span>10%</span>
                  </div>
                </li>
                <li class="top_li">
                  <div class="top_form">
                    <span>1. 经销商602</span>
                    <span>10%</span>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
          <Card :padding="0">
            <Row>
              <Col span="12">
                <div class="checkbox">
                  <Checkbox v-model="single">机器学习</Checkbox>
                </div>
              </Col>
              <Col span="12">
                <button class="btn-primary">确认分配</button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
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
      edit: false,
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
      model1: "",
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
          subtext: "最优分配",
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
        // legend: {
        //   orient: "horizontal",
        //   bottom: "bottom",
        //   left: 0,
        //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        // },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [100, 150],
            center: ["50%", "50%"],
            data: [
              {
                value: 34,
                name: "吴际帅\n牛亚莉",
                itemStyle: {
                  color: "#20D5D2"
                },
                label: {
                  color: "rgba(255,255,255,.45)",
                  fontSize: 14,
                  formatter: "完全匹配",
                  rich: {
                    a: {
                      color: "#fff",
                      fontSize: 20,
                      lineHeight: 30
                    }
                  }
                }
              },
              {
                value: 30,
                name: "rose1",
                itemStyle: {
                  color: "transparent"
                }
              },
              {
                value: 22,
                name: "rose2",
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
                value: 34,
                name: "",
                itemStyle: {
                  color: "transparent"
                }
              },
              {
                value: 30,
                name: "rose1",
                itemStyle: {
                  color: "#0062FF"
                },
                label: {
                  color: "rgba(255,255,255,.45)",
                  fontSize: 14,
                  formatter: "最优匹配",
                  rich: {
                    a: {
                      color: "#fff",
                      fontSize: 20,
                      lineHeight: 30
                    }
                  }
                }
              },
              {
                value: 22,
                name: "rose2",
                itemStyle: {
                  color: "#8A3FFC"
                },
                label: {
                  color: "rgba(255,255,255,.78)",
                  fontSize: 14,
                  formatter: "推荐匹配",
                  rich: {
                    a: {
                      color: "#fff",
                      fontSize: 20,
                      lineHeight: 30
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      material: 4000,
      completeMapping: 3000,
      optimalMapping: 800,
      recommendMapping: 200
    };
  },
  created() {
    console.log(this.$moment().format("YYYY-MM-DD"));
  },
  computed: {
    weightList() {
      return this.$store.state.weightList;
    }
  },
  methods: {
    openModel() {
      this.dealerModal = true;
    },
    potentialMapping(type) {
      this.$store.commit("setMappingType", type);
      this.$router.push({ name: "about" });
    },
    chooseItem(dealerId) {
      api.getModels(dealerId).then(res => {
        console.log(res.data.data);
        this.$store.commit("setWeightList", res.data.data);
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.home {
  background-color: #171717;
  height: 100%;
  .content {
    padding: 30px;
    height: calc(100% - 60px);
    .top-content {
      font-family: PingFangSC-Medium;
      font-size: 36px;
      color: #ffffff;
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
        color: #ffffff;
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
    color: #ffffff;
    letter-spacing: 0.21px;
  }
  .count {
    font-family: PingFangSC-Regular;
    font-size: 50px;
    color: #ffffff;
    letter-spacing: 0.64px;
  }
  .unit {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #ffffff;
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
  .echarts {
    width: 100%;
    height: 450px;
    // height: calc(100% - 203px);
    // margin-top: -40px;
  }
  .btn-primary {
    width: 100%;
    background: #0062ff;
    border: none;
    height: 60px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #ffffff;
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
  .tagList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .weightName {
      font-size: 16px;
      color: #ffffff;
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
    background: #0062FF;
    border: none;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #ffffff;
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
  color: #ffffff;
  letter-spacing: 0.18px;
  border: none;
}
</style>