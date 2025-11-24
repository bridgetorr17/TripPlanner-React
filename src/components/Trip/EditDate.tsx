import MonthYear from "./MonthYear";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import IconButton from "../StyledComponents/IconButton";
import { useUpdate } from "../../hooks/useUpdate";

interface EditDateProps {
    name: string;
    startingMonth: string;
    startingYear: number;
    tripId: string;
}

const EditDate = ({ name, startingMonth, startingYear, tripId }: EditDateProps) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const initialDate = new Date(startingYear, monthNames.indexOf(startingMonth));
    const {
        value: selectedDate,
        setValue: setSelectedDate,
        edit,
        setEdit,
        handleSubmit,
        loading,
    } = useUpdate<Date>({
        url: `/api/trips/editTripField/${tripId}`,
        fieldName: name,
        initialValue: initialDate,
        formatValue: (date) => ({
            month: date.getMonth(),
            year: date.getFullYear(),
        }),
    });
    const displayMonth = monthNames[selectedDate.getMonth()];
    const displayYear = selectedDate.getFullYear();
    return (
        <>
            <form onSubmit={handleSubmit}
                className="mb-6">
                {edit ? (
                    <div className="flex items-center space-x-2">
                        <MonthYear
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                        <IconButton
                            type="submit" 
                            onClick={() => {}}
                            color="blue"
                            className="ml-1"
                            aria-label="Save"
                        >
                            <FaSave className="w-5 h-5" />
                        </IconButton>
                        <IconButton
                            type="button"
                            onClick={(e) => {
                            e.preventDefault();
                            setEdit(false);
                            }}
                            color="gray"
                            className="ml-1"
                            aria-label="Cancel"
                        >
                            <FaTimes className="w-5 h-5" />
                        </IconButton>
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <span className={`text-blue-800`}>
                            {displayMonth} {displayYear}
                        </span>
                        <IconButton
                            type="button"
                            onClick={(e) => {
                            e.preventDefault();
                            setEdit(true);
                            }}
                            color="blue"
                            aria-label={`Edit ${name}`}
                        >
                            <FaEdit className="w-5 h-5" />
                        </IconButton>
                    </div>
                )}
            </form>
        </>
    )
}

export default EditDate