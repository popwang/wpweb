var Level_Icon = [ new BMap.Icon("img/gis/0.png", new BMap.Size(32, 32)),
		new BMap.Icon("img/gis/1.png", new BMap.Size(32, 32)),
		new BMap.Icon("img/gis/2.png", new BMap.Size(32, 32)),
		new BMap.Icon("img/gis/3.png", new BMap.Size(32, 32)),
		new BMap.Icon("img/gis/4.png", new BMap.Size(32, 32)),
		new BMap.Icon("img/gis/5.png", new BMap.Size(32, 32)),
		new BMap.Icon("img/gis/6.png", new BMap.Size(32, 32)) ];

//创建地图函数：  
function createMap() {
	var map = new BMap.Map("allmap");//在百度地图容器中创建一个地图  
	var point = new BMap.Point(113.616114, 34.753488);//定义一个中心点坐标  
	map.centerAndZoom(point, 15);//设定地图的中心点和坐标并将地图显示在地图容器中  
	window.map = map;//将map变量存储在全局  
}

//地图事件设置函数：  
function setMapEvent() {
	map.enableDragging();//启用地图拖拽事件，默认启用(可不写)  
	map.enableScrollWheelZoom();//启用地图滚轮放大缩小  
	map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)  
	map.enableKeyboard();//启用键盘上下左右键移动地图  
}

//地图控件添加函数：  
function addMapControl() {
	//向地图中添加缩放控件  
	var ctrl_nav = new BMap.NavigationControl({
		anchor : BMAP_ANCHOR_TOP_LEFT,
		type : BMAP_NAVIGATION_CONTROL_LARGE
	});
	map.addControl(ctrl_nav);
	//向地图中添加比例尺控件  
	var ctrl_sca = new BMap.ScaleControl({
		anchor : BMAP_ANCHOR_BOTTOM_LEFT
	});
	map.addControl(ctrl_sca);
}

var POINT_CSS = {
	weight : 2,
	color : "blue",
	opacity : 0.6
};
//标注线数组  
//var plPoints = [ {
//	weight : 2,
//	color : "blue",
//	opacity : 0.6,
//	points : [ "113.610005|34.762504", "113.609933|34.761673",
//			"113.60979|34.759479", "113.609861|34.757225",
//			"113.609933|34.75414", "113.610005|34.753429",
//			"113.613383|34.755327", "113.616114|34.753488" ]
//} ];

//在拐角处添加标注
function addArrow(line) { //绘制标注的函数  
	var linePoint = line.getPath();//线的坐标串  
	var arrowCount = linePoint.length;
	var timeArray = line.times;
	var myIcon = new BMap.Icon("img/gis/stop_icon.png", new BMap.Size(11, 11));//圆点
	for (var i = 0; i < arrowCount; i++) { //在拐点处添加标注  
		var marker = new BMap.Marker(linePoint[i], {
			icon : myIcon
		}); // 创建标注  
		marker.setTitle(timeArray[i]);
		if (i == arrowCount - 1) {//最后一个点加上当前位置的标签
			var label = new BMap.Label("当前位置", {
				offset : new BMap.Size(20, -10)
			});
			label.setStyle({
						color : "blue",
						fontSize : "10px",
						height : "15px",
						lineHeight : "15px",
						backgroundColor : "rgba(255, 255, 255, 0.8) none repeat scroll 0 0 !important",//设置背景色透明  
						border : "none"
					});
			marker.setLabel(label);
		}
		map.addOverlay(marker);// 将标注添加到地图中  
	}
}

//向地图中添加线函数  
function addPolyline(name) {
	//	var name = getEquipmentName();
	$.ajax({
		url : "/wp/oneDatas",
		cache : false,
		async : true,
		dataType : 'json',
		type : 'post',
		data : {
			name : name
		},
		success : function(result, status, jqXHR) {
			var plPoints = result.list;
			var points = [];
			var times = [];
			for (var i = 0; i < plPoints.length; i++) {
				points.push(new BMap.Point(plPoints[i].dLongitude,
						plPoints[i].dLatitude));
				times.push(plPoints[i].dtmCreate);
			}
			//画线
			var line = new BMap.Polyline(points, {
				strokeWeight : POINT_CSS.weight,
				strokeColor : POINT_CSS.color,
				strokeOpacity : POINT_CSS.opacity
			});
			map.addOverlay(line);
			line.times = times;
			addArrow(line);
		},
		error : function(result, status, jqXHR) {
			layer.msg('内部错误，请联系管理员!');
		}
	});
}

