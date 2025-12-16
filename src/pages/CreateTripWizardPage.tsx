import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CreateTripIntro from "../components/CreateTrip/CreateTripIntro.js"
import TripContributors from "../components/CreateTrip/TripContributors.js";
import TripDescriptionWizard from "../components/CreateTrip/TripDescription.js";

export type WizardData = {
    tripDescription: {
        tripName: string;
        tripSubtitle: string;
    },
    tripContributors: string[];
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
        tripContributors: [],
    });

    useEffect(() => {
        if (tripInformation.tripContributors.length !== 0){
            console.log('post to backend', tripInformation);
            navigate('/dashboard')
        }
        console.log('trip info was changed', tripInformation)
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