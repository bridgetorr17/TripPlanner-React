import { useState } from "react";
import { useMultipleForm } from "usetheform";

import TripTypeWizard from "../components/CreateTripWizard/TripType";
import TripDescriptionWizard from "../components/CreateTripWizard/TripDescription";

const CreateTripWizardPage = () => {

    const [currentPage, setPage] = useState(1);
    const next = () => setPage((prev) => ++prev);
    const back = () => setPage((prev) => --prev);

    const [getWizardState, wizard] = useMultipleForm();
    const onSubmitWizard = () => console.log(getWizardState());

    return (
        <div>
            {currentPage === 1 && (
                <TripTypeWizard onSubmit={next}/>
            )}
            {currentPage === 2 && (
                <TripDescriptionWizard prevPage={back} onSubmit={onSubmitWizard}/>
            )}
        </div>
    )
}

export default CreateTripWizardPage;