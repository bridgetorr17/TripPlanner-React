import { useState } from "react"
import { Link } from "react-router-dom"
import TripField from "./TripField"

const TripHeader = ({ isOwner, tripData, setTripData, tripId }) => {
  const [tripTitle, setTripTitle] = useState(tripData.title);
  const [tripSubtitle, setTripSubtitle] = useState(tripData.subtitle);
  const [tripDate, setTripDate] = useState({
    month: tripData.month,
    year: tripData.year
  });

  const [editTripTitle, setEditTripTitle] = useState(false);
  const [editTripSubtitle, setEditTripSubtitle] = useState(false);
  const [editTripDate, setEditTripDate] = useState(false);

  const handleSave = (name, newValue, setEditFn) => {
    // update logic here
    setEditFn(false);
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
                name="title"
                value={tripTitle}
                setValue={setTripTitle}
                edit={editTripTitle}
                setEdit={setEditTripTitle}
                save={handleSave}
                classNameDisplay="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-900"
                classNameInput="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-900 border-blue-400"
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
                <TripField
                name="date"
                value={`${tripDate.month} ${tripDate.year}`}
                setValue={(val) => {
                    const [m, y] = val.split(" ");
                    setTripDate({ month: m, year: y });
                }}
                edit={editTripDate}
                setEdit={setEditTripDate}
                save={handleSave}
                classNameDisplay="text-xl font-normal text-blue-600"
                classNameInput="text-xl font-normal text-blue-600 border-blue-400"
                classNameIcon="ml-1"
                />
            </>
            ) : (
            <>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-900">
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


// import { useState } from "react"
// import { Link } from "react-router-dom"
// import { FaEdit, FaSave } from "react-icons/fa"
// import TripField from "./TripField"

// const TripHeader = ({ isOwner, editMode, tripData, setTripData, tripId }) => {

//     const [tripTitle, setTripTitle] = useState(tripData.title);
//     const [tripSubtitle, setTripSubtitle] = useState(tripData.subtitle);
//     const [tripDate, setTripDate] = useState({
//         month: tripData.month,
//         year: tripData.year
//     });

//     const [editTripTitle, setEditTripTitle] = useState(false);
//     const [editTripSubtitle, setEditTripSubtitle] = useState(false);
//     const [editTripDate, setEditTripDate] = useState(false);

//     const handleSave = () => {
//         console.log('handle save called')
//     }
    
//     return (<>
//         {isOwner 
//             ? <>
//                 <Link to='/dashboard'>
//                     <h2 className="text-lg sm:text-xl text-blue-500 hover:text-blue-600">
//                         DASHBOARD
//                     </h2>
//                 </Link>
//                 <div className="w-full max-w-3xl mb-2 flex flex-row items-center justify-between gap-2">
//                     <TripField 
//                         name='title'
//                         value={tripTitle}
//                         setValue={setTripTitle}
//                         edit={editTripTitle}
//                         setEdit={setEditTripTitle}
//                         save={handleSave} 
//                         classNameDisplay="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium"
//                         classNameInput="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium"
//                         classNameIcon="ml-2"   
//                     />
//                     <TripField 
//                         name="subtitle"
//                         value={tripSubtitle}
//                         setValue={setTripSubtitle}
//                         edit={editTripSubtitle}
//                         setEdit={setEditTripSubtitle}
//                         save={handleSave}
//                         classNameDisplay="text-2xl font-medium text-blue-700"
//                         classNameInput="text-2xl font-medium text-blue-700 border-blue-400"
//                         classNameIcon="ml-1"
//                         />
//                     <TripField
//                         name="date"
//                         value={`${tripDate.month} ${tripDate.year}`}
//                         setValue={(val) => {
//                             const [m, y] = val.split(" ");
//                             setTripDate({ month: m, year: y });
//                         }}
//                         edit={editTripDate}
//                         setEdit={setEditTripDate}
//                         save={handleSave}
//                         classNameDisplay="text-xl font-normal text-blue-600"
//                         classNameInput="text-xl font-normal text-blue-600 border-blue-400"
//                         classNameIcon="ml-1"
//                         />
//                 </div>
//             </> 
//             : <>
//                 <div className="w-full max-w-3xl mb-2 flex flex-col sm:flex-row items-center justify-between gap-2">
//                     <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-blue-700 p-1">
//                         {trip.name}
//                     </h1>
//                     <Link to='/dashboard'>
//                         <h2 className="text-lg sm:text-xl text-blue-500 hover:text-blue-600">
//                         DASHBOARD
//                         </h2>
//                     </Link>
//                 </div>
//                 <div className="w-full max-w-3xl mb-8 flex flex-col items-start overflow-x-hidden">
//                     <span className="text-2xl font-normal text-blue-600 p-2 whitespace-normal break-words">
//                         {trip.subtitle}
//                     </span>
//                     <span className="text-xl font-normal text-blue-600 p-2 whitespace-normal break-words">
//                         {trip.month} {trip.year}
//                     </span>
//                 </div>
//             </>
//         }
//     </>
//     )
// }

// export default TripHeader
