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
        <form onSubmit={handleSubmit} className="min-h-screen bg-blue-50 flex items-start justify-center py-10 px-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-md border border-blue-100 p-8 space-y-8">
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
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Add the user names everyone who’s part of this trip.
                        Each person included needs to make an account to contribute. 
                        Viewers without accounts can be added after creation of the trip. 
                    </p>
                    <ContributorsInput 
                        contributorNames={contributors} 
                        setContributorNames={setContributors} />
                </div>
            </div>
        </form>
    )
}