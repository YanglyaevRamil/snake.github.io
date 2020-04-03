const canvas = document.getElementById("game"); 
const ctx = canvas.getContext("2d"); 

const hero = localStorage.getItem('hero');

const pole = new Image(); 
pole.src = "img/pole.png"; 

let food_img = new Image(); 

function foodImgSrc(h) {
	if (h == "bely")
	    food_img.src = `img/food/food_bely/food_bely_${getRandomInt(3)}.png`;
	else 
		food_img.src = `img/food/food_${getRandomInt(9)}.png`;
}

foodImgSrc(hero);

const face = new Image(); 
face.src = `img/face/face_${hero}.jpg`; 

const body = new Image(); 
function bodyImgSrc(h) {
//	if (h == "jeka")
//		body.src = `img/body/body_jeka/body_jeka_${getRandomInt(7)}.png`; 
//	else 
		body.src = `img/body/body_${hero}.png`; 
	return body; 
}

let box = 32;
let score = 0; 
let name = `${nameHero(hero)}`; 
let speed = 16; 

function nameHero(h) {
	if(h == "bely")
		return "Белый";
	else if (h == "ernest")
		return "Эрнест";
	else if (h == "jeka")
		return "Жендос";
	else if (h == "kust")
		return "Куст";
	else if (h == "max")
		return "Максимильян";
	else if (h == "ram")
		return "Рам";
	else if (h == "vanya")
		return "ДядяВаня";
	else if (h == "artur")
		return "Артур";
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let food = {
	x : (getRandomInt(17) + 1) * box, 
	y : (getRandomInt(15) + 3) * box
};

let posX = 0.;
let posY = 0.;
let velocityX = 80.;
let velocityY = 80.;

let maxScore = 25; 


let snake = [];
snake[0] = {
	x 		 : 9 * box, 
	y 		 : 10 * box,
//	img_body : face,
//	img_face : body
}

document.addEventListener("keydown", direction);

let dir; 

function endGame(exodus) {
	ctx.fillStyle = "white";
	ctx.font = "50px Arial";

	if (exodus == "GameOver")
		ctx.fillText("GameOver Loshara", box * 3, box * 9);	
	else if (exodus == "Win")			
		ctx.fillText("Win! ЭтоТогоНеСтоило", box * 1, box * 9);

	ctx.fillStyle = "white";
	ctx.font = "80px Arial";
	ctx.fillText(`Счет: ${score}`, box * 5, box * 14);
}

function direction(event) {
	if(event.keyCode == 37 && dir != "right")
 		dir = "left";
 	else if (event.keyCode == 38 && dir != "down")
 		dir = "up";
 	else if (event.keyCode == 39 && dir != "left")
 		dir = "right";
 	else if (event.keyCode == 40 && dir != "up")
 		dir = "down";
}

function drawing() {	

	ctx.drawImage(pole, 0, 0);

	ctx.drawImage(food_img, food.x, food.y); 

	for (let i = 0; i < snake.length; i++) {
		if (i == 0)
			ctx.drawImage(face, snake[i].x, snake[i].y);
		else {
			ctx.drawImage(bodyImgSrc(hero), snake[i].x, snake[i].y)
		}
	}

//	for (let i = 0; i < snake.length; i++) {
//		if (i == 0)
//			ctx.drawImage(snake[i].face, snake[i].x, snake[i].y);
//		else {
//			ctx.drawImage(snake[i].body, snake[i].x, snake[i].y);
//		}
//	}

	ctx.fillStyle = "white";
	ctx.font = "40px Arial";
	ctx.fillText(name, box * 2.5, box * 1.7);


	ctx.fillStyle = "white";
	ctx.font = "50px Arial";
	ctx.fillText(score, box * 9, box * 1.7);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	for (let i = 1; i < snake.length; i++) {
		if (snake[i].x == snakeX && snake[i].y == snakeY) {
			//drawing();

			clearInterval(game);

			endGame("GameOver");
		}
	} 

	if (snakeX < 1 || snakeX > 17*box ||
		snakeY < 3*box || snakeY > 17*box) {
		clearInterval(game);

		endGame("GameOver");
	}

	if (dir == "left")
	{
		posX -= (velocityX) / speed;
		if(Math.abs(posX / box) >= 0.5)
		{
			snakeX -= box;
			posX += box;
		}

	 
	}
	if (dir == "right")
	{
		posX += (velocityX) / speed;
		if(Math.abs(posX / box) >= 0.5)
		{
			snakeX += box;
			posX -= box;
		}

	}
	if (dir == "up")
	{
		posY -= (velocityY) / speed;
		if(Math.abs(posY / box) >= 0.5)
		{
			snakeY -= box;
			posY += box;
		}

	}
	if (dir == "down")
	{
		posY += (velocityY) / speed;
		if(Math.abs(posY / box) >= 0.5)
		{
			snakeY += box;
			posY -= box;
		}
	}



	if(snakeY != snake[0].y || snakeX != snake[0].x)
	{
		if (snakeX == food.x && snakeY == food.y) {
			score++; 

			foodImgSrc(hero);
			
			food = {
				x : (getRandomInt(17) + 1) * box, 
				y : (getRandomInt(15) + 3) * box
			};

		} else {
			snake.pop(); 
		}

		let newHead = {
			x : snakeX,
			y : snakeY
		}

		snake.unshift(newHead);
	}
		
	if (score == maxScore) {
		clearInterval(game);

		endGame("Win");
	}
}

let game = setInterval(drawing, speed); 

