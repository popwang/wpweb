;
(function($) {
	$.fn.initSelectMore = function(options) {
		//默认参数
		var defaults = {
			elementNum: "curElement",
			dataUrl: "js/data.json",
			ColumnsArr1: [{
				checkbox: true
			}, {
				field: 'Name',
				title: '部门名称'
			}, {
				field: 'ParentName',
				title: '上级部门'
			}],
			ColumnsArr2: [{
				checkbox: true
			}, {
				field: 'Name',
				title: '部门名称'
			}]
		}
		var options = $.extend(defaults, options);

		this.each(function() {
			$("body").append(
				'<div class="people-area area1 ' + options.elementNum + ' clearfix opacity0">' +
				'<div class="seach-warp">' +
				'<form class="form-inline mrg-b">' +
				'<div class="form-group">' +
				'	<label for="name">客户姓名 </label>' +
				'	<input type="text" class="form-control seach-ipt" id="name" placeholder="请输入...">' +
				'</div>' +
				'	<button type="submit" class="btn btn-default seach-ipt">搜索</button>' +
				'</form>' +
				'</div>' +
				'<div class="left-table pageInfo">' +
				'	<table class="table1"></table>' +
				'	</div>' +
				'	<div class="middle-btn">' +
				'		<span class="glyphicon glyphicon-triangle-right yd"></span>' +
				'		<span class="glyphicon glyphicon-triangle-left yc"></span>' +
				'		<span class="glyphicon glyphicon-remove ycAll"></span>' +
				'	</div>' +
				'<div class="right-table pageInfo">' +
				'	<table class="table2"></table>' +
				'	</div>' +
				'	<div class="sure">确定</div>' +
				'</div>');

			$('.table1').bootstrapTable({
				url: options.dataUrl,
				method: 'get',
				sidePagination: 'server',
				dataType: 'json',
				pagination: true,
				pageSize: 7,
				clickToSelect: true,
				height: 300,
				columns: options.ColumnsArr1
			});
			$('.table2').bootstrapTable({
				clickToSelect: true,
				height: 244,
				columns: options.ColumnsArr2
			});

			//数组判断是否含有某个元素
			Array.prototype.contains = function(obj) {
				var i = this.length;
				while(i--) {
					if(this[i] === obj) {
						return true;
					}
				}
				return false;
			}
			//数组去重
			Array.prototype.uniquelize = function() {
				var ra = new Array();
				for(var i = 0; i < this.length; i++) {
					if(!ra.contains(this[i])) {
						ra.push(this[i]);
					}
				}
				return ra;
			};
			//差集
			Array.prototype.minus = function(obj) {
				return this.uniquelize().filter(function(o) {
					return obj.contains(o) ? null : o
				});
			};
			//选人
			var selections = [],
				selections2 = [],
				tempArr = [],
				filtration = [];
			$('.'+options.elementNum+' .table1').on('check.bs.table uncheck.bs.table ' +
				'check-all.bs.table uncheck-all.bs.table',
				function() {
					selections = $.map($('.'+options.elementNum+' .table1').bootstrapTable('getSelections'), function(row) {
						return row.Name;
					});
					tempArr = selections;
				});
			//向右
			$('.'+options.elementNum+" .yd").on("click", function() {
				selections2 = $.map($('.'+options.elementNum+' .table2').bootstrapTable('getData'), function(data) {
					return data.Name
				});
				filtration = tempArr.minus(selections2);
				$('.'+options.elementNum+' .table2').bootstrapTable('append', filterData());

				function filterData() {
					var rows = [];
					if(filtration) {
						for(var i = 0; i < filtration.length; i++) {
							rows.push({
								state: false,
								Name: filtration[i]
							});
						}
					}
					return rows;
				}
			});
			//向左
			$('.'+options.elementNum+" .yc").click(function() {
				var name = $.map($('.'+options.elementNum+' .table2').bootstrapTable('getSelections'), function(row) {
					return row.Name;
				});
				$('.'+options.elementNum+' .table2').bootstrapTable('remove', {
					field: 'Name',
					values: name
				});
			});
			//全部移除
			$('.'+options.elementNum+" .ycAll").click(function() {
				$('.'+options.elementNum+' .table2').bootstrapTable('removeAll');
			});

		});

		return this;
	}
})(jQuery);