import {z} from 'zod'



export const userZodSchema = z.object({
    username:z.string().min(4,"El nombre de usuario debe tener al menos 4 caracteres"),
    email:z.string().email("Debe ser un email valido"),
    password:z.string().min(3,"La contraseña necesita mas caracteres"),
    confirmPassword:z.string()
}).refine((data)=>(data.password === data.confirmPassword),{message:"Las contraseñas no coinciden"})




















// import { z } from "zod";

// const passwordSchema = z.string()
//   .min(8, "La contraseña debe tener al menos 8 caracteres")
//   .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
//   .regex(/[0-9]/, "Debe contener al menos un número")
//   .regex(/[\W_]/, "Debe contener al menos un símbolo"); // [\W_] busca cualquier carácter no alfanumérico

// // 🔥 Ejemplo de validación
// const result = passwordSchema.safeParse("Hola123*");

// if (!result.success) {
//   console.log(result.error.format());
// } else {
//   console.log("Contraseña válida ✅");
// }
