import { Button, Input, Stack } from "@chakra-ui/react";
import styled from "@emotion/styled";

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
      <Button>click</Button>
    </SignupViewWrapper>
  );
};

export default Signup;
