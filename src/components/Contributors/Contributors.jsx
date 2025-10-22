import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ContributorsInput from "./ContributorsInput";
import Modal from "../StyledComponents/Modal";

const Contributors = ({editMode, setEditMode, contributors, setContributors, tripId}) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [contributorNames, setContributorNames] = useState(contributors.map(cont => cont.userName))

    useEffect(() => {
        setContributorNames(contributors.map(cont => cont.userName));
    }, [editMode])

    const editContributors = async () => {
        try{
            const res = await fetch(`/api/trips/editContributors/${tripId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({contributors: contributorNames})
            });

            if(!res.ok) throw new Error('Failed to save');

            const response = await res.json();

            if (!response.success) throw new Error (response.message)
            setContributors(response.contributors);
        }
        catch(err) {
            console.error("error saving locations:" , err)
            setErrorMessage(err.message);
            setModalOpen(true);
        }
        finally{
            setEditMode(false);
        }
    }  

    return (
        <>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Error Updating Contributors">
                    <span>{errorMessage}</span>
                </Modal>
            { editMode ?
                <div>
                    <ContributorsInput 
                        contributorNames={contributorNames} 
                        setContributorNames={setContributorNames} />
                    <span
                        onClick={editContributors}
                        className="w-full flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition">
                        Update Contributors
                    </span>
                </div>
               
            :  (
                <div className="flex space-x-4 overflow-x-auto">
                    {contributors?.map((cont, ind) => (
                        <Link to={`/dashboard/${cont._id}`}>
                            <div key={ind} className="flex flex-col items-center">
                                <img
                                    src={cont.profilePicture}
                                    alt={cont.userName}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="mt-2 text-sm text-gray-700">{cont.userName}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>

    )
}

export default Contributors;