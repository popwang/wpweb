  /***niuchen 20170705 针对业务开发的高级筛选中的各种元素.  可以在制定的div下生成. 主要与表单**/
/**
 * 企业客户选择下拉框模糊搜索组件
 * prent_id,父容器id
 * create_id,当前元素id
 * m_id 当前使用模块id 查找出权限中全部状态正常1的人员.
 * 组件依赖bootstrap bsSuggest
 * http://lzw.me/pages/demo/bootstrap-suggest-plugin/demo/ 使用插件地址
 * http://www.cnblogs.com/hmYao/p/6610762.html 例子
 * **/
function add_selectCustomerName(form_item_input_divID,form_item_id,ajaxparamerer){
	var defaultvalue='';
	var isdiv=true;
	var m_id ="";
	var pathUrl = "AllconpentAction/selectCustomerName.htm?";
	if(ajaxparamerer!=null){
 		 if(ajaxparamerer.defaultvalue!=null){defaultvalue=ajaxparamerer.defaultvalue;}
 		 if(ajaxparamerer.isdiv!=null){isdiv=ajaxparamerer.isdiv;}
 		if(ajaxparamerer.m_id!=null){m_id="m_id="+ajaxparamerer.m_id+"&"}
	}
	if(isdiv==true){
		var text="<div class='input-group'>" +
				"<input type=\"text\" style='display:none' id='"+form_item_id+"_id'  name='"+form_item_id+"_id' > " +
				"<input type=\"text\"  placeholder='"+defaultvalue+"' class=\"form-control proposer\" id='"+form_item_id+"'  name='"+form_item_id+"' >    <div class=\"input-group-btn\">   <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">   <span class=\"caret\"></span>   </button>  <ul class=\"dropdown-menu dropdown-menu-right\" role=\"menu\">  </ul>   </div>  "
	 	$("#"+form_item_input_divID).append(text);
	}
 	var bsSuggest= $("#"+form_item_id).bsSuggest({  
        //url: "/rest/sys/getuserlist?keyword=",  i_gid,v_group_name, v_group_id,v_group_address
        //url: "AllconpentAction/selectCustomerName.htm?v_name=",  
 		url:pathUrl+m_id+"v_name=",
        effectiveFields: ["v_group_name", "v_group_id","v_group_address"],  //有效显示于列表中的字段，非有效字段都会过滤，默认全部。
        searchFields: [ "v_group_name"],  //有效搜索字段，从前端搜索过滤数据时使用，但不一定显示在列表中。effectiveFields 配置字段也会用于搜索过滤
        effectiveFieldsAlias:{v_group_name: "客户名称",v_group_id: "编号",v_group_address:"地址"}, //有效字段的别名对象，用于 header 的显示
        allowNoKeyword: true,  //是否允许无关键字时请求数据
        getDataMethod: 'url',  //获取数据的方式，url：一直从url请求；data：从 options.data 获取；firstByUrl：第一次从Url获取全部数据，之后从options.data获取
        clearable: true,        // 是否可清除已输入的内容
        idField: "v_group_id",  
        keyField: "v_group_name"   
    }).on('onDataRequestSuccess', function (e, result) {  
    	//alert(result);
    	//加载数据后onDataRequestSuccess: 当 AJAX 请求数据成功时触发，并传回结果到第二个参数
          console.log('onDataRequestSuccess: ', result);  
    }).on('onSetSelectValue', function (e, keyword) {  
    	//onSetSelectValue：当从下拉菜单选取值时触发，并传回设置的数据到第二个参数
 	   var cityObjid = $("#"+form_item_id+"_id");
		cityObjid.attr("value", keyword.id);
         console.log('onSetSelectValue: ', keyword);  
    }).on('onUnsetSelectValue', function (e) {  
    	//onUnsetSelectValue：当设置了 idField，且自由输入内容时触发（与背景警告色显示同步）
    	 var cityObjid = $("#"+form_item_id+"_id");
 		cityObjid.attr("value","");
       console.log("onUnsetSelectValue");  
    }).on('onDeleteValue', function (e) {  
    	//点击清空按钮触发   扩展增加了一个存储选择内容id的文本框隐藏. 清空了要取消掉
    	 var cityObjid = $("#"+form_item_id+"_id");
 		cityObjid.attr("value","");
       console.log("onDeleteValue");  
    })  ; 
	return bsSuggest;
}

