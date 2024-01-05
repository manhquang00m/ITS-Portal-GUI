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

interface IDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  callback: () => void;
}

export default function DeleteModal(props: IDeleteModalProps) {
  const { isOpen, onClose, id, callback } = props;
  const handleEnroll = async () => {
    callback();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay p={4} />
      <ModalContent p={4}>
        <ModalHeader paddingBottom={0}>Xác nhận xoá </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Bạn có đồng ý xoá dữ liệu có id là{" "}
          <span className="font-bold">{id}</span> không ?
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleEnroll} variant="brand">
            Xác nhận
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
