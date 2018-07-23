<!DOCTYPE html>
<html>
<head>
<base href=" ${basepath}">
<meta name="viewport" content="width=device-width" />
<title>工作台</title> <#include "/public_css.ftl" >
<link rel="stylesheet" href="css/model/rygj.css">
</head>
<body style="background-color: #fafafa">
	<div class="filtrate-wrapper">
		<div class="row clearfix">
			<form role="form" class="select-box border-bottom-style"
				style="align: left;">
				<table id="data_1">
					<tr>
						<td class="control-label">设备名称：</td>
						<td class="input-group date">
							<div class="input-group" style="width: 300px">
								<input type="text" class="form-control" id="equipment_id">
								<div class="input-group-btn">
									<button type="button" class="btn btn-white dropdown-toggle"
										data-toggle="dropdown">
										<span class="caret"></span>
									</button>
									<ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
								</div>
							</div>
						</td>
						<td><input class="lf-btn blue-btn btn-primary" type="button"
							id="dingshibtn" value="定时刷新开" onclick="timerOn(this)" /> <a
							class="lf-btn blue-btn btn-primary" onclick="refreshNow()">马上刷新</a>
						</td>
					</tr>
				</table>
			</form>
			<div class="col-md-6 column">
				<div id="lidtmCreate">
					<h4 style="align-content: center">实时数据</h4>
				</div>
				<table class="table table-striped table-bordered table-condensed">
					<tr>
						<td>数据时间：</td>
						<td id="litime"></td>
						<td>PM2.5：</td>
						<td id="lip002"></td>
					</tr>
					<tr>
						<td>PM10：</td>
						<td id="lip003"></td>
						<td>PM100：</td>
						<td id="lip009"></td>
					</tr>
					<tr>
						<td>温度：</td>
						<td id="lip006"></td>
						<td>湿度：</td>
						<td id="lip007"></td>
					</tr>
					<tr>
						<td>风向：</td>
						<td id="lip005"></td>
						<td>风速：</td>
						<td id="lip011"></td>
					</tr>
					<tr>
						<td>噪声：</td>
						<td id="lip008"></td>
						<td>气压：</td>
						<td id="lip010"></td>
					</tr>
				</table>
			</div>
			<div class="col-md-6 column">
				<div id="projectInfo" class="form-inline">
					<h4 style="align-content: center">工程信息</h4>
				</div>
				<table class="table table-striped table-bordered table-condensed">
					<tr>
						<td>项目地址：</td>
						<td id="address"></td>
					</tr>
					<tr>
						<td>公司名称：</td>
						<td id="company"></td>
					</tr>
					<tr>
						<td>联系电话：</td>
						<td id="phone"></td>
					</tr>
				</table>
				<div style="float: right;">
					<span><button class="btn btn-info"
							onclick="modifyProjectInfo();">修改</button></span>
				</div>
			</div>
			<div class="col-md-12 column">
				<div id="main" style="width: 100%; height: 400px;"></div>
			</div>
			<div class="col-md-4 column">
				<div id="ymain1" style="width: 100%; height: 200px;"></div>
			</div>
			<div class="col-md-4 column">
				<div id="ymain2" style="width: 100%; height: 200px;"></div>
			</div>
			<div class="col-md-4 column">
				<div id="ymain3" style="width: 100%; height: 200px;"></div>
			</div>

			<div class="modify-win"
				style="display: none; width: 300px; height: auto; position: fixed; margin: auto; left: 0px; right: 0px; background-color: #f0f0f0">
				<img src="img/gis/close.jpg"
					style="z-index: 999; width: 25px; height: 25px; line-height: 25px; text-align: center; position: absolute; top: 2px; right: 2px; color: rgb(111, 111, 110); font-size: 16px; cursor: pointer;"
					onclick="hideModifyWin();"></img>
				<div class="item-row-name item-row-txt-name">
					<h4 style="align-content: center">录入工程信息</h4>
				</div>
				<form class="well">
					<label>项目地址:</label> <input id="v_address" type="text"
						class="span3"> <label>公司名称:</label> <input id="v_company"
						type="text" class="span3"> <label>联系电话:</label> <input
						id="v_phone" type="text" class="span3"> <input
						type="button" value="保存" class="btn"
						style="position: relative; right: -200px;"
						onclick="saveProjectInfo()" />
				</form>
			</div>
		</div>
	</div>
</body>
<#include "/public_js.ftl" >
<script src="js/plugins/echarts/echarts.min.js"></script>
<script type="text/javascript">

