	var dragObject = null;
	var mouseOffset = null;
	var dragObject_zindex = 1000;

	document.onmousemove = mouseMove;
	document.onmouseup = mouseUp;


	function mouseCoords(ev){ 
	    if(ev.pageX || ev.pageY){ 
	        return {x:ev.pageX, y:ev.pageY}; 
	    } 
	    return { 
	        x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, 
	        y:ev.clientY + document.body.scrollTop  - document.body.clientTop 
	    }; 
	} 
	 
	 
	function getMouseOffset(target, ev){ 
	    ev = ev || window.event; 
	 
	    var docPos    = getPosition(target); 
	    var mousePos  = mouseCoords(ev); 
	    return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y}; 
	} 
	 
	function getPosition(e){ 
	    var left = 0; 
	    var top  = 0; 
	 
	    while (e.offsetParent){ 
	        left += e.offsetLeft; 
	        top  += e.offsetTop; 
	        e     = e.offsetParent; 
	    } 
	 
	    left += e.offsetLeft; 
	    top  += e.offsetTop; 
	 
	    return {x:left, y:top}; 
	} 
	 
	function mouseMove(ev){ 
	    ev           = ev || window.event; 
	    var mousePos = mouseCoords(ev);

	    if (dragObject) { 
            dragObject.style.position = 'absolute';
            dragObject.style.top = (mousePos.y - mouseOffset.y)+'px';
            dragObject.style.left = (mousePos.x - mouseOffset.x) + 'px';
	        return true; 
	    }
	}

	function mouseUp() {
	    var trans;
	    if (dragObject.className.indexOf('right') > -1) {
	        trans = "transformed-right";
	    } else if (dragObject.className.indexOf('left') > -1) {
	        trans = "transformed-left"
        }
	    save(dragObject.id, dragObject.style.left, dragObject.style.top, trans)
	    dragObject = null;
	} 
	 
	function makeDraggable(item){ 
	    if(!item) return; 
	    item.onmousedown = function(ev){ 
	        dragObject  = this; 
	        mouseOffset = getMouseOffset(this, ev); 
	        return false;
	    }

	}
