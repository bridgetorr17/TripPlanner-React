import { useState } from "react"

interface Props {
    tripType: string;
    onSubmit: (tripType: string) => void;
}

export default function TripType ( { tripType, onSubmit }: Props ) {

    const [selected, setSelected] = useState<'long' | 'short' | ''>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(selected);
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>What kind of trip do you want to document?</legend>
                <div>
                    <input 
                        type="radio"
                        id="tripTypeLong"
                        name="tripType"
                        value="long"
                        checked={selected === "long"}
                        onChange={() => setSelected("long")} />
                    <label htmlFor="tripTypeLong">
                        Journey
                        <div style={{ fontSize: "smaller", color: "#666" }}>
                           A long-form adventure: multiple cities and days, best for several destinations 
                        </div>
                    </label>
                </div>
                <div>
                    <input 
                        type="radio"
                        id="tripTypeShort"
                        name="tripType"
                        value="short"
                        checked={selected === "short"}
                        onChange={() => setSelected("short")} />
                    <label htmlFor="tripTypeShort">
                        Jaunt
                        <div style={{ fontSize: "smaller", color: "#666" }}>
                           A short escape: on city, a few days, well suited for a weekend getaway or quick trip
                        </div>
                    </label>
                </div>
                <button type="submit">Next</button>
            </fieldset>
        </form>
    )
}