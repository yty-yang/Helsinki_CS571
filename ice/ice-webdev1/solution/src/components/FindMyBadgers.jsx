import Badger from "./Badger";
import { useEffect, useState } from "react";

function FindMyBadgers() {

    const [badgers, setBadgers] = useState([]);

    useEffect(() => {
        fetch("https://randomuser.me/api?results=5")
            .then(res => res.json())
            .then(data => {
                console.log("This is what I got from the API!")
                console.log("Notice how it is an object which contains a results attribute!")
                console.log(data)
                setBadgers(data.results)
            })
    }, []);

    console.log(badgers)

    return <div>
        <h1>Find My Badgers</h1>
        <br/>
        {
            badgers.map(badger => {
                return <Badger
                    key={badger.email}
                    name={badger.name.first + " " + badger.name.last}
                    email={badger.email}
                />
            })
        }
    </div>
}

export default FindMyBadgers;