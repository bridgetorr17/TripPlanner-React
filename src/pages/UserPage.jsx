import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const UserPage = () => {
    const { isOwner,
            userName: initUserName, 
            email: initEmail, 
            profilePicture,
            bio: initBio} = useLoaderData();
    
    const [userName, setUserName] = useState(initUserName);
    const [email, setEmail] = useState(initEmail);
    const [bio, setBio] = useState(initBio);

    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editBio, setEditBio] = useState(false);

    const handleSaveName = () => {

    }

    const handleSaveEmail = () => {
        
    }

    const handleSaveBio = () => {

    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
            <div className="flex flex-col items-center space-y-4 mb-8">
                <img
                    src={profilePicture || ""}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-sky-300"
                />
                <h1 className="text-2xl font-bold text-blue-700">{userName.toUpperCase()}'s PROFILE</h1>
            </div>
            <form onSubmit={handleSaveName} className="mb-6">
                 <label className="block text-teal-800 font-semibold mb-1">User Name:</label>
                {editName ? (
                <div className="flex items-center space-x-2">
                    <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="flex-grow px-3 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    <button type="submit" className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md">
                    Save
                    </button>
                </div>
                ) : (
                <div className="flex items-center justify-between">
                    <span className="text-blue-800">{userName}</span>
                    {isOwner && (
                    <button
                        type="button"
                        onClick={() => setEditName(true)}
                        className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md"
                    >
                        Edit
                    </button>
                    )}
                </div>
                )}
            </form>
            <form onSubmit={handleSaveEmail}>

            </form>
            <form onSubmit={handleSaveBio}>

            </form>
        </div>
    )
}

//User GET
const userLoader = async () => {
    const user = await fetch(`api/dashboard/user`);
    const userRes = await user.json();

    return userRes;
}

export {
    UserPage as default,
    userLoader
};