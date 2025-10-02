import Spinner from "./Spinner";

const SubmitButton = ({loading, message, color}) => {
    return (
        <button
            type="submit"
            className={`mt-2 py-2 bg-${color}-600 hover:bg-${color}-700 text-white rounded-md font-medium transition
                        ${loading 
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
            disabled={loading}
        >
            {loading
                ? <Spinner loading={loading} />
                : message}
        </button>
    )
}

export { SubmitButton as default }