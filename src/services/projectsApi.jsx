import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const backendURL = import.meta.env.VITE_URL_BACKEND_DEVELOPMENT;
console.log(backendURL);
const getToken = () => {
    const tokenString = localStorage.getItem('token');

    if (tokenString) {
        // Parse the JSON string back to its original format (string)
        const token = JSON.parse(tokenString);
        return token; // Return the token string
      }
      return null; // Return null if the token isn't found // Example: Get the token from local storage
  };
export const projectsApi = createApi({
    reducerPath:"projectsApi",
    baseQuery: fetchBaseQuery({
    baseUrl: `${backendURL}/api`, 
    tagTypes:['Project'],
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
        projects: builder.query({
            query: ()=>'/projects',
            providesTags:['Project']
        }),
        project: builder.query({
            query: (id)=>`/projects/${id}`,
            providesTags:['Project']
        }),
        projectsByOwner: builder.query({
            query: (id)=>`/projectsbyowner/${id}`,
            providesTags:['Project']
        }),
        addProject: builder.mutation({
            query: project =>({
                url: '/projects',
                method: 'POST',
                body: project
            }),
            invalidatesTags: ['Project'], 
            transformResponse: (response, meta, arg) => {
                return response;
            }
        }),
        updateProject: builder.mutation({
            query: ({id, ...rest}) =>({
                url: `/projects/${id}`,
                method: 'PUT',
                body: rest
            }),
            invalidatesTags: ['Project']
        }),
        updateProjectInteraction: builder.mutation({
            query: ({id, ...rest}) =>({
                url: `/projects/likes/comments/${id}`,
                method: 'PUT',
                body: rest
            }),
            
            invalidatesTags: ['Project'],
        }),
        deleteProject: builder.mutation({
            query: (id) =>({
                url: `/projects/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Project']
        })
    })
})

export const {useProjectsQuery,useProjectsByOwnerQuery, useProjectQuery, useAddProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation, useUpdateProjectInteractionMutation} = projectsApi;