import {z} from 'zod'

export const  SignUp = z.object({
    name:z.string().trim().min(1,"User Name is Required"),
    email:z
        .string()
        .trim()
        .min(1,"Email is required")
        .email("Invalid email Address"),
    password: z
        .string()
        .trim()
        .min(8,"Password must be atleast 8 Characters")
        .max(15,"Password must be less then 72 Characters")
        .regex(/[A-Z]/,"Password must contain at least one uppercase letter")
        .regex(/[a-z]/,"Password must contain at least one lowercase letter")
        .regex(/[0-9]/,"Password must contain at least one number"),
    conformPassword:z.string().trim().min(1,"Confirm password is required")
}).refine((data)=> data.password===data.conformPassword,{
    message:"Psswords Dont Match",
    path:['conformPassword']
})

export type RegisterFormData = z.infer<typeof SignUp>;
