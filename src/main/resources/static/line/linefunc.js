
function initState(prestr){
	var name = getEquipmentName();
	$.ajax({
		url:"/wp/state",
		cache:false,
		async:true,
		dataType:'json',
		type:'post',
		data:{
			name:name
		},
		success:function(result,status,jqXHR){
			var status = result.status;
//			alert(status);
			initSwitchers(prestr,status);
		},
		error:function(result,status,jqXHR){
			layer.msg('内部错误，请联系管理员!');
		}
	});
}

/**
 * 初始化开关按钮
 * @returns
 */
function initSwitchers(prestr,status) {
	//循环初始化开关按钮
	var machine;
	for (var i = 1; i <= 10; i++) {
		machine = prestr + i;
		$(machine).bootstrapSwitch({
			onText : '开',
			offText : '关',
			onColor : 'primary',
			offColor : 'danger',
			size : 'small',
			onSwitchChange : function(event, state) {
				
			},
			onInit : function(event, state) {
				
			}
		});
		if(status.charAt(i-1)=="1"){
			$(machine).bootstrapSwitch("state",true,false);
		}else{
			$(machine).bootstrapSwitch("state",false,false);
		}
	}
}

/**********************************************************
 * 处理定时按钮事件--开始
 */
function openSetTimeWin(){
	$("#setTimeWinId").css("display","block");
	initState("#motor");
}

function closeSetTimeWin(){
	$("#setTimeWinId").css("display","none");
}

function saveSetTimeData() {
	var result = "";
	var machine = "#motor";
	var name = getEquipmentName();
	var status = "";//定时开关状态
	var sets = "";//定时设置
	for (var i = 1; i <= 10; i++) {
		if ($(machine + i).bootstrapSwitch("state")) {
			result += "1";
		} else {
			result += "0";
		}
	}
	status = $("#timeswitch").val();
	sets += $("#timestart").val() + ",";
	sets += $("#timeend").val() + ",";
	sets += $("#timeduration").val() + ",";
	sets += $("#timerun").val() + ",";
	sets += result
	
	$.ajax({
		url:"/wp/command",
		cache:false,
		async:true,
		dataType:'json',
		type:'post',
		data:{
			command:'SETTIME',
			name:name,
			status:status,
			sets:sets
		},
		success:function(result,status,jqXHR){
			layer.msg('指令保存成功，5分钟左右生效!');
			closeOffonWin();
		},
		error:function(result,status,jqXHR){
			layer.msg('内部错误，请联系管理员!');
			closeOffonWin();
		}
	});
	closeSetTimeWin();
}
/**
 * 处理定时按钮事件--结束
 **********************************************************/

/**********************************************************
 * 处理开关按钮事件-开始
 */
function openOffonWin(){
	$("#offOnWinId").css("display","block");
	initState("#machine");
}

function closeOffonWin(){
	$("#offOnWinId").css("display","none");
}
/**
 * 保存开关信息
 * @returns
 */
function saveOffonData() {
	var machine = "#machine";
	var name = getEquipmentName();
	var status = "";
	var sets = "";
	for (var i = 1; i <= 10; i++) {
		if ($(machine + i).bootstrapSwitch("state")) {
			status += "1";
		} else {
			status += "0";
		}
	}
	$.ajax({
		url:"/wp/command",
		cache:false,
		async:true,
		dataType:'json',
		type:'post',
		data:{
			command:'OFFON',
			name:name,
			status:status,
			sets:sets
		},
		success:function(result,status,jqXHR){
			layer.msg('指令保存成功，5分钟左右生效!');
			closeOffonWin();
		},
		error:function(result,status,jqXHR){
			layer.msg('内部错误，请联系管理员!');
			closeOffonWin();
		}
	});
}
/**
 * 处理开关按钮事件-结束
 **********************************************************/
/**
 * 处理锁定按钮事件：
 * 1.先查询是否有未发送的锁定指令；查询最新的待发送指令是否为锁定指令。
 * 2.如果有则提示锁定命令已在缓存中，请勿重复发送；
 * 3.如果没有则直接生成发送指令。
 */
function handlerCommonButton(state){
	var command = "";
	switch(state){
		case 1 : command = "READ";break;
		case 2 : command = "LOCK";break;
		case 3 : command = "UNLOCK";break;
		default:
	}
	var name = getEquipmentName();
	//1.暂时不实现
	//2.生成发送指令
	$.ajax({
		url:"/wp/command",
		cache:false,
		async:true,
		dataType:'json',
		type:'post',
		data:{
			command:command,
			name:name
		},
		success:function(result,status,jqXHR){
			layer.msg('指令保存成功，5分钟左右生效!');
		},
		error:function(result,status,jqXHR){
			layer.msg('内部错误，请联系管理员!');
		}
	});
}
