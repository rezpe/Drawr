//  Sebastian Perez Vasseur 2011
//  This function creates a canvas where you can draw

/*
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function createDrawr(width, height){

$canvas = $(document.createElement("canvas"))
$canvas.attr({width:width, height:height}).css({border:"black 1px solid", width:width+"px", height:height+"px" })

//Draw the Shape
$canvas.bind('mousedown', function(evt){
	var context = $(this)[0].getContext("2d")
	context.beginPath();
	context.moveTo(evt.pageX-$(this).offset().left, evt.pageY-$(this).offset().top);
	$(this).data("start",true)
        //Add the points to the list
        $(this).data("list",[{x:evt.pageX-$(this).offset().left, y:evt.pageY-$(this).offset().top}])
        //Trigger beginpath event
        $(this).trigger("beginpath",[evt.pageX-$(this).offset().left, evt.pageY-$(this).offset().top])
	
})

$canvas.bind('mousemove', function(evt){
	if ($(this).data("start")==true) {
		var context = $(this)[0].getContext("2d")
		context.lineTo(evt.pageX-$(this).offset().left, evt.pageY-$(this).offset().top);
		context.stroke();
                //Add the points to the list
                $(this).data("list").push({x:evt.pageX-$(this).offset().left, y:evt.pageY-$(this).offset().top})
                //Trigger drawing event
                $(this).trigger("drawing",[evt.pageX-$(this).offset().left, evt.pageY-$(this).offset().top])
	}						
})
				
$canvas.bind('mouseup', function(evt){
	if ($(this).data("start")==true) {
		var context = $(this)[0].getContext("2d")
		context.lineTo(evt.pageX-$(this).offset().left, evt.pageY-$(this).offset().top);
		context.stroke();
		$(this).data("start",false)
                context.clearRect (0, 0,  parseInt($(this).attr("width")), parseInt($(this).attr("height")));
                //Add the points to the list
                $(this).data("list").push({x:evt.pageX-$(this).offset().left, y:evt.pageY-$(this).offset().top})
                //Trigger drawing event
                $(this).trigger("endpath",[evt.pageX-$(this).offset().left, evt.pageY-$(this).offset().top])
	}		
})

return $canvas
}
