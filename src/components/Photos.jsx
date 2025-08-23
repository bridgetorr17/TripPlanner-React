import { useState, useRef } from "react";

const Photos = ({tripId, editMode, setEditMode, photosInit}) => {

    const fileInputRef = useRef(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [photos, setPhotos] = useState(photosInit)
    const [buttonLabel, setButtonLabel] = useState('Choose Photo')

    console.log(photosInit)

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
            setSelectedPhoto(null);
            setEditMode(false);
            setButtonLabel('Choose Photo');
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
            { editMode ? (
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
            ) :  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
            }
        </>
    )
}

export default Photos;