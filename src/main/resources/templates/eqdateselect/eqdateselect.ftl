<!DOCTYPE html>
<html>
<head>
    <base href=" ${basepath}">
    <meta name="viewport" content="width=device-width" />
    <title>历史查询</title>
<#include "/public_css.ftl" >
</head>
<body style="background-color:#fafafa">
<div class="filtrate-wrapper" style="padding-bottom:0px;">
    <div class="panel panel-default">
        <div class="panel-heading">查询条件</div>
        <div class="panel-body">
            <form id="formSearch" class="form-inline">
                <div class="form-group" style="margin-top:15px">
                    <label class="control-label col-sm-1" for="txt_search_time">数据时间</label>
                    <div class="col-sm-3" id="date">
                        <input type="text" class="form-control" id="txt_search_time">
                    </div>
                    
					<label class="control-label col-sm-1" style="margin-left:20px"  for="txt_search_equipmentname">设备名称</label>
                    <div class="input-group col-sm-3" style="width:200px">
                        <input type="text" class="form-control" id="txt_search_equipmentname">
                        <div class="input-group-btn">
                            <button type="button" class="btn btn-white dropdown-toggle" data-toggle="dropdown">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
                        </div>
                    </div>
                    <button type="button" style="margin-left:50px" id="btn_query" class="btn btn-primary">查询</button>
                    <button type="button"  id="btn_export" class="btn btn-primary">导出</button>
                </div>
            </form>
        </div>
    </div>

    <table id="tb_departments"></table>
</div>
</body>
<#include "/public_js.ftl" >
<script type="text/javascript" src="js/necomponent/create_formobj.js"></script>
<script type="text/javascript">
    var queryParams={
    };
    var exportParam=null;
    // 得到查询的参数
     var queryParamsfunction = function(params) {
         queryParams.limit=params.limit;
         queryParams.offset=params.offset;
         var temp = queryParams;
         return temp;
    };
    $(function ($) {
        //初始化日期组件
        getdaterangepicker("txt_search_time");

        $("#tb_departments").bootstrapTable({
            // url: 'newleave/queryleaveData_test.htm', //请求后台的URL（*）
            classes:'table table-hover table-no-bordered',//设置表头的样式
            method : 'get', // 请求方式（*）
            //  toolbar: '#toolbar', //工具按钮用哪个容器
            striped : true, // 是否显示行间隔色
            cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination : true, // 是否显示分页（*）
            sortable : true, // 是否启用排序
            sortOrder : "asc", // 排序方式
            // classes:'table table-hover table-no-bordered',
            queryParams :queryParamsfunction,// 传递参数（*）
            sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
            pageNumber : 1, // 初始化加载第一页，默认第一页
            pageSize : 10, // 每页的记录行数（*）
            pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
            search : false, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            //	strictSearch : true,
            showColumns : true, // 是否显示所有的列
            //	showExportbtn:true, //是否有导出按钮 导出按钮id =exportbtn   默认false 源码扩展开发
            showColumnsStyle:true,//是否使用列展示查看选择按钮 下移改变样式  默认false 源码扩展开发
            showLoadSuccessAlert:true,//是否表格查询后 输出查询结果的提示框  默认true  源码扩展开发
            //,启用点击行弹出按钮层   1.tableid 2.基本查询层.   3.按钮层divid   源码扩展开发
            //showClickRowDIV:["bfsptable1","select_div","toolbar"],
            showRefresh : false, // 是否显示刷新按钮
            minimumCountColumns : 2, // 最少允许的列数
            clickToSelect : true, // 是否启用点击选中行
            // height : 500, // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId : "vEquipmentName", // 每一行的唯一标识，一般为主键列
            //	showToggle : true, // 是否显示详细视图和列表视图的切换按钮
            //cardView : false, // 是否显示详细视图

            detailView : true, // 是否显示父子表
            detailFormatter:function(index, row){//展开详情的重写排序事件

                //return index+" "+row.v_qy_num;
            },
            fixedColumns: true,//冻结列 开启
            fixedNumber:4, //冻结几列数据 隐藏数据也包括
            // striped:true,隔行变色
            columns : [ {
                checkbox : true
            }, {
                field : 'vEquipmentName',
                title : '设备编号'
            }, {
                field : 'p001',
                title : '传感器状态'
            }, {
                field : 'p002',
                title : 'PM2.5'
            }, {
                field : 'p003',
                title : 'PM10'
            }, {
                field : 'p004',
                title : '风速'

            }, {
                field : 'p005name',
                title : '风向'
            }, {
                field : 'p006',
                title : '温度'
            }, {
                field : 'p007',
                title : '湿度'
            }, {
                field : 'p008',
                title : '噪音'
            }, {
                field : 'p009',
                title : 'PM100'
            }, {
                field : 'p010',
                title : '气压'
            }, {
                field : 'p011',
                title : '风级'
            }, {
                field : 'dtmCreate',
                title : '数据插入时间'
            }

            ]
        });
       $("#btn_export").click(function() {
           if(exportParam!=null){
               var url="Equipment_data/exportEquipmentData.htm?"+exportParam;
               var url2="Equipment_data/exportTag.htm?"+exportParam;
               bsuExport(url,url2,$("#btn_export"));
           }else{
               layer.msg('请先查询出您想要的结果!');
           }
        });

        $("#btn_query").click(function() {
            var date= $("#txt_search_time").val();
            var equipmentname = $("#txt_search_equipmentname").val();
            if(equipmentname==null || equipmentname==''){
            	layer.msg('请先选择设备编号!');
            	return;
            }
            queryParams={
                date:date,
                equipmentname:equipmentname
            };
            exportParam=parseParam(queryParams);
            //查询加载表格
            $('#tb_departments').bootstrapTable('refresh', {
                url: 'Equipment_data/selectEquipmentData.htm',
                silent: true,
                query: queryParams
            });

        });
        
        var aj = $.ajax({
            url: 'Equipment_info2/getEquipmentinfo2.htm',// 跳转到 action
            data: {},
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (data) {
                if (data.msg == "true") {
                 	var dataList = {value: []};
                 	var obj;
                 	for (var i = 0; i < data.list.length; i++) {
                        obj = data.list[i];
                        dataList.value.push({
                            vEquipmentName: obj.vEquipmentName
                        });
                    }
                 	
                    $("#txt_search_equipmentname").bsSuggest({
                        idField: "vEquipmentName",
                        keyField: "vEquipmentName",
                        searchFields: [ "vEquipmentName"],  //有效搜索字段，
                        effectiveFields: ["vEquipmentName"],
                        effectiveFieldsAlias:{vEquipmentName: "设备名称"}, //有效字段的别名对象，用于 header 的显示
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
</script>
</html>