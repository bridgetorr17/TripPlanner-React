import { Link } from "react-router-dom"

type TabKey = 'my' | 'shared';

interface NavLinksProps {
    activeTab: TabKey;
    setActiveTab: React.Dispatch<React.SetStateAction<TabKey>>
}

const tabs: {key: TabKey; label: string}[] = [
    { key: 'my', label: 'My Trips' },
    { key: 'shared', label: 'Shared Trips' }
]

const NavLinks = ({activeTab, setActiveTab}: NavLinksProps) => {

    return (
        <div className="flex space-x-4 mb-8">
            {tabs.map(tab => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={
                        activeTab === tab.key
                        ? 'p-3 text-xl font-bold text-teal-900'
                        : 'p-3 text-teal-600 hover:text-teal-800'
                    }
                >
                    {tab.label}
                </button>
            ))}
            <Link 
                to={'/trips/createNew'}
                className='p-3 text-teal-600 hover:text-teal-800'>
                Create New Trip
            </Link>
        </div>
    )
}

export default NavLinks