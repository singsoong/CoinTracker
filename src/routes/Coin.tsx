import { useParams } from "react-router";
import styled from "styled-components";

export default function Coin() {
  const { coinId } = useParams<{ coinId: string }>();
  return (
    <>
      <Title>{coinId}</Title>
    </>
  );
}
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;
