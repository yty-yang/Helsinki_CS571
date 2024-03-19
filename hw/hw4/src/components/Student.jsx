const Student = (props) => {
    let WI = props.fromWisconsin ? " " : " NOT ";

    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        {/* Student data goes here! */}
        <strong>{props.major}</strong>
        <p>{props.name.first} is taking {props.numCredits} credits and is{WI}from Wisconsin.</p>
        <p>They have {props.interests.length} interests including...</p>
        <ul>
            {props.interests.map(interest => <li key={interest}>{interest}</li>)}
        </ul>
    </div>
}

export default Student;