import { FaMapMarkerAlt, FaEdit} from "react-icons/fa";

const Memory = ({memory, user}) => {

    return (
        <>
            <div
                key={memory._id}
                className="relative inline-block rounded-3xl p-4 bg-gradient-to-br to-sky-200 text-blue-900 shadow:md hover:shadow-lg transition-shadow w-full max-w-md"
            >
            {user === memory.userName && (
                <button className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-2 py-1 rounded focus:outline-none">
                    Edit
                </button>
            )}
            <div className="absolute top-3 left-3 flex items-center text-xs text-blue-700 opacity-75">
                <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                <span>{memory.location}</span>
            </div>
            <div className="mt-6">
                <p className="text-base font-semibold text-left leading-relaxed">
                {memory.text}
                </p>
            </div>
            <div className="mt-2 text-right text-xs italic text-blue-800 opacity-90">
                {memory.userName}
            </div>
            </div>
        </>
    )
}

export default Memory;