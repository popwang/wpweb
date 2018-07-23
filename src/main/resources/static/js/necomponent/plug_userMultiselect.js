
 //用户多选js公用组件(状态为可用用户);丁红博（2017-8-3开发）
 /* 使用方法，
  * 1：创建 plug_userMultiselect对象,
  * 2:调用对象show方法
           参数部分：创建plug_userMultiselect对象时需要传递对象参数，参数包括 1,m_id：模块id（必填）, 2，targetRawvalue_id :目标元素id（必填）赋显示值使用(显示姓名)， 3，targethiddalue_id 目标元素id（选填）赋显示值使用(隐藏值用户Id)    4，onwnObject：回显值对象（选填） 
      ,5，permissions：权限参数，默认查询模块权限数据 如果传递1标识查询全部
     
     //带回显值的使用方法
     var obj =[{ i_user_id: 1,  v_real_name: '张三', v_dept_name: '神州'}]
     var kk = new  plug_userMultiselect({targetRawvalue_id:'form_task_zxr',targethiddalue_id:'form_task_zxr_hidden',m_id:221,permissions:1,onwnObject:obj});
     kk.show();
  *
  */
function plug_userMultiselect(pramObj){
     //初始化默认参数
      this.defaultParam={
    		  permissions:0
	  }
      //合并过后的参数
	this.extendParam = $.extend(this.defaultParam,pramObj);
     //初始化html标签
    initPlus(this.extendParam);
  
    var adduserdiv=layer.open({
    	  type: 1,
    	  title:'添加人员',
    	  scrollbar: false,
    	  shadeClose:true,
    	  offset: '0',
    	 // zIndex:999999,
    	  area: ['620px','480px'],
    	  content: $(".people-area-user")
    });
    //初始化标签中的事件
     initevent(this.extendParam,adduserdiv);

	//显示方法
	this.show = function () {
        showplug(this.extendParam);
        
        
     
    };
	//关闭方法
	this.hide = function (){

	}

}

//显示方法
var showplug =  function (obj){
	//初始化数据两个table中的数据
    if($('#'+obj.m_id+'_table1').size()<=0){
        return ;
    }
    $('#'+obj.m_id+'_table1').bootstrapTable({
        url:'AllconpentAction/seachUserList.htm',
        pagination: true,                   //是否显示分页（*）
        sidePagination:'server',
        pageSize:15,
  	     queryParams:function(params){
	  	 params.start = params.offset;
	  	 params.i_m_id = obj.m_id;
	  	 params.permissions= obj.permissions;
	  	 return params;
	  	   },	
        height:390,
        dataType:'json',
        clickToSelect: true,
        showLoadSuccessAlert:false,//是否表格查询后 输出查询结果的提示框    源码扩展开发
        columns: [
            {
                checkbox:true
            },
            {
                field: 'i_user_id',
                title: ''
            },
        	{
                field: 'v_real_name',
                title: '用户名'

            },
            {
                field: 'v_dept_name',
                title: '部门'

            }
        ]

    });
   
    //table2初始化
    $('#'+obj.m_id+'_table2').bootstrapTable({
        height:300,
        data:[],
        clickToSelect: true,
        showLoadSuccessAlert:false,//是否表格查询后 输出查询结果的提示框    源码扩展开发
        columns: [
            {
                checkbox:true
            },
            {
                field: 'i_user_id',
                title: ''
            },
            {
                field: 'v_real_name',
                title: '用户名',
                formatter:userFormatter

            }
        ]
    });
    //隐藏列
    $('#'+obj.m_id+'_table1').bootstrapTable('hideColumn','i_user_id');
    $('#'+obj.m_id+'_table2').bootstrapTable('hideColumn','i_user_id');
    if(obj.onwnObject.length>0){//如果有回显值，直接回显
        $('#'+obj.m_id+'_table2').bootstrapTable('append', obj.onwnObject);
    }
   
    $("#"+obj.m_id+'_div').removeClass("opacity0");
}
//初始化方法
function initPlus(obj){

    //刷新table数据
   if($('#'+(obj.m_id)+'_div').size()>0){
       //重新加载table1
       $('#'+obj.m_id+'_table1').bootstrapTable('refresh',{
           query:{
           }
       });
        //清空table2
       $('#'+obj.m_id+'_table2').bootstrapTable('removeAll');

       return ;
   }

   var Context = '<div style="position: relative;"  id="' + obj.m_id + '_div" class="people-area people-area-user clearfix  hide2"><div class="seach-warp clearfix"><form class="form-inline mrg-b" style="width:60%;float:left">	<div class="form-group"><label for="name" style="margin-right:10px;">用户姓名</label>' +
	'<input type="text" class="form-control" onkeydown="if(event.keyCode==13) return false;" id="' + obj.m_id + '_plug_name"  placeholder="请输入..." /></div><div id="' + obj.m_id + '_plug_button" class="btn btn-default seach-ipt" style="margin-left:10px;">搜索</div>' +
	'</form></div><div class="left-table pageInfo"><table id="' + obj.m_id + '_table1"></table></div><div class="middle-btn"><span id="' + obj.m_id + '_yd" class="glyphicon glyphicon-triangle-right yd"></span>' +
	'<span id="' + obj.m_id + '_yc" class="glyphicon glyphicon-triangle-left yc"></span><span  id="' + obj.m_id + '_ycAll" class="glyphicon glyphicon-remove ycAll"></span></div>	<div class="right-table pageInfo">' +
	'<table id="' + obj.m_id + '_table2"></table></div><div id="' + obj.m_id + '_button" class="sure">确定</div></div>';
   $("body").append(Context);

};

