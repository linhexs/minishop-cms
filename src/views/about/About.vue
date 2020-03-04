<template>
  <div class="container">
    <div class="lin-info">
      <div class="lin-info-left">
        <div class="welcome">
          <div class="welcome-title">欢迎来到微信小程序商城CMS</div>
          <div class="subtitle">
            <div class="guide"></div>
            <div class="link">
              <a href="http://mall.linhe3306.com" target="_blank">访问另一个pc端项目</a>
            </div>
          </div>
        </div>
        <img class="welcome-bg" src="../../assets/img/about/header-bg.png" alt />
      </div>
      <div class="lin-info-right">
        <div class="team-detail">
          <div class="team-box">
            <div class="team-title">产品技术</div>
            <ul class="team-ul">
              <li>
                <span class="shadow-box">
                  <i class="team-shadow"></i>
                </span>
                <span class="team-role">用户端</span>
                <span class="team-name">微信小程序</span>
              </li>
              <li>
                <span class="shadow-box">
                  <i class="team-shadow"></i>
                </span>
                <span class="team-role">CMS</span>
                <span class="team-name">
                  <ul v-if="!showTeam">
                    <li>Vue.js</li>
                    <li>ThinkPHP</li>
                    <li>Nginx</li>
                  </ul>
                  <ul v-else>
                    <li>CMS</li>
                  </ul>
                </span>
              </li>
              <li>
                <span class="shadow-box">
                  <i class="team-shadow"></i>
                </span>
                <span class="team-role">负责人</span>
                <span class="team-name">lin</span>
              </li>
            </ul>
          </div>
          <div class="team-icon">
            <img src="/static/img/wxcode.jpg" alt />
          </div>
          <p class="team-label">扫码体验小程序</p>
        </div>
      </div>
    </div>
    <div class="information">
      <div class="personal">
        <div class="el-card__header">
          <span>最近一个月交易趋势</span>
        </div>
        <div class="el-card__body">
          <ve-line :data="chartData" :settings="chartSettings" :colors="colors"></ve-line>
        </div>
      </div>
      <div class="personal">
        <div class="el-card__header">
          <span>最近一周会员增长趋势</span>
        </div>
        <div class="el-card__body">
          <ve-histogram :data="chartMemberData" :settings="chartMemberSettings"></ve-histogram>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import about from './../../models/about'
