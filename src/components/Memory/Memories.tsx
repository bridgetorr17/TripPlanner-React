import { useState } from "react";
import Memory from "./Memory"
import { useNavigate } from "react-router-dom";
import SubmitButton from "../StyledComponents/SubmitButton";
import { MemoriesProps } from "./MemoryTypes";
import { MemoryType } from "../../../shared/types/Memory";
import { inputLabelStyles } from "../../Utilities/commonStyles"
import { useCreateContent } from "../../hooks/useCreateContent.js";

const Memories = ({editMode, setEditMode, memoriesInit, tripId, loggedInUser}: MemoriesProps) => {

    const [memory, setMemory] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [memories, setMemories] = useState<MemoryType[]>(memoriesInit);
    const navigate = useNavigate()

    const { createContent: createNewMemory } = useCreateContent<
        { location: string; memory: string },
        MemoryType
    >({
        url: `/api/trips/createNewMemory/${tripId}`,
        onSuccess: created =>
            setMemories(prev => [...prev, created]),
        onFinally: () => {
            setMemory('');
            setLocation('');
            setEditMode(false);
        },
    });

    const deleteMemory = async (id: string) => {
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

    const handleCreateMemory = async (e: React.FormEvent) => {
        e.preventDefault();

        const newMemory = {
            location,
            memory,
        };

        await createNewMemory(newMemory);
    };
    return (
        <>
            { editMode ?
                <form 
                    onSubmit={handleCreateMemory}
                    className="flex flex-col w-full p-4 space-y-6"
                >
                    <label className={inputLabelStyles("blue")}>Location</label>
                    <input 
                        type="text"
                        name="location"
                        placeholder="Location of this memory"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)} 
                        className="border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    <label className={inputLabelStyles("blue")}>Memory</label>
                    <textarea 
                        required
                        rows={4}
                        name="memory"
                        placeholder="Write the details of this memory"
                        value={memory}
                        onChange={(e) => setMemory(e.target.value)} 
                        className="border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    <SubmitButton
                        loading={false}
                        color="blue"
                        children="Create Memory"
                    />
                </form>
            :   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
                    {memories.map((mem) => (
                        <Memory key={mem._id}
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