import { useState, useRef } from "react";
import Modal from "./Modal";

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

    const handleButtonClick = () => {
        if (!selectedPhoto) {
            fileInputRef.current?.click();
            setButtonLabel('Upload Photo');
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
                    <div className="mt-4">
                        <button
                        className="px-4 py-2 bg-sky-100 text-blue-600 rounded hover:bg-sky-200 transition"
                        onClick={() => setModalOpen(true)}
                        >
                        Add a Photo
                        </button>
                    </div>
                    <Modal
                        isOpen={modalOpen}
                        onClose={closeModal}
                        title="Upload a Photo">
                        <div className="flex flex-col items-start space-y-2">
                            <input
                                type="file"
                                id="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{display: 'none'}}
                                onChange={(e) => setSelectedPhoto(e.target.files?.[0] || null)}
                                />
                            <button
                                type="button"
                                className="px-4 py-2 bg-sky-100 text-blue-600 rounded hover:bg-sky-200 transition"
                                onClick={handleButtonClick}
                                >
                                {buttonLabel}
                            </button>
                            {previewUrl && (
                                <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg border"
                                />
                            )}
                        </div>
                    </Modal>
                </>
            )}
        </>
    )
}

export default Photos;