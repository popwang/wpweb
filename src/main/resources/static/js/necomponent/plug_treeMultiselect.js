 //部门多选js公用组件(状态为可用用户);  丁红博（2017-8-3开发）
 /* 使用方法，
  * 1：创建 plug_treeMultiselect对象,
  * 2:调用对象show方法
           参数部分：创建plug_treeMultiselect对象时需要传递对象参数，参数包括 1,m_id：模块id（必填）, 2，targetRawvalue_id :目标元素id（必填）赋显示值使用(显示姓名)， 3，targethiddalue_id 目标元素id（选填）赋显示值使用(隐藏值用户Id)    4，onwnObject：回显值对象（选填） 
      ,5，permissions：权限参数，默认查询模块权限数据 如果传递1标识查询全部
     
     //带回显值的使用方法
     var obj =['001','001002']
     var kk = new  plug_treeMultiselect({targetRawvalue_id:'form_task_zxr',targethiddalue_id:'form_task_zxr_hidden',m_id:221,permissions:1,onwnObject:obj});
     kk.show();
  *
  */
function plug_treeMultiselect(pramObj){
     //初始化默认参数
      this.defaultParam={
    		  permissions:0
	  }
      //合并过后的参数
	this.extendParam = $.extend(this.defaultParam,pramObj);
     //初始化html标签
    initTreePlus(this.extendParam);
    //初始化标签中的事件
    initTreeevent(this.extendParam);

	//显示方法
	this.show = function () {
        showTreeplug(this.extendParam);
    };
}

//显示方法
var showTreeplug =  function (obj){
	   var zTreeObj;
	   // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
	    var setting = {view: {dblClickExpand: false},
				check:{enable:true,chkboxType:{ "Y": "s", "N": "ps" }} ,
	    data:    {
            simpleData:{
                enable:true
            }
        },
	    };
        $.ajax( {  
		    url:'AllconpentAction/getdepartmentTreeJson.htm',// 跳转到 action  
		    data:[],  
		    type:'post',  
		    cache:false,  
		    dataType:'json',  
		    success:function(data) {  
		    	$.fn.zTree.init($("#"+obj.m_id+"_treeDemo"), setting, data.ztreelist);
		    	var treeObj = $.fn.zTree.getZTreeObj(""+obj.m_id+"_treeDemo");
		    	treeObj.expandAll(true);
		    	var onwnObject =obj.onwnObject;
		    	  if(onwnObject){
		    	    	for(var i = 0;i<onwnObject.length;i++){  
		    	    		if(onwnObject[i]){
		    	    			treeObj.checkNode(treeObj.getNodesByParam("id",onwnObject[i],null)[0],true, true);  
		    	    		}
		    	    		
		    	    	}  
		    	    }
		     },  
		     error : function(e) {  
		          alert("异常！"+e);  
		     }  
		});
       
       $("#"+obj.m_id+'_treediv').removeClass("opacity0");
}
//初始化方法
function initTreePlus(obj){
	 if($('#'+(obj.m_id)+'_treediv').size()>0){
		 $('#'+(obj.m_id)+'_treediv').remove();
	 }
   var Context = '<div  id="' + obj.m_id + '_treediv" class="people-area people-area-tree opacity0 hide2"><div class="seach-warp clearfix">' +
   '<ul id="'+obj.m_id+'_treeDemo" class="ztree"></ul>'+
   '<span id="' + obj.m_id + 'tree_button" class="sure">确定</span></div>';
   $("body").append(Context);

};




//初始化事件
function initTreeevent(obj){
     //点击确定按钮
    $("#"+obj.m_id+'tree_button').on("click", function() {
    	var treeObj = $.fn.zTree.getZTreeObj(""+obj.m_id+"_treeDemo");
    	var checkoutNodes = treeObj.getCheckedNodes(true);
      if(checkoutNodes){
    	  var deptname=[];
    	  var deptid=[];
    	  $.each(checkoutNodes,function(i,item){
    		  deptname.push(item.name);
    		  deptid.push(item.id);
    	  });
    	  $("#"+obj.targetRawvalue_id).val(deptname.join(','));
    	  $("#"+obj.targethiddalue_id).val(deptid.join(','));
      }
      layer.close(layer.index);
      $("#"+obj.m_id+'tree_button').unbind();
    });
    
    
    
}

$("body").on("click",".sure",function(){
	 layer.close(layer.index);
})
