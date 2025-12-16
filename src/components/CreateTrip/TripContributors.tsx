import { useState } from "react"
import ContributorsInput from '../Contributors/ContributorsInput'

export default function TripContributors ( props: {
    tripContributors: string[];
    onBack: () => void;
    onSubmit: (tripContributors: string[]) => void;
}) {

    const { tripContributors, onBack, onSubmit } = props;
    const [contributors, setContributors] = useState<string[]>(tripContributors);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(contributors);
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md border border-blue-100 space-y-6">
            <div className="flex justify-between">
                <button type="button" onClick={onBack} className="text-sm font-semibold text-blue-600 hover:text-cyan-600">
                    Back
                </button>
                <button type="submit" className="text-sm font-semibold text-blue-600 hover:text-cyan-600">
                    Finish
                </button>
            </div>
            <h2 className="text-xl font-bold text-blue-700 text-center">
                Add Contributors
            </h2>
            <div>
                <label htmlFor="contributors" className="block text-md font-medium text-teal-700">
                    Contributors
                </label>
                <p className="text-sm text-cyan-500">
                    Add the user names everyone who’s part of this trip.
                    Each person included needs to make an account to contribute. 
                    <br />
                    <br />
                    Viewers without accounts can be added on creation of the trip. 
                </p>
                <ContributorsInput 
                    contributorNames={contributors} 
                    setContributorNames={setContributors} />
            </div>
        </form>
    )
}