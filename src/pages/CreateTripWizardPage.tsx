import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TripType from "../components/CreateTrip/TripType.js";
import TripContributors from "../components/CreateTrip/TripContributors.js";

export type WizardData = {
    tripType: string;
    tripContributors: string;
}

const CreateTripWizardPage = () => {

    const [currentPage, setPage] = useState(1);
    const next = () => setPage((prev) => ++prev);
    const back = () => setPage((prev) => --prev);
    
    const [tripInformation, setTripInformation] = useState<WizardData>({
        tripType: '',
        tripContributors: '',
    });

    const updateInformation = <K extends keyof WizardData>(field: K, value: WizardData[K]) => {
        console.log('updating information')
        setTripInformation((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    const handleFinalSubmit = async () => {
        console.log('submitting to backend')
        console.log(tripInformation)
    }

    return (
        <div>
            {currentPage === 1 && 
                (<TripType
                    tripType={tripInformation.tripType}
                    onSubmit={(value) => {
                        updateInformation('tripType', value);
                        next();
                    }}/>)}
            {currentPage === 2 && 
                (<TripContributors
                    tripContributors={tripInformation.tripContributors}
                    onBack={back}
                    onSubmit={(value) => {
                        updateInformation('tripContributors', value);
                        handleFinalSubmit();
                    }}/>)}
        </div>
    )
}

export default CreateTripWizardPage;