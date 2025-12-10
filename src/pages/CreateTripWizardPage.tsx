import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TripTypeWizard from "../components/CreateTripWizard/TripType.jsx";
import TripContributorsWizard from "../components/CreateTripWizard/TripContributors";

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
                (<TripTypeWizard 
                    tripType={tripInformation.tripType}
                    onSubmit={(value) => {
                        updateInformation('tripType', value);
                        next();
                    }}/>)}
            {currentPage === 2 && 
                (<TripContributorsWizard 
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