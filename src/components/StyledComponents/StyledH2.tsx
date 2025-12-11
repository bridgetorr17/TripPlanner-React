interface StyledH2Props {
    color: string;
    children: React.ReactNode
}

const StyledH2 = ({color, children}: StyledH2Props) => {
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