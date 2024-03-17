let d;

function buildStudents(studs) {
    //  This function is just a suggestion! I would suggest calling it after
    //      fetching the data or performing a search. It should populate the
    //      index.html with student data by using createElement and appendChild.
    console.log(studs);
    document.getElementById("num-results").innerText = studs.length;

    const board = document.getElementById("students");
    board.innerText = "";
    for (let student of studs) {
        const card = document.createElement("div");
        const name = document.createElement("h2");
        const major = document.createElement("strong");
        const inf = document.createElement("p");
        const interest_num = document.createElement("p");
        const interests = document.createElement("ul");

        name.innerText = student.name.first + " " + student.name.last;
        major.innerText = student.major;
        let WI_state = student.fromWisconsin ? "" : "NOT";
        inf.innerText = `${student.name.first} is taking ${student.numCredits} credits and is ${WI_state} from Wisconsin`;
        interest_num.innerText = `They have ${student.interests.length} interests including...`;

        for (let interest of student.interests) {
            const line = document.createElement("li");
            line.innerText = interest;
            interests.appendChild(line);

            line.addEventListener("click", (e) => {
                const selectedText = e.target.innerText;
                //  update the search terms to search just for the
                //      selected interest, and re-run the search!
                document.getElementById("search-interest").value = interest;
                search(d);
            })
        }

        card.appendChild(name);
        card.appendChild(major);
        card.appendChild(inf);
        card.appendChild(interest_num);
        card.appendChild(interests);

        card.className = "col-12 col-md-6 col-lg-4 col-xl-3";
        board.appendChild(card);
    }
}

function search(data) {
    d = data;
    let aim = [];
    let name_search = document.getElementById("search-name").value;
    let major_search = document.getElementById("search-major").value;
    let interest_search = document.getElementById("search-interest").value;

    name_search = normalizeSearchStr(name_search);
    major_search = normalizeSearchStr(major_search);
    interest_search = normalizeSearchStr(interest_search);

    for (let student of data) {
        let name = student.name.first + " " + student.name.last;
        let major = student.major;
        let interest = "";
        for (let i of student.interests) {
            interest += i + " ";
        }
        name = name.toLowerCase();
        major = major.toLowerCase();
        interest = interest.toLowerCase();

        if (name.includes(name_search) && major.includes(major_search) && interest.includes(interest_search)) {
            aim.push(student);
        }
    }
    buildStudents(aim);
}

function normalizeSearchStr(str) {
    return str.trim().toLowerCase();
}

function handleSearch(e) {
    e?.preventDefault(); // You can ignore this; prevents the default form submission!

    // Implement the search
    fetch("https://cs571.org/api/s24/hw2/students", {
        headers: {
            "X-CS571-ID": "bid_7aa1690b9dabcac6bf2f5fbe49c240e522b2f17232ff01a835fdda35db5cf438" // You may hardcode your Badger ID instead.
        }
    })
        .then((res) => res.json())
        .then((data) => {
                search(data);
            }
        )
}

document.getElementById("search-btn").addEventListener("click", handleSearch);