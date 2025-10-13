import { useLoaderData, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { FaSignOutAlt, FaTrash } from "react-icons/fa";
import ConfirmDelete from "../components/StyledComponents/ConfirmDelete"
import { redirect } from "react-router-dom";
import StyledButton from "../components/StyledComponents/StyledButton"
import { Link } from "react-router-dom";
import ChangeableField from "../components/StyledComponents/ChangeableField";

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
    const [profilePictureURL, setProfilePictureURL] = useState(profilePicture || "");
    const fileInputRef = useRef(null);

    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editBio, setEditBio] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const uploadPhoto = async (file) => {
        const formData = new FormData();
        formData.append("newPhoto", file);

        try{
            const res = await fetch(`/api/dashboard/uploadProfilePicture/${userName}`, {
                method: "POST",
                body: formData
            });

            const photo = await res.json();
            if(photo.success){
                setProfilePictureURL(photo.profilePictureURL)
            } else throw photo.message
        }
        catch(err){
            console.error("Upload error: ", err)
        }

    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        if (file) uploadPhoto(file);
    }

    const handleSave = async (field, newValue, setEdit) => {
        const editField = {
            field: field,
            value: newValue
        }

        try{
            const result = await fetch(`/api/dashboard/editUserField`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editField)
            });

            const data = await result.json();

            if (!data.success){
                throw data.message
            } 
        }
        catch (err){
            nav('/errorpage')
            console.log(err);
        }
        finally{
            setEdit(false);
        }
    }

    const handleDelete = async () => {
        try{
            const res = await fetch('/api/delete', {
                method: 'DELETE'
            });

            if (!res.ok) throw new Error (`Delete failed: ${res.status}`)
        }
        catch(err){
            console.error(err)
        }
        finally{
            nav('/')
        }
    };

    const handleLogout = async () => {
        const logout = await fetch(`/api/logout`)
        const logoutRes = await logout.json();
        if(logoutRes.success) {
            nav('/')
        }
    }

    return (
        <div className="relative">
            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8 relative">
                <div className="block mb-4 text-right">
                    <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium bg-white bg-opacity-90 px-2 py-1 rounded shadow">
                        Back to Dashboard
                    </Link>
                </div>
                <div className="flex flex-col items-center space-y-4 mb-8">
                    <img
                        src={profilePictureURL}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-sky-300"
                    />
                    {isOwner 
                        ? <>
                            <button
                                className="bg-gray-400 hover:bg-gray-600 rounded-3xl text-white text-sm p-1"
                                onClick={() => fileInputRef.current.click()}
                                >Edit Profile Photo</button>
                                <input 
                                    type="file"
                                    id="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{display: 'none'}}
                                    onChange={handleFileChange}
                                />
                            </>
                        : null}
                    <h1 className="text-2xl font-bold text-blue-700">{userName.toUpperCase()}'s PROFILE</h1>
                </div>
                <ChangeableField
                    name='userName'
                    isOwner={isOwner}
                    label='User Name'
                    value={userName}
                    setValue={setUserName}
                    edit={editName}
                    setEdit={setEditName}
                    save={handleSave}
                    size="medium"   
                />
                <ChangeableField
                    name='email'
                    isOwner={isOwner}
                    label='Email'
                    value={email}
                    setValue={setEmail}
                    edit={editEmail}
                    setEdit={setEditEmail}
                    save={handleSave}
                    size="medium"   
                />
                <ChangeableField
                    name='bio'
                    isOwner={isOwner}
                    label='Biography'
                    value={bio}
                    setValue={setBio}
                    edit={editBio}
                    setEdit={setEditBio}
                    save={handleSave}
                    size="medium"   
                />
                {isOwner 
                    ?
                    <>
                        <StyledButton 
                            onClickFn={() => handleLogout()}
                            color={"teal"}
                            >
                            <FaSignOutAlt className="text-lg"/>
                            Logout
                        </StyledButton>
                        <StyledButton
                            onClickFn={() => setModalOpen(true)}
                            color={"red"}
                        >
                            <FaTrash className="text-lg" />
                            Delete Account
                        </StyledButton>
                        <ConfirmDelete
                            isOpen={modalOpen}
                            onClose={() => setModalOpen(false)}
                            onConfirm={() => {
                                handleDelete();
                                setModalOpen(false);
                            }}
                            itemName={userName}
                        /> 
                    </>
                    : null}
            </div>
        </div>
    )
}

//User GET
const userLoader = async ({ params }) => {

    const { id } = params;

    const user = await fetch(`/api/dashboard/${id}`);
    const data = await user.json();

    if (!data.success) {
        return redirect('/')
    }

    return data;
}

export {
    UserPage as default,
    userLoader
};