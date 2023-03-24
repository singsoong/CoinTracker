import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Coins() {
  const { isLoading, data } = useQuery<ICoins[]>("allCoins", fetchCoins);
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <Container>
      <Header>
        <Title>Coin Tracker</Title>
        <ToggleBtn onClick={toggleDarkAtom}>
          {isDark ? "Light Mode" : "Dark Mode"}
        </ToggleBtn>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 80).map((coin) => (
            <Link key={coin.id} to={`/${coin.id}`} state={{ name: coin.name }}>
              <Coin>
                <CoinImg
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Coin>
            </Link>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  margin: 0 auto;
  max-width: 480px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.divColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  transition: color 0.2s ease-in;
  display: flex;
  align-items: center;

  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  font-weight: bold;
`;

const Loader = styled.div`
  text-align: center;
`;

const CoinImg = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const ToggleBtn = styled.div`
  background-color: ${(props) => props.theme.divColor};
  cursor: pointer;
  padding: 10px 5px;
  border-radius: 10px;
`;
