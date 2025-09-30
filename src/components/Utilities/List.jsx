import { Link } from "react-router-dom"
const List = ({arr, links}) => {

    return (
        <>
            {
                links 
                ? <ul> {arr.map((el, ind) => <li key={ind}> <Link to={`../../dashboard/${el}`} >{el}</Link></li>)} </ul>
                : <ul> {arr.map((el, ind) => <li key={ind}> {el} </li>)} </ul>
            }  
        </>
    )
}

export default List