## 📌 Coin Tracker
- 실시간으로 여러 코인의 정보(Rank, Symbol, Price 등)를 제공하는 API를 활용하여 정보를 차트로 시각화하여 한 눈에 볼 수 있게 구현
- react-query를 사용하여 코인 정보 데이터를 fetch 후 캐싱해두어 리렌더링 시 캐싱해둔 데이터를 빠르게 불러옴
- 최신 버전인, react-router-dom V6을 사용하여 각 페이지로 라우팅
- recoil을 사용하여 다크모드의 여부를 확인하는 state를 atom으로 생성하여 전역으로 관리함

## 📌 Using
- Typescript
- React
- react-query
- recoil
- styled-components
- react-router-dom v6
- ApexChart
- npm

## 📌 Routes
- "/" : 홈 화면, 여러 코인의 목록
- "/:coinId" : 각 코인의 정보
- "/:coinId/chart" : 최근 20일간 해당 코인의 가격 Line 차트 정보
- "/:coinId/price" : 해당 코인의 Open, High, Low, Close의 CandleStick 차트 정보


## 📌 UI
### 1️⃣ 홈 화면 (/)
![image](https://user-images.githubusercontent.com/72503811/227395670-16c8099f-6584-40f7-b08b-675bd9562933.png)

### 2️⃣ 각 코인 정보 (:/coinId)
![image](https://user-images.githubusercontent.com/72503811/227397291-74825f28-b62e-462d-bbb5-ae9410885096.png)


### 3️⃣ 가격 Line 차트 (:/coinId/chart)
![image](https://user-images.githubusercontent.com/72503811/227397864-69aeafa7-9f15-444e-876c-0e46286001de.png)

### 4️⃣ 가격 CandleStick 차트 (:/coinId/price)
![image](https://user-images.githubusercontent.com/72503811/227397985-c298aea2-eef2-4624-94d6-7adf2478bc5a.png)

