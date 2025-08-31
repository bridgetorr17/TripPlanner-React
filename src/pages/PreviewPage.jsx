import loginPrev from '../photos/loginExample.png'
import createTripPrev from '../photos/createTripExample.png'
import dashboardPrev from '../photos/dashboardExample.png'
import editTripPrev from '../photos/editTripExample.png'
import tripPagePrev from '../photos/tripPageExample.png'
import userProfilePrev from '../photos/userProfileExample.png'
import { Link } from 'react-router-dom'

const PreviewPage = () => {

    const steps = [
        {
            title: 'Account Creation',
            desc: 'Create an account or securely log in to access your personal and shared trips.',
            img: loginPrev,
        },
        {
            title: 'Trip Dashboard',
            desc: 'Quickly see your personal trips under "My Trips" and trips others invited you to under "Shared Trips".',
            img: dashboardPrev,
        },
        {
            title: 'Creating a New Trip',
            desc: 'Click “Create New Trip” to plan vacations, add places, dates, and invite others.',
            img: createTripPrev,
        },
        {
            title: 'Editing Trips',
            desc: 'Update itineraries or trip details anytime via the trip edit screen.',
            img: editTripPrev,
        },
        {
            title: 'Friend Contributions',
            desc: 'Other users can contribute to trips with view & edit access—but only the creator can delete the trip.',
            img: tripPagePrev,
        },
        {
            title: 'User Profiles',
            desc: 'Edit your profile on your own page; other users can view it (but not edit).',
            img: userProfilePrev,
        },
    ];

    return (
        <div className="bg-sky-50 min-h-full font-sans text-sky-800">
            <header className="py-12 px-6 text-center bg-cyan-600 text-white">
                <h1 className="text-4xl md:text-5xl font-extrabold">Triply Preview</h1>
            </header>

            <main className="max-w-4xl mx-auto space-y-20 py-16 px-6">
                {steps.map(({ title, desc, img }) => (
                <section key={title} className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1">
                    <h2 className="text-2xl font-bold text-teal-600 mb-2">{title}</h2>
                    <p className="text-sky-700">{desc}</p>
                    </div>
                    <div className="order-1 md:order-2">
                    <img
                        src={img}
                        alt={title}
                        className="rounded-lg shadow-lg border-2 border-cyan-200 object-cover w-full"
                    />
                    </div>
                </section>
                ))}
            </main>

            <footer className="bg-blue-300 text-cyan-50 py-12 text-center">
                <Link
                to={'/signup'}
                className="mt-4 inline-block bg-blue-700 text-blue-50 font-semibold py-2 px-6 rounded-lg hover:bg-blue-900 transition"
                >
                Create Account Now
                </Link>
            </footer>
        </div>
    )
}

export default PreviewPage;