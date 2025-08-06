import { useLoaderData } from "react-router-dom"
import List from "../components/List"
import { Link } from "react-router-dom"
import mapPlaceholder from "../photos/mapPlaceholder.png"
import TripHeader from "../components/TripHeader"

const tripLoader = async ({ request }) => {
    const tripId = request.url.slice(-24)
    
    const trip = await fetch(`/api/trips/${tripId}`)
    const tripRes = await trip.json();

    return tripRes;
}

const TripPage = ({owner}) => {
    
    const tripData = useLoaderData().trip;
    const trip = tripData.trip;

    return (
        <div className="flex flex-col items-center bg-sky-50 text-blue-800 min-h-screen p-8">
            <div className="w-full max-w-3xl mb-2 flex flex-row items-center justify-between">
                <h1 className="text-6xl font-medium text-blue-700 p-3">{trip.name}</h1>
                <Link to='/dashboard'>
                    <h2 className="text-xl text-blue-500 hover:text-blue-600 ">DASHBOARD</h2>
                </Link>
            </div>
            <div className="w-full max-w-3xl mb-8 flex flex-row items-center justify-start">
                <span className="text-2xl font-normal text-blue-600 p-3">Trip Subtitle | Month Year</span>
            </div>
            <div className="w-full max-w-3xl space-y-6">
                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    <TripHeader 
                        headerTitle={"Where we went"}
                        modifyText={"Edit"}/>
                    <div className="space-y-4 p-4 bg-sky-50 rounded-md">
                        <div className="flex flex-row justify-center items-stretch space-x-4">
                            <div className="flex-1 p-4">
                                <div className="flex-1 h-full">
                                    <List arr={trip.locations} links={false} />
                                </div>
                            </div>
                            <div className="flex-1 p-2 rounded shadow-sm flex flex-col">
                                <div className="flex-1 h-full flex justify-center">
                                    <img
                                    src={mapPlaceholder}
                                    alt="Map"
                                    className="w-full max-w-xs h-auto object-cover rounded"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    <TripHeader 
                        headerTitle={"What we saw"}
                        modifyText={"Add"}
                        />
                    <div>
                        <span>put the photo album here</span>
                    </div>
                </section>

                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    <TripHeader 
                        headerTitle={"What we remember"}
                        modifyText={"Add"}
                        />
                    <section>
                        <span>put the memory anecdotes here</span>
                    </section>
                </section>


                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    <TripHeader 
                        headerTitle={"Who was there"}
                        modifyText={"Edit"}
                        />
                    <List 
                        arr={tripData.contributors}
                        links={true}/>
                </section>

                <Link 
                    to={`/trips/edit/${tripData.trip._id}`}
                    state={ {owner} }
                    className="inline-block mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition"
                >Edit this Trip</Link>
            </div>
        </div>
    )
}
export {
    TripPage as default, 
    tripLoader
}