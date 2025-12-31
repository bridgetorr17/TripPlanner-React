import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ContributorsInput from "./ContributorsInput";
import Modal from "../StyledComponents/Modal";
import { ContributorsProps } from "./UserTypes";
import { useUpdate } from "../../hooks/useUpdate";
import SubmitButton from "../StyledComponents/SubmitButton"

const Contributors = ({editMode, setEditMode, contributorsInit, creator, tripId}: ContributorsProps) => {

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [contributors, setContributors] = useState(contributorsInit)

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

    useEffect(() => {
        if (error) {
            setErrorMessage(error);
            setModalOpen(true);
        }
    }, [error])

    return (
        <>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Error Updating Contributors">
                    <span>{errorMessage}</span>
                </Modal>
            { editMode ?
                <form onSubmit={handleSubmit}>
                    <ContributorsInput 
                        creator={creator.userName}
                        contributorNames={contributorNames} 
                        setContributorNames={setContributorNames} />
                    <SubmitButton
                        loading={loading}
                        color="teal"
                        children="Update Contributors"/>
                </form>
               
            :  (
                <div className="flex space-x-4 overflow-x-auto">
                    <div className="flex flex-col items-center">
                        <img
                            src={creator.profilePicture}
                            alt={creator.userName}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="mt-2 text-sm text-gray-700">{creator.userName}</div>
                        <div className="mt-2 text-sm text-gray-700">owner</div>
                    </div>
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