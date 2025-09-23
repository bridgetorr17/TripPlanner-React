import MonthYear from "./MonthYear";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

const EditDate = ({ name, date, setDate, selectedDate, setSelectedDate, edit, setEdit, save }) => {

    return (
        <>
            <form onSubmit={(e) => {
                    e.preventDefault();
                    setDate(selectedDate);
                    save(name, selectedDate, setEdit);
                }}
                className="mb-6">
                {edit ? (
                    <div className="flex items-center space-x-2">
                        <MonthYear
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            className="w-full border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button 
                            type="submit" 
                            className={`p-2 text-blue-600 hover:text-blue-800`}>
                            <FaSave className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedDate(date);
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