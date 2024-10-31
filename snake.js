//Получение canvas
const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

//Тайл
let Tile = 20

//Рандомная позиция
const randPos = () => {
    return [Math.floor(Math.random() * 39),  Math.floor(Math.random() * 29)];
} 

//Заливка экрана чёрным
const fillBlack = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,800,800);
}

//Яблоко и змея
let Apple = randPos();
let Snake = [[20, 15], [20, 15], [20, 15]];
let stopMove = true;

//Вектор змеи
let vector = [0, 0];

//Съедение яблока
const eat = () => {

    if (Snake[0][0] == Apple[0] & Snake[0][1] == Apple[1]){
        Apple = randPos();
        Snake.push([Snake[Snake.length-1][0],Snake[Snake.length-1][1]]);
    }

}

//Движение змеи
const move = () => {

    //Движение тела
    for (let body = Snake.length-1; body > 0; body--){
        Snake[body][0] = Snake[body-1][0]; //Новое значение равно точке прошлого элемента
        Snake[body][1] = Snake[body-1][1]; //Новое значение равно точке прошлого элемента
    }

    Snake[0][0] += vector[0]; //Движение головы по X
    Snake[0][1] += vector[1]; //Движение головы по Y

    if (Snake[0][0] == -1) {Snake[0][0] = 39;}
    else if (Snake[0][0] == 40) {Snake[0][0] = 0;}
    if (Snake[0][1] == -1) {Snake[0][1] = 29;}
    else if (Snake[0][1] == 30) {Snake[0][1] = 0;}

}

//Отрисовка
const draw = () => {

    //Очистка экрана
    fillBlack();

    //Отрисовка змеи
    for (let i = 0; i < Snake.length; i++){
        ctx.fillStyle = "green";
        ctx.fillRect(Tile*Snake[i][0], Tile*Snake[i][1], Tile, Tile);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(Tile*Apple[0],Tile*Apple[1],Tile,Tile);

}

//Проигрыш
const defeat = () => {

    for (let body = Snake.length-1; body > 3; body--){
        if (Snake[body][0] == Snake[0][0] & Snake[body][1] == Snake[0][1]){
            console.log("DEFEAT");
            clearInterval(mainLoop);
            //Вывод текста о проигрыше на экран
            ctx.font = "20px Arial";
            ctx.fillStyle = "red";
            ctx.fillText("Defeat!", 400, 300)
        }
    }

}

//Управление
const control = (keyEvent) => {

    if (stopMove == true){

        key = keyEvent["key"];  

        if (key == "w" & vector[1] == 0 | key == "ArrowUp" & vector[1] == 0){ vector = [0, -1]; }
        else if (key == "s" & vector[1] == 0 | key == "ArrowDown" & vector[1] == 0){ vector = [0, 1]; }
        else if (key == "a" & vector[0] == 0 | key == "ArrowLeft" & vector[0] == 0){ vector = [-1, 0]; }
        else if (key == "d" & vector[0] == 0 | key == "ArrowRight" & vector[0] == 0){ vector = [1, 0 ]; }

    }

    stopMove = false;

}

//Ивент управления
document.addEventListener('keydown', (e) => {control(e)});

//Игровой цикл
let mainLoop = setInterval(() => {
    move();
    draw();
    eat();
    defeat();
    stopMove = true;
}, 1000/24);

const restart = () => {
 
    if (confirm("Are you sure?")){
        Apple = randPos();
        Snake = [[20, 15], [20, 15], [20, 15]];
        vector = [0, 0];    
        stopMove = true;

        clearInterval(mainLoop);
        
        mainLoop = setInterval(() => {
            move();
            draw();
            eat();
            defeat();
            stopMove = true;
        }, 1000/24);
    }
}