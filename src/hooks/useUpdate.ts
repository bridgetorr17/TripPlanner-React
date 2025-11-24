import { useState } from "react";

interface UseUpdateOptions<T> {
  url: string;
  fieldName: string;
  initialValue: T;
  formatValue?: (val: T) => any;
}

interface UseUpdateResult<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useUpdate<T>({
  url,
  fieldName,
  initialValue,
  formatValue,
}: UseUpdateOptions<T>): UseUpdateResult<T> {
  const [value, setValue] = useState<T>(initialValue);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedData = {
        field: fieldName,
        value: formatValue ? formatValue(value) : value,
      };

      const res = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setEdit(false);
    } catch (err: any) {
      setError(err.message ?? "An error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { value, setValue, edit, setEdit, handleSubmit, loading, error };
}
