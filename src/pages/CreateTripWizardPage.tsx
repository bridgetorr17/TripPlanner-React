import { useState } from "react";
import { useMultipleForm } from "usetheform";

import TripTypeWizard from "../components/CreateTripWizard/TripType.jsx";
import TripDescriptionWizard from "../components/CreateTripWizard/TripDescription";
import TripDatesWizard from "../components/CreateTripWizard/TripDates";
import TripContributorsWizard from "../components/CreateTripWizard/TripContributors";

export type WizardData = {
    tripType?: string;
    tripName?: string;
    tripDate?: string;
    tripContributors?: string;
}

const CreateTripWizardPage = () => {

    const [currentPage, setPage] = useState(1);
    const next = () => setPage((prev) => ++prev);
    const back = () => setPage((prev) => --prev);


    const [getWizardState, wizard] = useMultipleForm();
    const onSubmitWizard = (finalData: WizardData) => {
        console.log(`wizard finished, data: ${finalData}`)
    }
    
    const handleFinal = () => {
        const data = getWizardState();
        onSubmitWizard(data as WizardData);
    }

    return (
        <div>
            {currentPage === 1 && (
                <TripTypeWizard onSubmit={next}/>
            )}
            {/* {currentPage === 2 && (
                <TripDescriptionWizard prevPage={back} onSubmit={next}/>
            )}
            {currentPage === 3 && (
                <TripDatesWizard prevPage={back} onSubmit={next}/>
            )} */}
            {currentPage === 4 && (
                <TripContributorsWizard prevPage={back} onSubmit={handleFinal}/>
            )}
        </div>
    )
}

export default CreateTripWizardPage;