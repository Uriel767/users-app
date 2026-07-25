import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

const VALIDATORS = {
  name: {
    regex: /^[A-Za-zÀ-ÿ\s]*$/,
    isValid: (v) => /^[A-Za-zÀ-ÿ\s]{2,50}$/.test(v.trim()),
    helper: "Solo letras, entre 2 y 50 caracteres",
    label: "Nombre",
  },
  username: {
    regex: /^[A-Za-z0-9_]*$/,
    isValid: (v) => /^[A-Za-z0-9_]{3,20}$/.test(v),
    helper: "Alfanumérico (y _), entre 3 y 20 caracteres",
    label: "Usuario",
  },
  email: {
    regex: /^[\w@.\-]*$/,
    isValid: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    helper: "Formato de email inválido",
    label: "Email",
  },
  phone: {
    regex: /^[0-9]*$/,
    isValid: (v) => /^[0-9]{7,15}$/.test(v),
    helper: "Solo números, entre 7 y 15 dígitos",
    label: "Teléfono",
  },
  website: {
    regex: /^[A-Za-z0-9./:\-]*$/,
    isValid: (v) =>
      /^([A-Za-z0-9-]+\.)+[A-Za-z]{2,}([/][^\s]*)?$/.test(v.trim()),
    helper: "Formato de sitio web inválido (ej: dominio.com)",
    label: "Sitio web",
  },
  street: {
    regex: /^[A-Za-z0-9\s]*$/,
    isValid: (v) => /^[A-Za-z0-9\s]{2,60}$/.test(v.trim()),
    helper: "Solo letras y números, entre 2 y 60 caracteres",
    label: "Calle",
  },
  suite: {
    regex: /^[A-Za-z0-9\s.]*$/,
    isValid: (v) => /^[A-Za-z0-9\s.]{0,30}$/.test(v.trim()),
    helper: "Solo letras y números",
    label: "Suite/Depto",
  },
  city: {
    regex: /^[A-Za-zÀ-ÿ\s]*$/,
    isValid: (v) => /^[A-Za-zÀ-ÿ\s]{2,50}$/.test(v.trim()),
    helper: "Solo letras, entre 2 y 50 caracteres",
    label: "Ciudad",
  },
  zipcode: {
    regex: /^[0-9]*$/,
    isValid: (v) => /^[0-9]{4,10}$/.test(v),
    helper: "Solo números, entre 4 y 10 dígitos",
    label: "Código postal",
  },
  companyName: {
    regex: /^[A-Za-zÀ-ÿ0-9\s\-,]*$/,
    isValid: (v) => /^[A-Za-zÀ-ÿ0-9\s\-,]{2,60}$/.test(v.trim()),
    helper: "Letras, números y guiones, entre 2 y 60 caracteres",
    label: "Empresa",
  },
  companyCatchPhrase: {
    regex: /^[A-Za-zÀ-ÿ0-9\s\-,.]*$/,
    isValid: (v) => /^[A-Za-zÀ-ÿ0-9\s\-,.]{0,100}$/.test(v.trim()),
    helper: "Máximo 100 caracteres",
    label: "Eslogan",
  },
  companyBs: {
    regex: /^[A-Za-zÀ-ÿ0-9\s\-,.]*$/,
    isValid: (v) => /^[A-Za-zÀ-ÿ0-9\s\-,.]{0,100}$/.test(v.trim()),
    helper: "Máximo 100 caracteres",
    label: "Giro / actividad",
  },
};

const sections = [
  { title: "Datos personales", fields: ["name", "username", "email", "phone", "website"] },
  { title: "Direccion", fields: ["street", "suite", "city", "zipcode"] },
  { title: "Empresa", fields: ["companyName", "companyCatchPhrase", "companyBs"] }
];

function toFormModel(user) {
  return {
    name: user.name ?? "",
    username: user.username ?? "",
    email: user.email ?? "",
    phone: (user.phone ?? "").replace(/[^0-9]/g, "").slice(0, 14),
    website: user.website ?? "",
    street: user.address?.street ?? "",
    suite: user.address?.suite ?? "",
    city: user.address?.city ?? "",
    zipcode: (user.address?.zipcode ?? "").replace(/[^0-9]/g, ""),
    companyName: user.company?.name ?? "",
    companyCatchPhrase: user.company?.catchPhrase ?? "",
    companyBs: user.company?.bs ?? "",
  };
}

export function EditUserForm({ user, onCancel, onSave }) {
  const [formData, setFormData] = useState(() => toFormModel(user));
  const handleChange = (field) => (e) => {
    const raw = e.target.value;
    const { regex } = VALIDATORS[field];
    if (regex.test(raw)) {
      setFormData((prev) => ({ ...prev, [field]: raw }))
    }
  };
  const fieldsValid = (field) => VALIDATORS[field].isValid(formData[field]);
  const allValid = Object.keys(VALIDATORS).every((field) => fieldsValid(field));

  const hanldeSubmit = (e) => {
    e.preventDefault();
    if (!allValid) return;

    onSave({
      id: user.id,
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      address: {
        ...user.address,
        street: formData.street,
        suite: formData.suite,
        city: formData.city,
        zipcode: formData.zipcode,
      },
      company: {
        name: formData.companyName,
        catchPhrase: formData.companyCatchPhrase,
        bs: formData.companyBs
      },
    });
  };

  return (
    <Box component="form" onSubmit={hanldeSubmit} sx={{ mt: 2, maxWidth: 480 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Editar usuario #{user.id}
      </Typography>

      <Stack spacing={3}>
        {sections.map((section) => (
          <Box key={section.title}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              {section.title}
            </Typography>
            <Stack spacing={2}>
              {section.fields.map((field) => (
                <TextField
                  key={field}
                  label={VALIDATORS[field].label}
                  value={formData[field]}
                  onChange={handleChange(field)}
                  error={formData[field].length > 0 && !fieldsValid(field)}
                  helperText={
                    formData[field].length > 0 && !fieldsValid(field)
                      ? VALIDATORS[field].helper
                      : ""
                  }
                  fullWidth
                />
              ))}
            </Stack>
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" disabled={!allValid}>
          Guardar
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancelar
        </Button>
      </Stack>
    </Box>
  );
}