//保存工程信息
function saveProjectInfo(){
	var eid=$("#equipment_id").val();
	var v_address = $("#v_address").val();
	var v_company = $("#v_company").val();
	var v_phone = $("#v_phone").val();
	if(!eid){
		alert("请选择一个设备号！");
		return;
	}
	$.ajax({
        type:'post',
        url:'Equipment_info2/updateEquipmentinfo2.htm',
        data:{
        	eid:eid,
        	v_address:v_address,
        	v_company:v_company,
        	v_phone:v_phone
        },
        cache:false,
        async:true,
        dataType:'json',
        success:function(data){
            if( data.msg =="true" )
            {
            	$("#address").html(v_address);
                $("#company").html(v_company);
                $("#phone").html(v_phone);
                //清空输入项
                $("#v_address").val("");
            	$("#v_company").val("");
            	$("#v_phone").val("");
            }
            $(".modify-win").css("display","none");
        },
        error:function(e){
        	$(".modify-win").css("display","none");
            alert("异常错误"+e.message);
        }
    });
}
//关闭工程信息修改窗口
function hideModifyWin(){
	$(".modify-win").css("display","none");
}
//修改工程信息
function modifyProjectInfo(){
	$(".modify-win").css("display","block");
}

//立刻刷新数据
function refreshNow() {
    var eid=$("#equipment_id").val();
    $.ajax({
        type:'post',
        url:'Equipment_data/selectEquipmentData4Chart.htm',
        data:{
        	"vEquipmentName":eid,
        	"shu":10
        },
        cache:false,
        dataType:'json',
        success:function(data){
            if( data.msg =="true" ) //服务器返回false，就将validatePassword2的值改为pwd2Error，这是异步，需要考虑返回时间
            {
                var objlist=data.objlist;
                var objdata=data.objdata;
                var datezu=[];var data25zu=[];var data10zu=[];var data100zu=[];
                if(objlist){
                	for(var i=0;i<objlist.length;i++){
	                    datezu.push(objlist[i].dtmCreate);
	                    data25zu.push(objlist[i].p002==null?0:objlist[i].p002);
	                    data10zu.push(objlist[i].p003==null?0:objlist[i].p003);
	                    data100zu.push(objlist[i].p009==null?0:objlist[i].p009);
	                }
                }
                
                loadBarChart(objdata,datezu.slice(0,5),data25zu.slice(0,5),data10zu.slice(0,5),data100zu.slice(0,5))
                loadPieChart(objdata)
                loadEquipmentInfo(objdata);
            }else{
                alert(data.msg);
            }
        },
        error:function(e){
            alert("异常错误"+e.message);
        }
    });
}
/**
 * 页面打开时自动加载内容
 */
$(function ($) {
        $("#equipment_id").bsSuggest({
            idField: "iEquipmentId",
            keyField: "vEquipmentName",
            searchFields: [ "vEquipmentName"],  //有效搜索字段，
            effectiveFields: ["iEquipmentId","vEquipmentName"],
            effectiveFieldsAlias:{iEquipmentId:"设备ID",vEquipmentName: "设备名称"}, //有效字段的别名对象，用于 header 的显示
            clearable: true,
            url:'Equipment_info2/getEquipmentinfo2.htm',
            processData: function(json){
                json.value=json.list
                if(json.list.length<1){
                    alert("没有设备信息!");
                }else{
                    //进入就查询一下
                   $("#equipment_id").val(json.list[0].vEquipmentName);
                   refreshNow();
                }
                return json;
            }
        }).on('onDataRequestSuccess', function (e, result) {
            console.log('从 json.data 参数中获取，不会触发 onDataRequestSuccess 事件', result);
        }).on('onSetSelectValue', function (e, keyword, data) {
            console.log('onSetSelectValue: ', keyword, data);
        }).on('onUnsetSelectValue', function () {
            console.log("onUnsetSelectValue");
        });
});
/**
 * 加载饼图数据
 */
function loadPieChart(objdate){
	//仪表1
    var  optiony1 = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}"
        },
        series: [
            {
                name:  "设备名称:"+objdate.vEquipmentName+" "+new Date(objdate.dtmCreate).format("yyyy-MM-dd hh-mm-ss"),
                type: 'gauge',
                max: 1000,
                radius: '90%',
                detail: {formatter:'{value}'},
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.3, '#91c7af'],[0.6, '#62879f'],[1, '#c33430']],
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                data: [{value: objdate.p002, name: 'PM2.5'}]
            }
        ]
    };
    var  optiony2 = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}"
            },
            series: [
                {
                    name:  "设备名称:"+objdate.vEquipmentName+" "+new Date(objdate.dtmCreate).format("yyyy-MM-dd hh-mm-ss"),
                    type: 'gauge',
                    max: 1000,
                    radius: '90%',
                    detail: {formatter:'{value}'},
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[0.3, '#91c7af'],[0.6, '#62879f'],[1, '#c33430']],
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    data: [{value: objdate.p003, name: 'PM10'}]
                }
            ]
        };
    var  optiony3 = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}"
            },
            series: [
                {
                    name:  "设备名称:"+objdate.vEquipmentName+" "+new Date(objdate.dtmCreate).format("yyyy-MM-dd hh-mm-ss"),
                    type: 'gauge',
                    max: 150,
                    radius: '90%',
                    detail: {formatter:'{value}'},
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[0.3, '#91c7af'],[0.6, '#62879f'],[1, '#c33430']],
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    data: [{value: objdate.p008, name: '噪音'}]
                }
            ]
    };
    var ymain1 = echarts.init(document.getElementById('ymain1'));
    ymain1.clear();
    ymain1.setOption(optiony1);
    var ymain2 = echarts.init(document.getElementById('ymain2'));
    ymain2.clear();
    ymain2.setOption(optiony2);
    var ymain3 = echarts.init(document.getElementById('ymain3'));
    ymain3.clear();
    ymain3.setOption(optiony3);
}
/**
 * 加载设备及工地信息
 */
