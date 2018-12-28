let userName = "";
let interval = 0;
let gameStart = true;
let objectCount = 0;
let monst = { //генерим монстра
    src: '../img/monst.png',
    point: 1
};
let score = 0;


/* закрываем все секции, кроме первой */
$('section:eq(1)').hide();
$('section:eq(2)').hide();

/* проверяем, введено ли имя */
$('input[name="signin"]').click(function () {
    let name = $('.name');
    if (name.val() != '') {
        $('section:eq(0)').hide();
        $('section:eq(1)').show();
        gameStart = true;
        userName = name.val();
    } else {
        name.before('<p>Введите имя</p>');
        name.css('box-shadow', '0px 0px 5px red');
    }
});

/* если имя введено начинаем игру и включаем таймер */
if (gameStart) {
    objectCount = Math.floor(Math.random() * (11 - 3) + 3); //кол-во объектов
    //gaming();
    timer();
}

/* реализуем таймер */
function timer() {
    let min = $('.min').text();
    let sec = $('.sec').text();
    interval = setInterval(function () {
        --sec;
        if (sec < 0) {
            sec = 59;
            --min;
        }
        if (sec == 0 && min == 0) {
            clearInterval(interval);
            stopGame();
        }
        $('.sec').text(sec);
        $('.min').text(min);
        }, 1000);
}

function generate(src, point) {
    let item= new Object(monst);
    item.src = src;
    item.point = point;
    return item;
}

function animate(item) {
    let img;
    img = $('.generation').append(`<img data-point="${item.point}" src='${item.src}'>`).find('img').last();
    img.on('click', catchItem);
    position = 7;
    arrIdItems[IdItemIndex]
    id = setInterval(() => {
        $('.generation img').css('left', `${position}vw`);
        position++;
        if (position >= 80) {
           position = 7;
           arrIdItems = [];
           $('.generation img').remove();
            clearInterval(id);
        }
    }, 500);
    arrIdItems.push(id);
}

/*удаление картинки*/
function catchItem(event) {
    event.preventDefault();
    $(event.target).remove();
}


//таблца результатов
function stopGame(){
    $('section:eq(1)').hide();
    $('section:eq(2)').show();
};

const names = JSON.parse(localStorage.getItem('userName') || "[]");
const scores = score;

const userInfo = {
    names : userName,
    scores : score
  }

 names.push(userInfo);

 localStorage.setItem('names', JSON.stringify(names));