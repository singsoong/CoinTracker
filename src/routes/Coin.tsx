import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import { useState } from "react";

interface ILocation {
  state: {
    name: string;
  };
}

export default function Coin() {
  const { coinId } = useParams<{ coinId: string }>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation() as ILocation;

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : <></>}
    </Container>
  );
}
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
  max-width: 480px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  text-align: center;
`;
