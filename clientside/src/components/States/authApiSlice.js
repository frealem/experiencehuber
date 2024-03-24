import { apiSlice } from "./Api";

export const apiAuthSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        login:builder.mutation({
            query:credentials=>({
                url:'/auth',
                method:'GET',
                body:{...credentials},
            })
        })
    })
})

export const {useLoginMutation}=apiAuthSlice;