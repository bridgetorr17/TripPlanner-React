import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import IconButton from './IconButton'
import { spanStylesMedium } from '../Utilities/commonStyles';

type FieldSize = "large" | "medium";

interface ChangeableFieldProps {
    name: string;
    initValue: string;
    tripId: string;
    size: FieldSize;
}

const ChangeableField = ({ name, initValue, tripId, size }: ChangeableFieldProps) => {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(initValue);
    const baseInputStyles = "flex-grow px-3 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    const displayStyles = {
        large: "text-4xl font-bold text-blue-900",
        medium: spanStylesMedium
    }

    const inputStyles: Record<FieldSize, string> = {
        large: "text-4xl font-bold text-blue-900 border-blue-400",
        medium: `${spanStylesMedium} border-blue-400`
    }

    const iconStyles: Record<FieldSize, string> = {
        large: "ml-2",
        medium: "ml-1"
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValue(value);
        const updatedTripData = {
            field: name,
            value: value
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
            <form onSubmit={handleSubmit} className="mb-6">
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
                    <IconButton
                        onClick={(e) => {
                            e.preventDefault();
                            setEdit(true);
                        }}
                        className={iconStyles[size]}
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

export default ChangeableField;