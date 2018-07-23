/**
 * 高级筛选查询元素生成方法.   是为了扩展,配置生成查询功能
 * niuchen20170620**/
 
 /**引入下来框人员搜索塑件**/
    document.write("<script language=javascript src='szwqbts/js/necomponent/create_formobj.js'></script>");

/**高级筛选 元素类型配置对象
 * parent_id载体父id
 * form_item_label 标题
 * form_item_id 元素id
 * ajaxparamerer ajax参数
 * **/
function newitem_type(parent_id, form_item_label, form_item_id,ajaxparamerer){
// 	this.type=type;//元素类型         select表示下拉框 
//	this.typename=typename;//  元素类型分类 名称  需要扩展
//	this.data_type=0;//数据初始化类型0表示静态json. 1表示ajax服务器端后去json
//	this.ajaxurl="";//type=1 服务器数据获取url
//	this.ajaxparamerer=null;// 服务器数据获取url 的参数
//	this.datajson="";//静态数据json
//	this.defaultvalue="";//元素默认值
//	this.format="";//格式参数 date上用 比如yyyy-mm-ss
//	var typeis=0;
	if(parent_id==null||parent_id==''){alert("载体父id为空.请联系开发人员!");};
	if(form_item_label==null||form_item_label==''){alert("标题空.请联系开发人员!");};
	if(form_item_id==null||form_item_id==''){alert("元素id空.请联系开发人员!");};
	this.parent_id=parent_id;
	this.form_item_label=form_item_label;
	this.form_item_id=form_item_id;
	this.ajaxparamerer=ajaxparamerer;//存储参数对象
	this.form_item_divID="form_item_div_"+form_item_id;//顶层divID  通用字符串
	this.form_item_labelID="form_item_labelID_"+form_item_id;//标题ID  通用字符串
	this.form_item_input_divID="form_item_input_"+form_item_id;//存储元素的div的ID  通用字符串
	 
	/*******************************************************************************
	 * 高级筛选生成元素页面的方法. 
	 * parent_id, 高级筛选的form元素的id form_item_label,元素的中文标题 form_item_id  ,元素实体的类型对象item_type newitem_type
	 * 元素的载体的id用于三个页面ID的生成. 生成描述 'form_item_div_"+form_item_id+" 最外层div <label
	 * id='form_item_label"+form_item_id+" 元素标签 <div class='layui-input-block'
	 * id='"+form_item_id+"'>"; 元素载体的标签.
	 ******************************************************************************/
	this.addfomritem=function() {
	 	if($("#" + this.form_item_id).size()>0){
			alert(this.form_item_id+"ID重复错误!");
			return;
		}
 		//查询元素的div样式风格.
		var form_item_div = "<div id='" +  this.form_item_divID
				+ "' class='form-group draggable ui-draggable lf-form-group'></div>"; //顶层div
		var form_item_label = "<label  id='" + this.form_item_labelID
				+ "'  class='col-sm-4 control-label lf-label'>" + this.form_item_label + "</label>"; //标题
 		var form_item_input = " <div class='col-sm-7' id='"+ this.form_item_input_divID +"'></div>";//存储元素的div
 		$("#" + this.parent_id).append(form_item_div);//向form中添加一个元素的顶层div
		//添加元素标题
		$("#" +  this.form_item_divID).append(form_item_label);
		//向顶层div中增加元素实体div.
		$("#" +  this.form_item_divID).append(form_item_input);
		//根据类型增加元素实体
	};
	/**组件使用与fomr表单**/
 		this.addfomritem();
 
	/***  用户名称搜索 开始***/
	this.init_selectUserName=function(){
	       var testBsSuggest = add_bsSuggest_selectUserName(this.form_item_input_divID,this.form_item_id,this.ajaxparamerer);
 	};
	/***  用户名称搜索 结束***/
 	
	/***  企业客户名称搜索 开始***/
	this.init_selectCustomerName=function(){
	       var testBsSuggest = add_selectCustomerName(this.form_item_input_divID,this.form_item_id,this.ajaxparamerer);
 	};
	/***  企业客户搜索 结束***/
 	
	/***  组织机构树 开始***/
	this.init_departmentTree=function(){
	      getdepartmentTreeJson(this.form_item_input_divID,this.form_item_id,this.ajaxparamerer);
 	};
 	/**营销区域*/
 	this.init_getregionTreeJson= function(){
 		getregionTreeJson(this.form_item_input_divID,this.form_item_id,this.ajaxparamerer);
 	}
 	
	/***  组织机构树结束***/
 	
	
 	/***  临时拜访状态 开始***/
 	this.init_select_interview_taskstate_dic=function(){
	       var testBsSuggest = add_select_interview_taskstate_dic(this.form_item_input_divID,this.form_item_id,this.ajaxparamerer);
  	};
	/***  临时拜访状态  结束***/
	
  	/***  公告分类 开始***/
 	this.init_select_notice_dic=function(){
	       var testBsSuggest = add_select_notice_dic(this.form_item_input_divID,this.form_item_id,this.ajaxparamerer);
  	};
	/***  公告分类  结束***/
  	
	/*** 下拉框 开始***/
 	this.init_select_data=function(datajson){
  		  var select="<select id='"+this.form_item_id+"' name='"+this.form_item_id+"'    class='selectpicker show-tick form-control' ></select>";

 		  $("#" + this.form_item_input_divID).append(select);
	       $("#"+this.form_item_id).empty();//清空select下拉框
 	      
 	       for(var i=0;i< datajson.length;i++){
	    	   var option="";
	    	   if(datajson[i].selected==1){//设置是否选中
	    		   option ="<option selected = 'selected'  value='" +  datajson[i].value + "'>" +  datajson[i].text + "</option>";
 	    	   }else{
 	    		  option="<option  value='" +  datajson[i].value + "'>" +  datajson[i].text + "</option>";
 	    	  }
	    	   $("#"+this.form_item_id).append(option);//动态添加Option子项
 	       }
 	      //更新内容刷新到相应的位置
           $("#"+this.form_item_id).selectpicker('render');
           $("#"+this.form_item_id).selectpicker('refresh');
  
	     
 	};
	/**单选下拉列表 结束***/
	
	/***文本 开始***/
 	this.init_text=function(defaultvalue){
		var text="<input type='text' id='"+this.form_item_id+"'  name='"+this.form_item_id+"' placeholder='"+defaultvalue+"' autocomplete='off' class='form_datetime input-sm form-control lf-form-control'/>";
		  $("#" + this.form_item_input_divID).append(text);
	}
	/***文本 结束***/
 
	/***日期控件开始
	 * http://www.layui.com/laydate/
	 * istime是否显示时分秒
	 * ***/
	this.init_date=function(defaultvalue,format,istime){
		if(format==""){
			format="YYYY-MM-DD hh:mm:ss";
		}
		if(istime==null){
			istime=false
		}
		var text="<input id='"+this.form_item_id+"'  name='"+this.form_item_id+"' placeholder='"+defaultvalue+"'  class='form-control layer-date' })\"/>";
		$("#" + this.form_item_input_divID).append(text);
 		var start = {
			elem : "#"+form_item_id,
			format : format,
		//	min : laydate.now(),
		//	max : "2099-06-16 23:59:59",
			istime : istime,
			istoday : false,
			choose : function(datas) {
				//end.min = datas;
				//end.start = datas
			}
		};
 		laydate(start);
 		this.laydate=start;
	}
 	/***日期控件 结束***/

	/***日期控件起止组 开始 让两个日期级联***/
	this.setstart_end_date=function(start_dateinit,end_dateintit){
	 var start_date=start_dateinit.laydate;
	 var end_date=end_dateintit.laydate;
		start_date.choose=function(datas){
			end_date.min = datas; //开始日选好后，重置结束日的最小日期
			end_date.start = datas //将结束日的初始值设定为开始日
		  }
		
		end_date.choose=function(datas){
			start_date.max = datas; //开始日选好后，重置结束日的最小日期
			//start_date.start = datas //将结束日的初始值设定为开始日
		  }
		laydate(start_date);
		laydate(end_date);
		start_dateinit.laydate=start_date;
		end_dateintit.laydate=end_date;
	}
 	/***日期控件起止组 结束***/
	
	/**
	 * 创建日期区间下拉框
	  *http://www.daterangepicker.com/#config
	  *format日期格式
	  *timePicker 是否展示时间
	  **/
	this.init_datepicker=function(timePicker){
 		var text="<input id='"+this.form_item_id+"'  name='"+this.form_item_id+"' readonly='true'  class='form-control' />";
 // 		text+= "<input id='"+this.form_item_id+"_start'  type='hidden'   />";
// 		text+= "<input id='"+this.form_item_id+"_end' type='hidden'   />";
		$("#" + this.form_item_input_divID).append(text);
		$("#" + this.form_item_divID).attr("class","form-group draggable ui-draggable");
		$("#" + this.form_item_divID).css("width","30%");
		$("#" + this.form_item_divID).css("float","left");
		
 		getdaterangepicker(this.form_item_id,timePicker);
	}
}




var urlEncode = function (param, key, encode) {  
	
	  if(param==null) return '';  
	  var paramStr = '';  
	  var t = typeof (param);  
	  if (t == 'string' || t == 'number' || t == 'boolean') {  
	    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);  
	  } else {  
		  
	    for (var i in param) {  
	      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);  
	      paramStr += urlEncode(param[i], k, encode);  
	    }  
	  }  
	  return paramStr;  
	};  
	
	