function loadEquipmentInfo(objdata){
	$("#litime").html((objdata.dtmCreate==null?"空数据":objdata.dtmCreate));
    $("#lip002").html((objdata.p002==null?"空数据":objdata.p002));
    $("#lip003").html((objdata.p003==null?"空数据":objdata.p003));
    $("#lip009").html((objdata.p009==null?"空数据":objdata.p009));
    $("#lip006").html((objdata.p006==null?"空数据":objdata.p006));
    $("#lip007").html((objdata.p007==null?"空数据":objdata.p007));
    $("#lip005").html((objdata.p005name==null?"空数据":objdata.p005name));
    $("#lip011").html((objdata.p011==null?"空数据":objdata.p011));
    $("#lip008").html((objdata.p008==null?"空数据":objdata.p008));
    $("#lip010").html((objdata.p0010==null?"空数据":objdata.p010));
    $("#address").html(objdata.vAddress==''?"空数据":objdata.vAddress);
    $("#company").html(objdata.vCompany==''?"空数据":objdata.vCompany);
    $("#phone").html(objdata.vPhone==''?"空数据":objdata.vPhone);
}
/**
 * 加载柱图数据
 */
function loadBarChart(objdate,datezu,data25zu,data10zu,data100zu) {
    // 基于准备好的dom，初始化柱状图echarts实例
    var myChart2 = echarts.init(document.getElementById('main'));
    myChart2.clear();
    option = {
        title : {
            text: '设备环境指标数据图'
           , subtext: objdate.vEquipmentName
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['PM2.5','PM10','PM100']
        },
        tooltip : {//鼠标悬浮弹窗提示
            trigger : 'item',
            show:true,
            showDelay: 0,
            hideDelay: 0,
            transitionDuration:0,
            borderRadius : 8,
            borderWidth: 2,
            padding: 10,    // [5, 10, 15, 20]
            formatter: function (params) {
                var res = params.name;
                res += ":    "+ datezu[params.dataIndex]+"<br>"
                var myseries = option.series;
                  for (var i = 0; i < myseries.length; i++) {
                  res+= myseries[i].name+"值:   "+myseries[i].data[params.dataIndex]+"<br>";

                }
                return res;
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ['时段1','时段2','时段3','时段4','时段5']
              //  data:datezu
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'PM2.5',
                type:'bar',
                radius: '100%',
              //  data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0],
                data:data25zu,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {yAxis: '40', label:{normal:{show:true}}, name: 'PM2.5污染极限'}
                    ]
                },
                label:{
                    normal:{formatter: '{b}:333 {c}'}
                }
            },
            {
                name:'PM10',
                type:'bar',
                //data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8],
                data:data10zu,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {yAxis: '60', label:{normal:{show:true}}, name: 'PM10污染极限'}
                    ]
                }
            },
            {
                name:'PM100',
                type:'bar',
               // data:[4.6, 3.9, 5.0, 20.4, 28.7, 70.7, 175.6, 182.2, 48.7],
                data:data100zu,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {yAxis: '50', label:{normal:{show:true}}, name: 'PM100污染极限'}
                    ]
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option);
}

Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}
var countdown=30;
var t1 ;
/**
 * 关闭页面自动刷新
 */
function timerOff() {
    window.clearTimeout(t1);//去掉定时器
    clearTimeout(t1)
    $("#dingshibtn").val("开启定时");
     $("#dingshibtn").unbind();
    $("#dingshibtn").bind("click",function(){
        timerOn()
    });
    countdown=30;
    ifbo=true;
}
var ifbo=true;
/**
 * 开启页面自动刷新
 */
function timerOn(){
    if(ifbo){// 设置一次事件
        ifbo=false;
        $("#dingshibtn").unbind();
        $("#dingshibtn").bind("click",function(){
            timerOff();
        });
    }
    if (countdown == 0) {
        countdown = 30;
        refreshNow();//查询
    } else {
         $("#dingshibtn").val("关闭定时(" + countdown + "秒后刷新)");
         countdown--;
    }
    clearTimeout(t1)
    t1 =window.setTimeout(function() {
        timerOn();
    },1000)
  }
</script>
</html>