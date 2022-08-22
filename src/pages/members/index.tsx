import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Button,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useToast,
  Stack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { getMembers, setMember } from "../../firebase/index";
import { useEffect, useRef, useState } from "react";

interface Members {
  name: string;
  position: string;
  subPosition?: string;
}

const MembersViewWrapper = styled.div`
  .wrapper__header--page {
    display: flex;
    .tit__page {
      font-size: 20px;
      font-weight: 700;
    }
    .btn__page {
      margin-left: auto;
    }
  }
  .table__members {
    min-width: 960px;
  }
  .table__members--closed {
    min-width: 1280px;
  }
  .input__title {
    &:hover {
      border-color: #fcc6a2;
    }
  }
`;

const Members = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const btnRef = useRef(null);
  const [members, setMembers] = useState<Members[]>();
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [subPosition, setSubPosition] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      getMembers().then((res) => {
        const ids = Object.keys(res).map((id) => {
          return parseInt(id) + 1;
        });
        const newId = Math.max(...ids) + 1;
        setId(newId);
      });
    } else {
      getMembers().then((res) => {
        res.sort((a: any, b: any) => {
          return a.id - b.id;
        });
        setMembers(res);
      });
    }
  }, [isOpen]);
  return (
    <MembersViewWrapper>
      <div className="wrapper__header--page">
        <h3 className="tit__page">Members</h3>
        <Button onClick={onOpen} colorScheme="orange" className="btn__page">
          add
        </Button>
      </div>
      <TableContainer>
        <Table
          variant="striped"
          colorScheme="orange"
          className={"table__members"}>
          <TableCaption placement="top">MEMBERS</TableCaption>
          <Thead>
            <Tr>
              <Th>NAME</Th>
              <Th>POSITION</Th>
              <Th>SUB-POSITION</Th>
            </Tr>
          </Thead>
          <Tbody>
            {members?.map((member, idx) => {
              return (
                <Tr key={`member${idx}`}>
                  <Td>{member.name}</Td>
                  <Td>{member.position}</Td>
                  <Td>{member.subPosition}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader marginTop={30}>Add member</DrawerHeader>
          <DrawerBody>
            <Stack spacing={"30px"} className="wrapper__content">
              <Stack spacing={"5px"} className="wrapper__input">
                <Text className="tit__input">이름</Text>
                <Input
                  autoFocus
                  placeholder="name"
                  className="input__title"
                  variant={"flushed"}
                  focusBorderColor="#f37321"
                  borderColor={"#f89b6c"}
                  _hover={{ borderColor: "#fcc6a2" }}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Stack>
              <Stack className="wrapper__input">
                <Text className="tit__input">포지션</Text>
                <Input
                  placeholder="position"
                  className="input__title"
                  variant={"flushed"}
                  focusBorderColor="#f37321"
                  borderColor={"#f89b6c"}
                  _hover={{ borderColor: "#fcc6a2" }}
                  value={position}
                  onChange={(e) => {
                    setPosition(e.target.value);
                  }}
                />
              </Stack>
              <Stack className="wrapper__input">
                <Text className="tit__input">서브포지션</Text>
                <Input
                  placeholder="sub-position"
                  className="input__title"
                  variant={"flushed"}
                  focusBorderColor="#f37321"
                  borderColor={"#f89b6c"}
                  _hover={{ borderColor: "#fcc6a2" }}
                  value={subPosition}
                  onChange={(e) => {
                    setSubPosition(e.target.value);
                  }}
                />
              </Stack>
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="outline"
              colorScheme={"orange"}
              mr={3}
              onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="orange"
              onClick={() => {
                setMember(id, name, position, subPosition)
                  .then(() => {
                    toast({
                      title: `멤버 추가에 성공했어요!`,
                      status: "success",
                      isClosable: true,
                    });
                    onClose();
                  })
                  .catch(() => {
                    toast({
                      title: `멤버 저장에 실패했어요! 동훈이에게 문의 해봐봐요`,
                      status: "error",
                      isClosable: true,
                    });
                  });
              }}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </MembersViewWrapper>
  );
};

export default Members;
