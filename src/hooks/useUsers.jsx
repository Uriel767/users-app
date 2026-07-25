import { useEffect, useState } from "react";

export function useUsers() {
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                if (!res.ok) throw new error("Error de consuta en la api");
                return res.json();
            })
            .then((data) => setUsers(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);
    return { users, setUsers, loading, error };
}