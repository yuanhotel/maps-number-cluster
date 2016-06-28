if (typeof maps.NumberCluster.adapters == 'undefined') {
    maps.NumberCluster.adapters = {};
}
maps.NumberCluster.adapters.bmap = function(input) {
    var self = this;
    zoomLevel = 11;
    var point = new BMap.Point(input.center.lng, input.center.lat); //定义一个点坐标
	this.map = new BMap.Map(input.containerId + '_bmap');
	this.map.centerAndZoom(point, zoomLevel);
	this.map.enableScrollWheelZoom();// 允许滚轮缩放
	this.map.addControl(new BMap.NavigationControl());
}

maps.NumberCluster.adapters.bmap.prototype.addNumbers = function(numbers) {
    var self = this;
    $.each(numbers, function(k, v) {
        var point = new BMap.Point(v.lng, v.lat);
        //自定义点标记内容
		var width = v.number.toString().length;
        if (width <= 2) {
            width = 3; //1位数时是背景太小，所以要加大一点
        }
		var marker = new TextMarker(self.map,point,v.number.toString(),width);
		self.map.addOverlay(marker);
    });
	$('div.bmapContent').each(function() {
		var width = $(this).width();
		$(this).css({'height': width + 'px','line-height': width + 'px', 'border-radius': width + 'px'});
	});

}

function TextMarker(map,point, text, length){
  this._map = map;
  this._point = point;
  this._text = text;
  this._length = length;
}
TextMarker.prototype = new BMap.Overlay();
TextMarker.prototype.initialize = function(){
  var div = this._div = document.createElement("div");
  var span = this._span = document.createElement("span");
  div.appendChild(span);
  span.appendChild(document.createTextNode(this._text));
  
  div.className = "bmapContent";
  div.style.position = "absolute";
  div.style.padding = this._length + "px";
  div.style.backgroundColor="#ffbf00";

  this._map.getPanes().labelPane.appendChild(div);
  return div;
}
TextMarker.prototype.draw = function(){
  var pixel = this._map.pointToOverlayPixel(this._point);
  this._div.style.left = pixel.x + "px";
  this._div.style.top  = pixel.y + "px";
}
