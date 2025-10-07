const StyledButton = ({
    onClickFn,
    color,
    children
}) => {
 const baseStyles = "w-full flex justify-center items-center gap-2 text-white font-semibold py-3 mt-2 rounded-lg transition"
 return (
    <button
        onClick={onClickFn}
        className={`${baseStyles} bg-${color}-600 hover:bg-${color}-700`}
    >
        {children}
    </button>
 )
}

export { StyledButton as default }