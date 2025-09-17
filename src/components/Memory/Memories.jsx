import { useState } from "react";
import Memory from "./Memory"
import { useNavigate } from "react-router-dom";

const Memories = ({editMode, setEditMode, memoriesInit, tripId, loggedInUser}) => {

    const [memory, setMemory] = useState('');
    const [location, setLocation] = useState('');
    const [memories, setMemories] = useState(memoriesInit);
    const navigate = useNavigate()
    const createMemory = async (e) => {
        e.preventDefault();

        const newMemory = {
            location,
            memory
        }

        try{
            const res = await fetch(`/api/trips/createNewMemory/${tripId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMemory)
            });

            const created = await res.json();
            console.log(`the created memory profile picture is ${created.userProfilePicture}`)
            setMemories(prev => [...prev, created])
        }
        catch(err){
            navigate('/errorpage')
            console.log(err);
        }
        finally{
            setMemory('');
            setLocation('');
            setEditMode(false);
        }
    }

    const deleteMemory = async (id) => {
        const memoryId = {
            id: id
        }
        try{
            const res = await fetch(`/api/trips/deleteMemory/${tripId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(memoryId)
            });

            const updatedMemories = await res.json();
            setMemories(updatedMemories);
        }
        catch(err){
            navigate('/errorpage')
            console.log(err);
        }
    }

    return (
        <>
            { editMode ?
                <form 
                    onSubmit={createMemory}
                    className="flex flex-col w-full p-4 space-y-6"
                >
                    <label className="mb-1 text-blue-700 font-semibold">Location</label>
                    <input 
                        type="text"
                        name="location"
                        placeholder="Location of this memory"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)} 
                        className="border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    <label className="mb-1 text-blue-700 font-semibold">Memory</label>
                    <textarea 
                        required
                        rows={4}
                        name="memory"
                        placeholder="Write the details of this memory"
                        value={memory}
                        onChange={(e) => setMemory(e.target.value)} 
                        className="border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    <button
                        type="submit"
                        className="w-full flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition">
                        Create Memory
                    </button>
                </form>
            :   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
                    {memories.map((mem) => (
                        <Memory id={mem._id}
                                key={mem._id}
                                memory={mem}
                                tripId={tripId}
                                loggedInUser={loggedInUser}
                                deleteMemory={deleteMemory}/>
                    ))}
                </div>
            }
        </>
    )
}

export default Memories;