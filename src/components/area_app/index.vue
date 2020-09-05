<template>
  <div class="area_app_style">
    <div style="margin-bottom:30px">
      <el-button v-if="!isStore" type="primary" @click="addDelivery">新增配送范围</el-button>

      <el-form
        ref="formArea"
        :model="objParams"
        label-width="80px"
        style="margin-top:10px"
        :inline="true"
      >
        <div v-for="(item,index) in objParams.paramsFormList" :key="index">
          <el-form-item label="标记颜色">
            <div
              class="marking-color"
              :style="`backgroundColor: rgba(${item.Color[0]}, ${item.Color[1]}, ${item.Color[2]}, 0.5)`"
            ></div>
          </el-form-item>
          <el-form-item label="范围名称" :prop="'paramsFormList.'+index+'.name'" :rules="rules.Name">
            <el-input v-model="item.name"></el-input>
            <i class="el-icon-delete delete-icon-style" @click="delIcon(index)"></i>
          </el-form-item>
        </div>
      </el-form>
      <div style="margin:10px" v-if="!isStore">移动红点选择画图中心点(蓝点为门店位置):</div>
      <div class="lineBack"></div>
    </div>
    <div id="container" style="width:1000px;height:600px"></div>

    <div style="text-align:center;margin-top:20px" v-if="!isStore">
      <el-button
        style="margin:20px"
        type="primary"
        @click="CheckTicketFun"
        :loading="loadingBtn"
      >提 交</el-button>
    </div>
  </div>
</template>


<script>
import { TMap } from "./TMap";
import { getLists } from "@/api/vipCard";

