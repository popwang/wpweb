<script src="js/jquery.min.js?v=2.1.4"></script>
<script src="js/jquery-ui-1.10.4.min.js?v=2.1.4"></script>
<script src="js/plugins/jquery-form/jquery.form.js"></script>
<script src="js/bootstrap.min.js?v=3.3.5"></script>
<script src="js/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<!-- 表格js -->
<script
	src="js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<!-- 表格中文支持js -->
<script src="js/jquery.nicescroll.min.js"></script>
<!-- 自定义滚动条js -->
<script src="js/layer/layer.js" type="text/javascript" charset="utf-8"></script>
<!-- 弹窗js -->
<script src="js/bootstrap-prettyfile.js" type="text/javascript"
	charset="utf-8"></script>
<!-- file样式美化 -->
<script type="text/javascript"
	src="js/plugins/bootstrap-select-1.12.2/bootstrap-select.js"></script>
<script type="text/javascript"
	src="js/plugins/bootstrap-select-1.12.2/defaults-zh_CN.js"></script>
<script type="text/javascript"
	src='js/plugins/suggest/bootstrap-suggest.js'></script>
<script type="text/javascript"
	src='js/plugins/layer/laydate-v1.1/laydate/laydate.js'></script>
<script type="text/javascript"
	src="js/plugins/zNodes/js/jquery.ztree.core.min.js"></script>
<script type="text/javascript"
	src=" js/plugins/zNodes/js/jquery.ztree.excheck.min.js"></script>
<!--ztree多选js-->

<script src="js/plugins/bootstrap-daterangepicker-master/moment.js"
	type="text/javascript" charset="utf-8"></script>
<!-- 日期区间 -->
<script
	src="js/plugins/bootstrap-daterangepicker-master/daterangepicker.js"
	type="text/javascript" charset="utf-8"></script>
<!-- 日期区间 -->

<!-- 用于根据bootstrap table列数据的展示,截取, -->
<script type="text/javascript"> 
function  testFormatter( value, row, index) {
      	 var len=5;
		if(this.len!=null){len=this.len};
		 if(value !=null && value.length >len){
 		 return "<a href=\"javascript:void(0)\" onmouseover=\"$('.tooltips_bt_"+row.interviewId +"').tooltip();\" class=\"tooltips_bt_"+row.interviewId +"\" data-toggle=\"tooltip\" data-placement=\"top\" title='"+value+"'>"+value.substr(0,len)+"..</a>";
		 }
	  return value;
 }
 
//带入url根据查询的数据返回csv
//url导出的url
//url2导进度回调url
//btn导出按钮的jquery对象
function bsuExport(url,url2,btn){
 
	var btnhtml=btn.html();
 	btn.text("导出中");
	btn.attr({"disabled":"disabled"}); 
	btn.css("backgroundColor","gray");
 
 //如果页面中没有用于下载iframe，增加iframe到页面中
   if($('#downloadcsv').length<=0){
        $('body').append("<iframe  id=\"downloadcsv\" style=\"display:none\"></iframe>");
   }
   $('#downloadcsv').attr('src',url);
	  var timeout = setInterval(function() {
		   $.ajax( {  
			    url:url2,// 跳转到 action  
			    type:'post',  cache:false,   dataType:'json',  
			    success:function(data) {  
			        if(data.exportTag ==null ){  
						 btn.html(btnhtml);
						 btn.removeAttr("disabled");//将按钮可用
						 btn.css("backgroundColor","");
			        	clearInterval(timeout);
			        }else{
			        	btn.text("已导出:"+data.exportTag);
 			        }
			     },  
			     error : function() {  
			          // view("异常！");  
			          alert("异常！");  
			     }  
			});
    }, 600);
} 

//将对象转成url 参数 
 function parseParam(param, key){
  var paramStr="";
  if(param instanceof String||param instanceof Number||param instanceof Boolean){
    paramStr+="&"+key+"="+encodeURIComponent(param);
  }else{
    $.each(param,function(i){
      var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
      paramStr+='&'+parseParam(this, k);
    });
  }
  return paramStr.substr(1);
};
 </script>
