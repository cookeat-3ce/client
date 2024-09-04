import styled from 'styled-components';
import { Tabs } from 'antd';

export const HeaderContainer = styled.div`
  width: 100vw;
  height: 8.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  font-family: 'NotoSansKR', sans-serif, Malgungothic, '맑은고딕', Dotum, '돋움';
  border-bottom: 1px solid #e7e7e7;
`;

export const HeaderInner = styled.div`
  width: 80vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5vw;
  font-size: 0.8vw;
`;

export const HeaderText = styled.p`
  cursor: pointer;
  color: #767572;
  font-weight: 500;
`;

export const ContentContainer = styled.div`
  margin: 0 auto;
  width: 80vw;
`;

export const HeaderTitle = styled.p`
  margin-top: 8vh;
  font-size: 2vw;
  font-weight: 600;
`;

export const TabContainer = styled.div`
  margin-top: 6vh;
`;

export const StyledTabs = styled(Tabs)`
  width: 52vw;
  .ant-tabs-nav {
    position: sticky;
    top: 0;
    background: white;
    z-index: 1;
  }
  .ant-tabs-tab-btn {
    font-family: 'NotoSansKR', sans-serif;
    color: #aea7a2 !important;
    font-size: 1.2vw;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    font-family: 'NotoSansKR', sans-serif;
    font-size: 1.2vw;
    font-weight: 600 !important;
    text-shadow: none;
    color: #ff6913 !important;
  }

  .ant-tabs-ink-bar {
    position: absolute;
    pointer-events: none;
    background: #ff6913 !important;
  }

  #rc-tabs-0-tab-6.ant-tabs-tab-btn: active {
    color: #adc71c !important;
  }

  [data-node-key='6'].ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #adc71c !important;
  }

  .ant-tabs-tab[data-node-key='6'].ant-tabs-tab-active
    ~ .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
    background: #adc71c !important;
  }
`;

export const StyledTabs1 = styled(Tabs)`
  width: 52vw;
  .ant-tabs-nav {
    position: sticky;
    top: 0;
    background: white;
    z-index: 1;
  }
  .ant-tabs-tab-btn {
    font-family: 'NotoSansKR', sans-serif;
    color: #aea7a2 !important;
    font-size: 1.2vw;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    font-family: 'NotoSansKR', sans-serif;
    font-size: 1.2vw;
    font-weight: 600 !important;
    text-shadow: none;
    color: #ff6913 !important;
  }

  .ant-tabs-ink-bar {
    position: absolute;
    pointer-events: none;
    background: #ff6913 !important;
  }

  #rc-tabs-0-tab-6.ant-tabs-tab-btn: active {
    color: #adc71c !important;
  }

  [data-node-key='4'].ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #adc71c !important;
  }

  .ant-tabs-tab[data-node-key='4'].ant-tabs-tab-active
    ~ .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
    background: #adc71c !important;
  }
`;

export const CheckBoxContainer = styled.div`
  width: 100%;
  margin-top: 3vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CheckBoxText = styled.p`
  color: #767572;
  font-family: 'NotoSansKR', sans-serif;
  cursor: pointer;
`;

export const CheckBoxBar = styled.p`
  color: #aea7a2;
`;

export const Line = styled.p`
  margin-top: 1vh;
  width: 100%;
  height: 0.2vh;
  background-color: #767572;
`;

export const ProductContainer = styled.div`
  margin-top: 3vh;
  display: flex;
  width: 52vw;
  align-item: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const DeliveryTitle = styled.p`
  font-family: 'NotoSansKR';
  font-size: 1.5vw;
`;

export const NumberText = styled.p`
  font-family: 'Roboto';
  font-size: 1.5vw;
  font-weight: 600;
  color: #ff6913;
`;

export const ItemContainer = styled.div`
  width: 52vw;
  height: 20vh;
  border-bottom: 1px solid #e7e7e7;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 4vh;
`;

export const Item = styled.div`
  height: 100%;
`;

export const Item1 = styled(Item)`
  flex: 1 1 18%;
`;

export const Item2 = styled(Item)`
  flex: 6 1 57%;
`;

export const Item3 = styled(Item)`
  flex: 3 1 25%;
`;

export const SideInner = styled.div`
  margin: 1.5vw 1.5vw 0 1.5vw;
  font-family: NotoSansKR;
  font-size: 1.1vw;
  font-weight: 500;
`;
