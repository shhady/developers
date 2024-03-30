import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const backendURL = import.meta.env.VITE_URL_BACKEND_DEVELOPMENT;

const getToken = () => {
    const tokenString = localStorage.getItem('token');

    if (tokenString) {
        // Parse the JSON string back to its original format (string)
        const token = JSON.parse(tokenString);
        return token; // Return the token string
      }
      return null; // Return null if the token isn't found // Example: Get the token from local storage
  };
export const usersApi = createApi({
    reducerPath:"usersApi",
    baseQuery: fetchBaseQuery({
    baseUrl: `${backendURL}/api`, 
    tagTypes:['User'],
    prepareHeaders: (headers) => {
        // Call your function to get the authentication token
        const token = getToken();
        // If the token exists, set the Authorization header
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
  
        return headers;
      }}),
    endpoints:(builder)=> ({
        
        userById: builder.query({
            query: (id)=>`/users/${id}`,
            providesTags:['User']
        }),
        updateUser: builder.mutation({
            query: ({id, ...rest}) =>({
                url: `/users/${id}`,
                method: 'PUT',
                body: rest
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query: (id) =>({
                url: `/users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['User']
        })
    })
})

export const { useUpdateUserMutation,useUserByIdQuery ,useDeleteUserMutation} = usersApi;