export default {
  name: "",
  props: {
    rangeList: Array,
    // 是否是门店点击进来的
    isStore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      map: "",
      marker: "",
      locationC: {
        latitude: 39.916527,
        longitude: 116.397128
      },
      polygonList: [],
      color: [],
      path: [],
      form: {
        latitude: "", //纬度
        longitude: ""
      },
      paramsForm: {},
      objParams: {
        paramsFormList: []
      },
      rules: {
        Name: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      loadingBtn: false,
      storeList: []
    };
  },
  // created() {
  // $(function() {
  //   try {
  //     init();
  //   } catch (e) {
  //     alert("浏览器加载地图失败，请刷新页面重试");
  //   }
  // });
  // },
  components: {},
  async created() {
    if (!this.isStore) {
      await this.getStoreList();
    }
    await TMap().then(qq => {
      let myLatlng = new qq.maps.LatLng(39.982163, 116.30607);
      let myOptions = {
        draggable: true,
        scrollwheel: true,
        zoom: 13, //设置地图缩放级别
        center: myLatlng, //设置中心点样式
        mapTypeId: qq.maps.MapTypeId.ROADMAP //设置地图样式详情参见MapType
      };
      var map = new qq.maps.Map(
        document.getElementById("container"),
        myOptions
      );
      this.map = map;
      let _this = this;
      var anchor = new qq.maps.Point(22, 44),  
        size = new qq.maps.Size(44, 44),
        origin = new qq.maps.Point(0, 0),
        icon = new qq.maps.MarkerImage(
          "static/img/activeIcon.png",
          size,
          origin,
          anchor
        );
      this.Marker = qq.maps.Marker;
      var marker = new this.Marker({
        position: myLatlng,
        map: _this.map
      });
      this.marker = marker;
      marker.setIcon(icon);
      marker.setDraggable(true);
      this.Event = qq.maps.event;

      this.Event.addListener(marker, "dragend", function(event) {
        //可移动的中心点坐标
        let newLocation = {
          latitude: event.latLng.getLat(),
          longitude: event.latLng.getLng()
        };
        _this.locationC = {
          latitude: event.latLng.getLat(),
          longitude: event.latLng.getLng()
        };
        _this.$emit("dragendArea", newLocation);
      });

      //设置聚合点
      this.markers = new qq.maps.MVCArray();
      this.MarkerCluster = qq.maps.MarkerCluster;
      this.LatLng = qq.maps.LatLng;
      this.MarkerDecoration = qq.maps.MarkerDecoration;
      this.Point = qq.maps.Point;
      createCluster(this);

      if (navigator.geolocation) {
        //获取当前浏览器定位
        var options = {
          enableHighAccuracy: false,
          timeout: 10,
          maximumAge: 1000 * 60 * 60 * 24
        };
        navigator.geolocation.getCurrentPosition(
          position => {
            this.showPosition(position);
          },
          error => {
            this.showPositionError(error);
          },
          options
        );
      } else {
        alert("浏览器不支持定位");
      }
      if (this.rangeList && this.rangeList.length > 0) {
        this.getAreaInfo();
      }
    });
  },
  methods: {
    //获取地理位置
    showPosition(position) {
      console.log(position, "获取到浏览器位置");
      this.locationC = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      let _this = this;
      //调用地图命名空间中的转换接口   type的可选值为 1:GPS经纬度，2:搜狗经纬度，3:百度经纬度，4:mapbar经纬度，5:google经纬度，6:搜狗墨卡托
      qq.maps.convertor.translate(
        new qq.maps.LatLng(latitude, longitude),
        1,
        function(res) {
          //取出经纬度并且赋值
          let latlng = res[0];
          _this.map.setCenter(latlng);
          _this.marker.setPosition(latlng);
        }
      );
    },
    //定位失败
    showPositionError(error) {
      console.log(error, "error");
      let _this = this;
      //获取城市列表接口设置中心点
      let citylocation = new qq.maps.CityService({
        complete: function(result) {
          _this.locationC = {
            latitude: result.detail.latLng.lat,
            longitude: result.detail.latLng.lng
          };
          _this.map.setCenter(result.detail.latLng);
          _this.marker.setPosition(result.detail.latLng);
        }
      });
      //调用searchLocalCity();方法    根据用户IP查询城市信息。
      citylocation.searchLocalCity();
    },
    //添加多边形地图
    AddPolygon(color, nameNew, pathNew) {
      let _this = this;
      _this.color = color ? color : _this.color;

      var polygon = new qq.maps.Polygon({
        //多边形是否可点击。
        clickable: true,

        //鼠标在多边形内的光标样式。
        cursor: "crosshair",

        //多边形是否可编辑。
        editable: true,

        //多边形的填充色，可通过Color对象的alpha属性设置透明度。
        fillColor: new qq.maps.Color(
          _this.color[0],
          _this.color[1],
          _this.color[2],
          0.5
        ),

        //要显示多边形的地图。
        map: _this.map,

        //多边形的路径，以经纬度坐标数组构成。
        path: pathNew ? pathNew : _this.path,

        //多边形的线条颜色，可通过Color对象的alpha属性设置透明度。
        strokeColor: new qq.maps.Color(
          _this.color[0],
          _this.color[1],
          _this.color[2]
        ),

        //多边形的边框样式。实线是solid，虚线是dash。
        strokeDashStyle: "solid",

        //多边形的边框线宽。
        strokeWeight: 4,

        //多边形是否可见。
        visible: true,

        //多边形的zIndex值。
        zIndex: 1000
      });
      this.map.setCenter(
        new qq.maps.LatLng(_this.locationC.latitude, _this.locationC.longitude)
      );

      this.polygonList.push(polygon);
      this.objParams.paramsFormList.push({
        name: nameNew ? nameNew : "",
        Color: this.color
      });
    },
    async addDelivery() {
      if (this.form.latitude && this.form.longitude) {
        let longitude = Number(this.form.longitude);
        let latitude = Number(this.form.latitude);
        if (longitude < -180 || longitude > 180) {
          this.$message("经度输入有误，经度范围：-180~180");
          return;
        }
        if (latitude < -90 || latitude > 90) {
          this.$message("纬度输入有误，纬度范围：-90~90");
          return;
        }
        Object.assign(this.locationC, this.form);
      }
      if (!this.locationC.latitude || !this.locationC.longitude) {
        this.$message("获取定位失败，请填写经纬度");
        return;
      }

      let { color, path } = await setPath(this);
      this.color = color;
      this.path = path;

      await this.AddPolygon();
    },
    CheckTicketFun() {
      // console.log(this.polygonList, "this.polygonList");
      if (this.objParams.paramsFormList.length > 0) {
        this.polygonList.forEach((D, index) => {
          let distributionRange = "";
          D.getPath().elems.forEach((data, i) => {
            if (i > 0) distributionRange += ";";
            distributionRange += data.lng + "," + data.lat;
          });
          this.objParams.paramsFormList[index].coordinate = distributionRange;
        });
      }

      this.$refs["formArea"].validate(valid => {
        if (valid) {
          let obj = JSON.parse(JSON.stringify(this.objParams.paramsFormList));
          obj.forEach(D => {
            delete D.Color;
          });
          console.log(obj, "paramsFormList");
          // return;
          this.$emit("CheckTicketFun", obj);
        } else {
          this.$message("请输入范围名称");
          return false;
        }
      });
    },
    delIcon(index) {
      this.polygonList[index].setMap(null);
      this.polygonList.splice(index, 1);
      this.objParams.paramsFormList.splice(index, 1);
    },
    async getAreaInfo() {
      // 获取详情

      this.rangeList.forEach(async (D, index) => {
        let pathList = [];

        var distributionRangeData = D.coordinate.split(";");
        distributionRangeData.forEach(data => {
          let list = data.split(",");
          pathList.push(
            new qq.maps.LatLng(parseFloat(list[1]), parseFloat(list[0]))
          );
        });
        let { color, path } = setPath(this, true);
        // console.log(color,'color')

        setTimeout(() => {
          this.AddPolygon(color, D.name, pathList);
        }, 1000);
      });
    },
    async getStoreList() {
      try {
        let { Data } = await getLists({ Action: "GetShopList" }, "MShopOpera");
        this.storeList = Data.ShopInfoList;
      } catch (e) {
        this.$message.error(e);
      }
    }
  }
};
function setPath(_this, bool) {
  let color = [];
  color.push(Math.floor(Math.random() * 256));
  color.push(Math.floor(Math.random() * 256));
  color.push(Math.floor(Math.random() * 256));

  if (bool) {
    return { color };
  }
  let path = [
    new qq.maps.LatLng(
      parseFloat(_this.locationC.latitude) + 0.01,
      parseFloat(_this.locationC.longitude) - 0.015
    ),
    new qq.maps.LatLng(
      parseFloat(_this.locationC.latitude) + 0.01,
      parseFloat(_this.locationC.longitude) + 0.015
    ),
    new qq.maps.LatLng(
      parseFloat(_this.locationC.latitude) - 0.01,
      parseFloat(_this.locationC.longitude) + 0.015
    ),
    new qq.maps.LatLng(
      parseFloat(_this.locationC.latitude) - 0.01,
      parseFloat(_this.locationC.longitude) - 0.015
    )
  ];
  return { color, path };
}

