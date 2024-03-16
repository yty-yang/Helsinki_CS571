// This is where your JS goes!

// You can fetch data from https://cs571.org/api/s24/ice/chili
// When you are complete, you should also be able to fetch data from...
//  https://cs571.org/api/s24/ice/pasta
//  https://cs571.org/api/s24/ice/pizza

let data;
let base_amount = [];
let review_index = 0;

fetch ("https://cs571.org/api/s24/ice/chili",
    {headers: {"X-CS571-ID": "bid_7aa1690b9dabcac6bf2f5fbe49c240e522b2f17232ff01a835fdda35db5cf438"}})
    .then(res => res.json())
    .then(d => {
        data = JSON.parse(JSON.stringify(d));
        console.log(data);

        document.getElementById("recipe-img").src = data.img.location;
        document.getElementById("recipe-img").alt = data.img.description;
        document.getElementById("recipe-name").innerText = data.name;
        document.getElementById("recipe-author").innerText = data.author;

        document.getElementById("ingredients-body").innerText = "";
        let inf = data.ingredients;

        for (let thing in inf) {
            const row = document.createElement("tr");
            const amount = document.createElement("td");
            const unit = document.createElement("td");
            const item = document.createElement("td");
            if (inf[thing].amount) {
                amount.innerText = inf[thing].amount;
                base_amount.push(inf[thing].amount);
            }
            if (inf[thing].unit) {
                unit.innerText = inf[thing].unit;
            }
            item.innerText = thing;
            if (inf[thing].misc) {
                item.innerText += "(" + inf[thing].misc + ")";
            }

            row.appendChild(amount);
            row.appendChild(unit);
            row.appendChild(item);
            document.getElementById("ingredients-body").appendChild(row);
        }

        const list = document.getElementById("instructions");
        list.innerText = "";
        for (let content of data.recipe) {
            const line = document.createElement("li");
            line.innerText = content;
            list.appendChild(line);
        }
    })
    .catch(e => console.log(e));

function updateYield() {
    // alert("I should update the yield!");
    const selector = document.getElementById("serving-selector");
    let n = selector.options[selector.selectedIndex].value;
    const rows = document.getElementById("ingredients-body").getElementsByTagName("tr");
    for (let row of rows) {
        const value = row.getElementsByTagName("td")[0];
        value.innerText = base_amount[row.rowIndex - 1] * n;
    }
}

function displayReview() {
    // alert("I should display a review!");
    if (data) {
        alert(data.reviews[review_index].txt);
        review_index += 1;
        if (review_index > 3) {
            review_index = 0;
        }
    } else {
        alert("still loading");
    }
}