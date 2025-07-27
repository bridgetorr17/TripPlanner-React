import { FaTrash } from "react-icons/fa"

const DynamicListInput = ({ label, values, setValues, name, color }) => {
    const ringColor = color === 'blue' ? 'ring-blue-300' : 'ring-teal-300';
    const focusRing = color === 'blue' ? 'focus:ring-blue-400' : 'focus:ring-teal-400';
    const bgColor = color === 'blue' ? 'bg-blue-50' : 'bg-teal-50';

    let cont = false;
    if (name === 'contributors') cont = true;

    return (
        <div className={`space-y-2 ${bgColor} p-4 rounded-md`}>
            <h3 className="text-lg font-semibold text-cyan-700">{label}s</h3>
            {values.map((val, ind) => {
                return (
                    <div key={ind} className="flex items-center space-x-2">
                        <input 
                            type="text"
                            name={name}
                            value={val}
                            placeholder={`${label} #${ind+1}`}
                            onChange={(e) => setValues(prev => 
                                prev.map((val, i) => 
                                    (i === ind) 
                                        ? (cont) 
                                            ? e.target.value.toLowerCase() 
                                            : e.target.value 
                                        : val
                                )
                            )}
                            className={`flex-grow border border-${color}-300 rounded-md px-3 py-2 focus:outline-none ${focusRing}`}
                        />
                        {values.length > 1 && (
                            <button 
                                type="button" 
                                onClick={() => setValues(prev => prev.filter((val, i) => i !== ind))}
                                className="text-red-600 hover:text-red-800"
                            >
                                <FaTrash />
                            </button>
                        )}
                    </div>)
            })}
            <button 
                type="button" 
                onClick={() => setValues(prev => [...prev, ''])}
                className={`text-${color}-600 hover:text-${color}-800 font-semibold mt-2`}
            > + Add {label}</button>
        </div>
    )
}

export default DynamicListInput