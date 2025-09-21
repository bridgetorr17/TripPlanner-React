import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const TripField = ({ 
    name, 
    value, 
    setValue, 
    edit, 
    setEdit, 
    save,
    classNameDisplay = '',
    classNameInput = '',
    classNameIcon = ''}) => {
    return (
        <>
            <form onSubmit={(e) => {
                    e.preventDefault();
                    save(name, value, setEdit);
                }} 
                className="mb-6">
                {edit ? (
                <div className="flex items-center space-x-2">
                    <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={`flex-grow px-3 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${classNameInput}`}
                    />
                    <button 
                        type="submit" 
                        className={`p-2 text-blue-600 hover:text-blue-800 ${classNameIcon}`}>
                        <FaSave className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                        e.preventDefault();
                        setEdit(false);
                        }}
                        className={`p-2 text-gray-500 hover:text-gray-700 ${classNameIcon}`}
                        aria-label="Cancel"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>
                ) : (
                <div className="flex items-center justify-between">
                    <span className={`text-blue-800 ${classNameDisplay}`}>{value}</span>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            setEdit(true);
                        }}
                        className={`p-2 text-blue-500 hover:text-blue-700 ${classNameIcon}`}
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

export default TripField;