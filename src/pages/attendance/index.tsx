import { Button, Input, Textarea, useToast } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import styled from "@emotion/styled";
import { getMemberAttendance, setMemberAttendance } from "../../firebase/index";

const AttendanceWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  .wrapper {
    text-align: center;
  }
  .title {
    font-weight: bold;
    font-size: 32px;
  }
  .date {
    display: block;
  }
  .card {
    margin-top: 48px;
    border-radius: 16px;
    background-color: white;
    padding: 40px 32px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .label {
    text-align: left;
  }
  .labelTitle {
    margin-bottom: 4px;
    display: block;
  }
`;

const Attendance = () => {
  const [inputValues, setInputValues] = useState({
    leader: "",
    member: "",
    demand: "",
    date: "",
  });
  const toast = useToast();
  const date = new Date();
  const today = `${date.getFullYear()} / ${
    date.getMonth() + 1
  } / ${date.getDate()}`;

  const useInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setInputValues({
      ...inputValues,
      [name]: value.replaceAll(" ", ""),
    });
  };

  const submit = async () => {
    const { leader, member, demand } = inputValues;
    try {
      const isSunday = date.getDay() === 0;
      const sundayDate = new Date(date.getTime());
      console.log("1");
      toast({
        title: "Thank you",
        description: `등록되었어요! ${leader}셀 감사합니다`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      if (!isSunday) {
        sundayDate.setDate(date.getDate() - date.getDay());
      }

      const dateString = `${sundayDate.getMonth() + 1}/${sundayDate.getDate()}`;
      await setMemberAttendance(leader, member.split(","), demand, dateString);
    } catch {
      toast({
        title: "error",
        description: "출석부 등록이 실패했어요!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <AttendanceWrapper className="main">
      <div className="wrapper">
        <h1 className="title">weekly report</h1>
        <span className="date">{today}</span>

        <div className="card">
          <label className="label">
            <span className="labelTitle">leader</span>
            <Input
              className="labelInput"
              placeholder="김동훈"
              name="leader"
              value={inputValues["leader"]}
              onChange={useInput}
            />
          </label>
          <label className="label">
            <span className={"labelTitle"}>member</span>
            <Input
              placeholder="황사랑,장하림"
              value={inputValues["member"]}
              name="member"
              onChange={useInput}
            />
          </label>
          <label className="label">
            <span className={"labelTitle"}>demand</span>
            <Textarea
              placeholder="셀 특이사항을 적어주세요.(심방 등)"
              value={inputValues["demand"]}
              name="demand"
              onChange={useInput}
            />
          </label>

          <Button colorScheme={"orange"} onClick={submit}>
            submit
          </Button>

          <button
            onClick={() => {
              getMemberAttendance();
            }}>
            check
          </button>
        </div>
      </div>
    </AttendanceWrapper>
  );
};
export default Attendance;
