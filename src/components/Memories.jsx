import { useState } from "react";

const Memories = ({editMode, memories, setMemories}) => {

    const [memory, setMemory] = useState('');
    const [location, setLocation] = useState('');

    const createMemory = async (e) => {
        e.preventDefault();

        console.log(`want to create a new memory with ${location} location and ${memory} text.`)
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
            :   <div className="flex flex-col">
                    {memories.map((mem, ind) => (
                        <div>
                            <span>{mem.text}</span>
                            <span>{mem.user}</span>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}

export default Memories;