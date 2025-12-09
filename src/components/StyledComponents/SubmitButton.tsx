import Spinner from "./Spinner";

interface SubmitButtonProps {
  loading: boolean;
  color: string;
  children: React.ReactNode;
}

const SubmitButton = ({loading, color, children}: SubmitButtonProps) => {
    return (
        <button
            type="submit"
            className={`mt-2 py-2 w-full bg-${color}-600 hover:bg-${color}-700 text-white rounded-md font-medium transition
                        ${loading 
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
            disabled={loading}
        >
            {loading
                ? <Spinner loading={loading} />
                : children}
        </button>
    )
}

export { SubmitButton as default }