import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileField from "../components/ProfileField";
import { FaSignOutAlt, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserPage = () => {
    const { isOwner,
            userName: initUserName, 
            email: initEmail, 
            profilePicture,
            bio: initBio} = useLoaderData();

    const nav = useNavigate();
    
    const [userName, setUserName] = useState(initUserName);
    const [email, setEmail] = useState(initEmail);
    const [bio, setBio] = useState(initBio);

    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editBio, setEditBio] = useState(false);

    const handleSave = async (field, newValue) => {
        const editField = {
            field: newValue
        }

        try{
            const result = await fetch(`/api/dashboard/edit/${field}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editField)
            });

            const data = await result.json();

            if (!data.success){
                throw data.message
            } else console.log(data.message);
        }
        catch (err){
            console.err(err);
        }
        finally{
            nav('/dashboard')
        }
    }

    const handleDelete = () => {
        console.log('pressed delete')
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
            <ProfileField 
                name='userName'
                label='User Name'
                value={userName}
                setValue={setUserName}
                edit={editName}
                setEdit={setEditName}
                isOwner={isOwner}
                save={handleSave}    
            />
            <ProfileField 
                name='email'
                label='Email'
                value={email}
                setValue={setEmail}
                edit={editEmail}
                setEdit={setEditEmail}
                isOwner={isOwner}
                save={handleSave}    
            />
            <ProfileField 
                name='bio'
                label='Biography'
                value={bio}
                setValue={setBio}
                edit={editBio}
                setEdit={setEditBio}
                isOwner={isOwner}
                save={handleSave}    
            />

            {isOwner 
                ? <div>  
                    <Link 
                         to={'/logout'}
                        className="w-full flex justify-center items-center mb-3 gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition"
                        >
                        <FaSignOutAlt className="text-lg"/>
                        Logout
                    </Link>
                    <button 
                        onClick={() => handleDelete()}
                        className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition"
                        >
                        <FaTrash className="text-lg"/>
                        Delete Account
                    </button> 
                </div>
                : null
            }
        </div>
    )
}

//User GET
const userLoader = async ({params}) => {
    console.log('in the user loader')
    const {userName} = params;
    console.log(userName);
    const user = await fetch(`/api/dashboard/${userName}`);
    const data = await user.json();

    console.log(`got the data: ${data}`)
    return data;
}

export {
    UserPage as default,
    userLoader
};