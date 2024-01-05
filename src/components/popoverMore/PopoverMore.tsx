import { Button, IconButton, VStack } from "@chakra-ui/react";
import { Popover } from "antd";
import { ReactElement } from "react";
import {
  MdDelete,
  MdEdit,
  MdOutlineMoreVert,
  MdRemoveRedEye,
} from "react-icons/md";
import { useHistory } from "react-router-dom";
export interface IPopoverMoreProps {
  type: "edit" | "view" | "custom" | "delete";
  icon?: ReactElement;
  name?: string;
  urlNavigate?: string;
  handleCustom?: () => void;
}
export default function PopoverMore({
  listButton,
}: {
  listButton: IPopoverMoreProps[];
}) {
  const history = useHistory();
  return (
    <Popover
      content={
        <VStack>
          {listButton.map((btn, index) => {
            return (
              <div key={index}>
                {btn?.type === "edit" && (
                  <Button
                    px={2}
                    leftIcon={<MdEdit />}
                    onClick={() => history?.push(btn?.urlNavigate)}
                  >
                    <p className="w-[90px] text-left">Chỉnh sửa</p>
                  </Button>
                )}
                {btn?.type === "view" && (
                  <Button
                    px={2}
                    leftIcon={<MdRemoveRedEye />}
                    onClick={() => history?.push(btn?.urlNavigate)}
                  >
                    <p className="w-[90px] text-left">Xem chi tiết</p>
                  </Button>
                )}
                {btn?.type === "delete" && (
                  <Button
                    px={2}
                    leftIcon={<MdDelete />}
                    onClick={() => btn.handleCustom()}
                  >
                    <p className="w-[90px] text-left">Xoá</p>
                  </Button>
                )}
                {btn?.type === "custom" && (
                  <Button
                    px={2}
                    leftIcon={btn.icon}
                    onClick={() => btn.handleCustom()}
                  >
                    <p className="w-[90px] text-left">
                      {btn?.type === "custom" && btn?.name}
                    </p>
                  </Button>
                )}
              </div>
            );
          })}
        </VStack>
      }
      trigger="click"
      placement="left"
    >
      <IconButton
        variant="outline"
        colorScheme="gray"
        aria-label="Call Sage"
        icon={<MdOutlineMoreVert />}
      />
    </Popover>
  );
}
