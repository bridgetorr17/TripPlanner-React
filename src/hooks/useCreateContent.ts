import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UseCreateContentOptions<TPayload, TResult>{
    url: string;
    onSuccess?: (data: TResult) => void;
    //is onFailure needed? only differences are some navigate to errorPage, and PlaceAutocomplete resets suggestions to empty array
    onFailure?: (error: unknown) => void;  
    onFinally?: () => void;
}

export const useCreateContent = <TPayload, TResult>({
    url,
    onSuccess,
    onFailure,
    onFinally
}: UseCreateContentOptions<TPayload, TResult>) => {

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const createContent = async(payload: TPayload) => {
        setLoading(true);

        try{
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data: TResult = await res.json();
            onSuccess?.(data);
            return data;
        }
        catch(err){
            //onFailure would be executed here
            console.log(err);
            setError("Unable to create content");

            // hook-level failure (navigation, logging, etc.)
            navigate("/errorpage");
            // consumer-level failure
            onFailure?.(err);

            throw err;
        } finally {
            setLoading(false);
            onFinally?.();
        }
    }

    return { loading, error, createContent}
}