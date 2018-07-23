/*e.preventDefault();//阻止元素发生默认的行为(例如,当点击提交按钮时阻止对表单的提交*/

/* 文本框控件 text
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['text'] = function (active_component,leipiplugins) {
  var plugins = 'text',popover = $(".popover");
  //右弹form  初始化值
  $(popover).find("#form_biaoti").val($(leipiplugins).attr("title"));//标题
  $(popover).find("#form_tishi").val($(leipiplugins).attr("form_tishi"));//默认值 提示
   
  $($(popover).find("#form_bt")[$(leipiplugins).attr("form_bt")-1]).attr("checked","checked");//初始化是否必填
  $(popover).find("#form_cd").val($(leipiplugins).attr("form_cd"));
  //右弹form  取消控件
  $(popover).delegate(".btn-danger", "click", function(e){
       active_component.popover("hide");
  });
 
  //右弹form  确定控件
  $(popover).delegate(".btn-info", "click", function(e){
	   
	// alert($(form).validate().form()) ;
//	 var form = $(popover).find("form");
//	//alert($(form).validate().form());
//	 if($(form).validate().form()){
//		// $(form).validate();
//		 alert("返回");
//	 
//	 }
//	 var va= $(form).validate({
//			  errorPlacement: function(error, element) {
//			      alert("1111:"+$(error[0]).html());
//			    }
//			 });
// 
//	 alert(va.form());
      var inputs = $(popover).find("input");
      if($(popover).find("textarea").length>0)
      {
          inputs.push($(popover).find("textarea")[0]);
      }
      var err='';
       $.each(inputs, function(i,e){
          var attr_name = $(e).attr("id");//属性名称
          var attr_val = $(e).val();
          switch(attr_name)
          {
            //要break
            case 'form_tishi':
               //$(leipiplugins).val(attr_val);
             // $(leipiplugins).attr("value", attr_val);//默认值
            	$(leipiplugins).attr("placeholder", attr_val); 
            	$(leipiplugins).attr("form_tishi", attr_val);//提示框
              break;
            //没有break
            case 'form_biaoti':
            	err+=is_biaoti(attr_val);
            	if(is_biaoti(attr_val)!=''){break;}
                $(leipiplugins).attr("title",attr_val);
              active_component.find(".leipiplugins-orgname").text(attr_val);
              break;
            case 'form_bt': 
            	// alert($(e).attr("checked")); 如果是必填 增加必填提示
            	 if($(e).attr("checked")=='checked'){
            		 if(attr_val==1){
            			 active_component.find(".leipiplugins-orgname").text( active_component.find(".leipiplugins-orgname").text()+"(必填)");
            		 }
            		 $(leipiplugins).attr("form_bt",attr_val);
            	 }
            	 break;
            case 'form_cd': 
             	err+=is_changdu(attr_val);
              	if(is_changdu(attr_val)!=''){break;}
               	$(leipiplugins).attr("form_cd",attr_val);
              break;
            default:
              $(leipiplugins).attr(attr_name, attr_val);
          }
        
       });
      
      if(err!=''){
          layer.alert(err, {icon: 6});
          return;
        }
      active_component.popover("hide");
      LPB.genSource();//重置源代码
  });
}
/* 多行文本框控件 textarea
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['textarea'] = function (active_component,leipiplugins) {
  var plugins = 'textarea',popover = $(".popover");
  //右弹form  初始化值
  $(popover).find("#form_biaoti").val($(leipiplugins).attr("title"));
  $(popover).find("#form_tishi").val($(leipiplugins).attr("form_tishi"));//默认值 提示
  $($(popover).find("#form_bt")[$(leipiplugins).attr("form_bt")-1]).attr("checked","checked");//初始化是否必填
   $(popover).find("#form_cd").val($(leipiplugins).attr("form_cd"));
  
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
      var err='';
      $.each(inputs, function(i,e){
          var attr_name = $(e).attr("id");//属性名称
          var attr_val = $(e).val();
          switch(attr_name)
          {
            //要break
            case 'form_tishi':
              //$(leipiplugins).val(attr_val);
             // $(leipiplugins).text(attr_val);
            	$(leipiplugins).attr("placeholder", attr_val); 
              $(leipiplugins).attr("form_tishi", attr_val);
              break;
            //没有break
            case 'form_biaoti': 
            	err+=is_biaoti(attr_val);
            	if(is_biaoti(attr_val)!=''){break;}
              	$(leipiplugins).attr("title",attr_val);
            	active_component.find(".leipiplugins-orgname").text(attr_val);
            case 'form_bt': 
            	// alert($(e).attr("checked")); 如果是必填 增加必填提示
            	 if($(e).attr("checked")=='checked'){
            		 if(attr_val==1){
            			 active_component.find(".leipiplugins-orgname").text( active_component.find(".leipiplugins-orgname").text()+"(必填)");
             		 }
            		 $(leipiplugins).attr("form_bt",attr_val);
            	 }
            	 break;
            case 'form_cd': 
              	err+=is_changdu(attr_val);
              	if(is_changdu(attr_val)!=''){break;}
             	$(leipiplugins).attr("form_cd",attr_val);
            	 break;
             default:
              $(leipiplugins).attr(attr_name, attr_val);
          }
         
      });
      if(err!=''){
          layer.alert(err, {icon: 6});
          return;
        }
      active_component.popover("hide");
      LPB.genSource();//重置源代码
  });
}
/* 下拉框控件 select
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['select'] = function (active_component,leipiplugins) {
  var plugins = 'select',popover = $(".popover");
   
  //右弹form  初始化值
  $(popover).find("#form_biaoti").val($(leipiplugins).attr("title"));
  var val = $.map($(leipiplugins).find("option"), function(e,i){return $(e).text()});
  val = val.join("\r");
  $(popover).find("#orgvalue").text(val);
  $($(popover).find("#form_bt")[$(leipiplugins).attr("form_bt")-1]).attr("checked","checked");//初始化是否必填

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
      var err='';
      $.each(inputs, function(i,e){
          var attr_name = $(e).attr("id");//属性名称
          var attr_val = $(e).val();
          switch(attr_name)
          {
            //要break
            case 'orgvalue':
              var options = attr_val.split("\n");
              $(leipiplugins).html("");
              $.each(options, function(i,e){
                $(leipiplugins).append("\n      ");
                $(leipiplugins).append($("<option>").text(e));
              });
              //$(leipiplugins).text(attr_val);
              break;
            
            case 'form_biaoti': 
            	err=is_biaoti(attr_val);
            	if(is_biaoti(attr_val)!=''){break;}
                $(leipiplugins).attr("title",attr_val);
               active_component.find(".leipiplugins-orgname").text(attr_val);
              break;
            case 'form_bt': 
            	// alert($(e).attr("checked")); 如果是必填 增加必填提示
            	 if($(e).attr("checked")=='checked'){
            		 if(attr_val==1){
            			 active_component.find(".leipiplugins-orgname").text( active_component.find(".leipiplugins-orgname").text()+"(必填)");
            		 }
            		 $(leipiplugins).attr("form_bt",attr_val);
            	 }
            	 break;
            default:
              $(leipiplugins).attr(attr_name, attr_val);
          }
       });
      if(err!=''){
          layer.alert(err, {icon: 6});
          return;
        }
      active_component.popover("hide");
      LPB.genSource();//重置源代码
  });
}

/* 复选控件 checkbox
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['checkbox'] = function (active_component,leipiplugins) {
  var plugins = 'checkbox',popover = $(".popover");
  //右弹form  初始化值
  $(popover).find("#form_biaoti").val($(leipiplugins).attr("title"));
  
  val = $.map($(leipiplugins), function(e,i){return $(e).val().trim()});
  val = val.join("\r");
  $(popover).find("#form_tishi").text(val);
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
      var err='';
      $.each(inputs, function(i,e){
          var attr_name = $(e).attr("id");//属性名称
          var attr_val = $(e).val();
          switch(attr_name)
          {
            //要break
            case 'form_tishi':
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
            
            case 'form_biaoti': 
            	err=is_biaoti(attr_val);
            	if(is_biaoti(attr_val)!=''){break;}
               $(leipiplugins).attr("title",attr_val);
              active_component.find(".leipiplugins-orgname").text(attr_val);
              break;
            default:
              $(leipiplugins).attr(attr_name, attr_val);
          }
       });
      if(err!=''){
          layer.alert(err, {icon: 6});
          return;
        }
      active_component.popover("hide");
      LPB.genSource();//重置源代码
  });
}

/* 复选控件 radio
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['radio'] = function (active_component,leipiplugins) {
  var plugins = 'radio',popover = $(".popover");
  //右弹form  初始化值
  $(popover).find("#form_biaoti").val($(leipiplugins).attr("title"));
  val = $.map($(leipiplugins), function(e,i){return $(e).val().trim()});
  val = val.join("\r");
  $(popover).find("#form_tishi").text(val);
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
      var err='';
      $.each(inputs, function(i,e){
          var attr_name = $(e).attr("id");//属性名称
          var attr_val = $(e).val();
          switch(attr_name)
          {
            //要break
            case 'form_tishi':
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
            
            case 'form_biaoti': 
            	err+=is_biaoti(attr_val);
            	if(is_biaoti(attr_val)!=''){break;}
               $(leipiplugins).attr("title",attr_val);
              active_component.find(".leipiplugins-orgname").text(attr_val);
              break;
            case 'form_bt': 
            	// alert($(e).attr("checked")); 如果是必填 增加必填提示
            	 if($(e).attr("checked")=='checked'){
            		 if(attr_val==1){
            			 active_component.find(".leipiplugins-orgname").text( active_component.find(".leipiplugins-orgname").text()+"(必填)");
            		 }
            		 $(leipiplugins).attr("form_bt",attr_val);
            	 }
            	 break;
            default:
              $(leipiplugins).attr(attr_name, attr_val);
          }
          
      });
      if(err!=''){
          layer.alert(err, {icon: 6});
          return;
        }
      active_component.popover("hide");
      LPB.genSource();//重置源代码
  });
}

/* 上传控件 uploadfile
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['uploadfile'] = function (active_component,leipiplugins) {
  var plugins = 'uploadfile',popover = $(".popover");
  //右弹form  初始化值
  $(popover).find("#form_biaoti").val($(leipiplugins).attr("title"));
  $($(popover).find("#form_bt")[$(leipiplugins).attr("form_bt")-1]).attr("checked","checked");//初始化是否必填
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
      var err='';
      $.each(inputs, function(i,e){
          var attr_name = $(e).attr("id");//属性名称
          var attr_val = $(e).val();
          switch(attr_name)
          {
            case 'form_biaoti': 
            	err+=is_biaoti(attr_val);
            	if(is_biaoti(attr_val)!=''){break;}
               $(leipiplugins).attr("title",attr_val);
              active_component.find(".leipiplugins-orgname").text(attr_val);
              break;
            case 'form_bt': 
            	// alert($(e).attr("checked")); 如果是必填 增加必填提示
            	 if($(e).attr("checked")=='checked'){
            		 if(attr_val==1){
            			 active_component.find(".leipiplugins-orgname").text( active_component.find(".leipiplugins-orgname").text()+"(必填)");
            		 }
            		 $(leipiplugins).attr("form_bt",attr_val);
            	 }
            	 break;
            default:
              $(leipiplugins).attr(attr_name, attr_val);
          }
          
      });
      if(err!=''){
          layer.alert(err, {icon: 6});
          return;
        }
      active_component.popover("hide");
      LPB.genSource();//重置源代码
  });
}

/* 日期控件   date
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['date'] = function (active_component,leipiplugins) {
   var plugins = 'date',popover = $(".popover");
  //右弹form  初始化值
  //alert($(leipiplugins).attr("title"));
  $(popover).find("#form_biaoti").val($(leipiplugins).attr("title"));
  $(popover).find("#data_form_geshi").val($(leipiplugins).attr("v_value_type"));
  $($(popover).find("#form_bt")[$(leipiplugins).attr("form_bt")-1]).attr("checked","checked");//初始化是否必填
  
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
      var err='';
      $.each(inputs, function(i,e){
          var attr_name = $(e).attr("id");//属性名称
          var attr_val = $(e).val();
          switch(attr_name)
          {
            case 'form_biaoti': 
            	err+=is_biaoti(attr_val);
            	if(is_biaoti(attr_val)!=''){break;}
               $(leipiplugins).attr("title",attr_val);
             $(leipiplugins).attr("form_tishi",attr_val);
              active_component.find(".leipiplugins-orgname").text(attr_val);
              break;
            case 'form_bt': 
            	// alert($(e).attr("checked")); 如果是必填 增加必填提示
            	 if($(e).attr("checked")=='checked'){
            		 if(attr_val==1){
            			 active_component.find(".leipiplugins-orgname").text( active_component.find(".leipiplugins-orgname").text()+"(必填)");
            		 }
            		 $(leipiplugins).attr("form_bt",attr_val);
            	 }
            	 break;
            default:
              $(leipiplugins).attr(attr_name, attr_val);
          }
       });
 //定制编写.   拥有日期格式的选择确定后点效果
      var select = $(popover).find("select");
  	 if($(select[0]).val()==1){
 		// $(leipiplugins).attr("form_tishi","年月日时分");
 		  $(leipiplugins).attr("v_value_type",1);//存储类型 拥有再次点击打开回调
 		 $(leipiplugins).attr("placeholder", "年月日时分"); 
 	 }else if($(select[0]).val()==2){
 		// $(leipiplugins).attr("form_tishi","年月日");
 		 $(leipiplugins).attr("v_value_type",2);//存储类型 拥有再次点击打开回调
 		 $(leipiplugins).attr("placeholder", "年月日"); 
 	 }else if($(select[0]).val()==3){
 		// $(leipiplugins).attr("form_tishi","时分");
 		 $(leipiplugins).attr("v_value_type",3);//存储类型 拥有再次点击打开回调
 		 $(leipiplugins).attr("placeholder", "时分"); 
 	 }else{
            err+="错误关闭!没有获取到日期空间类型选项!";
 	 }
  	  if(err!=''){
          layer.alert(err, {icon: 6});
          return;
        }
      active_component.popover("hide");
      LPB.genSource();//重置源代码
  });
}

/* 区间日期控件   date
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['date_group'] = function (active_component,leipiplugins) {
   var plugins = 'date_group',popover = $(".popover");
  //右弹form  初始化值
  //alert($(leipiplugins).attr("title"));
  $(popover).find("#form_biaoti").val($(leipiplugins).attr("title"));
  $(popover).find("#data_form_geshi").val($(leipiplugins).attr("v_value_type"));
  $($(popover).find("#form_bt")[$(leipiplugins).attr("form_bt")-1]).attr("checked","checked");//初始化是否必填
  
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
      var err='';
      $.each(inputs, function(i,e){
          var attr_name = $(e).attr("id");//属性名称
          var attr_val = $(e).val();
     
          switch(attr_name)
          {
            case 'form_biaoti': 
            	err+=is_biaoti(attr_val);
            	if(is_biaoti(attr_val)!=''){break;}
               $(leipiplugins).attr("title",attr_val);
               active_component.find(".leipiplugins-orgname").text(attr_val);
              break;
            case 'form_bt': 
            	// alert($(e).attr("checked")); 如果是必填 增加必填提示
            	 if($(e).attr("checked")=='checked'){
            		 if(attr_val==1){
            			 active_component.find(".leipiplugins-orgname").text( active_component.find(".leipiplugins-orgname").text()+"(必填)");
            		 }
            		 $(leipiplugins).attr("form_bt",attr_val);
            	 }
            break;
           // default:
             // $(leipiplugins).attr(attr_name, attr_val);
          }
   
      });
      
      var select = $(popover).find("select");
      $.each(select, function(i,e){
          var attr_name = $(e).attr("id");//属性名称
          var attr_val = $(e).val();
         // alert(attr_name+"  "+attr_val);
          switch(attr_name)
          {
            case 'data_form_geshi': 
            // $(leipiplugins).attr("form_tishi",attr_val); //提示内容用于回显
             // $(leipiplugins).attr("date_geshi",attr_val);//存储日期选择类型类型 拥有再次点击打开回调
            	 if(attr_val==1){
          		// $(leipiplugins).attr("form_tishi","年月日时分");
          		  $(leipiplugins).attr("v_value_type",1);//存储类型 拥有再次点击打开回调
          		 $(leipiplugins).attr("placeholder", "年月日时分"); 
          	   }else if(attr_val==2){
          		// $(leipiplugins).attr("form_tishi","年月日");
          		 $(leipiplugins).attr("v_value_type",2);//存储类型 拥有再次点击打开回调
          		 $(leipiplugins).attr("placeholder", "年月日"); 
          	   }else if(attr_val==3){
          		// $(leipiplugins).attr("form_tishi","时分");
          		 $(leipiplugins).attr("v_value_type",3);//存储类型 拥有再次点击打开回调
          		 $(leipiplugins).attr("placeholder", "时分"); 
          	   }else{
           		 err+="没有获取到日期空间类型选项!";
          	   }
              
              break;
           }
          
      });
      if(err!=''){
          layer.alert(err, {icon: 6});
          return;
        }
      active_component.popover("hide");
      LPB.genSource();//重置源代码
  });
}


/* 图片 uploadfile
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['image'] = function (active_component,leipiplugins) {
  var plugins = 'image',popover = $(".popover");
  //右弹form  初始化值
  $(popover).find("#form_biaoti").val($(leipiplugins).attr("title"));
  $($(popover).find("#form_bt")[$(leipiplugins).attr("form_bt")-1]).attr("checked","checked");//初始化是否必填
  $($(popover).find("#form_pz")[$(leipiplugins).attr("form_pz")-1]).attr("checked","checked");//初始化是否必填
  $(popover).find("#form_cd").val($(leipiplugins).attr("form_cd"));

  
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
      var err="";
      $.each(inputs, function(i,e){
          var attr_name = $(e).attr("id");//属性名称
          var attr_val = $(e).val();
          switch(attr_name)
          {
            case 'form_biaoti': 
            	err+=is_biaoti(attr_val);
            	if(is_biaoti(attr_val)!=''){break;}
               $(leipiplugins).attr("title",attr_val);
              active_component.find(".leipiplugins-orgname").text(attr_val);
              break;
            case 'form_bt': 
            	// alert($(e).attr("checked")); 如果是必填 增加必填提示
            	 if($(e).attr("checked")=='checked'){
            		 if(attr_val==1){
            			 active_component.find(".leipiplugins-orgname").text( active_component.find(".leipiplugins-orgname").text()+"(必填)");
            		 }
            		 $(leipiplugins).attr("form_bt",attr_val);
            	 }
            	 break;
            case 'form_pz': 
            	// alert($(e).attr("checked")); 如果是必填 增加必填提示
            	 if($(e).attr("checked")=='checked'){
            		 if(attr_val==1){
            			 active_component.find(".leipiplugins-orgname").text( active_component.find(".leipiplugins-orgname").text()+"(拍照)");
            		 }
            		 $(leipiplugins).attr("form_pz",attr_val);
            	 }
            	 break;	 
            case 'form_cd': 
 	              	if(attr_val==''){
	           		 err+="图片张数必填!<br>";
	           		 break;	 
		           	}
		           	else if(!/^[0-9]*$/.test(attr_val)){  
		           		  err+="图片张数必须是数字!<br>";
		           		 break;	 
		           	}  
             	$(leipiplugins).attr("form_cd",attr_val);
            	 break;
             default:
              $(leipiplugins).attr(attr_name, attr_val);
          }
         
      });
      if(err!=''){
          layer.alert(err, {icon: 6});
          return;
        }
      active_component.popover("hide");
      LPB.genSource();//重置源代码
  });
}


/* 定位 location
acc  是 class="component" 的DIV 
e 是 class="leipiplugins" 的控件
*/
LPB.plugins['location'] = function (active_component,leipiplugins) {
  var plugins = 'location',popover = $(".popover");
  //右弹form  初始化值
  $(popover).find("#form_biaoti").val($(leipiplugins).attr("title"));
  $($(popover).find("#form_bt")[$(leipiplugins).attr("form_bt")-1]).attr("checked","checked");//初始化是否必填
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
      var err='';
      $.each(inputs, function(i,e){
          var attr_name = $(e).attr("id");//属性名称
          var attr_val = $(e).val();
          switch(attr_name)
          {
            case 'form_biaoti': 
            	err+=is_biaoti(attr_val);
            	if(is_biaoti(attr_val)!=''){break;}
              $(leipiplugins).attr("title",attr_val);
              active_component.find(".leipiplugins-orgname").text(attr_val);
              break;
            case 'form_bt': 
            	// alert($(e).attr("checked")); 如果是必填 增加必填提示
            	 if($(e).attr("checked")=='checked'){
            		 if(attr_val==1){
            			 active_component.find(".leipiplugins-orgname").text( active_component.find(".leipiplugins-orgname").text()+"(必填)");
            		 }
            		 $(leipiplugins).attr("form_bt",attr_val);
            	 }
            	 break;
            default:
              $(leipiplugins).attr(attr_name, attr_val);
          }
         
      });
      if(err!=''){
          layer.alert(err, {icon: 6});
          return;
        }
      active_component.popover("hide");
      LPB.genSource();//重置源代码
  });
}