import { Outlet, useLocation, useMatch, useParams } from "react-router";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface ILocation {
  state: {
    name: string;
  };
}
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: Date;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: Date;
  last_data_at: Date;
}

export interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

export default function Coin() {
  const { coinId } = useParams<{ coinId: string }>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation() as ILocation;
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
      </Header>
      <OverviewTab>
        <OverviewItem>
          <Item>Rank :</Item>
          <Item>{info?.rank}</Item>
        </OverviewItem>
        <OverviewItem>
          <Item>Symbol :</Item>
          <Item>{info?.symbol}</Item>
        </OverviewItem>
        <OverviewItem>
          <Item>Opensource :</Item>
          <Item>{info?.open_source ? "Yes" : "No"}</Item>
        </OverviewItem>
      </OverviewTab>
      <Description>{info?.description}</Description>
      <OverviewTab>
        <OverviewItem>
          <Item>Total Supply :</Item>
          <Item>{priceInfo?.total_supply}</Item>
        </OverviewItem>
        <OverviewItem>
          <Item>Max Supply :</Item>
          <Item>{priceInfo?.max_supply}</Item>
        </OverviewItem>
      </OverviewTab>
      <Tabs>
        <Tab isActive={chartMatch !== null}>
          <Link to={`/${coinId}/chart`}>Chart</Link>
        </Tab>
        <Tab isActive={priceMatch !== null}>
          <Link to={`/${coinId}/price`}>Price</Link>
        </Tab>
      </Tabs>

      <Outlet />
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

const OverviewTab = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.div`
  margin: 20px 0px;
  line-height: 20px;
`;

const Item = styled.span``;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  text-transform: uppercase;
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;
