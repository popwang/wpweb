<!DOCTYPE html>
<html>
<head>
    <base href=" ${basepath}">
    <meta name="viewport" content="width=device-width" />
    <title>设备添加工作台</title>

<#include "/public_css.ftl" >
    <link rel="stylesheet" href="css/model/rygj.css">
</head>
<body style="background-color:#fafafa">
<div class="col-md-12">
	<div class="col-md-6">
		<div class="panel panel-default ">
			<div class="panel-heading">
				<h4>编号生成</h4>
			</div>
			<div class="panel-body">
				<form action="">
					<div class="form-group">
						<label>设备编号</label>
						<div class="input-group" style="width:300px">
	                        <input type="text" class="form-control" id="equipment_id">
	                        <div class="input-group-btn">
	                            <button type="button" class="btn btn-white dropdown-toggle" data-toggle="dropdown">
	                                <span class="caret"></span>
	                            </button>
	                            <ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
	                        </div>
	                    </div>
					</div>
					<div class="form-group">
						<label for="system">要对接的平台</label>
						<select name="system" id="system" class="form-control" style="width:300px;"></select>
					</div>
					<div class="form-group">
						<button type="submit" class="btn btn-sm btn-warning">生成编号</button>
					</div>
					<div class="form-group">
						<label for="systemno">平台编号</label>
						<input name="systemno" id="systemno" class="form-control" style="width:300px;">
					</div>
				</form>
			</div>
		</div>
	</div>
	
	<div class="col-md-6">
		<div class="panel panel-default clo-md-5">
			<div class="panel-heading">
				<h4>设备添加</h4>
			</div>
			<div class="panel-body">
				<form action="">
					<div class="form-group">
						<label>设备编号</label>
						<div class="input-group" style="width:300px">
	                        <input type="text" class="form-control" id="equipment_id2">
	                        <div class="input-group-btn">
	                            <button type="button" class="btn btn-white dropdown-toggle" data-toggle="dropdown">
	                                <span class="caret"></span>
	                            </button>
	                            <ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
	                        </div>
	                    </div>
					</div>
					
					<div class="form-group">
						<label for="system">要对接的平台</label>
						<select name="system" id="system" class="form-control" style="width:300px;"></select>
					</div>
					
					<div class="form-group">
						<label for="systemno">生成的平台编号</label>
						<input name="systemno" id="systemno" class="form-control" style="width:300px;">
					</div>
					<button type="submit" class="btn btn-sm btn-default">设备添加</button>
				</form>
			</div>
		</div>
	</div>
	
</div>
</body>
<#include "/public_js.ftl" >
<script src="js/plugins/echarts/echarts.min.js"></script>
<script type="text/javascript">
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
        
        $("#equipment_id2").bsSuggest({
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
</script>
</html>