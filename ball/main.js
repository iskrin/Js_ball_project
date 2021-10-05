let canvas = document.getElementById('ekran')
let c = canvas.getContext('2d')
let ballAmount = 0
let ballCounter = []
let gravity=  0.5
let bouncines = 0.8
let xPos
let yPos
isApressed = false


canvas.addEventListener('click', createBall, true) //wywołuje funkcję create ball po kliknięciu LPM


document.addEventListener('mousemove', (event) => {
    xPos = event.clientX
    yPos = event.clientY
	
});

document.addEventListener('keydown', (event)=>{
    if(event.key === 'a'){
        isApressed = true
        console.log(isApressed)
    }
    isApressed = false
})



window.setInterval(gameLoop, 10) //gameLoop wykonywany zo 10ms

function updateParameters(){
    gravity = Number(document.getElementById('gravity').value)
    bouncines = Number(document.getElementById('bouncines').value)
 }

function gameLoop(){   
       
    c.clearRect(0, 0, canvas.width, canvas.height) //czyści canvas żeby narysować elementy po uaktualnieniu pozycji

    for(i=0; i<ballCounter.length;i++){
        
        var currentBall = ballCounter[i]
        
       

        currentBall.drawCircle() 
        currentBall.countOverlap() 
       
        //console.log(`KulaX: ${currentBall.x}, KulaY: ${currentBall.y}`)
        currentBall.velocity += gravity 
        currentBall.y += currentBall.velocity 
        
        if(currentBall.y + currentBall.r >= canvas.height){   //Zmienia velocity po zderzeniu z podłogą

            currentBall.y = canvas.height - currentBall.r
            currentBall.velocity *= -bouncines
            
        } 
    }
}
    


class Ball{
    constructor(x, y, color){
        this.x= x
        this.y= y 
        this.color = color   
        this.velocity= gravity
        this.r = 200
        this.r2 = this.r * this.r
    }

    drawCircle(){
    
        c.beginPath() //początek ściezki
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI) //rysuje ścieżkę będącą kołem
        c.fillStyle = this.color
        c.fill()    //wypełnia kolorem
     
       
    }

    countOverlap(){
      // console.log(`Mouse X: ${xPos}, Mouse Y: ${yPos}`);
        let xDistance = xPos - this.x
        let yDistance = yPos - this.y
        let distance =  xDistance * xDistance + yDistance * yDistance
      //console.log(`odległość X: ${xDistance}, odległość Y: ${yDistance} Dystans:${distance}`)

         if(distance<=this.r2){ 
            this.color="#00FF00"
         }
         if (distance>=this.r2){
            this.color="#FF0000"
         }

       
    
    }   
}

function createBall(){
    ballCounter[ballAmount] = new Ball(xPos, yPos, "#FF0000")        //Tworzy nowy obiekt klasy ball 
    ballAmount++
    

}





//c.beginPath()
//c.moveTo(currentBall.x, currentBall.y)
//c.lineTo(xPos, yPos)
//c.stroke()


   

