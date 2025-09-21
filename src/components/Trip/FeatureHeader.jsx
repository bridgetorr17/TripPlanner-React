import { FaPenToSquare, FaPlus, FaX } from "react-icons/fa6"

const FeatureHeader = ({headerTitle, modifyText, onToggleEdit}) => {
    let editIcon;
    if (modifyText==="Add") editIcon = <FaPlus className="w-4 h-4 mr-2" aria-hidden="true" />
    else if (modifyText==="Cancel") editIcon = <FaX className="w-4 h-4 mr-2" aria-hidden="true"/>
    else editIcon = <FaPenToSquare className="w-4 h-4 mr-2" aria-hidden="true" />
    
    return (
        <div className="flex items-center justify-start mb-4">
            <h3 className="text-xl font-semibold text-blue-600 mr-4">{headerTitle}</h3>
            <button
                type="button"
                onClick={onToggleEdit}
                className="
                inline-flex items-center text-sm font-medium bg-blue-600 hover:bg-blue-700
                text-white px-3 py-1.5 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-teal-500
                transition-colors duration-150 ease-in-out
                cursor-pointer
                "
            >
                {editIcon}
                <span>{modifyText}</span>
            </button>
        </div>
    )
}

export default FeatureHeader