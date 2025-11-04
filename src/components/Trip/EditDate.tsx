import MonthYear from "./MonthYear";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useState } from "react";
import IconButton from "../StyledComponents/IconButton";

interface EditDateProps {
    name: string;
    startingMonth: string;
    startingYear: number;
    tripId: string;
}

type dateData = {
    month: string;
    year: number;
}

const EditDate = ({ name, startingMonth, startingYear, tripId }: EditDateProps) => {
    const [edit, setEdit] = useState(false);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const [date, setDate] = useState<dateData>({month: startingMonth, year: startingYear})
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(startingYear, monthNames.indexOf(startingMonth)))
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDate({month: monthNames[selectedDate.getMonth()], year: selectedDate.getFullYear()});

        const updatedTripData = {
            field: name,
            value: {month: selectedDate.getMonth(), year: selectedDate.getFullYear()}
        }
        const res = await fetch(`/api/trips/editTripField/${tripId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTripData)
        });

        const data = await res.json();

        if(!data.success){
            throw data.message
        }
        setEdit(false)
    }
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
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedDate(new Date(date.year, monthNames.indexOf(date.month)));
                                setEdit(false);
                            }}
                            className={`p-2 text-gray-500 hover:text-gray-700`}
                            aria-label="Cancel"
                        >
                            <FaTimes className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <span className={`text-blue-800`}>
                            {date.month} {date.year}
                        </span>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setEdit(true);
                            }}
                            className={`p-2 text-blue-500 hover:text-blue-700`}
                            aria-label={`Edit ${name}`}
                        >
                            <FaEdit className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </form>
        </>
    )
}

export default EditDate