function RetainNum(val) {
  if (!val) {
    return val;
  }
  val = Number(val);
  return val.toFixed(6);
}

function createCluster(_this) {
  var info = new qq.maps.InfoWindow({
    map: _this.map
  });
  for (let i = 0; i < _this.storeList.length; i++) {
    var latLng;

    latLng = new _this.LatLng(_this.storeList[i].Latitude, _this.storeList[i].Longitude);
    var decoration = new _this.MarkerDecoration(i, new _this.Point(0, -5));
    var marker = new _this.Marker({
      position: latLng,
      map: _this.map
    });

    // _this.Event.addListener(marker, "click", function(e) {
    //   info.open();
    //   info.setContent(
    //     '<div style="text-align:center;white-space:nowrap;' +
    //       'margin:10px;">单击标记</div>'
    //   );
    //   info.setPosition(new qq.maps.LatLng(e.latLng.lat, e.latLng.lng));
    // });

    let label = new qq.maps.Label({
      position: latLng,
      map: _this.map,
      content: _this.storeList[i].Name+'('+_this.storeList[i].Address+')'
    });
    _this.Event.addListener(marker, "map_changed", function(e) {
      if (e.target.isClustered) {
        label.setVisible(false);
      } else {
        label.setVisible(true);
      }
    });
    _this.markers.push(marker);
  }

  _this.markerClusterer = new _this.MarkerCluster({
    map: _this.map,
    minimumClusterSize: 2, //默认2
    markers: _this.markers,
    zoomOnClick: true, //默认为true
    gridSize: 30, //默认60
    averageCenter: true, //默认false
    maxZoom: 18 //默认18,
  });

  // _this.Event.addListener(_this.markerClusterer, "clustermouseover", function(
  //   evt
  // ) {
  // writeLog("mouse event", eventType);
  //   var ss = evt;
  //   alert("点击了聚合点");
  // });
}
</script>


<style lang="less" scoped>
.area_app_style {
  // .el-form-item {
  //   margin-bottom: 11px;
  // }
  .el-input {
    width: 280px;
  }
  .marking-color {
    width: 30px;
    height: 30px;
    border: 1px solid #6e6e6e;
  }
  .delete-icon-style {
    margin-left: 60px;
    font-size: 16px;
  }
}
</style>