import { useEffect, useRef, useState } from "react";
import { getSongBooks } from "../../firebase/index";
import { useRouter } from "next/router";
import ReactToPrint from "react-to-print";
import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";

const PreviewViewWrapper = styled.div`
  .img__preview {
    max-width: 2480px;
    max-height: 3508px;
  }
`;

const Preview = () => {
  const router = useRouter();
  const { id } = router.query;
  const [src, setSrc] = useState<string>("");
  const componentRef = useRef<HTMLImageElement>(null);

  //useEffect
  useEffect(() => {
    getSongBooks()
      .then((res) => {
        const filteredSongbook = res.filter((data) => {
          return `${data.id}` === id;
        });
        setSrc(filteredSongbook[0].src);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);
  return (
    <div>
      <ReactToPrint
        trigger={() => <Button colorScheme="orange">Print!</Button>}
        content={() => componentRef.current}
        pageStyle={"landscape"}
      />
      <img src={src} ref={componentRef} className="img__preview" />
    </div>
  );
};

export default Preview;
