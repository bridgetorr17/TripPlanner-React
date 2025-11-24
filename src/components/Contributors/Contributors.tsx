import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ContributorsInput from "./ContributorsInput";
import Modal from "../StyledComponents/Modal";
import { ContributorsProps } from "./UserTypes";
import { useUpdate } from "../../hooks/useUpdate";
import SubmitButton from "../StyledComponents/SubmitButton"

const Contributors = ({editMode, setEditMode, contributorsInit, tripId}: ContributorsProps) => {

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [contributors, setContributors] = useState(contributorsInit)
    //const [contributorNames, setContributorNames] = useState<string[]>(contributors.map(cont => cont.userName))

    useEffect(() => {
        if (!editMode) {
            setEditContributors(false);
            setContributorNames(contributors.map(cont => cont.userName));
        }
        else setEditContributors(true);
    }, [editMode]);

    const {
        value: contributorNames,
        setValue: setContributorNames,
        edit: editContributors,
        setEdit: setEditContributors,
        handleSubmit,
        loading,
        error
    } = useUpdate<string []>({
        url: `/api/trips/editContributors/${tripId}`,
        fieldName: 'updatedContributors',
        initialValue: contributors.map(cont => cont.userName),
        onSuccess: (data) => {
            setContributors(data.contributors)
            setEditMode(false)
        }
    })

    // const editContributors = async () => {
    //     try{
    //         const res = await fetch(`/api/trips/editContributors/${tripId}`, {
    //             method: 'PUT',
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stringify({contributors: contributorNames})
    //         });

    //         if(!res.ok) throw new Error('Failed to save');

    //         const response = await res.json();

    //         if (!response.success) throw new Error (response.message)
    //         setContributors(response.contributors);
    //     }
    //     catch(err) {
    //         console.error("error saving contributors:" , err)
    //         if (err && typeof err === "object" && "message" in err) setErrorMessage(err.message as string);
    //         else setErrorMessage('An unknown error occured');
    //         setModalOpen(true);
    //     }
    //     finally{
    //         setEditMode(false);
    //     }
    // }  

    return (
        <>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Error Updating Contributors">
                    <span>{errorMessage}</span>
                </Modal>
            { editMode && editContributors ?
                <form onSubmit={handleSubmit}>
                    <ContributorsInput 
                        contributorNames={contributorNames} 
                        setContributorNames={setContributorNames} />
                    <SubmitButton
                        loading={loading}
                        color="teal"
                        children="Update Contributors"/>
                    {/* <button
                        type="submit"
                        onClick={() => {
                            console.log('submit button clicked')
                            setEditMode(false)}}
                        className="w-full flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition">
                        Update Contributors
                    </button> */}
                </form>
               
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