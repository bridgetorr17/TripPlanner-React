import { FaMapMarkerAlt} from "react-icons/fa";
import { useState } from "react";

const Memory = ({memory, user, tripId}) => {

    const [editMemory, setEditMemory] = useState(false);
    const [memoryText, setMemoryText] = useState(memory.text);

    const toggleEdit = (edit, saveFn, setEdit) => {
        if (edit) saveFn();
        else setEdit(true);
    }

    console.log(editMemory)
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

            const data = await res.json();

            setEditMemory(false);

        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <>
            <div
                key={memory._id}
                className="relative inline-block rounded-3xl p-4 bg-gradient-to-br to-sky-200 text-blue-900 shadow:md hover:shadow-lg transition-shadow w-full max-w-md">
                    {user === memory.userName && (
                        <button className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-2 py-1 rounded focus:outline-none"
                                onClick={() => toggleEdit(editMemory, updateMemory, setEditMemory)}>
                            {editMemory ? "Save" : "Edit"}
                        </button>
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
                        {memoryText}
                    </p>}
                    
                </div>
                <div className="mt-2 text-right text-xs italic text-blue-800 opacity-90">
                    {memory.userName}
                </div>
            </div>
        </>
    )
}

export default Memory;