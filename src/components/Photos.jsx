import { useState, useRef } from "react";

const Photos = ({tripId, editMode, setEditMode, photosInit}) => {

    const fileInputRef = useRef(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [buttonLabel, setButtonLabel] = useState('Choose Photo')

    const uploadPhoto = async () => {
        
        const formData = new FormData();
        formData.append("newPhoto", selectedPhoto);

        console.log(...formData);

        try{
            const res = await fetch(`/api/trips/uploadPhoto/${tripId}`, {
                method: "POST",
                body: formData
            });

            const photo = await res.json();

            console.log(photo);

            setSelectedPhoto(null);
            setButtonLabel('Choose Photo');
            setEditMode(false);
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
    };

    return (
        <>
            { editMode && (
                <div>
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
                        {selectedPhoto && (
                            <p className="text-sm text-gray-600">{selectedPhoto.name}</p>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Photos;