import { Button, Input, Text, useToast } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getMembers, setMember } from "../../firebase/index";
const SignupViewWrapper = styled.div`
  .wrapper__content {
    border-radius: 8px;
    width: 300px;
    height: 400px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
`;
const Signup = () => {
  const toast = useToast();
  const router = useRouter();
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [subPosition, setSubPosition] = useState<string>("");

  useEffect(() => {
    getMembers().then((res) => {
      const ids = Object.keys(res).map((id) => {
        return parseInt(id) + 1;
      });
      const newId = Math.max(...ids) + 1;
      setId(newId);
    });
  }, []);
  return (
    <SignupViewWrapper>
      <div className="wrapper__content">
        <Text>이름</Text>
        <Input
          placeholder="name"
          className="input__title"
          colorScheme="orange"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Text>포지션</Text>
        <Input
          placeholder="position"
          className="input__title"
          colorScheme="orange"
          value={position}
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        />
        <Text>서브포지션</Text>
        <Input
          placeholder="sub-position"
          className="input__title"
          colorScheme="orange"
          value={subPosition}
          onChange={(e) => {
            setSubPosition(e.target.value);
          }}
        />
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
                router.push("/members");
              })
              .catch(() => {
                toast({
                  title: `멤버 저장에 실패했어요! 동훈이에게 문의 해봐봐요`,
                  status: "error",
                  isClosable: true,
                });
              });
          }}>
          click
        </Button>
      </div>
    </SignupViewWrapper>
  );
};

export default Signup;
