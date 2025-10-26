const StyledH2 = ({color, children}) => {
    const baseStyles = "text-2xl font-semibold text-center mb-6"

    return (
        <h2 
            className={`${baseStyles} text-${color}-700`}
        >
            {children}
        </h2>
    )
}

export { StyledH2 as default }