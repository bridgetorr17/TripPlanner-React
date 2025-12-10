import { useState } from "react"

interface Props {
    tripType: string;
    onSubmit: (tripType: string) => void;
}

export default function TripTypeWizard ( { tripType, onSubmit }: Props ) {

    const [localType, setLocalType] = useState(tripType)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(localType);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Trip Type: 
                <input 
                    type="text" 
                    value={localType}
                    onChange={(e) => setLocalType(e.target.value)}/>
            </label>
            <button type="submit">Next</button>
        </form>
    )
}