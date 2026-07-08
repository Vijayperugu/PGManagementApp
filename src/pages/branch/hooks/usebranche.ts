import { useQuery } from "@tanstack/react-query"
import { getBranches } from "../services/branchServices"


export const usebranch =   () =>{
    return useQuery({
        queryKey:['branch'],
        queryFn:getBranches,
        select :res =>res.data
    })
}