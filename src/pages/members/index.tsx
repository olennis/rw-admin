import Link from "next/link";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { getMembers } from "../../firebase/index";
import { useEffect, useState } from "react";

interface Members {
  name: string;
  position: string;
  subPosition?: string;
}

const MembersViewWrapper = styled.div``;

const Members = () => {
  const [members, setMembers] = useState<Members[]>();
  useEffect(() => {
    getMembers().then((res) => {
      res.sort((a: any, b: any) => {
        return a.id - b.id;
      });
      setMembers(res);
    });
  }, []);
  return (
    <MembersViewWrapper>
      <TableContainer>
        <Table variant="simple">
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
      <Link href="signup" passHref>
        추가
      </Link>
    </MembersViewWrapper>
  );
};

export default Members;
