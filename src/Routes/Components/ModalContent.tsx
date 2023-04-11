import styled from "styled-components";
import { makeImagePath } from "../utils";

interface ModalContentProps {
  backdrop_path: string;
  title: string;
  overview: string;
}

const ModalCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const ModalTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const ModalOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

function ModalContent({ backdrop_path, title, overview }: ModalContentProps) {
  return (
    <>
      <ModalCover
        style={{
          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
            backdrop_path,
            "w500"
          )})`,
        }}
      />
      <ModalTitle>{title}</ModalTitle>
      <ModalOverview>{overview}</ModalOverview>
    </>
  );
}

export default ModalContent;
