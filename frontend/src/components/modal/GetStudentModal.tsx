import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { useGetStudentbyIdQuery } from "../../service/api/apiRequest";
import { memo } from "react";

const GetStudentModal = memo(({ isModalOpen, closeModal, studentId }) => {
  const { data, isLoading } = useGetStudentbyIdQuery(studentId);

  return (
    <MDBModal open={isModalOpen} onClose={closeModal}>
      {isLoading ? (
        <div>Loading..</div>
      ) : (
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{data?.firstname || "Student Info"}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={closeModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>...</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={closeModal}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      )}
    </MDBModal>
  );
});

export default GetStudentModal;
