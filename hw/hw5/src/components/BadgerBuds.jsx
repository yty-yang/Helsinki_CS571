import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import BadgerBudsNavbar from "./nav/BadgerBudsNavbar";
import BadgerBudsDataContext from "../contexts/BadgerBudsDataContext";

export default function BadgerBuds() {

    const [buds, setBuds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://cs571.org/api/s24/hw5/buds', {
            headers: {
                "X-CS571-ID": "bid_7aa1690b9dabcac6bf2f5fbe49c240e522b2f17232ff01a835fdda35db5cf438"
            }
        })
            .then(res => res.json())
            .then(cats => {
                setBuds(cats)
                setIsLoading(false);
            })
    }, []);

    console.log(buds)


    return <div>
        <BadgerBudsNavbar />
        <div style={{ margin: "1rem" }}>
            {isLoading ? <p>Loading...</p> : (
                <BadgerBudsDataContext.Provider value={buds}>
                    <Outlet />
                </BadgerBudsDataContext.Provider>
            )}
        </div>
    </div>
}