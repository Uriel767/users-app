import { useState } from "react";
import { useUsers } from "../src/hooks/useUsers.jsx"
import { UsersTable } from "../src/components/UsersTable.jsx"
import { EditUserForm } from "../src/components/EditUserForm.jsx"
import Button from '@mui/material/Button';

export default function App() {

    const { users, setUsers, loading, error } = useUsers();
    const [selectedId, setSelectedId] = useState(null);
    const [editing, setEditing] = useState(false);
    const selectedUser = users ? users.find((u) => u.id === selectedId) : null;

    const handleSave = (updatedUser) => {
        setUsers((prev) =>
            prev.map((u) => (u.id === updatedUser.id ? { ...u, ...updatedUser } : u))
        );
        setEditing(false);
    };

    if (loading) return <p>Cargando</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div style={{ padding: 20 }}>
            <h1>Usuarios</h1>
            {!editing && (
                <>
                    <UsersTable
                        users={users}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                    />
                    <Button
                        variant="contained"
                        disabled={!selectedId}
                        onClick={() => setEditing(true)}
                        style={{ marginTop: 14 }}
                    >
                        Editar
                    </Button>
                </>
            )}
            {editing && selectedUser && (
                <EditUserForm
                    user={selectedUser}
                    onCancel={() => setEditing(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}