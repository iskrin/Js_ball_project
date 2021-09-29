let canvas = document.getElementById('ekran')
let c = canvas.getContext('2d')
let ballAmount = 0
let ballCounter = []
let gravity=  0.5
let bouncines = 0.8

////
/////
/////////
//////////// naprawic myszke get bpunding cient rect potem kolorki on hover

canvas.addEventListener('click', createBall, true) //wywołuje funkcję create ball po kliknięciu LPM

window.setInterval(gameLoop, 10) //gameLoop wykonywany zo 10ms


function updateParameters(){
   gravity = Number(document.getElementById('gravity').value)
   bouncines = Number(document.getElementById('bouncines').value)
}

function gameLoop(event){   
       
    c.clearRect(0, 0, canvas.width, canvas.height) //czyści canvas żeby narysować elementy po uaktualnieniu pozycji

    for(i=0; i<ballCounter.length;i++){
        
        var currentBall = ballCounter[i]
        //countOverlap(event, currentBall)
        currentBall.addCircle(event, currentBall) 
        currentBall.velocity += gravity 
        currentBall.y += currentBall.velocity 
        
        if(currentBall.y + currentBall.r >= canvas.height){   //Zmienia velocity po zderzeniu z podłogą

            currentBall.y = canvas.height - currentBall.r
            currentBall.velocity *= -bouncines
            
        }            
    }
}
    
function countOverlap(element){
    var xDistance = clientX - element.x
    var yDistance = clientY - element.y
    var distance = xDistance^2 + yDistance^2
    if (distance<=element.r){
        element.color = "#00FF00"
        
    }
}

class Ball{
    constructor(x, y, color){
        this.x= x
        this.y= y 
        this.color = color   
        this.velocity= gravity
        this.r = 20
    }

    addCircle(){
    
        c.beginPath() //początek ściezki
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI) //rysuje ścieżkę będącą kołem
        c.fillStyle = this.color
        c.fill()    //wypełnia kolorem
     
       
    }

    
}

function createBall(event){
    ballCounter[ballAmount] = new Ball(event.clientX, event.clientY, "#FF0000")        //Tworzy nowy obiekt klasy ball 
    ballAmount++
    

}








   