/**人员选择下拉框模糊搜索组件
 * form_item_input_divID,父容器id
 * form_item_id,当前元素id
 * m_id 当前使用模块id ,查找出权限中状态正常1的人员.
 * 组件依赖bootstrap bsSuggest
 * http://lzw.me/pages/demo/bootstrap-suggest-plugin/demo/ 使用插件地址
 * http://www.cnblogs.com/hmYao/p/6610762.html 例子
 * 	 form_item_input_divID 筛选样式与布局div 是HTML的 
 *  form_item_id 组件id 
 * {isdiv:1} 表示使用组件内部生成的div包裹组件.0表示用html自定义样式

 * **/
function add_bsSuggest_selectUserName(form_item_input_divID,form_item_id,ajaxparamerer){
	var defaultvalue='';
	var isdiv=true;
	var m_id ="";
	var pathUrl = "AllconpentAction/selectUserInfobyName.htm?";
	if(ajaxparamerer!=null){
 		 if(ajaxparamerer.defaultvalue!=null){defaultvalue=ajaxparamerer.defaultvalue;}
 		 if(ajaxparamerer.isdiv!=null){isdiv=ajaxparamerer.isdiv;}
 		 if(ajaxparamerer.m_id!=null){m_id="m_id="+ajaxparamerer.m_id+"&"}
	}
	if(isdiv==true){
		var text="<div class='input-group'>" +
				"<input type=\"text\" style='display:none' id='"+form_item_id+"_id'  name='"+form_item_id+"_id' /> " +
				"<input type=\"text\"  placeholder='"+defaultvalue+"' class=\"form-control proposer\" id='"+form_item_id+"'  name='"+form_item_id+"' />  " +
				"  <div class=\"input-group-btn\">   <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">  " +
				" <span class=\"caret\"></span>   </button> " +
				" <ul class=\"dropdown-menu dropdown-menu-right\" role=\"menu\">  </ul>   </div>  "
		$("#"+form_item_input_divID).append(text);
	}
	var bsSuggest= $("#"+form_item_id).bsSuggest({  
       //url: "/rest/sys/getuserlist?keyword=",  
       //url: "AllconpentAction/selectUserInfobyName.htm?v_real_name=",  
		url:pathUrl+m_id+"v_real_name=",
		effectiveFields: ["v_real_name", "v_dept_name"],  //有效显示于列表中的字段，非有效字段都会过滤，默认全部。
		searchFields: [ "v_real_name"],  //有效搜索字段，从前端搜索过滤数据时使用，但不一定显示在列表中。effectiveFields 配置字段也会用于搜索过滤
		effectiveFieldsAlias:{v_real_name: "姓名",v_dept_name: "部门"}, //有效字段的别名对象，用于 header 的显示
		allowNoKeyword: false,  //是否允许无关键字时请求数据
		getDataMethod: 'firstByUrl',  //获取数据的方式，url：一直从url请求；data：从 options.data 获取；firstByUrl：第一次从Url获取全部数据，之后从options.data获取
		clearable: true,        // 是否可清除已输入的内容
		idField: "i_user_id",  
		keyField: "v_real_name"   
   }).on('onDataRequestSuccess', function (e, result) {  
   	//alert(result);
   	//加载数据后onDataRequestSuccess: 当 AJAX 请求数据成功时触发，并传回结果到第二个参数
         console.log('onDataRequestSuccess: ', result);  
   }).on('onSetSelectValue', function (e, keyword) {  
   	//onSetSelectValue：当从下拉菜单选取值时触发，并传回设置的数据到第二个参数
	   var cityObjid = $("#"+form_item_id+"_id");
		cityObjid.attr("value", keyword.id);
        console.log('onSetSelectValue: ', keyword);  
   }).on('onUnsetSelectValue', function (e) {  
   	//onUnsetSelectValue：当设置了 idField，且自由输入内容时触发（与背景警告色显示同步）
   	//alert(e);
   	 var cityObjid = $("#"+form_item_id+"_id");
		cityObjid.attr("value","");
      console.log("onUnsetSelectValue");  
   }).on('onDeleteValue', function (e) {  
   	//点击清空按钮触发
    	 var cityObjid = $("#"+form_item_id+"_id");
		cityObjid.attr("value","");
      console.log("onDeleteValue");  
   })  ; 
	return bsSuggest;
}



 /**
  * 创建临时拜访状态的下拉框
  * http://silviomoreto.github.io/bootstrap-select/examples/  插件文档
  * https://www.oschina.net/code/snippet_2289011_53404  插件教程
  * **/
