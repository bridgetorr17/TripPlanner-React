const List = ({arr}) => {

    return (
        <>
            <ul>
                {arr.map((el, ind) => <li key={ind}> {el} </li>)}
            </ul>
        </>
    )
}

export default List