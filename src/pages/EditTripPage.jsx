import { useLocation, useLoaderData } from "react-router-dom";
import { useState } from "react";
import NavLinks from "../components/NavLinks";
import List from "../components/List";


const EditTripPage = () => {
    const loc = useLocation()
    const owner = loc.state?.owner;

    const tripData = useLoaderData().trip;
    const trip = tripData.trip;

    return(
        <>
            <h1>Edit trip</h1>
            <NavLinks />

            <h2>We start in {trip.tripOrigin}</h2>

            <span>We are going to</span>

            <List arr={trip.tripStops}/>

            <span>This trip is run by {tripData.creator}</span>
            <br />
            <br />
            <span>Other contributors are</span>
            
            <List arr={tripData.contributors}/>
        </>
    )
}

export default EditTripPage