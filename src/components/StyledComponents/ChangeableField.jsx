import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const ChangeableField = ({ name, isOwner, label, value, setValue, edit, setEdit, save, classNameDisplay = '', classNameInput = '', classNameIcon = ''}) => {

    const [tempValue, setTempValue] = useState(value);

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
                            className={`flex-grow px-3 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${classNameInput}`}
                        />
                        <IconButton
                            type="submit" 
                            className={classNameIcon}>
                            <FaSave className="w-5 h-5" />
                        </IconButton>
                        <IconButton
                            onClick={(e) => {
                                e.preventDefault();
                                setTempValue(value);
                                setEdit(false);
                            }}
                            color="gray"
                            className={classNameIcon}
                            aria-label="Cancel"
                        >
                            <FaTimes className="w-5 h-5" />
                        </IconButton>
                    </div>
                ) : (
                <div className="flex items-center justify-between">
                    <span className={`text-blue-800 ${classNameDisplay}`}>
                        {value !== '' ? value : `Add ${name} here`}
                    </span>
                    {isOwner && (
                    <IconButton
                        onClick={(e) => {
                            e.preventDefault();
                            setEdit(true);
                        }}
                        className={classNameIcon}
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