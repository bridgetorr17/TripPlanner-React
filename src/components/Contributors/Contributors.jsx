import { Link } from "react-router-dom";
import ContributorsInput from "./ContributorsInput";

const Contributors = ({editMode, contributorNames, setContributorNames, contributors}) => {

    return (
        <>
            { editMode ?
                <ContributorsInput 
                    contributorNames={contributorNames} 
                    setContributorNames={setContributorNames} />
            :  (
                <div className="flex space-x-4 overflow-x-auto">
                    {contributors?.map((cont, ind) => (
                        <Link to={`/dashboard/${cont.userName}`}>
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