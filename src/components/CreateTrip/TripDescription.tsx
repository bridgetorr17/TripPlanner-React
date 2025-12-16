import { useState } from "react";

export default function TripDescriptionWizard (props: { 
    tripDescription: {
        tripName: string;
        tripSubtitle: string;
    };
    onBack: () => void; 
    onSubmit: (tripDescription: {
        tripName: string;
        tripSubtitle: string;
    }) => void
}) {

    const { tripDescription, onBack, onSubmit } = props;
    const [tripName, setTripName] = useState<string>(tripDescription.tripName);
    const [tripSubtitle, setTripSubtitle] = useState<string>(tripDescription.tripSubtitle);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            tripName,
            tripSubtitle
        })
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between">
                <button type="button" onClick={onBack} className="text-sm font-semibold text-blue-600 hover:text-cyan-600">
                    Back
                </button>
                <button type="submit" className="text-sm font-semibold text-blue-600 hover:text-cyan-600">
                    Next
                </button>
            </div>
            <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
                Name Your Adventure
            </h2>
            <div>
                <label htmlFor="tripName" className="block text-lg font-medium text-teal-700 mb-1">
                    Trip Name
                </label>
                <p className="text-sm text-cyan-500 mb-2">
                    Give your trip a memorable title.
                </p>
                <input
                    type="text"
                    id="tripName"
                    name="tripName"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)} 
                    placeholder="Eg. European Adventure"
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 placeholder:text-gray-400"
                    required
                    />
            </div>
            <div>
                <label htmlFor="tripSubtitle" className="block text-lg font-medium text-teal-700 mb-1">
                    Trip Description
                </label>
                <p className="text-sm text-cyan-500 mb-2">
                    Write a short description for your trip.
                </p>
                <textarea
                    id="tripSubtitle"
                    name="tripSubtitle"
                    rows={4}
                    value={tripSubtitle}
                    onChange={(e) => setTripSubtitle(e.target.value)} 
                    placeholder="Four wonderful weeks exploring the French Rivera, etc"
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 placeholder:text-gray-400"
                    />
            </div>
        </form>
    )
}