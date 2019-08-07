
var view = function(container, model) {
var grid = document.createElement('div'),
point = document.createElement('div');

grid.setAttribute('class', 'grid');
point.setAttribute('class', 'score');

container.appendChild(grid);
container.appendChild(point);

function render(data){
var {fills, score, count} = data;

grid.innerHTML = '';

if(count < 10) {
grid.appendChild(createGrid(fills));
}

point.innerHTML = 'Final score ' + score;
}

grid.addEventListener('click', (e) => {
//	if(e.target.tagName.toLowerCase() !== 'li') return;

let val = e.target.innerHTML;

model.click(val === 'M')
});

model.setSubscriber(render);

render(model.getData());
}

var model = function() {
var _subscriber,
_data = {
fills: new Array(9),
score: 0,
count: 0
};

_data.fills = getRandom();

function setSubscriber(fn) {
_subscriber = fn;
}

function getData() {
return _data;
}

function click(addScore) {
_data.score += addScore ? 1 : 0;
_data.count ++;
_data.fills = getRandom();

_subscriber(_data);
}

return {setSubscriber, getData, click};
}

function createGrid(arr) {
  
var result = document.createElement('div');


for(let j=0;j<9;j++) {
let cell = document.createElement('div');
cell.setAttribute('class', 'cell');
      result.append(cell);
      if(arr[j]) cell.innerHTML = 'M';

    }

return result;
}

function getRandom(){
var result = new Array(9);
let arr = []
while(arr.length < 3){
    let r = Math.floor(Math.random()*9) ;
    if(arr.indexOf(r) === -1) arr.push(r);
   result[r]=1;}
return result;
}
var container = document.querySelector('.container');

view(container, model());

 
