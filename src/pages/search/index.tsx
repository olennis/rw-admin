import { getSongBooks } from "../../firebase/index";
import {
  Button,
  ButtonGroup,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Link from "next/link";

interface CodeBtn {
  code: string;
  selected: boolean;
}

interface SongBook {
  id: number;
  title: string;
  src: string;
  code: string;
}

const SearchViewWrapper = styled.div`
  .input__title {
    margin: 30px 0;
    border: 1px solid orange;
    display: block;
    width: 835px;
  }
  .input__upload {
    height: 300px;
  }
  .btn__search {
    margin-bottom: 30px;
  }
`;

const Search = () => {
  const [songbooks, setSongbooks] = useState<SongBook[]>();
  const [titleInput, setTitleInput] = useState<string>("");
  const [codeInput, setCodeInput] = useState<string>("ALL");
  const [codesBtn, setCodesBtn] = useState<CodeBtn[]>([
    { code: "ALL", selected: true },
    { code: "C", selected: false },
    { code: "C#", selected: false },
    { code: "D", selected: false },
    { code: "Eb", selected: false },
    { code: "E", selected: false },
    { code: "F", selected: false },
    { code: "F#", selected: false },
    { code: "G", selected: false },
    { code: "G#", selected: false },
    { code: "A", selected: false },
    { code: "Bb", selected: false },
    { code: "B", selected: false },
  ]);

  //handler
  const selectBtn = (code: CodeBtn) => {
    const tempCodesBtn = codesBtn;
    tempCodesBtn.forEach((btn) => {
      if (btn.code === code.code) {
        btn.selected = true;
        setCodesBtn([...tempCodesBtn]);
        setCodeInput(code.code);
        getSongbook(titleInput, code.code);
        return;
      } else {
        btn.selected = false;
      }
    });
  };

  const getSongbook = (inputValue: string, code: string) => {
    const filteredSongbooks = songbooks?.filter((songbook) => {
      if (titleInput.length === 0 && code !== "ALL") {
        return songbook.code === code;
      } else if (titleInput.length !== 0 && code === "ALL") {
        return songbook.title.match(new RegExp(`${inputValue}`, "gi"));
      } else if (titleInput.length !== 0 && code !== "ALL") {
        return (
          songbook.title.match(new RegExp(`${inputValue}`, "gi")) &&
          code === songbook.code
        );
      } else if (titleInput.length === 0 && code === "ALL") {
        return songbook;
      }
    });
    if (filteredSongbooks) {
      return filteredSongbooks.map((filteredSongbook, idx) => {
        return (
          <Tr key={`filteredSongbooks_${idx}`}>
            <Td>{filteredSongbook.code}</Td>
            <Td>{filteredSongbook.title}</Td>
            <Td>
              <Link href={`/preview/${filteredSongbook.id}`}>출력하기</Link>
            </Td>
          </Tr>
        );
      });
    } else {
      return <Tr></Tr>;
    }
  };

  //useEffect
  useEffect(() => {
    getSongBooks().then((res) => {
      setSongbooks(
        res.sort((a: any, b: any) => {
          return b.id - a.id;
        })
      );
    });
  }, []);

  return (
    <SearchViewWrapper>
      <ButtonGroup display={"flex"} spacing={4}>
        {codesBtn.map((code) => {
          return (
            <Button
              colorScheme="orange"
              variant={code.selected ? "solid" : "outline"}
              key={`${code.code}`}
              value={`${code.code}`}
              onClick={() => selectBtn(code)}>
              {code.code}
            </Button>
          );
        })}
      </ButtonGroup>

      <Input
        placeholder="title"
        className="input__title"
        focusBorderColor="#f37321"
        borderColor={"#f89b6c"}
        _hover={{ borderColor: "#fcc6a2" }}
        autoFocus
        value={titleInput}
        onChange={(e) => {
          setTitleInput(e.currentTarget.value);
        }}
      />
      <Button
        size="sm"
        colorScheme="orange"
        className="btn__search"
        onClick={() => {
          getSongbook(titleInput, codeInput);
        }}>
        search
      </Button>
      <TableContainer>
        <Table variant="simple" colorScheme="orange">
          <Thead>
            <Tr>
              <Th>CODE</Th>
              <Th>TITLE</Th>
              <Th>PRINT</Th>
            </Tr>
          </Thead>
          <Tbody>{getSongbook(titleInput, codeInput)}</Tbody>
        </Table>
      </TableContainer>
    </SearchViewWrapper>
  );
};

export default Search;
