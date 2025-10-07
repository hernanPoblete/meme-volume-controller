let randi = (x,y)=>{return x + Math.floor(Math.random()*(y-x+1))}

let del = (x)=>document.body.removeChild(x);

class Button{
	randWidth = Math.floor(Math.random() * 75) + 25
	r = randi(0,255)
	g = randi(0,255)
	b = randi(0,255)
	body = randi(-3,3)
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
			font-weight:800;

			z-index:0;
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


		if(Math.random()<0.1){
			document.body.appendChild(this.pickAd().asHTML());
		}
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
		this.score = 0;
		document.getElementById("volumen").innerHTML = this.score
		this.audioElement.volume = 0;
	}

	pickAd(){
		let options = [
			new Ad("Solotodo", "Cotiza, compara y ahorra", "https://solotodo.cl", "rgb(0, 255, 0)", this),
			new Ad("Programarás orientado a objetos como mtoro y sin usar pastillas", 
				"¿Quieres saber como? Haz click", "https://dcc.uchile.cl",
			"rgb(255,0,0)", this),
			new Ad("Mi programación dejó de ser buena hace muchos años", "Lee aquí mi historia", "https://dcc.ing.uc.cl","rgb(73,181,215)", this),
			new Ad("Así dejé de ser migajerx", "Con solo un truco sencillo", "https://www.youtube.com/watch?v=RBicJYn3tGw", "rgb(0,0,255)", this)
		]

		return options[randi(0,options.length-1)]
	}

	constructor(audioElement){
		this.audioElement = audioElement;
		audioElement.volume = 0;
	}
}


class Ad{
	constructor(name, info, href, bg_color, controlled_by){
		this.name = name
		this.info = info
		this.href = href
		this.bg_color = bg_color

		this.game = controlled_by
	}


	asHTML(){
		let self = document.createElement("a");
		self.style = `
			width: 100vw;
			height: 100vh;
			background-color: ${this.bg_color};
			color:black;
			z-index: 666;
			padding: 0;
			margin: 0;

			position: absolute;
			top: 0;
			left: 0;
			text-decoration:none;
		`

		let content = document.createElement("p");
		let close_button = document.createElement("span");

		close_button.innerHTML = "X"

		close_button.style = `
			z-index: 999;
			position: absolute;
			top: 10px;
			right: 10px;
		
		
		`
		self.onclick = ()=>{
			this.game.stop()
		}

		close_button.onclick=()=>{
			del(self);
			del(close_button)
		}

		content.innerHTML = `${this.name}: ${this.info}`
		self.href = this.href;

		self.appendChild(content)
		
		setTimeout(()=>{
			document.body.appendChild(close_button);
		}, 10000)

		return self
	}
}

let theGame = new Game(document.getElementById("test"));


let play = (id)=>{
	theGame.start()
	document.getElementById(id).play()
}

let stop = (id)=>{
	document.getElementById(id).pause();
	theGame.stop()
}
