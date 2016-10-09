$(window).on("load",function(){
        imgLocation();
        //滚动加载
        var dataImg = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"}]}
        window.onscroll = function(){
            if(scrollside()){
            	$.each(dataImg.data,function(index,value){
            		var box = $("<div></div>").addClass("box").appendTo($(".container"));
            		var content = $("<div></div>").addClass("content").appendTo(box);
            		$("<img>").attr("src","./img/"+$(value).attr("src")).appendTo(content);
            	});
                imgLocation();
            };
        };
        //窗口变化
        window.onresize = function(){
        	imgLocation();
        };
    });
//滚动加载
function scrollside(){
	var box = $(".box");
	var lastboxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height()/2);
    console.log(lastboxHeight);
    var documentHeight = $(document).height();
    console.log(documentHeight);
    var scrollHeight = $(window).scrollTop();
    console.log(scrollHeight);
    return lastboxHeight < scrollHeight + documentHeight;
}
//图片瀑布流
function imgLocation(){
	var box = $(".box");
	var boxWidth = box.eq(0).width();
	var num = Math.floor($(window).width()/boxWidth);
	//console.log(num);
	var boxArr = [];
	box.each(function(index,value){
       // console.log(index);
        //console.log(value);
        var boxHeight = box.eq(index).height();
        if(index < num){
            boxArr[index] = boxHeight;
            //console.log(boxArr[index]);
            $(value).css({
                "position":"absolute",
                "top":0,
                "left":index*boxWidth
        	}); 
        }else{
        	var minboxHeight = Math.min.apply(null,boxArr);
        	//console.log(minboxHeight);
        	var minboxIndex = $.inArray(minboxHeight,boxArr);
        	console.log(minboxIndex);
        	//console.log(value);
        	$(value).css({
                "position":"absolute",
                "top":minboxHeight,
                "left":box.eq(minboxIndex).position().left
        	});  
            boxArr[minboxIndex] += box.eq(index).height();
        }
	});
};


