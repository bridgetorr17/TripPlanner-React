import { useLoaderData } from "react-router-dom"

const tripLoader = async ({ request }) => {
    const url = request.url.slice(21)
    
    const trip = await fetch(`/api${url}`)
    const tripRes = await trip.json();

    return tripRes;
}

const TripPage = () => {
    
    const trip = useLoaderData().trip;

    return (
        <h1>Trip Page</h1>
    )
}

export {
    TripPage as default, 
    tripLoader
}