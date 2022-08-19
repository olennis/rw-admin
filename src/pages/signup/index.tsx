import { Button, Input, Stack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { setMembers } from "../../firebase/index";
const SignupViewWrapper = styled.div`
  .input__title {
    margin: 30px 0;
  }
  .input__upload {
    height: 300px;
  }
`;

const Signup = () => {
  return (
    <SignupViewWrapper>
      <Input
        placeholder="name"
        className="input__title"
        focusBorderColor="#FF360A"
      />
      <Input
        placeholder="position"
        className="input__title"
        focusBorderColor="#FF360A"
      />
      <Input
        placeholder="sub-position"
        className="input__title"
        focusBorderColor="#FF360A"
      />
      <Button onClick={setMembers("김동훈", "테스트", "서브포지션테스트")}>
        click
      </Button>
    </SignupViewWrapper>
  );
};

export default Signup;