function add_select_interview_taskstate_dic(form_item_input_divID,form_item_id,ajaxparamerer){
    var select="<select id='"+form_item_id+"' name='"+form_item_id+"'  class='selectpicker show-tick form-control' ></select>";
   $("#" + form_item_input_divID).append(select);
  // $("#"+form_item_id).empty();//清空select下拉框
    $.ajax( {  
	    url:'AllconpentAction/selectt_interview_taskstate_dic.htm',// 跳转到 action  
	    data:ajaxparamerer,  
	    type:'post',  
	    cache:false,  
	    dataType:'json',  
	    success:function(data) {  
	    	$("#"+form_item_id).empty();
 		       var option="<option value='0'>全部</option>";
 	    	   $("#"+form_item_id).append(option);//动态添加Option子项
 	    	   for(var i=0;i< data.list.length;i++){
	    		     option="<option value='" +  data.list[i].i_id + "'>" +  data.list[i].v_name + "</option>";
     		          // $("<option selected='selected' value='" +  this.datajson.head[i].value + "'>" +  this.datajson.head[i].text + "</option>").appendTo($("#"+form_item_id))//动态添加Option子项
	    		   $("#"+form_item_id).append(option);//动态添加Option子项
     		   }   		
                //更新内容刷新到相应的位置
                $("#"+form_item_id).selectpicker('render');
                $("#"+form_item_id).selectpicker('refresh');
	     },  
	     error : function(e) {  
 	          alert("异常！"+e);  
	     }  
	});
 
}

/**
 * 创建公告分类的下拉框guoyu
 * http://silviomoreto.github.io/bootstrap-select/examples/  插件文档
 * https://www.oschina.net/code/snippet_2289011_53404  插件教程
 * **/
function add_select_notice_dic(form_item_input_divID,form_item_id,ajaxparamerer){
   var select="<select id='"+form_item_id+"' name='"+form_item_id+"'  class='selectpicker show-tick form-control' ></select>";
  $("#" + form_item_input_divID).append(select);
 // $("#"+form_item_id).empty();//清空select下拉框
   $.ajax( {  
	    url:'plannotice/findnocetype.htm',// 跳转到 action  
	    data:ajaxparamerer,  
	    type:'post',  
	    cache:false,  
	    dataType:'json',  
	    success:function(data) {  
	    	$("#"+form_item_id).empty();
	    	   for(var i=0;i< data.noticetypelist.length;i++){
	    		   var option="<option value='" +  data.noticetypelist[i].notice_type_id + "'>" +  data.noticetypelist[i].notice_type_name + "</option>";
    		          // $("<option selected='selected' value='" +  this.datajson.head[i].value + "'>" +  this.datajson.head[i].text + "</option>").appendTo($("#"+form_item_id))//动态添加Option子项
	    		   $("#"+form_item_id).append(option);//动态添加Option子项
    		   }   		
               //更新内容刷新到相应的位置
               $("#"+form_item_id).selectpicker('render');
               $("#"+form_item_id).selectpicker('refresh');
	     },  
	     error : function(e) {  
	          alert("异常！"+e);  
	     }  
	});

}

/**
 * 创建组织机构的下拉框
 ** http://www.treejs.cn/v3/demo.php#_507  官方例子
 *http://www.poluoluo.com/jzxy/201604/471064.html 集成例子
 * **/
