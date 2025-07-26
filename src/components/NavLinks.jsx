import { Link } from "react-router-dom"

const NavLinks = ({activeTab, setActiveTab}) => {

    const tabs = [
        { key: 'my', label: 'My Trips' },
        { key: 'shared', label: 'Shared Trips' },
        { key: 'create', label: 'Create New Trip' }
    ]

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
        </div>
    )
}

export default NavLinks