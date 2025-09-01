import { SquareLoader } from "react-spinners";

const override = {
    display: 'block',
    margin: 'auto'
}

const Spinner = ({ loading }) => {
    return (
        <SquareLoader 
            color="#1e3a8a"
            loading={loading}
            cssOverride={override}
            size={22.5}
        />
    )
}

export default Spinner;