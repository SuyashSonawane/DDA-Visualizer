let x_blocks = 25

let y_blocks = 25


let p1 = {
    x: null,
    y: null
};
let p2 = {
    x: null,
    y: null
};
let h = document.querySelector("h2");
let p = document.querySelector("p");
let points = document.querySelector(".points");
h.textContent = `Select Initial Point`;
let i = 0;
let over_enable = false;
let container = document.querySelector(".container");
table_content = "";
for (let row = x_blocks; row >= 0; row--) {
    table_content += `<tr>`;
    for (let col = 0; col < y_blocks; col++) {
        table_content += `<td><div class="pixel" id="${row},${col}" onclick="clicked(this.id)" onmouseover="over(this.id)"></div></td>`;
    }
    table_content += `</tr>`;
}
container.innerHTML = table_content;
// console.log(table_content)

const clicked = e => {
    if (!over_enable) {
        a = e.split(",");

        p1.x = a[0];
        p1.y = a[1];
        // console.log(`${p1.x},${p1.y}`)
        document.getElementById(`${p1.x},${p1.y}`).style.background = "red";
        h.textContent = `Now Drag mouse over`;
        over_enable = true;
    }
};

const over = e => {
    if (over_enable) {
        for (let row = x_blocks; row >= 0; row--) {
            for (let col = 0; col < y_blocks; col++)
                document.getElementById(`${row},${col}`).style.background = "white";
        }
        document.getElementById(`${p1.x},${p1.y}`).style.background = "red";
        a = e.split(",");
        p2.x = a[0];
        p2.y = a[1];
        DDA(p1, p2);
    }
};
const DDA = (p1, p2) => {
    // let flag = p2.x < p1.x ? true : false
    let xs = [];
    let ys = [];
    let dx = Math.abs(parseInt(p1.x - p2.x));
    let dy = Math.abs(parseInt(p1.y - p2.y));
    let len = dx >= dy ? dx : dy;
    // console.log(len)
    dx = dx / len;
    dy = dy / len;

    if (dx === dy)
        document.querySelector('body').style.background = "#00800054";
    else
        document.querySelector('body').style.background = "white";

    p.innerHTML = `x1=${p1.x} , y1 =${p1.y} <br> xm=${p2.x},  ym =${p2.y} <br> len = ${len} <br> dx= ${dx} <br> dy= ${dy} `
    let x = p2.x > p1.x ? parseInt(p1.x) + 0.5 : parseInt(p1.x) - 0.5;
    xs.push(Math.floor(x));
    let y = p2.y > p1.y ? parseInt(p1.y) + 0.5 : parseInt(p1.y) - 0.5;
    ys.push(Math.floor(y));
    // console.log(xs, ys);

    for (let index = 0; index < len; index++) {
        let n_x = (x += dx);
        let n_y = (y += dy);
        xs.push(Math.floor(n_x));
        ys.push(Math.floor(n_y));
    }

    // console.table({x:xs,y:ys})
    points.innerHTML = ""
    for (let index = 0; index < xs.length; index++) {
        // console.log(`${xs[index]},${ys[index]}`)
        points.innerHTML += `${xs[index]},${ys[index]} <br>`
        document.getElementById(`${xs[index]},${ys[index]}`).style.background =
            "red";
    }
};