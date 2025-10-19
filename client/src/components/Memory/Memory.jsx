import { FaMapMarkerAlt, FaTrash} from "react-icons/fa";
import { useState } from "react";
import Modal from "../StyledComponents/Modal"
import { Link, useNavigate } from "react-router-dom";

const Memory = ({memory, loggedInUser, tripId, deleteMemory}) => {

    const [editMemory, setEditMemory] = useState(false);
    const [memoryText, setMemoryText] = useState(memory.text);
    const [modalOpen, setModalOpen] = useState(false);
    const [seeMore, setSeeMore] = useState(false);
    const navigate = useNavigate()

    const longLength = memoryText.length > 200;
    const displayText = (longLength && !seeMore) ? memoryText.slice(0, 200) + '...' : memoryText;

    const toggleEdit = (edit, saveFn, setEdit) => {
        if (edit) saveFn();
        else setEdit(true);
    }

    const updateMemory = async () => {
        const updatedMemory = {
            id: memory._id,
            updatedText: memoryText
        }

        try{
            const res = await fetch(`/api/trips/editMemory/${tripId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedMemory)
            });

            const response = await res.json();

            if (!response.success) throw new Error (response.message)
            setEditMemory(false);
        }
        catch(err){
            navigate('/errorpage')
            console.log(err);
        }
    }

    const handleDelete = () => {
        deleteMemory(memory._id);
        setModalOpen(false);
    }

    return (
        <>
            <div
                key={memory._id}
                className="relative inline-block rounded-3xl p-4 bg-gradient-to-br to-sky-200 text-blue-900 shadow:md hover:shadow-lg transition-shadow w-full max-w-md">
                    {loggedInUser === memory.user.userName && (
                        <div className="absolute top-3 right-3 flex space-x-2">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-2 py-1 rounded focus:outline-none"
                                    onClick={() => toggleEdit(editMemory, updateMemory, setEditMemory)}>
                                {editMemory ? "Save" : "Edit"}
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-2 py-1 rounded focus:outline-none"
                                onClick={() => setModalOpen(true)}
                                >
                                <FaTrash />
                            </button>
                        </div>
                    )}
                <div className="absolute top-3 left-3 flex items-center text-xs text-blue-700 opacity-75">
                    <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                    <span>{memory.location}</span>
                </div>
                <div className="mt-6">
                    {editMemory 
                     ? <textarea 
                        rows={3}
                        name="memory"
                        value={memoryText}
                        onChange={(e) => setMemoryText(e.target.value)} 
                        className="border w-full p-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                     : <p className="text-base font-semibold text-left leading-relaxed">
                        {displayText}
                        {longLength && (
                            <button
                                onClick={() => setSeeMore(prev => !prev)}
                                className="ml-2 text-xs text-blue-600 hover:underline">
                                {seeMore ? "see less" : "see more"}
                            </button>
                        )}
                    </p>}
                    
                </div>
                <Link to={`/dashboard/${memory.user._id}`}>
                    <div className="mt-2 text-right text-xs italic text-blue-800 opacity-90">
                        <img 
                            src={memory.user.profilePicture} 
                            alt={`${memory.user.userName}'s profile picture`} 
                            className="inline-block w-3 h-3 mr-1 rounded-full align-text-bottom"/>
                        <span className="cursor-pointer hover:underline hover:text-blue-600 transition-colors duration-200 ease-in-out">
                            {memory.user.userName}
                        </span>
                    </div>
                </Link>
            </div>

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Confirm Deletion">
                    <p className="mb-4">Are you sure you want to delete this memory?</p>
                    <div className="flex justify-end space-x-3">
                    <button
                        className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        onClick={() => setModalOpen(false)}>
                        Cancel
                    </button>
                    <button
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        onClick={() => handleDelete()}>
                        Delete
                    </button>
                    </div>
            </Modal>
        </>
    )
}

export default Memory;