//创建和初始化地图函数
function initMap() {
	createMap();//创建地图  
	setMapEvent();//设置地图事件  
	addMapControl();//向地图添加控件  
	//    addPolyline();//向地图中添加线
}

$(function($) {
	initSelectComponent();
	initMap();//创建和初始化地图 
});

// 给标注加单击事件
function addListener(marker) {
	marker.addEventListener('click', function(e) {// 图标单击
		var p = e.target;
		var markers = map.getOverlays();
		for (var i = 0; i < markers.length; i++) {
			if (markers[i].toString() == "[object Marker]") {
				markers[i].setAnimation(null);
			}
		}
		p.setAnimation(BMAP_ANIMATION_BOUNCE);
		var geoc = new BMap.Geocoder();//地址转中文
		geoc.getLocation(e.point, function(rs) {
			var addComp = rs.addressComponents;
			var addvar = addComp.province + "" + addComp.city + ""
					+ addComp.district + "" + addComp.street + ""
					+ addComp.streetNumber;
			setInfoData(p.obj, addvar);
		});
	});
}

//打开数据详情窗口
function setInfoData(obj, addvar) {
	$("div.data-container").show();
	$(".item-row-txt-name").text(addvar);
	$(".item-row-txt-equipment").text("设备编号：" + obj.vEquipmentName);
	$(".item-row-txt-primary").text(
			"雾炮工作状态：" + toStr(obj.iWorkModel + "" + obj.iWorkStatus));
	$(".item-row-txt-time").text("数据时间：" + obj.dtmCreate);
	setData(obj);
}
/**
 * 设置设备读数
 * @param obj
 * @returns
 */
function setData(obj){
	$("#m01").text(parseInt(obj.vMotorSpeed.substring(0,2)));
	$("#m02").text(parseInt(obj.vMotorSpeed.substring(2,4)));
	$("#m03").text(parseInt(obj.vMotorSpeed.substring(4,6)));
	$("#m04").text(parseInt(obj.vMotorSpeed.substring(6,8)));
	$("#m05").text(parseInt(obj.vMotorSpeed.substring(8,10)));
	$("#m06").text(parseInt(obj.vMotorSpeed.substring(10,12)));
	$("#m07").text(parseInt(obj.vMotorSpeed.substring(12,14)));
	$("#m08").text(parseInt(obj.vMotorSpeed.substring(14,16)));
	$("#m09").text(parseInt(obj.vMotorSpeed.substring(16,18)));
	$("#m10").text(parseInt(obj.vMotorSpeed.substring(18)));
	
	$("#t01").text(parseInt(obj.vMotorTemp.substring(0,2)));
	$("#t02").text(parseInt(obj.vMotorTemp.substring(2,4)));
	$("#t03").text(parseInt(obj.vMotorTemp.substring(4,6)));
	$("#t04").text(parseInt(obj.vMotorTemp.substring(6,8)));
	$("#t05").text(parseInt(obj.vMotorTemp.substring(8,10)));
	$("#t06").text(parseInt(obj.vMotorTemp.substring(10,12)));
	$("#t07").text(parseInt(obj.vMotorTemp.substring(12,14)));
	$("#t08").text(parseInt(obj.vMotorTemp.substring(14,16)));
	$("#t09").text(parseInt(obj.vMotorTemp.substring(16,18)));
	$("#t10").text(parseInt(obj.vMotorTemp.substring(18)));
}
/**
 * 转换状态字符串
 * @param status
 * @returns
 */
function toStr(status) {
	var tmp = "";
	switch (parseInt(status.charAt(0))) {
	case 1:
		tmp = "手动模式";
		break;
	case 2:
		tmp = "远程模式";
		break;
	case 3:
		tmp = "定时模式";
		break;
	default:
	}
	switch (parseInt(status.charAt(1))) {
	case 1:
		tmp += ",有水";
		break;
	case 2:
		tmp += ",缺水";
		break;
	case 3:
		tmp += ",缺相";
		break;
	default:
	}
	return tmp;
}
/**
 * 初始化下拉列表组件：加载设备列表，添加必要的事件
 * 默认加载所有设备的定位信息；
 * 选择其中一个设备后，显示最近10条数据的轨迹图
 * @returns
 */
