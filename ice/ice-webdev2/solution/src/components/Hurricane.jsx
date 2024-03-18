export default function Hurricane(props) {
    const startDate = new Date(props.start_date)
    const endDate = new Date(props.end_date)
    return <div>
        <h2>{props.name}</h2>
        <p>Category {props.category} ({props.wind_speed} mph)</p>
        <p>Started on {startDate.toLocaleDateString()} at {startDate.toLocaleTimeString()}</p>
        <p>Ended on {endDate.toLocaleDateString()} at {endDate.toLocaleTimeString()}</p>
    </div>
}