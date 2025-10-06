let randi = (x,y)=>{return x + Math.floor(Math.random()*(y-x))}

let del = (x)=>document.body.removeChild(x);

class Button{
	randWidth = Math.floor(Math.random() * 200) + 50
	body = randi(-5,5)
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
			background: rgb(${randi(0,255)}, ${randi(0,255)}, ${randi(0,255)});
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
		this.score += parseInt(button.self.innerHTML)
		document.getElementById("volumen").innerHTML = this.score
		this.renew()
	}

	loop(){
		if(this.looping){
			return setTimeout(()=>{

				if(this.looping){
					this.renew()

					this.loop()			
				}

			}, randi(1,6)*500)
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
}

let theGame = new Game();


let stopGame = ()=>{
	theGame.stop()
}

theGame.start()