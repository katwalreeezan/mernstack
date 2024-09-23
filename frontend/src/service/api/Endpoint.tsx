type IEndpoint = {
  ADD_STUDENT: string;
  GET_STUDENTS: string;
  GET_STUDENT_BY_ID: (id: number) => string;
  DELETE_STUDENT: (id: number) => string;
  UPDATE_STUDENT:(id:number)=>string
};

const Endpoint: IEndpoint = {
  ADD_STUDENT: "/api/users",
  GET_STUDENTS: "/api/users",
  GET_STUDENT_BY_ID: (id) => `api/users/${id}`,
  DELETE_STUDENT: (id) => `api/users/${id}`,
  UPDATE_STUDENT:(id)=>`api/users/${id}`
};

export default Endpoint;
