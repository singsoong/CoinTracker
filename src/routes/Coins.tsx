import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
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

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
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
`;

const Loader = styled.div`
  text-align: center;
`;

const CoinImg = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;
