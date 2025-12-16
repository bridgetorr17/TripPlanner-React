import { LargeNumberLike } from "crypto";
import MonthYear from "../Trip/MonthYear"
import { useState } from "react";

export default function TripDatesWizard (props: { 
    tripDate: {
        tripMonth: number;
        tripYear: number;
    };
    onBack: () => void; 
    onSubmit: (tripDate: {
        tripMonth: number;
        tripYear: number;
    }) => void;
}) {
    
    const { onBack, onSubmit } = props;
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const tripDate = {
            tripMonth: selectedDate.getMonth(),
            tripYear: selectedDate.getFullYear(),
        }
        onSubmit(tripDate)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-between">
                <button type="button" onClick={onBack} className="text-sm font-semibold text-blue-600 hover:text-cyan-600">
                    Back
                </button>
                <button type="submit" className="text-sm font-semibold text-blue-600 hover:text-cyan-600">
                    Next
                </button>
            </div>
            <h2 className="text-xl font-bold text-blue-700 text-center">
                Give it a date
            </h2>
            <div>
                <label htmlFor="contributors" className="block text-md font-medium text-teal-700">
                    Date
                </label>
                <p className="text-sm text-cyan-500">
                    Add the month and year this excursion takes place.
                    <br />
                    <br />
                    Once created, you can create a more specific timeline for each destination.
                </p>
                <MonthYear
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
            </div>
        </form>
    )
}