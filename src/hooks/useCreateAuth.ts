import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationResult } from '../../shared/types/Authentication';

interface UseCreateAuthOptions<T>{
    url: string;
    attemptData: T;
    rerouteTo: string;
}

interface UseCreateAuthResult<T> {
    loading: boolean;
    error: string;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useCreateAuth<T>({
    url,
    attemptData,
    rerouteTo
}: UseCreateAuthOptions<T>): UseCreateAuthResult<T> {
    
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        let nav = '';

        try{
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(attemptData)
            })

            const result = await res.json() as AuthenticationResult;
            nav = result.success ? '/dashboard' : rerouteTo;

            if (!result.success){
                if (result.message) setError(result.message);
                throw result.message;
            }
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
            navigate(nav);
        }
    }

    return { loading, error, handleSubmit }
}