let randi = (x,y)=>{return x + Math.floor(Math.random()*(y-x))}

let del = (x)=>document.body.removeChild(x);

class Button{
	randWidth = Math.floor(Math.random() * 75) + 25
	r = randi(0,255)
	g = randi(0,255)
	b = randi(0,255)
	body = randi(-3,1)
	touched = false;


	gameListener = undefined

	constructor(){
		let self = document.createElement("div")
		self.style = `
			width: ${this.randWidth}px;
			aspect-ratio: 1/1;
			position: absolute;
			left: ${randi(0, window.screen.width)}px;
			bottom: ${randi(0, window.screen.height)}px;
			background: rgb(${this.r}, ${this.g}, ${this.b});
			color: rgb(${this.r+randi(-40,40)}, ${this.g+randi(-40,40)}, ${this.b+randi(-40,40)});
			opacity: ${Math.random()};
			border-radius: ${Math.floor(this.randWidth/2)}px;
			text-align:center;
			line-height: ${this.randWidth}px;
			font-weight:800
		`

		self.onclick = (e)=>{
			this.gameListener.onCollect(this);
		}


		self.innerText=this.body
		this.self = self



		document.body.appendChild(self)
		
		
	}
}


class Game{
	looping = false
	currentButton = undefined
	score = 0;

	renew(){
		del(this.currentButton.self);
		this.currentButton = new Button();
		this.currentButton.gameListener = this
	}

	onCollect(button){ 
		this.score = (this.score + parseInt(button.self.innerHTML))%101;
		document.getElementById("volumen").innerHTML = this.score
		this.renew()

		this.audioElement.volume = Math.max(0,this.score/100)
	}

	loop(){
		if(this.looping){
			return setTimeout(()=>{

				if(this.looping){
					this.renew()

					this.loop()			
				}

			}, randi(1,8)*150)
		}else{
			return -1
		}
	}

	start(){
		if(!this.looping){
			this.looping = true;

			this.currentButton = new Button()
			this.currentButton.gameListener = this;

			return this.loop()			
		}
	}


	stop(){
		this.looping = false
		del(this.currentButton.self)
	}

	constructor(audioElement){
		this.audioElement = audioElement;
		audioElement.volume = 0;
	}
}

let theGame = new Game(document.getElementById("test"));


let play = (id)=>{
	document.getElementById(id).play();
}

let stop = (id)=>{
	document.getElementById(id).pause();
}


let stopGame = ()=>{
	theGame.stop()
}

theGame.start()