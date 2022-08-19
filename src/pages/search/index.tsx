import { Button, Input, Stack } from "@chakra-ui/react";
import styled from "@emotion/styled";

const SearchViewWrapper = styled.div`
  .input__title {
    margin: 30px 0;
  }
  .input__upload {
    height: 300px;
  }
`;

const Search = () => {
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
    <SearchViewWrapper>
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
    </SearchViewWrapper>
  );
};

export default Search;
