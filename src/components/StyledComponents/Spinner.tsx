import { SquareLoader } from "react-spinners";

const override = {
    display: 'block',
    margin: 'auto'
}

interface SpinnerProps {
    loading: boolean;
}

const Spinner = ({ loading }: SpinnerProps) => {
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