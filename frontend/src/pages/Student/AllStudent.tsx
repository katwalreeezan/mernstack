import { MDBBtn } from "mdb-react-ui-kit";
import {
  useDeleteStudentMutation,
  useGetStudentsQuery,
} from "../../service/api/apiRequest";
import GetStudentModal from "../../components/modal/GetStudentModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AllStudent = () => {
  const [deleteStudent] = useDeleteStudentMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [deletingStudentId, setDeletingStudentId] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const deleteStudents = async (id) => {
    setDeletingStudentId(id);
    await deleteStudent(id);
    setDeletingStudentId(null);
  };

  const openModal = (id) => {
    setSelectedStudentId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudentId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (student) => {
    console.log(student, "HIIIII");
    navigate("/add", {
      state: {
        isEditMode: true, // Pass edit mode as true
        initialValues: student, // Pass the selected student data
      },
    });
  
  };

  const { data, isLoading, isError } = useGetStudentsQuery({});

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      {data &&
        data.map((student) => (
          <div key={student._id}>
            <div>{student.firstname}</div>
            <div>{student.lastname}</div>
            <div>{student.gender}</div>
            <div>{student.country}</div>
            <div>{student.dob}</div>

            <MDBBtn onClick={() => openModal(student._id)}>VIEW</MDBBtn>
            <MDBBtn
              onClick={() => deleteStudents(student._id)}
              disabled={deletingStudentId === student._id} 
            >
              {deletingStudentId === student._id ? "Deleting..." : "DELETE"}
            </MDBBtn>
            {/* Edit Button */}
            <MDBBtn onClick={() => handleEdit(student)}>EDIT</MDBBtn>
          </div>
        ))}

      <GetStudentModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        studentId={selectedStudentId}
      />
    </>
  );
};

export default AllStudent;
