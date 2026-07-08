import {z} from 'zod'
export const  branchSchema = z.object({
    branchName:z.string().trim().min(1,"Branch name is required"),
    address: z.string()
            .trim()
            .min(1,"Address is required")
            .min(8,"Address must be atleast 8 Characters")
            .max(25,"Address must be less then 25 Characters"),
})
export type BranchFormData = z.infer<typeof branchSchema>;
