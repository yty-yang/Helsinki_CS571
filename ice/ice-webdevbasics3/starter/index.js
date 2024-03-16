// This is where your JS goes!

fetch('https://cs571.org/api/s24/ice/chili', {
    headers: {
        "X-CS571-ID": "bid_7aa1690b9dabcac6bf2f5fbe49c240e522b2f17232ff01a835fdda35db5cf438" // You may hardcode your Badger ID instead.
    }
})
    .then(res => {
        console.log(res.status, res.statusText);
        if (res.status === 200) {
            return res.json();
        } else {
            throw new Error();
        }
    })
    .then(data => {
        console.log(data);

        console.log("the 5 star reviews are...")
        let reviews_5star = data.reviews.filter((t) => t.rating === 5);
        console.log(reviews_5star);

        console.log("the text befor a ':' are...");
        let recipe_short = data.recipe.map((t) => t.split(":")[0]);
        console.log(recipe_short);

        console.log("display the ingredients as a string...");
        let ingredients_str = Object.keys(data.ingredients).map((t) =>
            t + " " + data.ingredients[t].amount + " " + data.ingredients[t].unit + " " + data.ingredients[t].misc
        );
        console.log(ingredients_str);

        console.log("is there some instruction to bake?");
        console.log(data.recipe.some((t) => t.includes("bake")));

        console.log("is every review 4 or 5 stars?");
        console.log(data.reviews.every((r) => r.rating === 4 || r.rating ===5));

        console.log("the unique units are...");
        const ingrs = data.ingredients;
        let units_unique = Object.keys(ingrs).reduce((p, c) => {
            const ingr_cur = ingrs[c];
            if (ingr_cur.unit && !p.includes(ingr_cur.unit)) {
                return [...p, ingr_cur.unit];
            }
            return p;
        }, [])
        console.log(units_unique);

        console.log("what is the average review rating?");
        let sum = data.reviews.reduce((p, c) => p + c.rating, 0);
        console.log(sum / data.reviews.length);
    })
    .catch(err => {
        alert("Uh oh! Something went wrong. Are you logged in with your Badger ID?")
    })