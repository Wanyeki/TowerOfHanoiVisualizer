numbers=document.querySelector('.numbers');
play=document.querySelector('.play');
number=5;
discs=[];
towerA=number;
towerB=0;
towerC=0;
tower_discs=[[],[],[]];
bars=['A','B','C'];
moving_function=null;
moved=false;
moves=[[]];
speed=10;

class Disc{
    constructor(no){
        this.position=no;
        this.width=no*20;
        this.top=280-((10-no)*20)
        this.left=125+((10-no)*10)
    }
}
fill_discs();
drawing();
tracker=1;
target_determined=false;

function start_motions(){
if (moves.length>1){
    // console.log(tracker)
   from=moves[tracker][0];
   to=moves[tracker][1];
    function draw(){
     // console.log(from+' to '+to)
    disc_no=index_of(which_top(from));
    // console.log(which_top(from))
 
    if(!target_determined){
    switch (to) {
       case 'A':
           disc_top=280-(20*towerA);
           break;
       case 'B':
            disc_top=280-(20*towerB);
           break;
       case 'C':
            disc_top=280-(20*towerC)
           break;
      
   }
      movement=from+to;
  reverse=false;
      switch (movement) {
          case 'AB':
          disc_left=discs[disc_no].left+455; 
              break;
              case 'AC':
              disc_left=discs[disc_no].left+916; 
              break;

              case 'BA':
              reverse=true
              disc_left=discs[disc_no].left-455;
              break;
              case 'CA':
              reverse=true;
              disc_left=discs[disc_no].left-916; 
              break;
              case 'BC':
              disc_left=discs[disc_no].left+455; 
              break;
              case 'CB':
              reverse=true;
              disc_left=discs[disc_no].left-455; 
              break;
      }
    target_determined=true;
}
       moving=()=>{
          if(discs[disc_no].top>-50){     
              discs[disc_no].top-=10;
           } 
           
          if(discs[disc_no].top<0){              
                    if (reverse){
                        if(discs[disc_no].left>disc_left){
                        discs[disc_no].left-=20;
                        }
                       
                    }else{  
                    if(discs[disc_no].left<disc_left){
                     discs[disc_no].left+=20;
                    }
                  }
                 }


                 function place(){
                     

           if(discs[disc_no].top < disc_top){
            if(reverse){
             discs[disc_no].top+=20;
            }else{
                 discs[disc_no].top+=20;
            }
           
         }

         if(discs[disc_no].top >= disc_top){
            //  console.log('added')
             console.log(from+' to '+to);
                
            switch (movement) {
             case 'AB':
             towerA--;
             towerB++
             rmd=tower_discs[0].pop();
             tower_discs[1].push(rmd);
                 break;
                 case 'AC':
                 towerA--;
                 towerC++;
                 rmd=tower_discs[0].pop();
                     tower_discs[2].push(rmd); 
                 break;
   
                 case 'BA':
                 towerB--;
                 towerA++
                 rmd=tower_discs[1].pop();
                   tower_discs[0].push(rmd);
                 break;
                 case 'CA':
                 towerC--;
                 towerA++
                 rmd=tower_discs[2].pop();
                   tower_discs[0].push(rmd); 
                 break;
                 case 'BC':
                 towerB--;
                 towerC++
                 rmd=tower_discs[1].pop();
                   tower_discs[2].push(rmd); 
                 break;
                 case 'CB':
                 towerC--;
                 towerB++;
                 rmd=tower_discs[2].pop();
                   tower_discs[1].push(rmd); 
                 break;
         }
         if(tracker<(moves.length-1)){
            tracker++;
        }else{
            clearInterval(moving_function);
            alert('Done');
        }
         target_determined=false;

         }
                     
                 }

                 if(reverse){
                    if(discs[disc_no].left<disc_left){ place()}
                 }else{
                   if(discs[disc_no].left>disc_left){ place()}
                 }
         
           }

 moving();

        }
drawing()

draw();
}}

start_motions()
moving_function= setInterval(start_motions,speed);

function drawing(){
    holder=document.querySelector('.discs-wrapper'); 
    document.querySelectorAll('.disc').forEach(dis=>{
   holder.removeChild(dis);
    });
    
       for(i=0;i<number;i++){
          disc=document.createElement('div');
          disc.classList.add('disc');
          disc.style.cssText='top:'+discs[i].top+'px;width:'+discs[i].width+'px;left:'+discs[i].left+'px;';
          disc.setAttribute('id','no_'+discs[i].position);
          holder.appendChild(disc);
       } 
}



numbers.addEventListener('input',e=>{
    number=parseInt(numbers.value);
    towerA=number;
    towerB=0;
    towerC=0;
   fill_discs();
   drawing();
   moves=[[]];
   tracker=1;

   //console.log(discs)

});

function fill_discs(){
    tower_discs=[[],[],[]];
    discs=[];
    x=0;
   for(i=10;i>(10-number);i--){
        discs[x]=new Disc(i);
        tower_discs[0][x]=i;
        x++;
    }
    

}



function index_of(pos){
    x=0;
    discs.forEach((dis,index)=>{
if(dis.position == pos){
  x= index; 
}    
});
return x;
}
function which_top(tower){
    tw=bars.indexOf(tower);
    pos=tower_discs[tw].length-1;
    return tower_discs[tw][pos];

}


// tower of hanoi logic

play.addEventListener('click',e=>{
   moves=[[]];
 towers=(n,fr,to,spare)=>{
     if(n==1){
            action=[fr,to];
            moves.push(action);
     }
     else{
         towers(n-1,fr,spare,to);
         towers(1,fr,to,spare);
         towers(n-1,spare,to,fr)
     }

 }

towers(number,'A','C','B');
console.log(moves)
});

