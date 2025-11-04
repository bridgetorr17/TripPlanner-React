import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import EditDate from "./EditDate"
import ChangeableField from "../StyledComponents/ChangeableField"
import { spanStylesMedium } from "../Utilities/commonStyles"

const TripHeader = ({ isOwner, tripData, tripId }) => {
    
    return (
        <div className="w-full max-w-3xl mb-8 flex flex-col space-y-4">
            <div className="flex justify-end">
                <Link to="/dashboard">
                <h2 className="text-lg sm:text-xl text-blue-500 hover:text-blue-600">
                    DASHBOARD
                </h2>
                </Link>
            </div>
            <div className="flex flex-col items-start space-y-4">
                {isOwner ? (
                <>
                    <ChangeableField
                        name="name"
                        label=""
                        initValue={tripData.title}
                        size="large"
                        url={`/api/trips/editTripField/${tripId}`}
                    />
                    <ChangeableField
                        name="subtitle"
                        label=""
                        initValue={tripData.subtitle}
                        size="medium"
                        url={`/api/trips/editTripField/${tripId}`}
                    />
                    <EditDate 
                        name="date"
                        startingMonth={tripData.month}
                        startingYear={tripData.year}
                        tripId={tripId}
                    />
                </>
                ) : (
                <>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-blue-900">
                        {tripData.title}
                    </h1>
                    <span className={spanStylesMedium}>
                        {tripData.subtitle}
                    </span>
                    <span className="text-xl font-normal text-blue-600">
                        {tripData.month} {tripData.year}
                    </span>
                </>
                )}
            </div>
        </div>
    )
}

export default TripHeader