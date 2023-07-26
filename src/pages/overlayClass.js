class myRect{
    constructor(x1, y1, color, label){
        this.x1 = x1;
        this.y1 = y1;
        this.w = 0;
        this.h = 0;
        this.isDragging = false;
        this.isMoving = false;
        this.color = color;
        this.label = label
    }

    drawme(ctx){
        ctx.beginPath();
        ctx.roundRect(this.x1, this.y1, this.w, this.h, [5,5,5,5]);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x1+this.w, this.y1+this.h, 5, 0, 2*Math.PI);
        ctx.fillStyle = this.color.slice(0,-2);
        ctx.fill();
        ctx.closePath();
    }

    startDragging(mouseX, mouseY){
        console.log("started dragging")
        this.isDragging = true;
        this.dragOffsetX = mouseX - this.w;
        this.dragOffsetY = mouseY - this.h;
    }

    startMoving(mouseX, mouseY){
        console.log("started moving")
        this.isMoving = true;
        this.dragOffsetX = mouseX - this.x1;
        this.dragOffsetY = mouseY - this.y1;
    }

    stopDragging(){
        console.log("stopped dragging")
        this.isDragging = false;
    }

    stopMoving(){
        console.log("stopped moving")
        this.isMoving = false;
    }

    update(mouseX, mouseY, ctx, canvas) {
        if(this.isDragging){
            this.w = mouseX - this.dragOffsetX;
            this.h = mouseY - this.dragOffsetY;
        }
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }

    move(mouseX, mouseY, ctx, canvas){
        if(this.isMoving){
            this.x1 = mouseX - this.dragOffsetX;
            this.y1 = mouseY - this.dragOffsetY;
        }
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }

    contain(mouseX, mouseY){
        this.controllerX = this.x1+this.w;
        this.controllerY = this.y1+this.h;
        if(mouseX > this.controllerX-10  && mouseX < this.controllerX+10 && mouseY > this.controllerY-10 && mouseY < this.controllerY+10){
            return true
        }
        return false;
    }

    holding(mouseX, mouseY){
        if(mouseX > this.x1  && mouseX < this.x1+this.w && mouseY > this.y1 && mouseY < this.y1+this.h){
            return true
        }
        console.log("nope lol")
        return false;
    }
}


export default myRect;