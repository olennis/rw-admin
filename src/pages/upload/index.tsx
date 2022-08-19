import { Button, Input, Stack } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import styled from "@emotion/styled";

const UploadViewWrapper = styled.div`
  .input__title {
    margin: 30px 0;
  }
  .input__upload {
    height: 300px;
  }
`;

const Upload = () => {
  const onLoadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files;
    console.log(file);
  };
  const codes = [
    "C",
    "C#",
    "D",
    "Eb",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "Bb",
    "B",
  ];
  return (
    <UploadViewWrapper>
      <Stack spacing={4} direction="row" align="center">
        {codes.map((code) => {
          return (
            <Button variant={"outline"} key={`${code}`}>
              {code}
            </Button>
          );
        })}
      </Stack>
      <Input
        placeholder="title"
        className="input__title"
        focusBorderColor="#FF360A"
      />
      <Input
        type="file"
        accept="image/*"
        multiple
        className="input__upload"
        onChange={(e) => {
          onLoadFile(e);
        }}></Input>
    </UploadViewWrapper>
  );
};

export default Upload;
