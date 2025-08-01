const ProfileField = ({ name, label, value, setValue, edit, setEdit, isOwner, save}) => {
    return (
        <>
            <form onSubmit={(e) => {
                    e.preventDefault();
                    save(name, value);
                }} className="mb-6">
                 <label className="block text-teal-800 font-semibold mb-1">{label}</label>
                {edit ? (
                <div className="flex items-center space-x-2">
                    <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="flex-grow px-3 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    <button type="submit" className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md">
                    Save
                    </button>
                </div>
                ) : (
                <div className="flex items-center justify-between">
                    <span className="text-blue-800">{value}</span>
                    {isOwner && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            setEdit(true);
                        }}
                        className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md"
                    >
                        Edit
                    </button>
                    )}
                </div>
                )}
            </form>
        </>
    )
}

export default ProfileField;