import { useState } from "react"
import ContributorsInput from '../Contributors/ContributorsInput'

interface Props {
    tripContributors: string[];
    onBack: () => void;
    onSubmit: (tripContributors: string[]) => void;
}

export default function TripContributors ( { tripContributors, onBack, onSubmit }: Props ) {

    const [contributors, setContributors] = useState<string[]>(tripContributors);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(contributors);
    }

    return (
        <form onSubmit={handleSubmit}>
            <ContributorsInput 
                contributorNames={contributors} 
                setContributorNames={setContributors} />
            <button type="button" onClick={onBack}>
                Back
            </button>
            <button type="submit">Finish</button>
        </form>
    )
}