//传入两个数组，返回arr1中arr2没有的对象，返回新的数组
function comptiteArr(arr1,arr2) {

    var temp = []; //临时数组1
    var temparray = [];//临时数组2
    for (var i = 0; i < arr2.length; i++) {
        temp[arr2[i].i_user_id] = true;//
    };
    for (var i = 0; i < arr1.length; i++) {
        if (!temp[arr1[i].i_user_id]) {
            temparray.push(arr1[i]);//
        } ;
    };
   return temparray;
}



//初始化事件
function initevent(obj,adduserdiv){
	
	
	
    //点击向右按钮
    $("#"+obj.m_id+'_yd').on("click", function() {
        //获取table2已经被选中的userid封装成数组
        var table_2data = $.map($('#'+obj.m_id+'_table2').bootstrapTable('getData'), function(data) {
            return {  "i_user_id": data.i_user_id,  "v_real_name": data.v_real_name ,"v_dept_name": data.v_dept_name }
        });
        //获取table1已经被选中的userid封装成数组
        var table_1data = $.map($('#'+obj.m_id+'_table1').bootstrapTable('getSelections'), function(row) {
            return { "i_user_id": row.i_user_id,  "v_real_name": row.v_real_name ,"v_dept_name": row.v_dept_name }
        });


        //过滤出table1选中的与table2中不重复的对象
       var  filtration =comptiteArr(table_1data,table_2data);

        $('#'+obj.m_id+'_table2').bootstrapTable('append', filterData());
        function filterData() {
            var rows = [];
            if(filtration) {
                for(var i = 0; i < filtration.length; i++) {
                    rows.push({
                        i_user_id: filtration[i].i_user_id,
                        v_real_name: filtration[i].v_real_name,
                        v_dept_name: filtration[i].v_dept_name
                    });
                }
            }
            return rows;
        }
    });

    //点击向左按钮
    $("#"+obj.m_id+'_yc').click(function() {
        var i_user_ids = $.map($('#'+obj.m_id+'_table2').bootstrapTable('getSelections'), function(row) {
            return row.i_user_id;
        });
        $('#'+obj.m_id+'_table2').bootstrapTable('remove', {
            field: 'i_user_id',
            values: i_user_ids
        });
    });

    //全部移除
    $("#"+obj.m_id+'_ycAll').click(function() {
        $('#'+obj.m_id+'_table2').bootstrapTable('removeAll');
    });
    
    
     
     //点击确定按钮
    $("#"+obj.m_id+'_button').on("click", function() {
    	
        var v_real_names = $.map($('#'+obj.m_id+'_table2').bootstrapTable('getData'), function(row) {
            return row.v_real_name;
        });
        var ids = $.map($('#'+obj.m_id+'_table2').bootstrapTable('getData'), function(row) {
            return row.i_user_id;
        });
       
        if(v_real_names){
            if($("#"+obj.targetRawvalue_id).size()>0){         
              $("#"+obj.targetRawvalue_id).val(v_real_names.join(','));
            }
        }
         if($("#"+obj.targethiddalue_id).size()>0){
        	  $("#"+obj.targethiddalue_id).val(ids.join(','));
         }
         layer.close(adduserdiv);
        $("#"+obj.m_id+'_button').unbind();
        
        
    });

    //点击内部查询条件按钮
    $("#"+obj.m_id+'_plug_button').unbind();
    $("#"+obj.m_id+'_plug_button').on("click", function() {
      var  textname = $("#"+obj.m_id+'_plug_name').val();
      if(textname.length<50){
          //重新加载table1
          $('#'+obj.m_id+'_table1').bootstrapTable('refresh',{
        	  url:contextPath+"AllconpentAction/seachUserList.htm",
        	  silent: true,
              query:{
            	  user_account:textname
              }
          });

      }
    });
    
}



//截取多余的时间字符串
function  userFormatter(value,row,index){
    if(value){
        return row.v_real_name;
    }
}
