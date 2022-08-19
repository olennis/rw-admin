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

interface ScheduledPositions {
  [key: string]: string[];
}

const ScheduleViewWrapper = styled.div`
  .btn__schedule {
    color: #00b86a;
  }
  .btn__schedule--absence {
    color: #ff360a;
  }
`;
const members = [
  {
    name: "A",
    position: "leader",
    subPosition: "",
    attendance: [true, false, false, true, false],
  },
  {
    name: "B",
    position: "leader",
    subPosition: "",
    attendance: [false, true, true, true, true],
  },
  {
    name: "C",
    position: "leader",
    subPosition: "electricBass",
    attendance: [true, false, false, true, false],
  },
];

const handleAttendanceStatus = () => {};

const handleSchedule = () => {
  console.log("!@");
};

const Schedule = () => {
  return (
    <ScheduleViewWrapper>
      <TableContainer>
        <Table variant="simple">
          <TableCaption placement="top">가능한 스케쥴</TableCaption>
          <Thead>
            <Tr>
              <Th>휴먼</Th>
              <Th>첫번째주</Th>
              <Th>두번째주</Th>
              <Th>세번째주</Th>
              <Th>네번째주</Th>
              {members[0].attendance.length === 5 && <Th>다섯번째주</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {members.map((member, idx) => {
              return (
                <Tr key={member.name}>
                  <Td>{member.name}</Td>
                  {member.attendance.map((data, index) => {
                    return (
                      <Td key={`${member.name}${index}`}>
                        <Button
                          variant={"ghost"}
                          size="sm"
                          className={
                            data ? "btn__schedule" : "btn__schedule--absence"
                          }>{`${data ? "O" : "X"}`}</Button>
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={handleSchedule}>click!</Button>
    </ScheduleViewWrapper>
  );
};

export default Schedule;
