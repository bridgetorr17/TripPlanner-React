

export default function CreateTripIntro (props: { 
    cancel: () => void; 
    onNext: () => void
}) {

    const { cancel, onNext } = props;

    return (
        <div className="min-h-screen bg-blue-50 flex items-start justify-center py-10 px-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-md border border-blue-100 p-8 space-y-8">
                <div className="flex justify-between">
                    <button type="button" onClick={cancel} className="text-sm font-semibold text-blue-600 hover:text-cyan-600">
                        Cancel
                    </button>
                    <button type="button" onClick={onNext} className="text-sm font-semibold text-blue-600 hover:text-cyan-600">
                        Next
                    </button>
                </div>
                <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">
                    Create a new trip
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Here you can set up the foundation for your trip. 
                    First, you’ll give your trip a name and compelling 
                    description. After that, add your dates and team members 
                    - all the essentials to bring your memories, photos, and 
                    plans together in one place.
                    <br />
                    <br />
                    Once complete, you’ll be able to capture memories, upload photos,
                    organize destinations, and share your story with friends and family.
                </p>
            </div>
        </div>
    )
}