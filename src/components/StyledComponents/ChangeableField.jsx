import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import IconButton from './IconButton'
import { spanStylesMedium } from '../Utilities/commonStyles';

const ChangeableField = ({ name, isOwner, label, initValue, editField, save, size }) => {
    const [edit, setEdit] = useState(editField);
    const [value, setValue] = useState(initValue);
    const baseInputStyles = "flex-grow px-3 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    const displayStyles = {
        large: "text-4xl font-bold text-blue-900",
        medium: spanStylesMedium
    }

    const inputStyles = {
        large: "text-4xl font-bold text-blue-900 border-blue-400",
        medium: `${spanStylesMedium} border-blue-400`
    }

    const iconStyles = {
        large: "ml-2",
        medium: "ml-1"
    }

    const handleSubmit = async (e) => {
        // e.preventDefault();
        setValue(value);
        await save(name, value);
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="mb-6">
                {label && <label className="block text-teal-800 font-semibold mb-1">{label}</label>}
                {edit ? (
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
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
                                setValue(value);
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