function getdepartmentTreeJson(form_item_input_divID,form_item_id,ajaxparamerer){
	var text="<div class='input-group'>" + 
	 "<i id=\""+form_item_id+"_colseimg\" class=\"clearable glyphicon glyphicon-remove\" style=\"position: absolute; top: 12px; right: 2px; z-index: 4; cursor: pointer; font-size: 12px; display: black;\"></i>"+
			"<input type=\"text\"  readonly value=\"\"  class=\"form-control proposer\" id='"+form_item_id+"'  name='"+form_item_id+"' >   " +
			"<input type=\"text\"  readonly value=\"\" style='display:none'   id='"+form_item_id+"_id'  name='"+form_item_id+"_id' >  <div class=\"input-group-btn\">   " +
					"<button id='"+form_item_id+"_button'  name='"+form_item_id+"_button' type=\"button\"  class=\"btn btn-default dropdown-toggle\" >   <span class=\"caret\"></span>   </button>  " +
							"<ul class=\"dropdown-menu dropdown-menu-right\">  </ul>   </div>  "
  $("#" + form_item_input_divID).append(text);
	//var menuContentcss="display:none; position: absolute;z-index:999999999;background:#fff;  border:1px solid #ccc";
	//var menuUIcss="margin-top:0; overflow:auto;width:180px;height:200px;";
	 var menuContentcss="display:none; position: absolute;z-index:999999999";
	 var menuUIcss="margin-top:0;";
	//下拉树展示的层, 默认隐藏,绝对定位
    var menucontent="<div id=\""+form_item_id+"_menuContent\" class=\"menuContent\" style=\""+menuContentcss+"\"><ul id=\""+form_item_id+"_treeDemo\" class=\"ztree\" style=\""+menuUIcss+"\"></ul></div>"
    $(document.body).append(menucontent);
    //隐藏方法
	var onBodyDown=function (event) {
		if (!(event.target.id == "menuBtn" || event.target.id == form_item_id+"menuContent" || $(event.target).parents("#"+form_item_id+"_menuContent").length>0)) {
			$("#"+form_item_id+"_menuContent").fadeOut("fast");
			$("body").unbind("mousedown", onBodyDown);
		}
	}
    //点击展示数的按钮
    $("#" +form_item_id+"_button").click(function() {
    	var cityObj = $("#"+form_item_id);
		var cityOffset = $("#"+form_item_id).offset();
		$("#"+form_item_id+"_menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
 		$("body").bind("mousedown", onBodyDown);  //展示树
 	});
    //点击展示数的按钮
    $("#" +form_item_id+"_colseimg").click(function() {
    	var cityObj = $("#"+form_item_id);
    	cityObj.attr("value", '');
    	var cityObjid = $("#"+form_item_id+"_id");
    	cityObjid.attr("value",'');
 	});
    //配置树的参数 使用zTree
	 var setting = {
			view: {dblClickExpand: false},
			data: {	simpleData: {	enable: true}	},
			callback: {
				beforeClick:function (treeId, treeNode) {
					//var check = (treeNode && !treeNode.isParent);
					//if (!check) alert("只能选择城市...");
					//return check;
				},
				onClick: function(e, treeId, treeNode) {//单击事件 主要是给文本框 和隐藏文本框赋值
					var zTree = $.fn.zTree.getZTreeObj(form_item_id+"_treeDemo"),
					nodes = zTree.getSelectedNodes(),
					v = "";
					v_id="";
					nodes.sort(function compare(a,b){return a.id-b.id;}); //集合排序
					for (var i=0, l=nodes.length; i<l; i++) {
						if(i+1<l){
						  v += nodes[i].name + ",";
						  v_id += nodes[i].id + ",";
						}else{
							  v += nodes[i].name ;
							  v_id += nodes[i].id ;
						}
					}
					//if (v.length > 0 ) v = v.substring(0, v.length-1);
					var cityObj = $("#"+form_item_id);
					cityObj.attr("value", v);
					var cityObjid = $("#"+form_item_id+"_id");
					cityObjid.attr("value", v_id);
					$("#"+form_item_id+"_menuContent").fadeOut("fast");
					$("body").unbind("mousedown", onBodyDown);
				}
			}
		};

 	   $.ajax( {  
		    url:'AllconpentAction/getdepartmentTreeJson.htm',// 跳转到 action  
		    data:ajaxparamerer,  
		    type:'post',  
		    cache:false,  
		    dataType:'json',  
		    success:function(data) {  
		    	$.fn.zTree.init($("#"+form_item_id+"_treeDemo"), setting, data.ztreelist);
		     },  
		     error : function(e) {  
		          alert("异常！"+e);  
		     }  
		});
 
}



/**
 * 创建营销区域的下拉框
 ** http://www.treejs.cn/v3/demo.php#_507  官方例子
 *http://www.poluoluo.com/jzxy/201604/471064.html 集成例子
 * **/
function getregionTreeJson(form_item_input_divID,form_item_id,ajaxparamerer){
	var text="<div class='input-group'>" + 
	 "<i id=\""+form_item_id+"_colseimg\" class=\"clearable glyphicon glyphicon-remove\" style=\"position: absolute; top: 12px; right: 2px; z-index: 4; cursor: pointer; font-size: 12px; display: black;\"></i>"+
			"<input type=\"text\"  readonly value=\"\"  class=\"form-control proposer\" id='"+form_item_id+"'  name='"+form_item_id+"' >   " +
			"<input type=\"text\"  readonly value=\"\" style='display:none'   id='"+form_item_id+"_id'  name='"+form_item_id+"_id' >  <div class=\"input-group-btn\">   " +
					"<button id='"+form_item_id+"_button'  name='"+form_item_id+"_button' type=\"button\"  class=\"btn btn-default dropdown-toggle\" >   <span class=\"caret\"></span>   </button>  " +
							"<ul class=\"dropdown-menu dropdown-menu-right\">  </ul>   </div>  "
  $("#" + form_item_input_divID).append(text);
	//var menuContentcss="display:none; position: absolute;z-index:999999999;background:#fff;  border:1px solid #ccc";
	//var menuUIcss="margin-top:0; overflow:auto;width:180px;height:200px;";
 
	 var menuContentcss="display:none; position: absolute;z-index:999999999";
 
	 var menuUIcss="margin-top:0;";
	//下拉树展示的层, 默认隐藏,绝对定位
    var menucontent="<div id=\""+form_item_id+"_menuContent\" class=\"menuContent\" style=\""+menuContentcss+"\"><ul id=\""+form_item_id+"_treeDemo\" class=\"ztree\" style=\""+menuUIcss+"\"></ul></div>"
    $(document.body).append(menucontent);
    //隐藏方法
	var onBodyDown=function (event) {
		if (!(event.target.id == "menuBtn" || event.target.id == form_item_id+"menuContent" || $(event.target).parents("#"+form_item_id+"_menuContent").length>0)) {
			$("#"+form_item_id+"_menuContent").fadeOut("fast");
			$("body").unbind("mousedown", onBodyDown);
		}
	}
    //点击展示数的按钮
    $("#" +form_item_id+"_button").click(function() {
    	var cityObj = $("#"+form_item_id);
		var cityOffset = $("#"+form_item_id).offset();
		$("#"+form_item_id+"_menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
 		$("body").bind("mousedown", onBodyDown);  //展示树
 	});
    //点击展示数的按钮
    $("#" +form_item_id+"_colseimg").click(function() {
     	var cityObj = $("#"+form_item_id);
    	cityObj.attr("value", '');
    	var cityObjid = $("#"+form_item_id+"_id");
    	cityObjid.attr("value",'');
 	});
    //配置树的参数 使用zTree
	 var setting = {
			view: {dblClickExpand: false},
			data: {	simpleData: {	enable: true}	},
			callback: {
				beforeClick:function (treeId, treeNode) {
					//var check = (treeNode && !treeNode.isParent);
					//if (!check) alert("只能选择城市...");
					//return check;
				},
				onClick: function(e, treeId, treeNode) {//单击事件 主要是给文本框 和隐藏文本框赋值
					var zTree = $.fn.zTree.getZTreeObj(form_item_id+"_treeDemo"),
					nodes = zTree.getSelectedNodes(),
					v = "";
					v_id="";
					nodes.sort(function compare(a,b){return a.id-b.id;}); //集合排序
					for (var i=0, l=nodes.length; i<l; i++) {
						if(i+1<l){
						  v += nodes[i].name + ",";
						  v_id += nodes[i].id + ",";
						}else{
							  v += nodes[i].name ;
							  v_id += nodes[i].id ;
						}
					}
					//if (v.length > 0 ) v = v.substring(0, v.length-1);
					var cityObj = $("#"+form_item_id);
					cityObj.attr("value", v);
					var cityObjid = $("#"+form_item_id+"_id");
					cityObjid.attr("value", v_id);
					$("#"+form_item_id+"_menuContent").fadeOut("fast");
					$("body").unbind("mousedown", onBodyDown);
				}
			}
		};

 	   $.ajax( {  
		    url:'AllconpentAction/getregionTreeJson.htm',// 跳转到 action  
		    data:ajaxparamerer,  
		    type:'post',  
		    cache:false,  
		    dataType:'json',  
		    success:function(data) {  
		    	$.fn.zTree.init($("#"+form_item_id+"_treeDemo"), setting, data.ztreelist);
		     },  
		     error : function(e) {  
		          alert("异常！"+e);  
		     }  
		});
 
}

/**
 * 创建日期区间下拉框
  *http://www.daterangepicker.com/#config
  *szwq/src/main/webapp/szwqbts/js/plugins/bootstrap-daterangepicker-master/daterangepicker.js
  *form_item_id inputid 
  *format日期格式
  *timePicker 是否展示时间
  **/
function getdaterangepicker(form_item_id,timePicker){
	var d = new Date();
	var str = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
	var format='YYYY/MM/DD';
 	if(timePicker==null){
		timePicker=false;
	}else if(timePicker==false){}
	else{
		timePicker=true;
		format='YYYY/MM/DD HH:mm';
	}

        var ranges = {
         //  '清空': [null, null],
           '今天': [moment().startOf('days'), moment().endOf('days')],
          '昨天': [moment().subtract(1, 'days').startOf('days'), moment().subtract(1, 'days').endOf('days')],
          '7天': [moment().subtract(6, 'days').startOf('days'), moment().endOf('days')],
         // '15天': [moment().subtract(14, 'days'), moment()],
          '30天': [moment().subtract(29, 'days').startOf('days'), moment().endOf('days')],
          '本月': [moment().startOf('month'), moment().endOf('month')],
          '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        };
        var locale={
            applyLabel: '确定',
            cancelLabel: '重设',
            fromLabel: '起始时间',
            toLabel: '结束时间',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1
        };
 	$('#'+form_item_id).daterangepicker({
	  //  "showISOWeekNumbers": true,
	    "format": format,
	    "timePicker": timePicker,
	    "timePicker24Hour": timePicker,
	    "autoUpdateInput":true,//自动更新输入  变成必填了. 而且会自动纠错,自动输入默认日期
        "startDate": moment().startOf('days'),
        "endDate":  moment().endOf('days'),
	    "linkedCalendars": false,// 与日历 
	   "alwaysShowCalendars": true,//总是显示日历 
	 //   "opens": "center", //center left right,
	    "ranges":ranges,
	    "locale":locale ,
	    // startDate: moment().hours(4).minutes(0).seconds(0), //startDate和endDate 的值如果跟 ranges 的两个相同则自动选择ranges中的行. 这里选中了清空行
       // endDate: moment().endOf('day')
        
	}, function(start, end, label) {

         var s = start.format(format);
        var e = end.format(format);
        var t = s + '-' + e;

        if (start._isValid == false && end._isValid == false) {
            s = "";
            e = "";
            t = "请选择日期范围"
             $('#'+form_item_id).val("");
         }
         $('#'+form_item_id).val(t);
         console.log(s+"  "+e+"New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
	});
 	//下面是可以文本清空的事件
//	$('#'+form_item_id).on('apply.daterangepicker', function(ev, picker) {
//          $(this).val(picker.startDate.format(format) + '-' + picker.endDate.format(format));
//     });
//
	$('#'+form_item_id).on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
     });
	$('#'+form_item_id).on('show.daterangepicker', function(ev, picker) {
			if( $(this).val()==null||$(this).val()==""){
	 		  var s = moment().startOf('days').format(format);
		        var e = moment().endOf('days').format(format);
		        var t = s + '-' + e;
	        $(this).val(t);
	        }
    });
	
  }
