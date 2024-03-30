import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const backendURL = import.meta.env.VITE_URL_BACKEND_DEVELOPMENT
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
export const liveCodingApi = createApi({
    reducerPath:"liveCodingApi",
    baseQuery: fetchBaseQuery({
    baseUrl: `${backendURL}/api`, 
    tagTypes:['LiveCoding'],
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
        liveCodingEvents: builder.query({
            query: ()=>'/live-coding-events',
            providesTags:['LiveCoding']
        }),
        liveCodingEvent: builder.query({
            query: (id)=>`/live-coding-event/${id}`,
            providesTags:['LiveCoding']
        }),
        liveCodingEventsByOwner: builder.query({
            query: (id)=>`/live-coding-events-by-owner/${id}`,
            providesTags:['LiveCoding']
        }),
        createLiveCodingEvent: builder.mutation({
            query: LiveCodingEvent =>({
                url: '/create-live-coding-event',
                method: 'POST',
                body: LiveCodingEvent
            }),
            invalidatesTags: ['LiveCoding'], 
            transformResponse: (response, meta, arg) => {
                return response;
            }
        }),
        updateLiveCodingEvent: builder.mutation({
            query: ({_id, ...rest}) =>({
                url: `/update-live-coding-event/${_id}`,
                method: 'PUT',
                body: rest
            }),
            invalidatesTags: ['LiveCoding']
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

export const {
    useLiveCodingEventsQuery,
    useLiveCodingEventsByOwnerQuery,
     useLiveCodingEventQuery,
      useCreateLiveCodingEventMutation, 
      useUpdateLiveCodingEventMutation
    //   useUpdateProjectMutation,
    //    useDeleteProjectMutation,
    //     useUpdateProjectInteractionMutation
    } = liveCodingApi;