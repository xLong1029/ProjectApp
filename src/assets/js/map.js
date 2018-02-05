//创建和初始化地图函数：
function initMap(mapObj){
    createMap(mapObj.id, mapObj.point.X, mapObj.point.Y, mapObj.zoom);//创建地图
    if(mapObj.setEvent){
        setMapEvent();//设置地图事件
    }
    if(mapObj.addMarker){
       addMarker(mapObj.markerArr);//向地图中添加marker 
    }
    if(mapObj.addMapControl){
        addMapControl();//向地图添加控件
    }
}

//创建地图函数：
function createMap(mapID, mapPointX, mapPointY, mapZoom){
    var map = new BMap.Map(mapID);//在百度地图容器中创建一个地图
    var point = new BMap.Point(mapPointX, mapPointY);//定义一个中心点坐标
    map.centerAndZoom(point, mapZoom);//设定地图的中心点和地图级别并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent(){
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl(){
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT});
    map.addControl(ctrl_sca);
}

//标注点数组（w,h为图标大小）
//var markerArr = [{title:"XLONG家里蹲",content:"XLONG家里蹲有限公司",point:"109.409431|24.35962",isOpen:0,icon:{w:33,h:46,l:0,t:0,x:6,lb:5}}];
//创建marker
function addMarker(markerArr){
    for(var i=0;i<markerArr.length;i++){
        var json = markerArr[i];
        var p0 = json.point.split("|")[0];
        var p1 = json.point.split("|")[1];
        var point = new BMap.Point(p0,p1);
        var iconImg = createIcon(json.icon);
        var marker = new BMap.Marker(point,{icon:iconImg});
        var iw = createInfoWindow(i, markerArr);
        //offset设置left和top的值
        var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.label.left, json.label.top)});
        marker.setLabel(label);
        map.addOverlay(marker);
        //设置标签样式
        label.setStyle(json.label);
        
        (function(){
            var index = i;
            var _iw = createInfoWindow(i, markerArr);
            var _marker = marker;
            _marker.addEventListener("click",function(){
                this.openInfoWindow(_iw);
            });
            _iw.addEventListener("open",function(){
                _marker.getLabel().hide();
            })
            _iw.addEventListener("close",function(){
                _marker.getLabel().show();
            })
            label.addEventListener("click",function(){
                _marker.openInfoWindow(_iw);
            })
            if(!!json.isOpen){
                label.hide();
                _marker.openInfoWindow(_iw);
            }
        })()
    }
}
//创建InfoWindow
function createInfoWindow(i, markerArr){
    var json = markerArr[i];
    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
    return iw;
}
//创建一个Icon
function createIcon(json){
    //设置ICON图标和大小
    var icon = new BMap.Icon(json.url, new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
    return icon;
}

export { //很关键
  initMap
}