import { nowDate, lastMonthDate, weekDate } from './../../common/date'
export default {
  data() {
    ;(this.chartSettings = {
      labelMap: {
        count: '订单量',
        total_price: '订单额',
      },
    }),
      (this.chartMemberSettings = {
        labelMap: {
          count: '会员',
          total_price: '订单额',
        },
      })
    this.colors = [
      '#c23531',
      '#2f4554',
      '#61a0a8',
      '#d48265',
      '#91c7ae',
      '#749f83',
      '#ca8622',
      '#bda29a',
      '#6e7074',
      '#546570',
      '#c4ccd3',
    ]
    return {
      activeName: 'first',
      showTeam: false,
      chartData: {
        columns: ['date', 'count', 'total_price'],
        rows: [],
      },
      chartMemberData: {
        columns: ['date', 'count'],
        rows: [],
      },
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    if (document.body.clientWidth > 1200 && document.body.clientWidth < 1330) {
      this.showTeam = true
    }
  },
  methods: {
    handleArticle(link) {
      window.open(link)
    },
    async getData() {
      const nDate = nowDate()
      const lDate = lastMonthDate()
      const wDate = weekDate()
      const lastMonthDataObj = {
        start: lDate,
        end: nDate,
        type: 'day',
      }
      const weekDataObj = {
        start: wDate,
        end: nDate,
        type: 'day',
      }
      const res = await about.getData(lastMonthDataObj)
      this.chartData.rows = res.slice(1, 32)
      const resByMember = await about.getMemberData(weekDataObj)
      this.chartMemberData.rows = resByMember
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
  .lin-info {
    display: flex;
    flex: 1;
    height: 160px;
    width: 100%;
    .lin-info-left {
      position: relative;
      width: 690px;
      height: 100%;
      background: rgba(69, 119, 255, 1);
      box-shadow: 0px 2px 14px 0px rgba(243, 243, 243, 1);
      border-radius: 8px;
      .welcome {
        margin: 28px 0 0 30px;
        .welcome-title {
          width: 500px;
          color: #fff;
          font-size: 35px;
          height: 31px;
        }
        .subtitle {
          display: flex;
          flex-direction: column;
          margin-top: 16px;
          color: #fff;
          .guide {
            margin-right: 20px;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
          }
          .link {
            margin-top: 6px;
            width: 160px;
            height: 22px;
            background: #2c5fe9;
            border-radius: 11px;
            text-align: center;
            line-height: 20px;
            color: #fff;
            font-size: 14px;
            padding: 10px 10px;
          }
        }
      }
      .welcome-bg {
        position: absolute;
        bottom: 0;
        right: 10px;
        width: 393px;
        height: 100px;
      }
    }
    .lin-info-right {
      flex: 1;
      margin-left: 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
      .team-detail {
        position: relative;
        height: 160px;
        background: rgba(255, 176, 139, 1);
        box-shadow: 0px 2px 14px 0px rgba(243, 243, 243, 1);
        border-radius: 8px;

        .team-box {
          margin: 20px 0 0 22px;

          .team-ul {
            margin-top: 15px;

            li {
              height: 20px;
              line-height: 20px;
              margin-bottom: 15px;
              font-size: 14px;

              .shadow-box {
                position: relative;
                display: inline-block;
                margin-right: 10px;
                width: 14px;
                height: 14px;
                border-radius: 14px;
                background-color: #fff;
                transform: translateY(2px);

                .team-shadow {
                  position: absolute;
                  top: 25%;
                  left: 25%;
                  display: inline-block;
                  width: 6px;
                  height: 6px;
                  border-radius: 6px;
                  background-color: #ffb9a4;
                }
              }

              .team-role {
                display: inline-block;
                width: 50px;
                margin-right: 15px;
                font-weight: 400;
                color: #45526b;
              }

              .team-name {
                font-weight: 400;
                color: #fff;

                ul {
                  display: inline;

                  li {
                    display: inline;
                    margin-right: 15px;
                  }
                }
              }
            }
          }
        }

        .team-icon {
          position: absolute;
          top: 25%;
          right: 33px;
          width: 70px;
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          box-shadow: 0 0 10px 0 #cfd5e3;
          img {
            width: 82px;
            height: 82px;
          }
        }
        .team-label {
          position: absolute;
          top: 73%;
          right: 20px;
          font-size: 13px;
          font-weight: 400;
          color: rgba(69, 82, 107, 1);
          line-height: 20px;
        }
      }
    }
  }
  .quantity-statistics {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    height: 90px;
    .quantity-item {
      display: flex;
      width: 23%;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 14px 0px rgba(243, 243, 243, 1);
      border-radius: 8px;
      .quantity-detail {
        flex: 1;
        .quantity-detail-box {
          margin: 12px 0 0 30px;
          .quantity-title {
            margin-bottom: 2px;
            height: 20px;
            line-height: 20px;
            color: #495468;
            font-size: 14px;
            font-weight: 400;
          }
          .quantity-border-line {
            width: 46px;
            height: 2px;
            background: rgba(73, 84, 104, 1);
          }
          .quantity {
            margin-top: 7px;
            height: 48px;
            font-size: 32px;
            color: rgba(73, 84, 104, 1);
            line-height: 38px;
            letter-spacing: 2px;
          }
        }
      }
      .quantity-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90px;
        height: 100%;
        background: rgba(69, 119, 255, 0.1);
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        img {
          width: 28px;
          height: 33px;
        }
      }
    }
  }
  .information {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    .personal {
      flex: 1;
      // width: 500px;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 14px 0px rgba(243, 243, 243, 1);
      border-radius: 8px;
      margin-bottom: 30px;
      .el-card__header {
        height: 50px;
        border-bottom: 1px solid #ebeef5;
      }
      .el-card__body {
        box-sizing: border-box;
        padding-top: 20px;
      }
    }
  }
  .article {
    flex: 1;
    height: 100%;
    padding: 20px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 14px 0px rgba(243, 243, 243, 1);
    border-radius: 8px;
  }
}
@media screen and (max-width: 1200px) {
  .container .lin-info .lin-info-right {
    display: none;
  }
  .container .lin-info .lin-info-left {
    width: 100%;
  }
  .container .information .quantity-statistics .quantity-item {
    width: 32%;
    &:last-child {
      display: none;
    }
  }
  // .container .information .personal {
  //   display: none;
  // }
}

@media screen and (max-width: 1200px) {
  .container .lin-info .lin-info-left {
    width: 100%;
  }
}
</style>
