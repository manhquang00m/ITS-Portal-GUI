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
import { useEnrollStudent } from "hook/query/student/use-student";
import { useState } from "react";
import { fetchClass } from "utils/fetchOptions";

interface IStudentEnroll {
  isOpen: boolean;
  onClose: () => void;
  idStudent: number;
}

export default function StudentEnrollModal(props: IStudentEnroll) {
  const { isOpen, onClose, idStudent } = props;
  const [classId, setClassId] = useState(undefined);
  const { mutate, isLoading } = useEnrollStudent();
  const handleEnroll = async () => {
    await mutate({
      studentId: idStudent,
      classId: parseInt(classId),
    });
    setClassId(undefined)
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay p={4} />
      <ModalContent p={4}>
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
        <ModalFooter>
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
