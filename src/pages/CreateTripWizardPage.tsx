import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CreateTripIntro from "../components/CreateTrip/CreateTripIntro.js"
import TripContributors from "../components/CreateTrip/TripContributors.js";
import TripDescriptionWizard from "../components/CreateTrip/TripDescription.js";
import TripDatesWizard from "../components/CreateTrip/TripDates.js";

export type WizardData = {
    tripDescription: {
        tripName: string;
        tripSubtitle: string;
    },
    tripDate: {
        tripMonth: number,
        tripYear: number,
    },
    tripContributors: string[];
}

const newTripAttempt = async (tripInfo: WizardData) => {
    console.log(`posting new trip to backend: ${tripInfo}`)
    try {
        const res = await fetch('/api/trips/createNew', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tripInfo)
        });

        const result = await res.json();
        console.log(result);
    } catch(err) {
        throw err;
    }
}

const CreateTripWizardPage = () => {

    const [currentPage, setPage] = useState(1);
    const next = () => setPage((prev) => ++prev);
    const back = () => setPage((prev) => --prev);
    const navigate = useNavigate();
    
    const [tripInformation, setTripInformation] = useState<WizardData>({
        tripDescription: {
            tripName: '',
            tripSubtitle: '',
        },
        tripDate: {
            tripMonth: 0,
            tripYear: 0,
        },
        tripContributors: [],
    });

    useEffect(() => {
        if (tripInformation.tripContributors.length !== 0){
            newTripAttempt(tripInformation);
            console.log('now navigating to dashboard');
            navigate('/dashboard');
        }
    }, [tripInformation])

    const updateInformation = <K extends keyof WizardData>(field: K, value: WizardData[K]) => {
        setTripInformation((prev) => ({
            ...prev,
            [field]: value
        }));
    }
    
    return (
        <div>
            {currentPage === 1 && 
                (<CreateTripIntro
                    cancel={() => {
                       navigate('/dashboard') 
                    }}
                    onNext={next}
                    />)}
            {currentPage === 2 && 
                (<TripDescriptionWizard 
                    tripDescription={tripInformation.tripDescription}
                    onBack={back}
                    onSubmit={(value) => {
                        updateInformation('tripDescription', value);
                        next();
                    }}
                    />
                )
            }
            {currentPage === 3 && 
                (<TripDatesWizard 
                    tripDate={tripInformation.tripDate}
                    onBack={back}
                    onSubmit={(value) => {
                        updateInformation('tripDate', value);
                        next();
                    }}
                    />
                )
            }
            {currentPage === 4 && 
                (<TripContributors
                    tripContributors={tripInformation.tripContributors}
                    onBack={back}
                    onSubmit={(value) => {
                        updateInformation('tripContributors', value);
                    }}/>)}
        </div>
    )
}

export default CreateTripWizardPage;