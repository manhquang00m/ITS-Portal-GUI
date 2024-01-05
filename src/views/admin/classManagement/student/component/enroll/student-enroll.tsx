import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import SelectRemote from "components/fields/SelectRemote";
import { useEnrollStudent } from "hook/query-class/student/use-student";
import { useEffect, useState } from "react";
import { fetchClass } from "utils/fetchOptions";

interface IStudentEnroll {
  isOpen: boolean;
  onClose: () => void;
  idStudent: number;
  refetch: () => void;
}

export default function StudentEnrollModal(props: IStudentEnroll) {
  const { isOpen, onClose, idStudent, refetch } = props;
  const [classId, setClassId] = useState(undefined);
  const { mutate, isLoading, isSuccess } = useEnrollStudent();
  const handleEnroll = async () => {
    await mutate({
      studentId: idStudent,
      classId: parseInt(classId),
    });
    setClassId(undefined);
    onClose();
  };
  useEffect(() => {
    if (isSuccess) refetch();
  }, [isSuccess]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay p={4} />
      <ModalContent p={{ base: 0, md: 2, xl: 4 }} width={{ base: '90%', lg: "inherit" }}
      >
        <ModalHeader paddingBottom={0}>Chọn lớp cho học sinh</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SelectRemote
            value={classId}
            onChange={(value) => setClassId(value)}
            getOptions={fetchClass}
            placeholder={"Chọn lớp học"}
          />
        </ModalBody>
        <ModalFooter px={{ base: 5, md: 2, lg: 0 }}>
          <Button
            isLoading={isLoading}
            disabled={!classId && classId !== 0}
            onClick={handleEnroll}
            variant="brand"
          >
            Gán lớp
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
