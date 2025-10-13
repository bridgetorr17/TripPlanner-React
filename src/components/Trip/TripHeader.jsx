import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import EditDate from "./EditDate"
import ChangeableField from "../StyledComponents/ChangeableField"

const TripHeader = ({ isOwner, tripData, tripId }) => {
    const [tripTitle, setTripTitle] = useState(tripData.title);
    const [tripSubtitle, setTripSubtitle] = useState(tripData.subtitle);
    const [editTripTitle, setEditTripTitle] = useState(false);
    const [editTripSubtitle, setEditTripSubtitle] = useState(false);
    const [editTripDate, setEditTripDate] = useState(false);
    const navigate = useNavigate();

    const handleSave = async (field, newValue, setEdit) => {

        const updatedTripData = {
            field: field,
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

                const data = await res.json();

                if(!data.success){
                    throw data.message
                }
        }
        catch(err){
            navigate('/errorpage')
            console.log(err);
        }
        finally{
            setEdit(false);
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
                    <ChangeableField
                        name="name"
                        isOwner={true}
                        label=""
                        value={tripTitle}
                        setValue={setTripTitle}
                        edit={editTripTitle}
                        setEdit={setEditTripTitle}
                        save={handleSave}
                        size="large"
                    />
                    <ChangeableField
                        name="subtitle"
                        isOwner={true}
                        label=""
                        value={tripSubtitle}
                        setValue={setTripSubtitle}
                        edit={editTripSubtitle}
                        setEdit={setEditTripSubtitle}
                        save={handleSave}
                        size="medium"
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