var map = new BMap.Map("allmap");    // 创建Map实例
    var Level_Icon = [
        new BMap.Icon("img/gis/0.png", new BMap.Size(32, 32)),
        new BMap.Icon("img/gis/1.png", new BMap.Size(32, 32)),
        new BMap.Icon("img/gis/2.png", new BMap.Size(32, 32)),
        new BMap.Icon("img/gis/3.png", new BMap.Size(32, 32)),
        new BMap.Icon("img/gis/4.png", new BMap.Size(32, 32)),
        new BMap.Icon("img/gis/5.png", new BMap.Size(32, 32)),
        new BMap.Icon("img/gis/6.png", new BMap.Size(32, 32))
    ];
    $(function ($) {
        //  百度地图API功能
		//113.662497,34.763231 郑州
		var x=34.76323,y = 113.66249;
        map.centerAndZoom(new BMap.Point(y, x), 11);  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        //   map.setCurrentCity("河南");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        var aj = $.ajax({
            url: 'Equipment_info2/getEquipmentinfo2.htm',// 跳转到 action
            data: {},
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (data) {
                if (data.msg == "true") {
                 	var dataList = {value: []};
                 	var na,nb;
                    for (var i = 0; i < data.list.length; i++) {
                        var obj = data.list[i];
                        if(obj.nLatitudeBd==null||obj.nLongitudeBd==null) {
                            continue;
                        }
                        na=obj.nLatitudeBd;
                        nb=obj.nLongitudeBd;
                        addMarker(obj, i);
                        dataList.value.push({
                            iEquipmentId:obj.iEquipmentId,
                            vEquipmentName: obj.vEquipmentName
                        });
                     }
                    //移动地图位置
                    if(dataList.value.length<20){
                    	map.panTo(new BMap.Point(nb,na))
                    }else{
                    	map.centerAndZoom(new BMap.Point(y, x), 5);
                    }

                    $("#equipment_id").bsSuggest({
                        idField: "iEquipmentId",
                        keyField: "vEquipmentName",
                        searchFields: [ "vEquipmentName"],  //有效搜索字段
                        effectiveFields: ["iEquipmentId","vEquipmentName"],
                        effectiveFieldsAlias:{iEquipmentId:"设备ID",vEquipmentName: "设备名称"}, //有效字段的别名对象，用于 header 的显示
                        clearable: true,
                        data: dataList
                    }).on('onDataRequestSuccess', function (e, result) {
                        console.log('从 json.data 参数中获取，不会触发 onDataRequestSuccess 事件', result);
                    }).on('onSetSelectValue', function (e, keyword, data) {
                        console.log('onSetSelectValue: ', keyword, data);
                    }).on('onUnsetSelectValue', function () {
                        console.log("onUnsetSelectValue");
                    });

                } else {
                    alert("读取失败");
                }
            }, error: function () {
                alert("异常！");
            }
        });
    });

   //    // 编写自定义函数,创建标注
   function addMarker(obj,i){
	   if(obj.nLatitudeBd==null||obj.nLongitudeBd==null){
	       return;
	   }
       var point = new BMap.Point(obj.nLongitudeBd,obj.nLatitudeBd);
       var marker =null;
       if (obj.p002 == 0) {
           marker = new BMap.Marker(point, { icon: Level_Icon[0] });
       } else {
           marker = new BMap.Marker(point, { icon: Level_Icon[getAirLevel_PM25(obj.p002).index] });
       }
       marker.enableDragging() ;// 开启拖拽功能
       marker.setTitle(obj.vEquipmentName);//添加标题
       var label = new BMap.Label("",//"设备号:"+obj.vEquipmentName
       				{offset:new BMap.Size(-14,-5)});
        label.setStyle({
            border:"none"
       	});
       marker.setLabel(label);
       marker.objdate=obj;

       marker.addEventListener('mouseover', function (e) {// 鼠标移动上图标标识上// 变颜色
           var p = e.target;
           p.setTop(true) ;
       });
       marker.addEventListener('mouseout', function (e) {// 鼠标移动上图标标识上// 变颜色
           var p = e.target;
           p.setTop(false) ;
       });
       marker.addEventListener('click', function (e) {// 图标单击
           var p = e.target;
           var markers = map.getOverlays();
            for (var i = 0; i < markers.length; i++) {
               if (markers[i].toString() == "[object Marker]") {
                   markers[i].setAnimation(null);
               }
           }
           p.setAnimation(BMAP_ANIMATION_BOUNCE);
           var geoc = new BMap.Geocoder();//地址转中文
           geoc.getLocation(e.point, function(rs){
               var addComp = rs.addressComponents;
               var addvar=addComp.province + "" + addComp.city + "" + addComp.district + "" + addComp.street + "" + addComp.streetNumber;
               setInfoData(p.objdate,addvar);
               openVidioWin(p.objdate,addvar);
            });
       });
       map.addOverlay(marker);

   }
    function getAirLevel_PM25(airIndex) {
        if (0 <= airIndex && airIndex <= 35) {
            return { index: 1, level: "Ⅰ", color: "rgb(0,228,0)", desc: "优" };
        }
        else if (36 <= airIndex && airIndex <= 75) {
            return { index: 2, level: "Ⅱ", color: "rgb(255,255,0)", desc: "良" };
        }
        else if (76 <= airIndex && airIndex <= 115) {
            return { index: 3, level: "Ⅲ", color: "rgb(255,126,0)", desc: "轻度污染" };
        }
        else if (116 <= airIndex && airIndex <= 150) {
            return { index: 4, level: "Ⅳ", color: "rgb(255,0,0)", desc: "中度污染" };
        }
        else if (151 <= airIndex && airIndex <= 250) {
            return { index: 5, level: "Ⅴ", color: "rgb(153,0,76)", desc: "重度污染" };
        }
        else {
            return { index: 6, level: "Ⅵ", color: "rgb(126,0,35)", desc: "严重污染" };
        }
    }
    function getAirLevel_PM25(airIndex) {
        if (0 <= airIndex && airIndex <= 50) {
            return { index: 1, level: "Ⅰ", color: "rgb(0,228,0)", desc: "优" };
        }
        else if (51 <= airIndex && airIndex <= 100) {
            return { index: 2, level: "Ⅱ", color: "rgb(255,255,0)", desc: "良" };
        }
        else if (101 <= airIndex && airIndex <= 150) {
            return { index: 3, level: "Ⅲ", color: "rgb(255,126,0)", desc: "轻度污染" };
        }
        else if (151 <= airIndex && airIndex <= 200) {
            return { index: 4, level: "Ⅳ", color: "rgb(255,0,0)", desc: "中度污染" };
        }
        else if (201 <= airIndex && airIndex <= 300) {
            return { index: 5, level: "Ⅴ", color: "rgb(153,0,76)", desc: "重度污染" };
        }
        else {
            return { index: 6, level: "Ⅵ", color: "rgb(126,0,35)", desc: "严重污染" };
        }
    }
    
    //打开数据详情窗口
    function setInfoData(obj,addvar) {
            $("div.data-container").show();
            $(".item-row-txt-name").text(addvar);
            $(".item-row-txt-primary").text("污染物级别监控指标：PM2.5");
            if(!obj.dtmCreate){
            	$(".item-row-txt-time").text("已离线");
            }else{
            	$(".item-row-txt-time").text("发布时间："+obj.dtmCreate);
            }
            $("#itemp001").text(obj.p001);
            $("#itemp002").text(obj.p002);
            $("#itemp003").text(obj.p003);
            $("#itemp004").text(obj.p004);
            $("#itemp005").text(obj.p005name);
            $("#itemp006").text(obj.p006);
            $("#itemp007").text(obj.p007);
            $("#itemp008").text(obj.p008);
            $("#itemp009").text(obj.p009);

            $("div.warpper > div.data-container > div.top-lay > div.item-row-aqi > div.item-row-txt-aqi").css("border-color", getAirLevel_PM25(obj.p002).color);
            $("div.warpper > div.data-container").css("border-color", getAirLevel_PM25(obj.p002).color);
            $("div.warpper > div.data-container > div.close-icon").css("color", getAirLevel_PM25(obj.p002).color);
    }
    //打开视频窗口
    function openVidioWin(obj,addvar) {
            $("div.data-container2").show();

            $("div.warpper > div.data-container2 > div.top-lay > div.item-row-aqi > div.item-row-txt-aqi").css("border-color", getAirLevel_PM25(obj.p002).color);
            $("div.warpper > div.data-container2").css("border-color", getAirLevel_PM25(obj.p002).color);
            $("div.warpper > div.data-container2 > div.close-icon").css("color", getAirLevel_PM25(obj.p002).color);
    }

function  locationMap(){
    var eid=$("#equipment_id").val();

    var markers = map.getOverlays();
    var ifbo=false;
    for (var i = 0; i < markers.length; i++) {
         if (markers[i].toString() == "[object Marker]") {
            markers[i].setAnimation(null);
           if(eid==markers[i].getTitle()){
               map.panTo(markers[i].getPosition());
               markers[i].setAnimation(BMAP_ANIMATION_BOUNCE);
               ifbo=true;
           }
        }
    }
    if(!ifbo){
        alert("没有找到这个设备!");
    }
}