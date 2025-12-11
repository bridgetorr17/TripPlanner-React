import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TripType from "../components/CreateTrip/TripType.js";
import TripContributors from "../components/CreateTrip/TripContributors.js";
import { TbRoad } from "react-icons/tb";

export type WizardData = {
    tripType: string;
    tripContributors: string[];
}

const CreateTripWizardPage = () => {

    const navigate = useNavigate();
    const [currentPage, setPage] = useState(1);
    const next = () => setPage((prev) => ++prev);
    const back = () => setPage((prev) => --prev);
    
    const [tripInformation, setTripInformation] = useState<WizardData>({
        tripType: '',
        tripContributors: [],
    });

    useEffect(() => {
        if (tripInformation.tripContributors.length !== 0){
            console.log('post to backend', tripInformation);
            navigate('/dashboard')
        }
    }, [tripInformation])

    const updateInformation = <K extends keyof WizardData>(field: K, value: WizardData[K]) => {
        setTripInformation((prev) => ({
            ...prev,
            [field]: value
        }));

        console.log(`trip information was updated, ${tripInformation}`)
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
                    }}/>)}
        </div>
    )
}

export default CreateTripWizardPage;