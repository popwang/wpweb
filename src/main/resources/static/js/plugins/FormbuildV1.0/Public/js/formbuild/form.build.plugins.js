/*e.preventDefault();//阻止元素发生默认的行为(例如,当点击提交按钮时阻止对表单的提交*/

/* 文本框控件 text
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['text'] = function (active_component,leipiplugins) {
	  
  var plugins = 'text',popover = $(".popover");
 
  //弹出窗口回显值
  $(popover).find("#text_title").val($(leipiplugins).attr("title"));
  $(popover).find("#text_tswz").val($(leipiplugins).attr("placeholder"));
  $(popover).find("#text_zyhs").val(typeof $(leipiplugins).attr("text_zyhs")=='undefined'?1:$(leipiplugins).attr("text_zyhs"));//行数
  $(popover).find("#text_zfcd").val(typeof $(leipiplugins).attr("text_zfcd")=='undefined'?20:$(leipiplugins).attr("text_zfcd"));//字符长度
  if($(leipiplugins).attr("text_sfbt")==1){
  $(popover).find("#text_sfbt").attr("checked","true"); 
  }
  $(popover).delegate(".btn-danger", "click", function(e){
       active_component.popover("hide");
  });
  //点击填出窗口的确认按钮，给真正的控件赋值和属性
  $(popover).delegate(".btn-info", "click", function(e){
 
       var inputs = $(popover).find("input");
      if($(popover).find("textarea").length>0)
      {
          inputs.push($(popover).find("textarea")[0]);
      }
     var  is_text_title=true,is_text_zyhs=true,is_text_zfcd=true;
      $.each(inputs, function(i,e){
          var attr_name = $(e).attr("id");//获取弹出窗口的id
          var attr_val = $(e).val();//获取值
          if($(e).attr("type")=='checkbox'){
        	  attr_val =$(e).get(0).checked?1:0
          }
          switch(attr_name)
          {
            //要break
            case 'text_tswz':
              //$(leipiplugins).val(attr_val);
           //   $(leipiplugins).attr("value", attr_val);
              $(leipiplugins).attr("placeholder", attr_val);
               break;
            //没有break
            case 'text_title':
            	if(attr_val==""||attr_val==null){
             		is_text_title=false;
            		return;
            	}
              $(leipiplugins).attr("title",attr_val);
              active_component.find(".leipiplugins-orgname").text(attr_val);
              break;
            case 'text_zyhs':
            	if(attr_val==""||attr_val==null){
             		is_text_zyhs=false;
            		return;
            	}
                 $(leipiplugins).attr("text_zyhs", attr_val);
                 break;
            case 'text_zfcd':
            	if(attr_val==""||attr_val==null){
             		is_text_zfcd=false;
            		return;
            	}
                $(leipiplugins).attr("text_zfcd", attr_val);
              break;
             default:
              $(leipiplugins).attr(attr_name, attr_val);
          }
         });
   
      if(!is_text_title){
      	  layer.msg('标题不能为空');
      	  return ;
        }else  if(!is_text_zyhs){
      	  layer.msg('行数不能为空');
      	  return ;
        }else  if(!is_text_zfcd){
        	layer.msg('字段长度不能为空');
      	  return ;
        }else{
         active_component.popover("hide");
         LPB.genSource();//重置源代码
        }
  });
}
/* 多行文本框控件 textarea
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['textarea'] = function (active_component,leipiplugins) {
  var plugins = 'textarea',popover = $(".popover");
  //弹出窗口回显值
  $(popover).find("#text_title").val($(leipiplugins).attr("title"));
   $(popover).find("#text_tswz").val($(leipiplugins).attr("placeholder"));
  $(popover).find("#text_zyhs").val(typeof $(leipiplugins).attr("text_zyhs")=='undefined'?1:$(leipiplugins).attr("text_zyhs"));//行数
  $(popover).find("#text_zfcd").val(typeof $(leipiplugins).attr("text_zfcd")=='undefined'?20:$(leipiplugins).attr("text_zfcd"));//字符长度
  if($(leipiplugins).attr("text_sfbt")==1){
  $(popover).find("#text_sfbt").attr("checked","true"); 
  }
  //右弹form  取消控件
  $(popover).delegate(".btn-danger", "click", function(e){
      active_component.popover("hide");
  });
  //右弹form  确定控件
  $(popover).delegate(".btn-info", "click", function(e){
     
      var inputs = $(popover).find("input");
      if($(popover).find("textarea").length>0)
      {
          inputs.push($(popover).find("textarea")[0]);
      }
      var  is_text_title=true,is_text_zyhs=true,is_text_zfcd=true;
       $.each(inputs, function(i,e){
          var attr_name = $(e).attr("id");//属性名称
          var attr_val = $(e).val();
          if($(e).attr("type")=='checkbox'){
        	  attr_val =$(e).get(0).checked?1:0
          }
          switch(attr_name)
          {
            //要break
            case 'text_tswz': 
              $(leipiplugins).text(attr_val); //真正的input里面的值
              $(leipiplugins).attr("placeholder", attr_val);
              break;
            case 'text_title':
            	if(attr_val==""||attr_val==null){
             		is_text_title=false;
            		return;
            	}
                $(leipiplugins).attr("title",attr_val);//真正的标题
                active_component.find(".leipiplugins-orgname").text(attr_val); //真正的标题
              break;
            case 'text_zyhs':
            	if(attr_val==""||attr_val==null){
             		is_text_zyhs=false;
            		return;
            	}
                 $(leipiplugins).attr("text_zyhs", attr_val);
                 break;
            case 'text_zfcd':
            	if(attr_val==""||attr_val==null){
             		is_text_zfcd=false;
            		return;
            	}
                $(leipiplugins).attr("text_zfcd", attr_val);
              break;
            default:
              $(leipiplugins).attr(attr_name, attr_val);
          }
       });
       if(!is_text_title){
       	  layer.msg('标题不能为空');
       	  return ;
         }else  if(!is_text_zyhs){
       	  layer.msg('行数不能为空');
       	  return ;
         }else  if(!is_text_zfcd){
         	layer.msg('字段长度不能为空');
       	  return ;
         }else{
          active_component.popover("hide");
          LPB.genSource();//重置源代码
         }

	  });
	}

/* 数字文本框
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['numberfield'] = function (active_component,leipiplugins) {
	  var plugins = 'numberfield',popover = $(".popover");
	  //弹出窗口回显值
	  $(popover).find("#text_title").val($(leipiplugins).attr("title"));
	  $(popover).find("#text_tswz").val($(leipiplugins).attr("placeholder"));
	  $(popover).find("#text_zyhs").val(typeof $(leipiplugins).attr("text_zyhs")=='undefined'?1:$(leipiplugins).attr("text_zyhs"));//行数
	  $(popover).find("#text_zfcd").val(typeof $(leipiplugins).attr("text_zfcd")=='undefined'?20:$(leipiplugins).attr("text_zfcd"));//字符长度
	  if($(leipiplugins).attr("text_sfbt")==1){
	  $(popover).find("#text_sfbt").attr("checked","true"); 
	  }
	  $(popover).delegate(".btn-danger", "click", function(e){
	     
	      active_component.popover("hide");
	  });
	  //点击填出窗口的确认按钮，给真正的控件赋值和属性
	  $(popover).delegate(".btn-info", "click", function(e){
	     
	      var inputs = $(popover).find("input");
	      if($(popover).find("textarea").length>0)
	      {
	          inputs.push($(popover).find("textarea")[0]);
	      }
	      var  is_text_title=true,is_text_zyhs=true,is_text_zfcd=true;
 	      $.each(inputs, function(i,e){
	          var attr_name = $(e).attr("id");//获取弹出窗口的id
	          var attr_val = $(e).val();//获取值
	          if($(e).attr("type")=='checkbox'){
	        	  attr_val =$(e).get(0).checked?1:0
	          }
	          switch(attr_name)
	          {
	            //要break
	            case 'text_tswz':
	              //$(leipiplugins).val(attr_val);
	            //  $(leipiplugins).attr("value", attr_val);
	              $(leipiplugins).attr("placeholder", attr_val);
	              break;
	            //没有break
	            case 'text_title':
	            	if(attr_val==""||attr_val==null){
	             		is_text_title=false;
	            		return;
	            	}
	                $(leipiplugins).attr("title",attr_val);//真正的标题
	                active_component.find(".leipiplugins-orgname").text(attr_val); //真正的标题
	              break;
	            case 'text_zyhs':
	            	if(attr_val==""||attr_val==null){
	             		is_text_zyhs=false;
	            		return;
	            	}
	                 $(leipiplugins).attr("text_zyhs", attr_val);
	                 break;
	            case 'text_zfcd':
	            	if(attr_val==""||attr_val==null){
	             		is_text_zfcd=false;
	            		return;
	            	}
	                $(leipiplugins).attr("text_zfcd", attr_val);
	              break;
	             default:
	              $(leipiplugins).attr(attr_name, attr_val);
	          }
	          
	      });
	      if(!is_text_title){
	      	  layer.msg('标题不能为空');
	      	  return ;
	        }else  if(!is_text_zyhs){
	      	  layer.msg('行数不能为空');
	      	  return ;
	        }else  if(!is_text_zfcd){
	        	layer.msg('字段长度不能为空');
	      	  return ;
	        }else{
	         active_component.popover("hide");
	         LPB.genSource();//重置源代码
	        }
	  });
	}


/* 日期控件
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['datafield'] = function (active_component,leipiplugins) {
	
	  var plugins = 'datafield',popover = $(".popover");
	  //弹出窗口回显值
	  $(popover).find("#text_title").val($(leipiplugins).attr("title"));
	  
	  $(popover).find("#text_tswz").val($(leipiplugins).val());
	  if($(leipiplugins).attr("text_sfbt")==1){//是否必填
	  $(popover).find("#text_sfbt").attr("checked","true"); 
	  }
	  $(popover).find("#text_rqgs").val($(leipiplugins).attr("text_rqgs"));
	  $(popover).delegate(".btn-danger", "click", function(e){
	     
	      active_component.popover("hide");
	  });
	  //点击填出窗口的确认按钮，给真正的控件赋值和属性
	  $(popover).delegate(".btn-info", "click", function(e){
	     //下拉框 给类型赋值
		     var select = $(popover).find("select");
  		      $.each(select, function(i,e){
		    	  var attr_name = $(e).attr("id");//获取弹出窗口的id
		    	  if(attr_name=="text_rqgs") {
		    		  $(leipiplugins).attr("placeholder", $(e).find("option:selected").text());
		      	 }
		      });
 		     //下拉框 给类型赋值结束
 		      
	      var inputs = $(popover).find("input");
	      if($(popover).find("textarea").length>0)
	      {
	          inputs.push($(popover).find("textarea")[0]);
	      }
	      var  is_text_title=true
	      $.each(inputs, function(i,e){
	          var attr_name = $(e).attr("id");//获取弹出窗口的id
	          var attr_val = $(e).val();//获取值
	          if($(e).attr("type")=='checkbox'){
	        	  attr_val =$(e).get(0).checked?1:0
	          }
	          switch(attr_name)
	          {
 	            case 'text_title':
	            	if(attr_val==""||attr_val==null){
	             		is_text_title=false;
	            		return;
	            	}
	              $(leipiplugins).attr("title",attr_val);
	              active_component.find(".leipiplugins-orgname").text(attr_val);
	              break;
	             default:
	              $(leipiplugins).attr(attr_name, attr_val);
	          }
	      });
	      //日期类型
	      var selects = $(popover).find("select");
	      $.each(selects, function(i,e){
	          var attr_name = $(e).attr("id");//获取弹出窗口的id
	          var attr_val = $(e).val();//获取值
	          $(leipiplugins).attr(attr_name, attr_val);
	      });
		  if(!is_text_title){
	      	  layer.msg('标题不能为空');
	      	  return ;
	        }else{
	         active_component.popover("hide");
	         LPB.genSource();//重置源代码
	        }
 	  });

	}

/* 日期区间控件
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['datafieldqj'] = function (active_component,leipiplugins) {
	  var plugins = 'datafieldqj',popover = $(".popover");
	  //弹出窗口回显值
	  $(popover).find("#text_title").val($(leipiplugins).attr("title"));
	  $(popover).find("#text_tswz").val($(leipiplugins).val());
	  if($(leipiplugins).attr("text_sfbt")==1){
	  $(popover).find("#text_sfbt").attr("checked","true"); 
	  }
	  $(popover).find("#text_rqgs").val($(leipiplugins).attr("text_rqgs"));
	  $(popover).delegate(".btn-danger", "click", function(e){
	     
	      active_component.popover("hide");
	  });
	  //点击填出窗口的确认按钮，给真正的控件赋值和属性
	  $(popover).delegate(".btn-info", "click", function(e){
		//下拉框 给类型赋值
  	      var select = $(popover).find("select");
 	      $.each(select, function(i,e){
	    	  var attr_name = $(e).attr("id");//获取弹出窗口的id
	    	  if(attr_name=="text_rqgs") {
 	    	   $(leipiplugins).attr("placeholder", $(e).find("option:selected").text());
 	    	   
	      	 }
	      });
 	   //下拉框 给类型赋值结束
 	      
	      var inputs = $(popover).find("input");
 	      if($(popover).find("textarea").length>0)
	      {
	          inputs.push($(popover).find("textarea")[0]);
	      }
 	     var  is_text_title=true
	      $.each(inputs, function(i,e){
	          var attr_name = $(e).attr("id");//获取弹出窗口的id
	          var attr_val = $(e).val();//获取值
	          if($(e).attr("type")=='checkbox'){
	        	  attr_val =$(e).get(0).checked?1:0
	          }
 	          switch(attr_name)
	          {
 	            //没有break
	             case 'text_title':
	            	if(attr_val==""||attr_val==null){
	             		is_text_title=false;
	            		return;
	            	}
	              $(leipiplugins).attr("title",attr_val);
	              active_component.find(".leipiplugins-orgname").text(attr_val);
	              break;
	             default:
	              $(leipiplugins).attr(attr_name, attr_val);
	          }
	      });
	      //日期类型
	      var selects = $(popover).find("select");
	      $.each(selects, function(i,e){
	          var attr_name = $(e).attr("id");//获取弹出窗口的id
	          var attr_val = $(e).val();//获取值
	          $(leipiplugins).attr(attr_name, attr_val);
	      });
	      if(!is_text_title){
	      	  layer.msg('标题不能为空');
	      	  return ;
	        }else{
	         active_component.popover("hide");
	         LPB.genSource();//重置源代码
	        }
 	  });
	
	}

/* 下拉框控件 select
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['select'] = function (active_component,leipiplugins) {
  var plugins = 'select',popover = $(".popover");
  //右弹form  初始化值
  $(popover).find("#orgname").val($(leipiplugins).attr("title"));
  var val = $.map($(leipiplugins).find("option"), function(e,i){return $(e).text()});
  val = val.join("\r");
  $(popover).find("#orgvalue").text(val);
  if($(leipiplugins).attr("text_sfbt")==1){
	  $(popover).find("#text_sfbt").attr("checked","true"); 
	  }
  if($(leipiplugins).attr("text_sfdx")==1){
	  $(popover).find("#text_sfdx").attr("checked","true"); 
	  }
  //右弹form  取消控件
  $(popover).delegate(".btn-danger", "click", function(e){
      active_component.popover("hide");
  });
  //右弹form  确定控件
  $(popover).delegate(".btn-info", "click", function(e){
     
      var inputs = $(popover).find("input");
      if($(popover).find("textarea").length>0)
      {
          inputs.push($(popover).find("textarea")[0]);
      }
      var  is_text_title=true; var  is_orgvalue=true;
       $.each(inputs, function(i,e){
          var attr_name = $(e).attr("id");//属性名称
          var attr_val = $(e).val();
          if($(e).attr("type")=='checkbox'){
        	  attr_val =$(e).get(0).checked?1:0
          }
          switch(attr_name)
          {
            //要break
            case 'orgvalue':
            	if(attr_val==""||attr_val==null){
            		is_orgvalue=false;
            		return;
            	}
              var options = attr_val.split("\n");
              $(leipiplugins).html("");
              $.each(options, function(i,e){
                $(leipiplugins).append("\n      ");
                $(leipiplugins).append($("<option>").text(e));
              });
              //$(leipiplugins).text(attr_val);
              break;
            
            case 'orgname': 
            	if(attr_val==""||attr_val==null){
             		is_text_title=false;
            		return;
            	}
              $(leipiplugins).attr("title",attr_val);
              active_component.find(".leipiplugins-orgname").text(attr_val);
              break;
            default:
              $(leipiplugins).attr(attr_name, attr_val);
          }
       
      });
       if(!is_text_title){
    	  	  layer.msg('标题不能为空');
    	  	  return ;
    	    }else  if(!is_orgvalue){
    	  	  layer.msg('请填写下拉选项');
    	  	  return ;
    	    }else{
    	     active_component.popover("hide");
    	     LPB.genSource();//重置源代码
    	    }
   });

}

/* 图片
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['imagefield'] = function (active_component,leipiplugins) { 
	var plugins = 'imagefield',popover = $(".popover");
//弹出窗口回显值
$(popover).find("#text_title").val($(leipiplugins).attr("title"));

$(popover).find("#text_tswz").val($(leipiplugins).attr("text_tswz"));//提示文字
$(popover).find("#text_zfcd").val(typeof $(leipiplugins).attr("text_zfcd")=='undefined'?4:$(leipiplugins).attr("text_zfcd"));
if($(leipiplugins).attr("text_sfbt")==1){
$(popover).find("#text_sfbt").attr("checked","true"); 
}
$(popover).delegate(".btn-danger", "click", function(e){
   
    active_component.popover("hide");
});
//点击填出窗口的确认按钮，给真正的控件赋值和属性
$(popover).delegate(".btn-info", "click", function(e){
   
    var inputs = $(popover).find("input");
    if($(popover).find("textarea").length>0)
    {
        inputs.push($(popover).find("textarea")[0]);
    }
    var is_text_title=true,is_text_zfcd=true;
    $.each(inputs, function(i,e){
        var attr_name = $(e).attr("id");//获取弹出窗口的id
        var attr_val = $(e).val();//获取值
        if($(e).attr("type")=='checkbox'){
      	  attr_val =$(e).get(0).checked?1:0
        }
        switch(attr_name)
        {
          case 'text_title':
        	  if(attr_val==""||attr_val==null){
           		is_text_title=false;
          		return;
          	}
            $(leipiplugins).attr("title",attr_val);
            active_component.find(".leipiplugins-orgname").text(attr_val);
            break;
          case 'text_zfcd':
            if(attr_val==""||attr_val==null){
        	   is_text_zfcd=false;
          	   return;
          	}
            $(leipiplugins).attr(attr_name, attr_val);
            break;
            default:
            $(leipiplugins).attr(attr_name, attr_val);
        }
     });
    if(!is_text_title){
    	  layer.msg('标题不能为空');
    	  return ;
      }else  if(!is_text_zfcd){
      	layer.msg('图片张数不能为空');
    	  return ;
      }else{
       active_component.popover("hide");
       LPB.genSource();//重置源代码
      }
});}


/* 定位
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['dwfield'] = function (active_component,leipiplugins) { 
	var plugins = 'dwfield',popover = $(".popover");
//弹出窗口回显值
$(popover).find("#text_title").val($(leipiplugins).attr("title"));
$(popover).find("#text_tswz").val($(leipiplugins).attr("text_tswz"));
$(popover).delegate(".btn-danger", "click", function(e){
   
    active_component.popover("hide");
});
//点击填出窗口的确认按钮，给真正的控件赋值和属性
$(popover).delegate(".btn-info", "click", function(e){
   
    var inputs = $(popover).find("input");
    if($(popover).find("textarea").length>0)
    {
        inputs.push($(popover).find("textarea")[0]);
    }
    var is_text_title=true;
    $.each(inputs, function(i,e){
        var attr_name = $(e).attr("id");//获取弹出窗口的id
        var attr_val = $(e).val();//获取值
        switch(attr_name)
        {
          case 'text_title':
         	  if(attr_val==""||attr_val==null){
             		is_text_title=false;
            		return;
            	}
            $(leipiplugins).attr("title",attr_val);
            active_component.find(".leipiplugins-orgname").text(attr_val);
            break;
            default:
            $(leipiplugins).attr(attr_name, attr_val);
        }
     });
    if(!is_text_title){
    	  layer.msg('标题不能为空');
    	  return ;
      }else{
       active_component.popover("hide");
       LPB.genSource();//重置源代码
      }
});}
/* 复选控件 checkbox
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['checkbox'] = function (active_component,leipiplugins) {
  var plugins = 'checkbox',popover = $(".popover");
  //右弹form  初始化值
  $(popover).find("#orgname").val($(leipiplugins).attr("title"));
  val = $.map($(leipiplugins), function(e,i){return $(e).val().trim()});
  val = val.join("\r");
  $(popover).find("#orgvalue").text(val);
  //右弹form  取消控件
  $(popover).delegate(".btn-danger", "click", function(e){
     
      active_component.popover("hide");
  });
  //右弹form  确定控件
  $(popover).delegate(".btn-info", "click", function(e){
     
      var inputs = $(popover).find("input");
      if($(popover).find("textarea").length>0)
      {
          inputs.push($(popover).find("textarea")[0]);
      }
      $.each(inputs, function(i,e){
          var attr_name = $(e).attr("id");//属性名称
          var attr_val = $(e).val();
          switch(attr_name)
          {
            //要break
            case 'orgvalue':
              var checkboxes = attr_val.split("\n");
              var html = "<!-- Multiple Checkboxes -->\n";
              $.each(checkboxes, function(i,e){
                if(e.length > 0){
                  var vName = $(leipiplugins).eq(i).attr("name"),vTitle = $(leipiplugins).eq(i).attr("title"),orginline = $(leipiplugins).eq(i).attr("orginline");
                  if(!vName) vName = ''; if(!vTitle) vTitle = ''; if(!orginline) orginline = '';
                  html += '<label class="checkbox '+orginline+'">\n<input type="checkbox" name="'+vName+'" title="'+vTitle+'" value="'+e+'" orginline="'+orginline+'" class="leipiplugins" leipiplugins="checkbox" >'+e+'\n</label>';
                  }
                $(active_component).find(".leipiplugins-orgvalue").html(html);
              });
              break;
            
            case 'orgname': 
              $(leipiplugins).attr("title",attr_val);
              active_component.find(".leipiplugins-orgname").text(attr_val);
              break;
            default:
              $(leipiplugins).attr(attr_name, attr_val);
          }
     
      });
      if(!is_text_title){
      	  layer.msg('标题不能为空');
      	  return ;
        }else  if(!is_text_zyhs){
      	  layer.msg('行数不能为空');
      	  return ;
        }else  if(!is_text_zfcd){
        	layer.msg('字段长度不能为空');
      	  return ;
        }else{
         active_component.popover("hide");
         LPB.genSource();//重置源代码
        }
  });
}

/* 复选控件 radio
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['radio'] = function (active_component,leipiplugins) {
  var plugins = 'radio',popover = $(".popover");
  //右弹form  初始化值
  $(popover).find("#orgname").val($(leipiplugins).attr("title"));
  val = $.map($(leipiplugins), function(e,i){return $(e).val().trim()});
  val = val.join("\r");
  $(popover).find("#orgvalue").text(val);
  //右弹form  取消控件
  $(popover).delegate(".btn-danger", "click", function(e){
     
      active_component.popover("hide");
  });
  //右弹form  确定控件
  $(popover).delegate(".btn-info", "click", function(e){
     
      var inputs = $(popover).find("input");
      if($(popover).find("textarea").length>0)
      {
          inputs.push($(popover).find("textarea")[0]);
      }
      $.each(inputs, function(i,e){
          var attr_name = $(e).attr("id");//属性名称
          var attr_val = $(e).val();
          switch(attr_name)
          {
            //要break
            case 'orgvalue':
              var checkboxes = attr_val.split("\n");
              var html = "<!-- Multiple Checkboxes -->\n";
              $.each(checkboxes, function(i,e){
                if(e.length > 0){
                  var vName = $(leipiplugins).eq(i).attr("name"),vTitle = $(leipiplugins).eq(i).attr("title"),orginline = $(leipiplugins).eq(i).attr("orginline");
                  if(!vName) vName = ''; if(!vTitle) vTitle = ''; if(!orginline) orginline = '';
                  html += '<label class="radio '+orginline+'">\n<input type="radio" name="'+vName+'" title="'+vTitle+'" value="'+e+'" orginline="'+orginline+'" class="leipiplugins" leipiplugins="radio" >'+e+'\n</label>';
                  }
                $(active_component).find(".leipiplugins-orgvalue").html(html);
              });
              break;
            
            case 'orgname': 
              $(leipiplugins).attr("title",attr_val);
              active_component.find(".leipiplugins-orgname").text(attr_val);
              break;
            default:
              $(leipiplugins).attr(attr_name, attr_val);
          }
          active_component.popover("hide");
          LPB.genSource();//重置源代码
      });

  });
}

/* 上传控件 uploadfile
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['uploadfile'] = function (active_component,leipiplugins) {
  var plugins = 'uploadfile',popover = $(".popover");
  //右弹form  初始化值
  $(popover).find("#orgname").val($(leipiplugins).attr("title"));
  //右弹form  取消控件
  $(popover).delegate(".btn-danger", "click", function(e){
     
      active_component.popover("hide");
  });
  //右弹form  确定控件
  $(popover).delegate(".btn-info", "click", function(e){
       var inputs = $(popover).find("input");
      if($(popover).find("textarea").length>0)
      {
          inputs.push($(popover).find("textarea")[0]);
      }
      $.each(inputs, function(i,e){
          var attr_name = $(e).attr("id");//属性名称
          var attr_val = $(e).val();
          switch(attr_name)
          {
            case 'orgname': 
              $(leipiplugins).attr("title",attr_val);
              active_component.find(".leipiplugins-orgname").text(attr_val);
              break;
            default:
              $(leipiplugins).attr(attr_name, attr_val);
          }
          active_component.popover("hide");
          LPB.genSource();//重置源代码
      });

  });
}