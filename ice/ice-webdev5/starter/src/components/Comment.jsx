import {Card} from "react-bootstrap";
import {memo, useMemo} from "react";

function Comment(props) {

    console.log("I have rendered!")

    const createdDt = useMemo(() => {
        return new Date(props.created);
    }, [props.created]);

    return <Card style={{margin: "0.5rem"}}>
        <p>{props.comment}</p>
        <p>Posted on {createdDt.toLocaleDateString()} at {createdDt.toLocaleTimeString()} by {props.author}</p>
    </Card>
}

export default memo(Comment, (prevProps, nextProps) => prevProps.id === nextProps.id);