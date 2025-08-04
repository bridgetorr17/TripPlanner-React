import { useLoaderData } from "react-router-dom"
import List from "../components/List"
import { Link } from "react-router-dom"
import { FaPenToSquare, FaPlus } from "react-icons/fa6"

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
            <div className="w-full max-w-3xl mb-8 flex flex-row items-center justify-start">
                <h1 className="text-3xl font-bold text-blue-700 p-6">Trip Page</h1>
                <Link to='/dashboard'>
                    <h2 className="text-2xl text-blue-500 p-6 hover:text-blue-600">DASHBOARD</h2>
                </Link>
            </div>
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 space-y-6">

                <div className="w-full max-w‑3xl bg-white rounded-lg shadow-md p‑8 space-y‑8">
                    <h2 className="text‑3xl font‑bold text‑teal‑600 text‑center">{trip.name}</h2>
                </div>

                <section className="border‑2 border‑sky‑200 bg‑sky‑50 rounded‑lg p‑6 space‑y‑4">
                    <div className="flex items‑center justify‑between mb‑4">
                        <h3 className="text‑2xl font‑semibold text‑sky‑700">Where we went</h3>
                        <button
                            type="button"
                            className="flex items‑center space‑x‑1 text‑sky‑600 hover:text‑sky‑800 text‑sm font‑medium border border‑sky‑300 rounded‑md px‑2 py‑1 transition"
                        >
                            <FaPenToSquare className="w‑4 h‑4" aria-hidden="true"/>
                            <span>Edit</span>
                        </button>
                    </div>
                    <div className="space‑y‑4">
                        <List 
                            arr={trip.locations}
                            links={false}/>
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d429164.57854889665!2d-80.32049131637113!3d32.82278502346605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88fe7a42dca82477%3A0x35faf7e0aee1ec6b!2sCharleston%2C%20SC!5e0!3m2!1sen!2sus!4v1754347095576!5m2!1sen!2sus" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" 
                                width="100%"
                                height="300"
                                className="border‑0 rounded‑md shadow‑inner"
                                aria-hidden="true"/> */}
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-teal-700 mb-2">What we saw</h3>
                    <button>
                        Add
                        <FaPlus />
                    </button>
                    <section>
                        <List 
                            arr={['put the photo album here']}
                            links={false}/>
                    </section>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-teal-700 mb-2">What we remember</h3>
                    <button>
                        Add
                        <FaPlus />
                    </button>
                    <section>
                        <List 
                            arr={['put the memories recorded here']}
                            links={false}/>
                    </section>
                </section>


                <section>
                    <h3 className="text-xl font-semibold text-teal-700 mb-2">Who was there</h3>
                    <button>
                        Edit
                        <FaPenToSquare />
                    </button>
                    <List 
                        arr={tripData.contributors}
                        links={true}/>
                </section>

                <div className="text-blue-800">
                    Trip created by <span className="font-semibold">{tripData.creator}</span>
                </div>

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