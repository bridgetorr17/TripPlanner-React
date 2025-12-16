

export default function CreateTripIntro (props: { 
    cancel: () => void; 
    onNext: () => void
}) {

    const { cancel, onNext } = props;

    return (
        <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-blue-100">
            <div className="flex justify-between">
                <button type="button" onClick={cancel} className="text-sm font-semibold text-blue-600 hover:text-cyan-600">
                    Cancel
                </button>
                <button type="button" onClick={onNext} className="text-sm font-semibold text-blue-600 hover:text-cyan-600">
                    Next
                </button>
            </div>
            <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">Create a new trip</h1>
            <p className="text-lg text-gray-700 mb-6 space-y-4">
                Hello!
                <br />
                Here you can set up the foundation for your trip. You can
                name your journey, add a description, and include the people who will
                be part of the experience.
                <br />
                <br />
                Once complete, you’ll be able to capture memories, upload photos,
                organize destinations, and share your story with friends and family.
            </p>
        </div>
    )
}