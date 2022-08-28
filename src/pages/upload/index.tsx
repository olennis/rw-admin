import { Button, Input, ButtonGroup, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { getSongBooks, setSongbook } from "../../firebase/index";
import Image from "next/image";

interface CodeBtn {
  code: string;
  selected: boolean;
}

const UploadViewWrapper = styled.div`
  .input__title {
    margin: 30px 0;
    width: 756px;
  }
  .input__url {
    display: block;
    width: 756px;
  }
  .btn__save {
    margin: 30px 0;
  }
  .img__songbook {
    max-height: 400px;
  }
`;

const Upload = () => {
  const router = useRouter();
  const toast = useToast();
  const [id, setId] = useState<number>(0);
  const [codeInput, setCodeInput] = useState<string>("C");
  const [titleInput, setTitleInput] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("");
  const [codesBtn, setCodesBtn] = useState<CodeBtn[]>([
    { code: "C", selected: true },
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

  const selectBtn = (code: CodeBtn) => {
    const tempCodesBtn = codesBtn;
    tempCodesBtn.forEach((btn) => {
      if (btn.code === code.code) {
        btn.selected = true;
        setCodesBtn([...tempCodesBtn]);
        setCodeInput(code.code);
        return;
      } else {
        btn.selected = false;
      }
    });
  };

  //useEffect
  useEffect(() => {
    getSongBooks().then((res) => {
      const ids = Object.keys(res).map((id) => {
        return parseInt(id) + 1;
      });
      const newId = Math.max(...ids) + 1;
      setId(newId);
    });
  }, []);

  return (
    <UploadViewWrapper>
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
        autoFocus
        placeholder="title"
        className="input__title"
        focusBorderColor="#f37321"
        borderColor={"#f89b6c"}
        _hover={{ borderColor: "#fcc6a2" }}
        value={titleInput}
        onChange={(e) => {
          setTitleInput(e.target.value);
        }}
      />
      <Input
        placeholder="url"
        className="input__url"
        focusBorderColor="#f37321"
        borderColor={"#f89b6c"}
        _hover={{ borderColor: "#fcc6a2" }}
        value={urlInput}
        onChange={(e) => {
          setUrlInput(e.target.value);
        }}
      />

      <Button
        className="btn__save"
        colorScheme="orange"
        onClick={() => {
          setSongbook(id, titleInput, codeInput, urlInput)
            .then(() => {
              toast({
                title: `악보 저장에 성공했어요!`,
                status: "success",
                isClosable: true,
              });
            })
            .catch(() => {
              toast({
                title: `악보 저장에 실패했어요! 동훈이에게 문의해봐봐요.`,
                status: "error",
                isClosable: true,
              });
            });
          router.push("/search");
        }}>
        save
      </Button>
      {urlInput.length > 0 && (
        <img className="img__songbook" src={urlInput} alt="악보 이미지" />
      )}
    </UploadViewWrapper>
  );
};

export default Upload;
