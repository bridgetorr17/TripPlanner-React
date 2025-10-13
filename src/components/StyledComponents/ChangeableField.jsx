import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import IconButton from './IconButton'

const ChangeableField = ({ name, isOwner, label, value, setValue, edit, setEdit, save, size }) => {

    const [tempValue, setTempValue] = useState(value);
    const baseInputStyles = "flex-grow px-3 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    const displayStyles = {
        large: "text-4xl font-bold text-blue-900",
        medium: "text-2xl font-medium text-blue-700"
    }

    const inputStyles = {
        large: "text-4xl font-bold text-blue-900 border-blue-400",
        medium: "text-2xl font-medium text-blue-700 border-blue-400"
    }

    const iconStyles = {
        large: "ml-2",
        medium: "ml-1"
    }
    return (
        <>
            <form onSubmit={(e) => {
                    e.preventDefault();
                    setValue(tempValue);
                    save(name, tempValue, setEdit);
                }} className="mb-6">
                {label && <label className="block text-teal-800 font-semibold mb-1">{label}</label>}
                {edit ? (
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            className={`${baseInputStyles} ${inputStyles[size]}`}
                        />
                        <IconButton
                            type="submit" 
                            className={iconStyles[size]}>
                            <FaSave className="w-5 h-5" />
                        </IconButton>
                        <IconButton
                            onClick={(e) => {
                                e.preventDefault();
                                setTempValue(value);
                                setEdit(false);
                            }}
                            color="gray"
                            className={iconStyles[size]}
                            aria-label="Cancel"
                        >
                            <FaTimes className="w-5 h-5" />
                        </IconButton>
                    </div>
                ) : (
                <div className="flex items-center justify-between">
                    <span className={`text-blue-800 ${displayStyles[size]}`}>
                        {value !== '' ? value : `Add ${name} here`}
                    </span>
                    {isOwner && (
                    <IconButton
                        onClick={(e) => {
                            e.preventDefault();
                            setEdit(true);
                        }}
                        className={iconStyles[size]}
                        aria-label={`Edit ${name}`}
                    >
                        <FaEdit className="w-5 h-5" />
                    </IconButton>)}
                </div>
                )}
            </form>
        </>
    )
}

export default ChangeableField;