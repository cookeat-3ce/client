import styled from 'styled-components';
import { COLORS } from '../../constants';

const fridge_container =
  require('../../assets/images/fridge_container.svg').default;

export const Container = styled.div`
  width: 72vw;
  // border: 10px solid ${COLORS.ORANGE};
`;

export const PageTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1vw;
  margin: 2vh 0;
  // border: 10px solid BLACK;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 1vw;
  // border: 10px solid RED;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 4vh 0;
  // border: 10px solid RED;
`;

export const AddIngredientButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FridgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1vw;
  width: 72vw;
  height: 84vh;
  justify-content: center;
  align-items: start;
  // border: 10px solid BLUE;
  background-image: url(${fridge_container});
  background-size: cover;
  background-position: center;
`;

export const ImageGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  column-gap: 1vw;
  row-gap: 6vh;
  width: 70%;
  margin: 12vh 0 0 0;
`;

export const IngredientImage = styled.img`
  opacity: ${(props) => (props.isExpired ? 0.3 : 1)};
  border-radius: ${(props) => props.isExpired && '20px'};
  width: 100%;
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

export const NoIngredientAlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
  justify-content: center;
  align-items: center;
  width: 28vw;
  gap: 2vh;
  // border: 10px solid ${COLORS.GREEN};
`;

export const FridgeImageWrapper = styled.img``;
