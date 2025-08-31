import { useState, useRef } from "react";
import Modal from "../Utlities/Modal";

const Photos = ({tripId, editMode, setEditMode, photosInit}) => {

    const fileInputRef = useRef(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [photos, setPhotos] = useState(photosInit)
    const [previewUrl, setPreviewUrl] = useState(null);
    const [buttonLabel, setButtonLabel] = useState('Choose Photo')
    const [modalOpen, setModalOpen] = useState(false);

    const uploadPhoto = async () => {
        
        const formData = new FormData();
        formData.append("newPhoto", selectedPhoto);

        try{
            const res = await fetch(`/api/trips/uploadPhoto/${tripId}`, {
                method: "POST",
                body: formData
            });

            const photo = await res.json();

            setPhotos(prev => [...prev, photo])
            closeModal();
        }
        catch(err){
            console.error("Upload error: ", err)
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null
        setSelectedPhoto(file)

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(file);
            setButtonLabel("Upload this photo");
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
        setModalOpen(false);
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
                            alt={`Posted by ${photo.userName}`}
                            className="w-full h-48 object-cover rounded-lg"
                            />
                        <span className="mt-2 text-xs text-gray-700 italic">
                            {photo.userName}
                        </span>
                    </div>
                ))}
            </div>
            { editMode && (
                <>
                    <Modal
                        isOpen={true}
                        onClose={closeModal}
                        title="Upload a Photo">
                        <div className="flex flex-col items-center space-y-2">
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
                                {buttonLabel}
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