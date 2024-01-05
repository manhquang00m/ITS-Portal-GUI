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
      <ModalContent p={{ base: 0, md: 2, xl: 4 }} width={{ base: '90%', lg: "inherit" }}>
        <ModalHeader paddingBottom={0}>Xác nhận xoá </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Bạn có đồng ý xoá dữ liệu có id là{" "}
          <span className="font-bold">{id}</span> không ?
        </ModalBody>
        <ModalFooter px={{ base: 5, md: 2, lg: 0 }}>
          <Button onClick={handleEnroll} variant="brand">
            Xác nhận
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
