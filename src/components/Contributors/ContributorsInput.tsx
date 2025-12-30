import { FaTrash } from "react-icons/fa"
import { ContributorsInputProps } from './UserTypes'

const ContributorsInput = ({ creator, contributorNames, setContributorNames }: ContributorsInputProps) => {

    return (
        <div className={`space-y-2 bg-teal-50 p-4 rounded-md`}>
            <h3 className="text-lg font-semibold text-cyan-700">Contributors</h3>
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    readOnly
                    value={creator}
                    className="grow border border-blue-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700"
                />
                <span className="text-sm font-medium text-teal-800">owner</span>
            </div>
            {contributorNames.map((val, ind) => {
                return (
                    <div key={ind} className="flex items-center space-x-2">
                        <input 
                            type="text"
                            name="contributors"
                            value={val}
                            placeholder={`Contributor #${ind+1}`}
                            onChange={(e) => setContributorNames(prev => 
                                prev.map((val, i) => 
                                    (i === ind) 
                                        ? e.target.value.toLowerCase() 
                                        : val
                                )
                            )}
                            className={`grow border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500`}
                        />
                            <button 
                                type="button" 
                                onClick={() => setContributorNames(prev => prev.filter((val, i) => i !== ind))}
                                className="text-red-600 hover:text-red-800"
                            >
                                <FaTrash />
                            </button>
                    </div>)
            })}
            <button 
                type="button" 
                onClick={() => setContributorNames(prev => [...prev, ''])}
                className={`text-teal-600 hover:text-teal-800 font-semibold mt-2`}
            > + Add Contributor</button>
        </div>
    )
}

export default ContributorsInput