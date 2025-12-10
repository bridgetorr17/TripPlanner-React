import { useState } from "react"

interface Props {
    tripContributors: string;
    onBack: () => void;
    onSubmit: (tripContributors: string) => void;
}

export default function TripContributors ( { tripContributors, onBack, onSubmit }: Props ) {

    const [localContributors, setLocalContributors] = useState(tripContributors);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(localContributors);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Contributors:
                <input 
                    type="text"
                    value={localContributors}
                    onChange={(e) => setLocalContributors(e.target.value)} />
            </label>
            <button type="button" onClick={onBack}>
                Back
            </button>
            <button type="submit">Finish</button>
        </form>
    )
}