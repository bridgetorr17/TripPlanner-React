import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../StyledComponents/Modal";
import { FaTrash } from "react-icons/fa6";
import Spinner from "../StyledComponents/Spinner";
import { PhotoProps } from "./PhotoTypes";
import { PhotoType } from "../../../shared/types/Photo"
import { useEffect } from "react";

const Photos = ({tripId, editMode, setEditMode, photosInit, loggedInUser}: PhotoProps) => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
    const [photos, setPhotos] = useState<PhotoType[]>(photosInit)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [buttonLabel, setButtonLabel] = useState<'Upload this photo' | 'Choose Photo'>('Choose Photo')
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const uploadPhoto = async () => {
        setLoading(true);
        
        const formData = new FormData();
        if (selectedPhoto){
            formData.append("newPhoto", selectedPhoto);
        }
        
        try{
            const res = await fetch(`/api/trips/uploadPhoto/${tripId}`, {
                method: "POST",
                body: formData
            });

            const photo = await res.json();

            const addedPhoto = {
                url: photo.url,
                user: {
                    _id: photo.user,
                    userName: loggedInUser,
                },
                _id: photo._id
            }

            setPhotos(prev => [...prev, addedPhoto])
            closeModal();
        }
        catch(err){
            console.error("Upload error: ", err)
            navigate('/errorpage')
        }
    }

    const deletePhoto = async (id: string) => {
        const photoId = {
            id: id
        }

        try{
            const res = await fetch(`/api/trips/deletePhoto/${tripId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(photoId)
            });

            const updatedPhotos = await res.json();
            setPhotos(updatedPhotos);
        }
        catch(err){
            console.log(err);
        }  
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setSelectedPhoto(file)

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") setPreviewUrl(reader.result);
            }
            reader.readAsDataURL(file);
            setButtonLabel('Upload this photo');
        }
    }

    const handleButtonClick = () => {
        if (!selectedPhoto) {
            fileInputRef.current?.click();
        } else {
            uploadPhoto();
        }
    }

    const closeModal = () => {
        setLoading(false);
        setPreviewUrl(null);
        setSelectedPhoto(null);
        setEditMode(false);
        setButtonLabel('Choose Photo');
    }

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {photos.map((photo) => (
                    <div key={photo._id} className="flex flex-col items-center">
                        <img
                            src={photo.url}
                            alt={`Posted by ${photo.user.userName}`}
                            className="w-full h-48 object-cover rounded-lg"
                            />
                        <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-700 italic">
                                {photo.user.userName}
                            </span>
                            <div>
                                {loggedInUser === photo.user.userName && (
                                    <button
                                        className="text-red-600 hover:text-red-800 focus:outline-none"
                                        onClick={() => deletePhoto(photo._id)}>
                                        <FaTrash/>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            { editMode && (
                <>
                    <Modal
                        isOpen={true}
                        onClose={closeModal}
                        title="Upload a Photo">
                        <div className="flex flex-col items-center p-2 sm:p-4 md:p-6 space-y-2">
                            <input
                                type="file"
                                id="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{display: 'none'}}
                                onChange={handleFileChange}
                                />
                            <button
                                type="button"
                                className="px-4 py-2 bg-sky-100 text-blue-600 rounded hover:bg-sky-200 transition"
                                onClick={handleButtonClick}
                                >
                                {loading ?
                                    <Spinner loading={loading}/> 
                                    : buttonLabel}
                            </button>
                            {previewUrl && (
                                <div className="flex items-center justify-center w-64 h-64 mx-auto">
                                    <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="max-w-full max-h-full object-contain rounded-lg border"
                                    />
                                </div>
                            )}
                        </div>
                    </Modal>
                </>
            )}
        </>
    )
}

export default Photos;