function initSelectComponent() {
	var aj = $
			.ajax({
				url : 'wp/allData2',// 跳转到 action
				data : {},
				type : 'post',
				cache : false,
				dataType : 'json',
				success : function(data) {
					if (data.msg == "success") {
						var dataList = {
							value : []
						};
						var na, nb;
						for (var i = 0; i < data.list.length; i++) {
							var obj = data.list[i];
							if (obj.dLongitude == null || obj.dLatitude == null) {
								continue;
							}
							na = obj.dLatitude;
							nb = obj.dLongitude;
							addMarker(obj, i);
							dataList.value.push({
								vEquipmentName : obj.vEquipmentName
							});
						}
						//移动地图位置
						if (dataList.value.length < 20) {
							map.panTo(new BMap.Point(nb, na))
						} else {
							map.centerAndZoom(new BMap.Point(y, x), 5);
						}

						$("#equipment_id")
								.bsSuggest({
									idField : "vEquipmentName",
									keyField : "vEquipmentName",
									searchFields : [ "vEquipmentName" ], //有效搜索字段
									effectiveFields : [ "vEquipmentName" ],
									effectiveFieldsAlias : {
										vEquipmentName : "设备名称"
									}, //有效字段的别名对象，用于 header 的显示
									clearable : true,
									data : dataList
								})
								.on(
										'onDataRequestSuccess',
										function(e, result) {
											console
													.log(
															'从 json.data 参数中获取，不会触发 onDataRequestSuccess 事件',
															result);
										}).on(
										'onSetSelectValue',
										function(e, keyword, data) {
											console.log('onSetSelectValue: ',
													keyword, data);
										}).on('onUnsetSelectValue', function() {
									console.log("onUnsetSelectValue");
								});
					} else {
						alert("读取失败");
					}
				},
				error : function() {
					alert("异常！");
				}
			});
}
/**
 * 将设备在地图上以标注(marker)形式展示
 * @param obj
 * @param i
 * @returns
 */
function addMarker(obj, i) {
	if (obj.dLongitude == null || obj.dLatitude == null) {
		return;
	}
	var point = new BMap.Point(obj.dLongitude, obj.dLatitude);
	var marker = null;
	marker = new BMap.Marker(point, {
		icon : Level_Icon[1]
	});
	marker.enableDragging();// 开启拖拽功能
	marker.setTitle(obj.vEquipmentName);//添加标题
	var label = new BMap.Label("",//"设备号:"+obj.vEquipmentName
	{
		offset : new BMap.Size(-14, -5)
	});
	label.setStyle({
		border : "none"
	});
	marker.setLabel(label);
	marker.objdate = obj;
	marker.addEventListener('click', function(e) {// 图标单击
		var p = e.target;
		var markers = map.getOverlays();
		for (var i = 0; i < markers.length; i++) {
			if (markers[i].toString() == "[object Marker]") {
				markers[i].setAnimation(null);
			}
		}
		p.setAnimation(BMAP_ANIMATION_BOUNCE);
		var geoc = new BMap.Geocoder();//地址转中文
		geoc.getLocation(e.point, function(rs) {
			var addComp = rs.addressComponents;
			var addvar = addComp.province + "" + addComp.city + ""
					+ addComp.district + "" + addComp.street + ""
					+ addComp.streetNumber;
			setInfoData(p.objdate, addvar);
		});
		addPolyline(obj.vEquipmentName);
	});
	map.addOverlay(marker);
}
/**
 * 从下拉列表中选择设备后，触发事件：
 * 先将现有图中的折现和标注清除掉，再加载当前点击的设备信息
 * @returns
 */
function clickMarker() {
	var eid = $("#equipment_id").val();
	var markers = map.getOverlays();
	var ifbo = false;
	for (var i = 0; i < markers.length; i++) {
		if (markers[i].toString() == "[object Polyline]") {
			map.removeOverlay(markers[i]);
		}
		if (markers[i].toString() == "[object Marker]") {
			if (markers[i].getTitle().indexOf(":") > -1) {
				map.removeOverlay(markers[i]);
			}
			markers[i].setAnimation(null);
			if (eid == markers[i].getTitle()) {
				map.panTo(markers[i].getPosition());
				markers[i].setAnimation(BMAP_ANIMATION_BOUNCE);
				ifbo = true;
			}
		}
	}
	addPolyline(eid);
	if (!ifbo) {
		alert("没有找到这个设备!");
	}
}

function getEquipmentName() {
	var name = $(".item-row-txt-equipment").text();
	return name.replace("设备编号：", "");
}