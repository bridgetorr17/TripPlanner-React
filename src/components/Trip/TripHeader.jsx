import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import TripField from "./TripField"
import EditDate from "./EditDate"

const TripHeader = ({ isOwner, tripData, setTripData, tripId }) => {

 
    const [tripTitle, setTripTitle] = useState(tripData.title);
    const [tripSubtitle, setTripSubtitle] = useState(tripData.subtitle);
    const [editTripTitle, setEditTripTitle] = useState(false);
    const [editTripSubtitle, setEditTripSubtitle] = useState(false);
    const [editTripDate, setEditTripDate] = useState(false);
    const navigate = useNavigate();

    const handleSave = async (name, newValue, setEditFn) => {

    const updatedTripData = {
        field: name,
        value: newValue
    }

    try{
            const res = await fetch(`/api/trips/editTripField/${tripId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTripData)
            });

            await res.json();

            setEditFn(false);
        }
    catch(err){
        navigate('/errorpage')
        console.log(err);
    }
    }

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
                    <TripField
                        name="name"
                        value={tripTitle}
                        setValue={setTripTitle}
                        edit={editTripTitle}
                        setEdit={setEditTripTitle}
                        save={handleSave}
                        classNameDisplay="text-4xl font-bold text-blue-900"
                        classNameInput="text-4xl font-bold text-blue-900 border-blue-400"
                        classNameIcon="ml-2"
                    />
                    <TripField
                        name="subtitle"
                        value={tripSubtitle}
                        setValue={setTripSubtitle}
                        edit={editTripSubtitle}
                        setEdit={setEditTripSubtitle}
                        save={handleSave}
                        classNameDisplay="text-2xl font-medium text-blue-700"
                        classNameInput="text-2xl font-medium text-blue-700 border-blue-400"
                        classNameIcon="ml-1"
                    />
                    <EditDate 
                        name="date"
                        startingMonth={tripData.month}
                        startingYear={tripData.year}
                        edit={editTripDate}
                        setEdit={setEditTripDate}
                        save={handleSave}
                        />
                </>
                ) : (
                <>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-blue-900">
                        {tripData.title}
                    </h1>
                    <span className="text-2xl font-medium text-blue-700">
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