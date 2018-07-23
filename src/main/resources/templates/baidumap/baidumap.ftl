<!DOCTYPE html>
<html>
<head>
    <base href=" ${basepath}">
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />

    <title> </title>
<#include "/public_css.ftl" >
    <link rel="stylesheet" href="css/model/rygj.css">
    <style type="text/css">
        body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
    </style>
    <link rel="stylesheet" href="css/map/map.css">
</head>

<body>

<div class="warpper">
    <form role="form" class="select-box border-bottom-style" >
        <table id="data_1">
            <tr>
                <td class="control-label" >设备名称：
                </td>
                <td class="input-group date">
                    <div class="input-group" style="width:300px">
                        <input type="text" class="form-control" id="equipment_id">
                        <div class="input-group-btn">
                            <button type="button" class="btn btn-white dropdown-toggle" data-toggle="dropdown">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
                        </div>
                    </div>
                </td>
                <td>
                    <a class="lf-btn blue-btn btn-primary" onclick="locationMap()" >查询</a>
                </td>
            </tr>
        </table>
    </form>
    <!--加载地图  -->
    <div id="allmap"></div>
    <div class="legend-color" >
        <p class="item-row" ><span class="color" style="background-color: rgb(0,228,0);">优</span></p>
        <p class="item-row"><span class="color" style="background-color: rgb(255,255,0);">良</span></p>
        <p class="item-row"><span class="color" style="background-color: rgb(255,126,0);">轻度污染</span></p>
        <p class="item-row"><span class="color" style="background-color: rgb(255,0,0);">中度污染</span></p>
        <p class="item-row"><span class="color" style="background-color: rgb(153,0,76);">重度污染</span></p>
        <p class="item-row"><span class="color" style="background-color: rgb(126,0,35);">严重污染</span></p>
    </div>
    <div class="data-container" style="display: none;">
        <img  src="img/gis/close.jpg" class="map-img" onclick="$('div.warpper > div.data-container').hide()"></img>
        <div class="top-lay">
            <div class="item-row-name item-row-txt-name"></div>
            <div class="item-row item-row-txt-primary"></div>
            <div class="item-row item-row-txt-time"></div>
        </div>
        <div class="bottom-lay">
            <div class="item-row"><span class="item-row-title">传感器状态</sub></span><span id="itemp001" class="item-row-txt item-row-txt-pm25"></span><span class="item-row-unit"></span></div>
            <div class="item-row"><span class="item-row-title">PM<sub>2.5</sub></span><span id="itemp002" class="item-row-txt item-row-txt-pm10"></span><span class="item-row-unit">μg/m<sup>3</sup></span></div>
            <div class="item-row"><span class="item-row-title">PM<sub>10</sub></span><span id="itemp003" class="item-row-txt item-row-txt-so2"></span><span class="item-row-unit">μg/m<sup>3</sup></span></div>
            <div class="item-row"><span class="item-row-title">PM<sub>100</sub></span><span id="itemp009" class="item-row-txt item-row-txt-so2"></span><span class="item-row-unit">μg/m<sup>3</sup></span></div>
            <div class="item-row"><span class="item-row-title">风速</span><span id="itemp004" class="item-row-txt item-row-txt-no2"></span><span class="item-row-unit">M/S</span></div>
            <div class="item-row"><span class="item-row-title">风向</span><span id="itemp005" class="item-row-txt item-row-txt-co"></span><span class="item-row-unit">方向</span></div>
            <div class="item-row"><span class="item-row-title">温度</span><span id="itemp006" class="item-row-txt item-row-txt-co"></span><span class="item-row-unit">摄氏度</span></div>
            <div class="item-row"><span class="item-row-title">湿度</span><span id="itemp007" class="item-row-txt item-row-txt-co"></span><span class="item-row-unit">RH%</span></div>
            <div class="item-row"><span class="item-row-title">噪音</span><span id="itemp008" class="item-row-txt item-row-txt-o3"></span><span class="item-row-unit">分贝</span></div>
        </div>
    </div>
    
    <div class="data-container2" style="display: none;">
        <img  src="img/gis/close.jpg" class="map-img" onclick="$('div.warpper > div.data-container2').hide()"></img>
        <div class="top-lay">
            <div class="item-row-name item-row-txt-name2">视频监控</div>
        </div>
    </div>
</div>
</body>
<#include "/public_js.ftl" >
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=WzaT655XL9yMmiPr324iGaQHTqmah2cv"></script>
<script type="text/javascript" src="mapjs/baidumap.js"></script>

</html>