import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UseCreateContentOptions<T>{
    url: string;
    content: T;
    onSuccess?: (responseData: any) => void;
    //is onFailure needed? only differences are some navigate to errorPage, and PlaceAutocomplete resets suggestions to empty array
    onFailure?: (responseData: any) => void;  
    onFinally?: (responseData: any) => void;
}

interface UseCreateContentResult<T> {
    loading: boolean;
    error: string;
    handleCreateContent: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useCreateContent<T>({
    url,
    content,
    onSuccess,
    onFailure,
    onFinally
}: UseCreateContentOptions<T>): UseCreateContentResult<T> {

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleCreateContent = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try{
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(content)
            });

            const created = await res.json();
            
        }
        catch(err){
            //onFailure would be executed here
            console.log(err);
        }

    }

    return { loading, error, handleCreateContent}
}