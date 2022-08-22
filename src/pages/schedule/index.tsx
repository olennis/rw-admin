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
  Checkbox,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { getMembers } from "../../firebase/index";
import { useEffect, useState } from "react";
import moment from "moment";
interface Member {
  id: number;
  name: string;
  position: string;
  attendance: boolean[];
  subPosition: string;
}
interface ScheduledPositions {
  [key: string]: string[];
}

const ScheduleViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  .wrapper__content--page {
    display: flex;
    .table__schedule + .table__schedule {
      margin-left: 60px;
    }
    .table__schedule {
      .txt__member--name {
        display: block;
      }
    }
  }
`;

const Schedule = () => {
  //state
  const [members, setMembers] = useState<Member[]>();
  const [positions, setPositions] = useState<string[]>();
  const [isScheduled, setIsScheduled] = useState<boolean>();

  //handler
  const isEndOfMonthDate =
    moment().utc(true).startOf("month").day(28).date() > 28;
  const weeks = [...Array(isEndOfMonthDate ? 5 : 4)];
  const handleSchedule = () => {
    setIsScheduled(!isScheduled);
  };
  const makeWeekTd = (position: string, week: number) => {
    const filteredMembers = members?.filter((member) => {
      return member.position === position && member.attendance[week];
    });
    if (filteredMembers) {
      if (filteredMembers.length > 1) {
        return (
          <Td>
            {filteredMembers.map((member, idx) => {
              return (
                <span
                  key={`${member.name}_${idx}`}
                  className="txt__member--name">
                  {member.name}
                </span>
              );
            })}
          </Td>
        );
      } else if (filteredMembers.length === 1) {
        return <Td>{filteredMembers[0].name}</Td>;
      } else {
        const filteredSubPositionMembers = members?.filter((member) => {
          return member.subPosition === position && member.attendance[week];
        });
        if (
          filteredSubPositionMembers &&
          filteredSubPositionMembers.length >= 1
        ) {
          return <Td>{filteredSubPositionMembers[0].name}</Td>;
        } else {
          return <Td>-</Td>;
        }
      }
    } else {
      return <Td>-</Td>;
    }
  };

  //useEffect
  useEffect(() => {
    getMembers().then((res) => {
      const positions: string[] = [];
      res
        .sort((a: any, b: any) => {
          return a.id - b.id;
        })
        .forEach((data) => {
          if (!positions.includes(data.position)) {
            positions.push(data.position);
          }
          setPositions(positions);
          data.attendance = [...Array(isEndOfMonthDate ? 5 : 4)].map(
            (x) => true
          );
        });
      setMembers(res);
    });
  }, []);
  return (
    <ScheduleViewWrapper>
      <div className="wrapper__header--page">
        <h3 className="tit__page">Schedule</h3>
        <Button
          colorScheme="orange"
          onClick={handleSchedule}
          size="sm"
          className="btn__page">
          go!
        </Button>
      </div>
      <div className="wrapper__content--page">
        <TableContainer className="table__schedule">
          <Table variant="striped" colorScheme="orange">
            <TableCaption placement="top">
              {`${moment().month() + 1}월 `}가능한 스케쥴
            </TableCaption>
            <Thead>
              <Tr>
                <Th>NAME</Th>
                <Th>POSITION</Th>
                <Th>SUB-POSITION</Th>
                <Th>1st</Th>
                <Th>2nd</Th>
                <Th>3rd</Th>
                <Th>4th</Th>
                {isEndOfMonthDate && <Th>5th</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {members?.map((member, idx) => {
                return (
                  <Tr key={member.name}>
                    <Td>{member.name}</Td>
                    <Td>{member.position}</Td>
                    <Td>
                      {member.subPosition.length > 0 ? member.subPosition : "-"}
                    </Td>
                    {member.attendance.map((attendanceData, i) => {
                      return (
                        <Td key={`${member.name}_attendance_${i}`}>
                          <Checkbox
                            size="lg"
                            color="#fff"
                            colorScheme="orange"
                            defaultChecked
                            value={`${member.name}`}
                            onChange={(e) => {
                              if (member.attendance) {
                                member.attendance[i] = e.target.checked;
                              } else {
                                member.attendance = [
                                  ...Array(isEndOfMonthDate ? 5 : 4),
                                ].map((x) => true);
                                member.attendance[i] = e.target.checked;
                              }
                            }}
                          />
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer className="table__schedule">
          <Table variant="simple" colorScheme="orange">
            <TableCaption placement="top">
              {`${moment().month() + 1}월 `} 일정표
            </TableCaption>
            <Thead>
              <Tr>
                <Th>POSITION</Th>
                <Th>1st</Th>
                <Th>2nd</Th>
                <Th>3rd</Th>
                <Th>4th</Th>
                {isEndOfMonthDate && <Th>5th</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {positions?.map((position, idx) => {
                return (
                  <Tr key={`${position}${idx}`}>
                    <Td>{position}</Td>
                    {weeks.map((data, i) => {
                      return makeWeekTd(position, i);
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </ScheduleViewWrapper>
  );
};

export default Schedule;

// className={
//   data ? "btn__schedule" : "btn__schedule--absence"
// }
