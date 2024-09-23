import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Endpoint from "./Endpoint";
const API_URL: string = import.meta.env.VITE_API_URL;
export const studentApi = createApi({
  reducerPath: "spell",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["Student"],
  endpoints: (builder) => ({
    addStudent: builder.mutation({
      query: (data) => ({
        url: Endpoint.ADD_STUDENT,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),
    getStudents: builder.query({
      query: () => ({
        url: Endpoint.GET_STUDENTS,
        method: "GET",
      }),
      providesTags: ["Student"],
    }),
    getStudentbyId: builder.query({
      query: (id) => ({
        url: Endpoint.GET_STUDENT_BY_ID(id),
        method: "GET",
      }),
      providesTags: ["Student"],
    }),

    updateStudent: builder.mutation({
      query: (id, ...data) => ({
        url: Endpoint.UPDATE_STUDENT(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),

    deleteStudent: builder.mutation({
      query: (id) => ({
        url: Endpoint.DELETE_STUDENT(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});
export const {
  useAddStudentMutation,
  useGetStudentsQuery,
  useGetStudentbyIdQuery,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} = studentApi;
