var s1;
let time;
let size=7;

  function draw() {
      background(0);
      time+=0.05;
      s1.update(time);
      myButton.draw();
      Up.draw();
      Down.draw();
  }

  
  class particle{
    constructor(x,y,r,hiscount){
      this.x=x;
      this.y=y;
      this.r=r;
      this.hiscount=hiscount;
      this.c= color(50+random(205),50+random(205),50+random(205));
      this.inFocus=0;
      this.xhis=[];
      this.yhis=[];
  }

  update(x,y){
      this.xhis.push(this.x);
      this.yhis.push(this.y);
      if(this.inFocus==0&&this.xhis.length>100){
        this.xhis.shift();
        this.yhis.shift();
        // console.log(this.xhis.length);
      }
      else if(this.inFocus==1&&this.xhis.length>400){
        this.xhis.shift();
        this.yhis.shift();
      }
      this.x=x;
      this.y=y;
  }

  draw(){
      fill(this.c);
      stroke(this.c);
      let tempr=this.r;
      for(let i=this.xhis.length-1;i>-1;i--){
        if(this.xhis.length-i>this.hiscount){
          tempr=pow(tempr,0.5);
        }
        else{
          tempr=pow(tempr,0.997);   
        }
        circle(this.xhis[i],this.yhis[i],tempr);  
      }
      //print(xhis.size());
      fill(255);
      stroke(255);
      circle(this.x,this.y,this.r+3);
    }
}


class system{
    constructor(size){
        // console.log("hello");

        this.size=size;
        console.log(this.size);
        this.xoffset=100;
        this.yoffset=100;
        this.focusMode=0;
        this.focusX=1;
        this.focusY=1;
        this.sys=[];
    
      
      for(let i=0;i<size;i++){
          this.sys.push([]);
          console.log(this.size);
        for(let j=0;j<size;j++){
          this.sys[i].push(new particle(this.xoffset,this.yoffset,5,30));  
        }
      }
      console.log(this.size);
    }
    

    
    update(time){
      for(let i=0;i<this.size;i++){
        circulate(this.sys[i][0],this.xoffset+100*i,this.yoffset,30,time,i*0.5);
        circulate(this.sys[0][i],this.xoffset,this.yoffset+100*i,30,time,i*0.5);  
        this.sys[i][0].draw();
        this.sys[0][i].draw();
      }
      
    //   console.log(this.size);
      if(this.focusMode==1){
        this.sys[this.focusX][this.focusY].update(this.sys[this.focusX][0].x,this.sys[0][this.focusY].y);
        this.sys[this.focusX][this.focusY].draw();
      }
      else{
        for(let i=0;i<this.size;i++){
          for(let j=0;j<this.size;j++){
            if(i!=0&&j!=0){
              this.sys[i][j].update(this.sys[i][0].x,this.sys[0][j].y);  
              this.sys[i][j].draw();
            }
          }
        }
      }
    }
    
    Focus(){
      this.focusMode=1;  
      this.sys[this.focusX][this.focusY].inFocus=1;p
    }
    
    unfocus(){
      this.focusMode=0; 
      this.sys[this.focusX][this.focusY].inFocus=0;
    }

    left(){
        this.sys[this.focusX][this.focusY].inFocus=0;
        if(this.focusX>1){
            this.focusX--;  
        }
        this.sys[this.focusX][this.focusY].inFocus=1;
    }
        
    right(){
        this.sys[this.focusX][this.focusY].inFocus=0;
        if(this.focusX<this.size-1){
            this.focusX++;  
        }
        this.sys[this.focusX][this.focusY].inFocus=1;
    }
        
    up(){
        this.sys[this.focusX][this.focusY].inFocus=0;
        if(this.focusY>1){
            this.focusY--;  
        }
        this.sys[this.focusX][this.focusY].inFocus=1;
    }
        
    down(){
        this.sys[this.focusX][this.focusY].inFocus=0;
        if(this.focusY<this.size-1){
            this.focusY++;  
        }
        this.sys[this.focusX][this.focusY].inFocus=1;
    }
      
    
  }

function setup() {
    createCanvas(1200, 1200);
    background(0);
    s1=new system(7);
    time=0;

    myButton=new Clickable(80,80);
    myButton.height=80;
    myButton.width=80;
    myButton.text="Focus Mode"
    myButton.onPress = function(){
        s1.focusMode=1-s1.focusMode;
    }

    
    Up=new Clickable(100,10);
    Up.height=60;
    Up.width=60;
    Up.text="UP"
    Up.onPress = function(){
        size++;
        s1=new system(size);
    }

    
    Down=new Clickable(200,10);
    Down.height=60;
    Down.width=60;
    Down.text="Down"
    Down.onPress = function(){
        if(size>1){
            size--;
            s1=new system(size);
        }
    }
}
      
 function circulate(p,x,y,r,time,w){
    p.update(x+r*cos(w*time),y+r*sin(w*time));
}

function keyPressed(){
    if(s1.focusMode==1){
      if(keyCode==37){
        s1.left();  
      }
      else if(keyCode==38){
        s1.up();  
      }
      else if(keyCode==39){
        s1.right();  
      }
      else if(keyCode==40){
        s1.down();  
      }
    }
   
  }