<template>
  <div class="home">
    <Header></Header>
    <div class="content">
      <Row :gutter="16">
        <Col span="18">
          <Row style="margin-bottom: 20px;">
            <Col span="24">
              <div class="board">
                <Card :padding="0">
                  <Row>
                    <Col class="material" span="6">
                      <Row class="cardShow">
                        <Col span="24">
                          <div class="title1">物料</div>
                        </Col>
                        <Col span="24">
                          <div class="count">
                            {{material}}
                            <span class="unit">台</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col span="6">
                      <Row class="cardShow">
                        <Col span="24">
                          <div class="title">完全匹配</div>
                        </Col>
                        <Col span="24">
                          <div class="count">
                            {{completeMapping}}
                            <span class="unit">台</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col span="6">
                      <Row class="cardShow">
                        <Col span="24">
                          <div class="title">最优匹配</div>
                        </Col>
                        <Col span="24">
                          <div class="count">
                            {{optimalMapping}}
                            <span class="unit">台</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col span="6">
                      <Row class="cardShow">
                        <Col span="24">
                          <div class="title">推荐匹配</div>
                        </Col>
                        <Col span="24">
                          <div class="count">
                            {{recommendMapping}}
                            <span class="unit">台</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="16">
              <Card>
                <div>
                  <div class="mapping">分配概览</div>
                  <v-chart :options="options" auto-resize />
                </div>
              </Card>
            </Col>
            <Col span="8">
              <Card>
                <div style="text-align:center">
                  <!-- <img src="../../images/logo.png" /> -->
                  <h3>A high quality UI Toolkit based on Vue.js</h3>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span="6">
          <Card>
            <Row class="cardShow">
              <Col span="24">
                <div class="title—top">匹配不准确</div>
              </Col>
              <Col span="24">
                <div class="top-content">TOP 10</div>
              </Col>
            </Row>
          </Card>
          <div style="margin: 6px 0;">
            <Card :padding="0">
              <div class="dealer">
                <span>经销商名称</span>
                <span>比率</span>
              </div>
              <CellGroup>
                <Cell title="1. 经销商602" extra="10%" />
                <Cell title="1. 经销商602" extra="10%" />
                <Cell title="1. 经销商602" extra="10%" />
                <Cell title="1. 经销商602" extra="10%" />
                <Cell title="1. 经销商602" extra="10%" />
                <Cell title="1. 经销商602" extra="10%" />
                <Cell title="1. 经销商602" extra="10%" />
                <Cell title="1. 经销商602" extra="10%" />
                <Cell title="1. 经销商602" extra="10%" />
                <Cell title="1. 经销商602" extra="10%" />
              </CellGroup>
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
  </div>
</template>

<script>
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
        single: false,
        title: {
          show: true,
          text: "100" + "%",
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
    api.getData().then(res => {
      console.log(res.data);
    });
  }
};
</script>
<style lang="scss" scoped>
.home {
  background-color: #171717;
  .content {
    padding: 30px;
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
    .ivu-cell-title {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 0.16px;
    }
    .ivu-cell {
      border-bottom: 1px solid #3d3d3d;
    }
    .dealer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 42px;
      padding: 7px 16px;
      border-bottom: 1px solid #3d3d3d;
      background: #565656;
      font-family: PingFangSC-Medium;
      font-size: 12px;
      color: #bebebe;
      letter-spacing: 0.14px;
    }
  }
  .board {
    .material {
      background-image: linear-gradient(-32deg, #bb8eff 0%, #0062ff 100%);
    }
    .cardShow {
      margin: 16px 20px;
    }
  }
  .title {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #8c8c8c;
    letter-spacing: 0.21px;
  }
  .title1 {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #ffffff;
    letter-spacing: 0.21px;
  }
  .count {
    font-family: PingFangSC-Regular;
    font-size: 56px;
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
  // .ivu-checkbox-inner {
  //   background-color: #3d3d3d !important;
  //   border-radius: 2px;
  // }
}
</style>