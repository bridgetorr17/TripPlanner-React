const DynamicListInput = ({ label, values, setValues }) => {

    return (
        <>
            {values.map((val, ind) => {
                return (
                    <div key={ind}>
                        <input 
                            type="text"
                            value={val}
                            placeholder={`${label} #${ind+1}`}
                            onChange={(e) => setValues(prev => 
                                prev.map((val, i) => 
                                    (i === ind) ? e.target.value : val
                                )
                            )}
                        />
                        {values.length > 1 && (
                            <button type="button" onClick={() => setValues(prev => prev.filter((val, i) => i !== ind))}>Remove</button>
                        )}
                    </div>)
            })}
            <button type="button" onClick={() => setValues(prev => [...prev, ''])}>Add {label}</button>
        </>
    )
}

export default DynamicListInput