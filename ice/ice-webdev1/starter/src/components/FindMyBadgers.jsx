import Badger from "./Badger";
import {useEffect, useState} from "react";


function FindMyBadgers() {
    const [badgers, setBadgers] = useState([]);
    useEffect(() => {
        fetch("https://randomuser.me/api?results=5")
            .then((res) => res.json())
            .then((data) => {
                setBadgers(data.results);
            })
    }, [])

    return <div>
        <h1>Find My Badgers</h1>
        {
            badgers.map((badger) =>
                <Badger
                    key={badger.email}
                    name={`${badger.name.first} ${badger.name.last}`}
                    email={badger.email}
                >
                </Badger>)
        }
    </div>
}

export default FindMyBadgers;