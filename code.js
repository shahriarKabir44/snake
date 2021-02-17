function getel(x) {
    return document.getElementById(x)
}
var lnt = 20
for (let i = 0; i < lnt; i++) {
    for (let j = 0; j < lnt; j++) {
        getel("demo").innerHTML += `<div class="box" id="box${i}-${j}"> </div>`
    }
}

var matrix = new Array(lnt)
for (let i = 0; i < lnt; i++) {
    matrix[i] = new Array(lnt).fill(0)
}

const up = 1
const down = 2
const left = 3
const right = 4

class box {
    constructor(x, y, color, direction) {
        this.x = x
        this.y = y
        this.color = color
        this.direction = direction
    }

    render() {
        this.x += lnt
        this.y += lnt
        this.x %= lnt
        this.y %= lnt
        matrix[this.x][this.y] += 1
        getel(`box${this.x}-${this.y}`).style.background = this.color
    }

    clear() {
        matrix[this.x][this.y] -= 1
        getel(`box${this.x}-${this.y}`).style.background = 'rgb(0, 0, 0, 0)';
    }

    move() {
        this.clear()
        if (this.direction == up) this.x--
        else if (this.direction == down) this.x++
        else if (this.direction == left) this.y--
        else this.y++

        this.render()
    }
}

var boxes = []

var colors = ["green", "blue", "yellow", "violet", "brown", "pink"]

function addbox() {
    var lastbox = boxes[boxes.length - 1]
    var new_dir = lastbox.direction
    var col = ''
    while (1) {
        col = colors[Math.floor(Math.random() * colors.length)]
        if (col != lastbox.color) break
    }
    var newbox = new box(lastbox.x, lastbox.y, col, lastbox.direction)

    if (new_dir == up) newbox.x++
    else if (new_dir == down) newbox.x--
    else if (new_dir == left) newbox.y++
    else newbox.y--

    boxes.push(newbox)
    newbox.render()
}

var head_dir = up

var b = new box(5, 5, "black", up)
b.render()
boxes.push(b)
function pause() {
    alert('paused')
}
var dead = 0
function go(x) {

    head_dir = x;
    boxes[0].direction = x

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].move()
    }
    getel(`box${b.x}-${b.y}`).style.background = b.color
    for (let i = boxes.length - 1; i > 0; i--) {
        boxes[i].direction = boxes[i - 1].direction
    }
    if (matrix[b.x][b.y] == 2) {
        alert("Game Over!")
        dead = 1
        return
    }
    if (matrix[b.x][b.y] == 3) {
        matrix[b.x][b.y] = 1
        addbox()
        renderFood()
        getel("score").innerHTML = (getel("score").innerHTML * 1) + 1
    }
}
var speed = 300
function run() {
    go(head_dir)
    setTimeout(() => {
        if (!dead) run()
    }, speed)
}
run()
function faster() {
    speed -= 50
}
function slower() {
    speed += 50
}
window.onkeypress = function (e) {
    if (e.key == "w" && head_dir != down) head_dir = up
    else if (e.key == "x" && head_dir != up) head_dir = down
    else if (e.key == "a" && head_dir != right) head_dir = left
    else if (e.key == "d" && head_dir != left) head_dir = right
}

var food = new box(0, 0, "white", 5)
renderFood()
function renderFood() {
    while (1) {
        let x = Math.floor(Math.random() * lnt)
        let y = Math.floor(Math.random() * lnt)
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2
            getel(`box${x}-${y}`).style.background = "red"
            return
        }
    }
}