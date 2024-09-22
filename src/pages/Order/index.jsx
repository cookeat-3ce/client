import React, { useCallback, useState, useEffect, useMemo } from 'react';
import {
  HeaderContainer,
  HeaderInner,
  HeaderTextContainer,
  HeaderText,
  ContentContainer,
  HeaderTitle,
  StyledTabs,
  CheckBoxContainer,
  CheckBoxText,
  CheckBoxBar,
  Line,
  RadioTitle,
  ProductContainer,
  DeliveryTitle,
  NumberText,
  ItemContainer,
  StyledTabs1,
  Item1,
  Item2,
  Item3,
  SideInner,
  StyledSpin,
} from './styles';
import { message } from 'antd';
import Logo from '../../assets/icons/hyundai_logo.png';
import { getCookie, useCustomNavigate } from '../../hooks';
import { useMutation } from '@tanstack/react-query';
import { memberAPI } from '../../apis/member';
import { debounce, wrap } from 'lodash';
import { useResetRecoilState } from 'recoil';
import { deleteAllCookies } from '../../hooks';
import ArrowUpIcon from '../../assets/icons/arrow_up.svg';
import ArrowDownIcon from '../../assets/icons/arrow_down.svg';
import ErrorIcon from '../../assets/icons/error.svg';
import CloseIcon from '../../assets/icons/close.svg';
import NaverPayIcon from '../../assets/icons/naverpay.svg';
import PaycoIcon from '../../assets/icons/payco.svg';
import KakaoPayIcon from '../../assets/icons/kakaopay.svg';
import CreditCardIcon from '../../assets/icons/credit_card.svg';
import PassbookIcon from '../../assets/icons/passbook.svg';
import PhoneIcon from '../../assets/icons/phone.svg';
import { memberState } from '../../store';
import CustomButton from '../../components/Button';
import CustomText from '../../components/Text';
import Allulose from '../../assets/images/ingredients/allulose.png';
import BrownSeaweed from '../../assets/images/ingredients/brown_seaweed.jpg';
import CreamCheeze from '../../assets/images/ingredients/cream_cheeze.jpg';
import Egg from '../../assets/images/ingredients/egg.jpg';
import Lemon from '../../assets/images/ingredients/lemon.jpg';
import MincedGalic from '../../assets/images/ingredients/minced_galic.jpg';
import Salt from '../../assets/images/ingredients/salt.jpeg';
import Shrimp from '../../assets/images/ingredients/shrimp.jpg';
import SoupSoySouce from '../../assets/images/ingredients/soup_soy_souce.jpg';
import StratchCorn from '../../assets/images/ingredients/stratch_corn.jpg';
import Sugar from '../../assets/images/ingredients/sugar.jpg';
import Tuna from '../../assets/images/ingredients/tuna.jpg';
import Water from '../../assets/images/ingredients/water.jpg';
import MealKit from '../../assets/images/mealkit.svg';
import Cream from '../../assets/images/ingredients/cream.jpg';
/**
 * 결제
 *
 * @author 양재혁
 * @version 1.0
 * @since 2024.09.06
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.09.06    양재혁       최초 생성
 * 2024.09.11    양재혁       결제 수단 추가
 * </pre>
 */
const Order = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const resetMemberState = useResetRecoilState(memberState);
  // const [checked, setChecked] = useState(true);
  const [isArrowClicked, setIsArrowClicked] = useState(true);
  // const [randomNumbers, setRandomNumbers] = useState([]);
  // const [randomPrice, setRandomPrice] = useState([]);
  // const [isChecked, setIsChecked] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const [percent, setPercent] = useState(0);

  // const handleIncrement = (index) => {
  //   setValues((prevValues) =>
  //     prevValues.map((value, i) =>
  //       i === index && randomNumbers[i] !== 0 && value < randomNumbers[i]
  //         ? value + 1
  //         : value,
  //     ),
  //   );
  // };

  // const handleDecrement = (index) => {
  //   setValues((prevValues) =>
  //     prevValues.map((value, i) =>
  //       i === index && randomNumbers[i] !== 0 && value > 1 ? value - 1 : value,
  //     ),
  //   );
  // };

  const accessToken = getCookie('accessToken');

  const toggleArrow = useCallback(() => {
    setIsArrowClicked((prev) => !prev);
  }, []);

  const mutation = useMutation({
    mutationFn: async () => {
      await memberAPI.logoutAPI();
    },
    onSuccess: () => {
      resetMemberState();
      deleteAllCookies();
      handleChangeUrl('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const INGREDIENT_IMAGES = {
    계란: Egg,
    소금: Salt,
    크림치즈: CreamCheeze,
    설탕: Sugar,
    알룰로스: Allulose,
    옥수수전분: StratchCorn,
    레몬즙: Lemon,
    불린미역: BrownSeaweed,
    다진마늘: MincedGalic,
    국간장: SoupSoySouce,
    새우: Shrimp,
    물: Water,
    참치액젓: Tuna,
    생크림: Cream,
  };

  const debouncedLogout = useCallback(
    debounce(() => {
      mutation.mutate();
    }, 300),
    [],
  );
  const decodeAndParseData = (encodedData) => {
    const decodedData = decodeURIComponent(encodedData);

    let parsedData;
    try {
      if (
        decodedData.includes(' ') ||
        decodedData.startsWith('[') ||
        decodedData.startsWith('{')
      ) {
        parsedData = JSON.parse(decodedData);
      } else {
        parsedData = [decodedData];
      }
    } catch (error) {
      parsedData = [decodedData];
    }

    return parsedData;
  };

  const queryParams = new URLSearchParams(window.location.search);

  const orderData = decodeAndParseData(queryParams.get('orderData'));
  const priceData = queryParams.get('priceData')
    ? queryParams.get('priceData').split(',').map(Number)
    : [];

  const special = queryParams.get('special');
  const totalPrice = priceData.reduce((acc, curr) => acc + curr, 0);

  const discount = parseInt(queryParams.get('discount'), 0) || 0;
  const discountPrice = Math.round((totalPrice * discount) / 100 / 100) * 100;

  const [shippingPrice, setShippingPrice] = useState(0);
  useEffect(() => {
    if (totalPrice - discountPrice >= 50000) setShippingPrice(0);
    else setShippingPrice(3500);
  }, []);

  const totalDiscountPrice = totalPrice - discountPrice + shippingPrice;

  const [arrayData, setArrayData] = useState(orderData);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState('credit-card');

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };
  // const [checkedItems, setCheckedItems] = useState(() =>
  //   randomNumbers.map((num) => num !== 0),
  // );
  // const isAllChecked = useMemo(() => {
  //   return checkedItems.every((checked, index) => {
  //     return randomNumbers[index] === 0 || checked;
  //   });
  // }, [checkedItems, randomNumbers]);

  // useEffect(() => {
  //   setCheckedItems((prevCheckedItems) =>
  //     prevCheckedItems.map((_, index) =>
  //       randomNumbers[index] === 0 ? false : true,
  //     ),
  //   );
  // }, [randomNumbers]);

  // const handleCheckboxChange = (index) => {
  //   setCheckedItems((prev) => {
  //     const newCheckedItems = [...prev];
  //     newCheckedItems[index] = !newCheckedItems[index];
  //     return newCheckedItems;
  //   });
  // };

  // const handleSelectAllChange = () => {
  //   const shouldCheck = !checked;
  //   const updatedCheckedItems = arrayData.map((item, index) => {
  //     if (randomNumbers[index] !== 0) {
  //       return shouldCheck;
  //     }
  //     return checkedItems[index];
  //   });

  //   setCheckedItems(updatedCheckedItems);
  //   setChecked(shouldCheck);
  // };
  // const getRandomNumber = () => Math.floor(Math.random() * 11);
  // const [values, setValues] = useState(randomNumbers.map(() => 1));
  // useEffect(() => {
  //   setValues(randomNumbers.map(() => 1));
  // }, [randomNumbers]);
  // const getProductPriceRandom = () => Math.floor(Math.random() * 10000) + 1;

  // useEffect(() => {
  //   if (arrayData.length > 0) {
  //     const newRandomNumbers = arrayData.map(() => getRandomNumber());
  //     setRandomNumbers(newRandomNumbers);
  //     const newPrice = arrayData.map(() => getProductPriceRandom());
  //     setRandomPrice(newPrice);
  //   }
  // }, [arrayData]);

  // const handleDeleteCheckedItems = () => {
  //   const filteredData = arrayData.filter(
  //     (_, index) => !checkedItems[index] && randomNumbers[index] !== 0,
  //   );
  //   const filteredRandomNumbers = randomNumbers.filter(
  //     (_, index) => !checkedItems[index] && randomNumbers[index] !== 0,
  //   );
  //   const filteredPrices = prices.filter(
  //     (_, index) => !checkedItems[index] && randomNumbers[index] !== 0,
  //   );

  //   setArrayData(filteredData);
  //   setCheckedItems(new Array(filteredData.length).fill(true));
  //   setRandomNumbers(filteredRandomNumbers);
  //   setPrices(filteredPrices);

  //   const encodedData = encodeURIComponent(JSON.stringify(filteredData));
  //   const encodedPrices = encodeURIComponent(filteredPrices.join(','));
  //   handleChangeUrl(
  //     `/order?orderData=${encodedData}&priceData=${encodedPrices}`,
  //   );
  // };

  // const handleDeleteItem = (index) => {
  //   if (randomNumbers[index] === 0) return;

  //   const updatedData = arrayData.filter((_, i) => i !== index);
  //   const updatedRandomNumbers = randomNumbers.filter((_, i) => i !== index);
  //   const updatedCheckedItems = checkedItems.filter((_, i) => i !== index);
  //   const updatedPrices = prices.filter((_, i) => i !== index);

  //   setArrayData(updatedData);
  //   setRandomNumbers(updatedRandomNumbers);
  //   setCheckedItems(updatedCheckedItems);
  //   setPrices(updatedPrices);

  //   const encodedData = encodeURIComponent(JSON.stringify(updatedData));
  //   const encodedPrices = encodeURIComponent(updatedPrices.join(','));
  //   handleChangeUrl(
  //     `/order?orderData=${encodedData}&priceData=${encodedPrices}`,
  //   );
  // };

  // const handleDeleteOutOfStockItems = () => {
  //   const filteredData = arrayData.filter(
  //     (_, index) => randomNumbers[index] !== 0,
  //   );
  //   const filteredRandomNumbers = randomNumbers.filter(
  //     (number) => number !== 0,
  //   );
  //   const filteredPrices = prices.filter(
  //     (_, index) => randomNumbers[index] !== 0,
  //   );

  //   setArrayData(filteredData);
  //   setRandomNumbers(filteredRandomNumbers);
  //   setCheckedItems(new Array(filteredData.length).fill(true));
  //   setPrices(filteredPrices);

  //   const encodedData = encodeURIComponent(JSON.stringify(filteredData));
  //   const encodedPrices = encodeURIComponent(filteredPrices.join(','));
  //   handleChangeUrl(
  //     `/order?orderData=${encodedData}&priceData=${encodedPrices}`,
  //   );
  // };

  // const getTotal = (field) => {
  //   return arrayData.reduce((total, item, index) => {
  //     if (checkedItems[index] && randomNumbers[index] !== 0) {
  //       return total + prices[index] * values[index];
  //     }
  //     return total;
  //   }, 0);
  // };

  // useEffect(() => {
  //   setCheckedItems(arrayData.map((_, index) => randomNumbers[index] !== 0));
  // }, [arrayData, randomNumbers]);

  // const totalPrice = getTotal('price');
  // const calculateDiscountedPrice = (totalPrice, discount) => {
  //   const discountRate = discount / 100;
  //   return totalPrice * (1 - discountRate);
  // };

  // const [discountedPrice, setDiscountedPrice] = useState(0);

  // const [shippingPrice, setShippingPrice] = useState(3500);
  // useEffect(() => {
  //   const allFalse = checkedItems.every((item) => !item);

  //   if (allFalse) {
  //     setShippingPrice(0);
  //   } else {
  //     if (totalPrice > 50000) setShippingPrice(0);
  //     else setShippingPrice(3500);
  //   }
  // }, [checkedItems, totalPrice]);

  // useEffect(() => {
  //   const priceAfterDiscount = calculateDiscountedPrice(totalPrice, discount);
  //   const finalPrice =
  //     totalPrice < 50000
  //       ? priceAfterDiscount + shippingPrice
  //       : priceAfterDiscount;

  //   setDiscountedPrice(finalPrice);
  // }, [totalPrice, discount, shippingPrice]);
  // useEffect(() => {
  //   const allUnchecked = checkedItems.every((item) => !item);

  //   setIsChecked(!allUnchecked);
  // }, [checkedItems]);

  const showLoader = () => {
    setSpinning(true);
    let ptg = 0;

    const interval = setInterval(() => {
      ptg += 5;
      setPercent(ptg);

      if (ptg >= 120) {
        clearInterval(interval);
        setSpinning(false);
        setPercent(0);
        handleChangeUrl('/order/done');
      }
    }, 100);
  };

  // const handleClick = () => {
  //   if (isChecked) {
  //     showLoader();
  //   } else {
  //     message.warning('결제할 상품을 선택해주세요!', 3);
  //   }
  // };

  // const handleDirectClick = (index) => {
  //   if (checkedItems[index]) {
  //     showLoader();
  //   } else {
  //     message.warning('결제할 상품을 선택해주세요!', 3);
  //   }
  // };

  const getImageForItem = (item, special) => {
    if (special) {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <img
            src={MealKit}
            alt="Mealkit"
            style={{
              width: '90%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      );
    }

    const imageSrc = INGREDIENT_IMAGES[item];

    if (imageSrc) {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <img
            src={imageSrc}
            alt={item}
            style={{
              width: '90%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      );
    }

    return null;
  };

  const items = [
    {
      key: '1',
      label: `새벽배송 ${arrayData.length}`,
      children: (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* <CheckBoxContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.5vw',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={handleSelectAllChange}
            >
              <input
                type="checkbox"
                checked={isAllChecked}
                style={{
                  cursor: 'pointer',
                  width: '1.5vw',
                  height: '1.5vw',
                }}
              />
              <CheckBoxText>전체선택</CheckBoxText>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1vw',
              }}
            >
              <CheckBoxText onClick={handleDeleteCheckedItems}>
                삭제
              </CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText onClick={handleDeleteOutOfStockItems}>
                품절삭제
              </CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText>좋아요담기</CheckBoxText>
            </div>
          </CheckBoxContainer>
          <Line /> */}
          <ProductContainer onClick={toggleArrow}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '.3vw',
              }}
            >
              <DeliveryTitle>새벽배송</DeliveryTitle>
              <NumberText>{arrayData.length}</NumberText>
            </div>
            <img src={isArrowClicked ? ArrowUpIcon : ArrowDownIcon} />
          </ProductContainer>
          <div>
            {isArrowClicked ? (
              arrayData.map((item, index) => {
                return (
                  <>
                    <ItemContainer key={index}>
                      <Item1>
                        {getImageForItem(item, special)}
                        {/* {randomNumbers[index] !== 0 && (
                          <input
                            type="checkbox"
                            checked={checkedItems[index] || false}
                            onChange={() => handleCheckboxChange(index)}
                            style={{
                              cursor: 'pointer',
                              width: '1.3vw',
                              height: '1.3vw',
                            }}
                          ></input>
                        )} */}
                      </Item1>
                      <Item2>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '1vh',
                          }}
                        >
                          <CustomText
                            text={item}
                            fontFamily={'Noto Sans KR'}
                            fontSize={'1.3vw'}
                          />
                          {special && (
                            <div
                              style={{
                                color: '#ff6913',
                                fontFamily: 'Noto Sans KR',
                                fontSize: '.8vw',
                              }}
                            >
                              한정수량 100개!
                            </div>
                          )}
                          <div
                            style={{ display: 'flex', alignItems: 'flex-end' }}
                          >
                            {
                              /* {randomNumbers[index] !== 0 && (
                              <div
                                key={index}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '1vw',
                                  marginRight: '1.5vw',
                                }}
                              >
                                <CustomButton
                                  text={'-'}
                                  onClick={() => handleDecrement(index)}
                                  backgroundColor="#ffffff"
                                  borderColor="#e7e7e7"
                                  width="2vw"
                                  height="2vw"
                                />
                                <CustomText text={values[index]} />
                                <CustomButton
                                  text={'+'}
                                  onClick={() => handleIncrement(index)}
                                  backgroundColor="#ffffff"
                                  borderColor="#e7e7e7"
                                  width="2vw"
                                  height="2vw"
                                />
                              </div>
                            )}*/
                              <>
                                <div
                                  style={{
                                    fontFamily: 'Roboto',
                                    fontWeight: '700',
                                    fontSize: '1.3vw',
                                  }}
                                >
                                  {/* {randomPrice[index] * values[index]} */}
                                  {priceData[index]}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Noto Sans KR',
                                  }}
                                >
                                  원
                                </div>
                              </>
                            }
                          </div>
                        </div>
                      </Item2>
                      <Item3>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            height: '100%',
                          }}
                        >
                          {/* <div>
                            <img
                              src={CloseIcon}
                              alt="Close Icon"
                              style={{
                                cursor: 'pointer',
                                width: '24px',
                                height: '24px',
                              }}
                              // onClick={() => handleDeleteItem(index)}
                            />
                          </div> */}

                          {/* {randomNumbers[index] !== 0 && (
                            <div
                              style={{
                                marginBottom: '1vw',
                              }}
                            >
                              <CustomButton
                                text={'바로구매'}
                                color="#ff6913"
                                backgroundColor="#ffffff"
                                borderColor="#ff6913"
                                width="6vw"
                                height="6vh"
                                fontFamily={'Noto Sans KR'}
                                onClick={() => handleDirectClick(index)}
                              />
                            </div>
                          )} */}
                        </div>
                      </Item3>
                    </ItemContainer>
                  </>
                );
              })
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '15vh 0 22vh',
                  gap: '1vh',
                  borderBottom: '1px solid #e7e7e7',
                }}
              >
                <img src={ErrorIcon}></img>
                <p
                  style={{
                    fontFamily: 'Noto Sans KR',
                    color: '#767572',
                    fontWeight: '500',
                    fontSize: '.9vw',
                  }}
                >
                  장바구니에 담긴 상품이 없습니다.
                </p>
              </div>
            )}
          </div>
          {arrayData.length > 0 && (
            <div
              style={{
                width: '52vw',
                height: '15vh',
                borderBottom: '1px solid black',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '50%',
                  background: '#f8f8f8',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    marginLeft: '1vw',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginRight: '1vw',
                  }}
                >
                  <CustomText
                    text={'배송비3,500원(50,000원 이상 결제 시 무료)'}
                    color={'#767572'}
                  />
                  <CustomButton
                    text={'묶음배송 상품 보기 >'}
                    fontFamily={'Noto Sans KR'}
                    color="#767572"
                    borderColor="#dbd9d6"
                    backgroundColor="#f8f8f8"
                    borderRadius="100px"
                    width="10vw"
                    height="4vh"
                  ></CustomButton>
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              marginTop: '9vh',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '.5vw',
              marginBottom: '17vh',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginTop: '3vh',
                width: '52vw',
                gap: '1vw',
                paddingBottom: '3vh',
                borderBottom: '1px solid black',
              }}
            >
              <DeliveryTitle>결제수단 선택</DeliveryTitle>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '1vw',
                  flexWrap: 'wrap',
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    value="credit-card"
                    checked={selectedPaymentMethod === 'credit-card'}
                    onChange={handlePaymentMethodChange}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '.5vw',
                      marginLeft: '.5vw',
                    }}
                  >
                    <img src={CreditCardIcon} alt="CreditCard Icon" />
                    <RadioTitle>신용카드</RadioTitle>
                  </div>
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    value="payco"
                    checked={selectedPaymentMethod === 'payco'}
                    onChange={handlePaymentMethodChange}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '.5vw',
                      marginLeft: '.5vw',
                    }}
                  >
                    <img src={PaycoIcon} alt="Payco Icon" />
                    <RadioTitle>PAYCO</RadioTitle>
                  </div>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    value="kakaopay"
                    checked={selectedPaymentMethod === 'kakaopay'}
                    onChange={handlePaymentMethodChange}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '.5vw',
                      marginLeft: '.5vw',
                    }}
                  >
                    <img src={KakaoPayIcon} alt="KakaoPay Icon" />
                    <RadioTitle>카카오페이</RadioTitle>
                  </div>
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    value="naverpay"
                    checked={selectedPaymentMethod === 'naverpay'}
                    onChange={handlePaymentMethodChange}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '.5vw',
                      marginLeft: '.5vw',
                    }}
                  >
                    <img src={NaverPayIcon} alt="NaverPay Icon" />
                    <RadioTitle>네이버페이</RadioTitle>
                  </div>
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    value="phone"
                    checked={selectedPaymentMethod === 'phone'}
                    onChange={handlePaymentMethodChange}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '.5vw',
                      marginLeft: '.5vw',
                    }}
                  >
                    <img src={PhoneIcon} alt="Phone Icon" />
                    <RadioTitle>휴대폰결제</RadioTitle>
                  </div>
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    value="passbook"
                    checked={selectedPaymentMethod === 'passbook'}
                    onChange={handlePaymentMethodChange}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '.5vw',
                      marginLeft: '.5vw',
                    }}
                  >
                    <img src={PassbookIcon} alt="Passbook Icon" />
                    <RadioTitle> 무통장입금</RadioTitle>
                  </div>
                </label>
              </div>
            </div>
            <div
              style={{
                color: '#454545',
                fontWeight: '600',
                fontSize: '.8vw',
                fontFamily: 'Noto Sans KR',
                marginBottom: '1vw',
              }}
            >
              주문안내
            </div>
            <div style={{ color: '#767572' }}>
              · 장바구니에 담긴 상품은 최대 60일간 보관됩니다.(로그인 기준)
            </div>
            <div style={{ color: '#767572' }}>
              · 패키지/딜 종료 시 해당 상품은 자동 삭제됩니다.
            </div>
            <div style={{ color: '#767572' }}>
              · 상품을 장기간 보관하시려면 "좋아요"를 눌러주십시오.
            </div>
            <div style={{ color: '#767572' }}>
              · 장바구니에 최대 100개 상품을 담을 수 있습니다.
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: '정기배송 0',
      children: (
        <>
          {/* <CheckBoxContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.5vw',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={handleSelectAllChange}
            >
              <input
                type="checkbox"
                checked={isAllChecked}
                style={{
                  cursor: 'pointer',
                  width: '1.5vw',
                  height: '1.5vw',
                }}
              />
              <CheckBoxText>전체선택</CheckBoxText>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1vw',
              }}
            >
              <CheckBoxText>삭제</CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText>품절삭제</CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText>좋아요담기</CheckBoxText>
            </div>
          </CheckBoxContainer>
          <Line /> */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '15vh 0 22vh',
              gap: '1vh',
              borderBottom: '1px solid #e7e7e7',
            }}
          >
            <img src={ErrorIcon}></img>
            <p
              style={{
                fontFamily: 'Noto Sans KR',
                color: '#767572',
                fontWeight: '500',
                fontSize: '.9vw',
              }}
            >
              장바구니에 담긴 상품이 없습니다.
            </p>
          </div>
          <div
            style={{
              marginTop: '9vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                color: '#454545',
                fontWeight: '600',
                fontSize: '.8vw',
                fontFamily: 'Noto Sans KR',
                marginBottom: '1vw',
              }}
            >
              이용안내
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '.5vw',
                marginBottom: '17vh',
              }}
            >
              <div style={{ color: '#767572' }}>
                · 정기배송설정은 [정기배송 주기 변경]을 선택하여 변경
                가능합니다.
              </div>
              <div style={{ color: '#767572' }}>
                · 총 결제예상금액은 현재 가격으로 계산된 금액이며, 최종 결제
                금액은 자동결제 시점의 가격으로 계산됩니다.
              </div>
              <div style={{ color: '#aea7a2' }}>
                · 정기배송설정 변경 및 취소는 마이페이지&gt;편리한
                쇼핑&gt;정기배송 관리 메뉴에서 변경 가능합니다.
              </div>
              <div style={{ color: '#aea7a2' }}>
                · 카드 분실 및 한도초과, 통신 지연 등으로 최초 자동결제(배송일
                오전 8시)에 실패된 경우 해당 회차의 상품은 배송되지 않습니다.
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: '3',
      label: '선물하기 0',
      children: (
        <>
          {/* <CheckBoxContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.5vw',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={handleSelectAllChange}
            >
              <input
                type="checkbox"
                checked={isAllChecked}
                style={{
                  cursor: 'pointer',
                  width: '1.5vw',
                  height: '1.5vw',
                }}
              />
              <CheckBoxText>전체선택</CheckBoxText>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1vw',
              }}
            >
              <CheckBoxText>삭제</CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText>품절삭제</CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText>좋아요담기</CheckBoxText>
            </div>
          </CheckBoxContainer>
          <Line /> */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '15vh 0 22vh',
              gap: '1vh',
              borderBottom: '1px solid #e7e7e7',
            }}
          >
            <img src={ErrorIcon}></img>
            <p
              style={{
                fontFamily: 'Noto Sans KR',
                color: '#767572',
                fontWeight: '500',
                fontSize: '.9vw',
              }}
            >
              장바구니에 담긴 상품이 없습니다.
            </p>
          </div>
          <div
            style={{
              marginTop: '9vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                color: '#454545',
                fontWeight: '600',
                fontSize: '.8vw',
                fontFamily: 'Noto Sans KR',
                marginBottom: '1vw',
              }}
            >
              주문안내
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '.5vw',
                marginBottom: '17vh',
              }}
            >
              <div style={{ color: '#767572' }}>
                · 장바구니에 담긴 상품은 최대 60일간 보관됩니다.(로그인 기준)
              </div>
              <div style={{ color: '#767572' }}>
                · 패키지/딜 종료 시 해당 상품은 자동 삭제됩니다.
              </div>
              <div style={{ color: '#767572' }}>
                · 상품을 장기간 보관하시려면 "좋아요"를 눌러주십시오.
              </div>
              <div style={{ color: '#767572' }}>
                · 장바구니에 최대 100개 상품을 담을 수 있습니다.
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: '4',
      label: '명절선물 0',
      children: (
        <>
          {/* <CheckBoxContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.5vw',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={handleSelectAllChange}
            >
              <input
                type="checkbox"
                checked={isAllChecked}
                style={{
                  cursor: 'pointer',
                  width: '1.5vw',
                  height: '1.5vw',
                }}
              />
              <CheckBoxText>전체선택</CheckBoxText>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1vw',
              }}
            >
              <CheckBoxText>삭제</CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText>품절삭제</CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText>좋아요담기</CheckBoxText>
            </div>
          </CheckBoxContainer>
          <Line /> */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '15vh 0 22vh',
              gap: '1vh',
              borderBottom: '1px solid #e7e7e7',
            }}
          >
            <img src={ErrorIcon}></img>
            <p
              style={{
                fontFamily: 'Noto Sans KR',
                color: '#767572',
                fontWeight: '500',
                fontSize: '.9vw',
              }}
            >
              장바구니에 담긴 상품이 없습니다.
            </p>
          </div>
          <div
            style={{
              marginTop: '9vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                color: '#454545',
                fontWeight: '600',
                fontSize: '.8vw',
                fontFamily: 'Noto Sans KR',
                marginBottom: '1vw',
              }}
            >
              주문안내
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '.5vw',
                marginBottom: '17vh',
              }}
            >
              <div style={{ color: '#767572' }}>
                · 장바구니에 담긴 상품은 최대 60일간 보관됩니다.(로그인 기준)
              </div>
              <div style={{ color: '#767572' }}>
                · 패키지/딜 종료 시 해당 상품은 자동 삭제됩니다.
              </div>
              <div style={{ color: '#767572' }}>
                · 상품을 장기간 보관하시려면 "좋아요"를 눌러주십시오.
              </div>
              <div style={{ color: '#767572' }}>
                · 장바구니에 최대 100개 상품을 담을 수 있습니다.
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: '5',
      label: '브랜드직송 0',
      children: (
        <>
          {/* <CheckBoxContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.5vw',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={handleSelectAllChange}
            >
              <input
                type="checkbox"
                checked={isAllChecked}
                style={{
                  cursor: 'pointer',
                  width: '1.5vw',
                  height: '1.5vw',
                }}
              />
              <CheckBoxText>전체선택</CheckBoxText>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1vw',
              }}
            >
              <CheckBoxText>삭제</CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText>품절삭제</CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText>좋아요담기</CheckBoxText>
            </div>
          </CheckBoxContainer>
          <Line /> */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '15vh 0 22vh',
              gap: '1vh',
              borderBottom: '1px solid #e7e7e7',
            }}
          >
            <img src={ErrorIcon}></img>
            <p
              style={{
                fontFamily: 'Noto Sans KR',
                color: '#767572',
                fontWeight: '500',
                fontSize: '.9vw',
              }}
            >
              장바구니에 담긴 상품이 없습니다.
            </p>
          </div>
          <div
            style={{
              marginTop: '9vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                color: '#454545',
                fontWeight: '600',
                fontSize: '.8vw',
                fontFamily: 'Noto Sans KR',
                marginBottom: '1vw',
              }}
            >
              주문안내
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '.5vw',
                marginBottom: '17vh',
              }}
            >
              <div style={{ color: '#767572' }}>
                · 장바구니에 담긴 상품은 최대 60일간 보관됩니다.(로그인 기준)
              </div>
              <div style={{ color: '#767572' }}>
                · 패키지/딜 종료 시 해당 상품은 자동 삭제됩니다.
              </div>
              <div style={{ color: '#767572' }}>
                · 상품을 장기간 보관하시려면 "좋아요"를 눌러주십시오.
              </div>
              <div style={{ color: '#767572' }}>
                · 장바구니에 최대 100개 상품을 담을 수 있습니다.
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: '6',
      label: 'e슈퍼마켓 0',
      children: (
        <>
          {/* <CheckBoxContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.5vw',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={handleSelectAllChange}
            >
              <input
                type="checkbox"
                checked={isAllChecked}
                style={{
                  cursor: 'pointer',
                  width: '1.5vw',
                  height: '1.5vw',
                }}
              />
              <CheckBoxText>전체선택</CheckBoxText>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1vw',
              }}
            >
              <CheckBoxText>삭제</CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText>품절삭제</CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText>좋아요담기</CheckBoxText>
            </div>
          </CheckBoxContainer>
          <Line /> */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '15vh 0 22vh',
              gap: '1vh',
              borderBottom: '1px solid #e7e7e7',
            }}
          >
            <img src={ErrorIcon}></img>
            <p
              style={{
                fontFamily: 'Noto Sans KR',
                color: '#767572',
                fontWeight: '500',
                fontSize: '.9vw',
              }}
            >
              장바구니에 담긴 상품이 없습니다.
            </p>
          </div>
          <div
            style={{
              marginTop: '9vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                color: '#454545',
                fontWeight: '600',
                fontSize: '.8vw',
                fontFamily: 'Noto Sans KR',
                marginBottom: '1vw',
              }}
            >
              주문안내
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '.5vw',
                marginBottom: '17vh',
              }}
            >
              <div style={{ color: '#767572' }}>
                · 장바구니에 담긴 상품은 최대 60일간 보관됩니다.(로그인 기준)
              </div>
              <div style={{ color: '#767572' }}>
                · 패키지/딜 종료 시 해당 상품은 자동 삭제됩니다.
              </div>
              <div style={{ color: '#767572' }}>
                · 상품을 장기간 보관하시려면 "좋아요"를 눌러주십시오.
              </div>
              <div style={{ color: '#767572' }}>
                · 장바구니에 최대 100개 상품을 담을 수 있습니다.
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];

  const items1 = [
    {
      key: '1',
      label: `새벽배송 ${arrayData.length}`,
      children: (
        <div>
          {/* <CheckBoxContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.5vw',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={handleSelectAllChange}
            >
              <input
                type="checkbox"
                checked={isAllChecked}
                style={{
                  cursor: 'pointer',
                  width: '1.5vw',
                  height: '1.5vw',
                }}
              />
              <CheckBoxText>전체선택</CheckBoxText>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1vw',
              }}
            >
              <CheckBoxText onClick={handleDeleteCheckedItems}>
                삭제
              </CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText onClick={handleDeleteOutOfStockItems}>
                품절삭제
              </CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText>좋아요담기</CheckBoxText>
            </div>
          </CheckBoxContainer>
          <Line /> */}
          <ProductContainer onClick={toggleArrow}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '.3vw',
              }}
            >
              <DeliveryTitle>새벽배송</DeliveryTitle>
              <NumberText>{arrayData.length}</NumberText>
            </div>
            <img src={isArrowClicked ? ArrowUpIcon : ArrowDownIcon} />
          </ProductContainer>
          <div>
            {isArrowClicked ? (
              arrayData.map((item, index) => {
                return (
                  <>
                    <ItemContainer key={index}>
                      <Item1>
                        {getImageForItem(item, special)}
                        {/* {randomNumbers[index] !== 0 && (
                          <input
                            type="checkbox"
                            checked={checkedItems[index] || false}
                            onChange={() => handleCheckboxChange(index)}
                            style={{
                              cursor: 'pointer',
                              width: '1.3vw',
                              height: '1.3vw',
                            }}
                          ></input>
                        )} */}
                      </Item1>
                      <Item2>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '1vh',
                          }}
                        >
                          <CustomText
                            text={item}
                            fontFamily={'Noto Sans KR'}
                            fontSize={'1.3vw'}
                          />
                          {/* {randomNumbers[index] !== 0 && (
                            <div
                              style={{
                                color: '#ff6913',
                                fontFamily: 'Noto Sans KR',
                                fontSize: '.8vw',
                              }}
                            >
                              남은 수량 : {randomNumbers[index]}개
                            </div>
                          )} */}
                          {special && (
                            <div
                              style={{
                                color: '#ff6913',
                                fontFamily: 'Noto Sans KR',
                                fontSize: '.8vw',
                              }}
                            >
                              한정수량 100개!
                            </div>
                          )}
                          <div
                            style={{ display: 'flex', alignItems: 'flex-end' }}
                          >
                            {/* {randomNumbers[index] !== 0 && (
                              <div
                                key={index}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '1vw',
                                  marginRight: '1.5vw',
                                }}
                              >
                                <CustomButton
                                  text={'-'}
                                  onClick={() => handleDecrement(index)}
                                  backgroundColor="#ffffff"
                                  borderColor="#e7e7e7"
                                  width="2vw"
                                  height="2vw"
                                />
                                <CustomText text={values[index]} />
                                <CustomButton
                                  text={'+'}
                                  onClick={() => handleIncrement(index)}
                                  backgroundColor="#ffffff"
                                  borderColor="#e7e7e7"
                                  width="2vw"
                                  height="2vw"
                                />
                              </div>
                            )} */}

                            <div
                              style={{
                                fontFamily: 'Roboto',
                                fontWeight: '700',
                                fontSize: '1.3vw',
                              }}
                            >
                              {priceData[index]}
                            </div>
                            <div
                              style={{
                                fontFamily: 'Noto Sans KR',
                              }}
                            >
                              원
                            </div>
                          </div>
                        </div>
                      </Item2>
                      <Item3>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            height: '100%',
                          }}
                        >
                          {/* <div>
                            <img
                              src={CloseIcon}
                              alt="Close Icon"
                              style={{
                                cursor: 'pointer',
                                width: '24px',
                                height: '24px',
                              }}
                              // onClick={() => handleDeleteItem(index)}
                            />
                          </div> */}

                          {/* {randomNumbers[index] !== 0 && (
                            <div
                              style={{
                                marginBottom: '1vw',
                              }}
                            >
                              <CustomButton
                                text={'바로구매'}
                                color="#ff6913"
                                backgroundColor="#ffffff"
                                borderColor="#ff6913"
                                width="6vw"
                                height="6vh"
                                fontFamily={'Noto Sans KR'}
                                onClick={() => handleDirectClick(index)}
                              />
                            </div>
                          )} */}
                        </div>
                      </Item3>
                    </ItemContainer>
                  </>
                );
              })
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '15vh 0 22vh',
                  gap: '1vh',
                  borderBottom: '1px solid #e7e7e7',
                }}
              >
                <img src={ErrorIcon}></img>
                <p
                  style={{
                    fontFamily: 'Noto Sans KR',
                    color: '#767572',
                    fontWeight: '500',
                    fontSize: '.9vw',
                  }}
                >
                  장바구니에 담긴 상품이 없습니다.
                </p>
              </div>
            )}
          </div>
          {arrayData.length > 0 && (
            <div
              style={{
                width: '52vw',
                height: '15vh',
                borderBottom: '1px solid black',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '50%',
                  background: '#f8f8f8',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    marginLeft: '1vw',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginRight: '1vw',
                  }}
                >
                  <CustomText
                    text={'배송비3,500원(50,000원 이상 결제 시 무료)'}
                    color={'#767572'}
                  />
                  <CustomButton
                    text={'묶음배송 상품 보기 >'}
                    fontFamily={'Noto Sans KR'}
                    color="#767572"
                    borderColor="#dbd9d6"
                    backgroundColor="#f8f8f8"
                    borderRadius="100px"
                    width="10vw"
                    height="4vh"
                  ></CustomButton>
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginTop: '3vh',
              width: '52vw',
              gap: '1vw',
              paddingBottom: '3vh',
              borderBottom: '1px solid black',
            }}
          >
            <DeliveryTitle>결제수단 선택</DeliveryTitle>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '1vw',
                flexWrap: 'wrap',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  value="credit-card"
                  checked={selectedPaymentMethod === 'credit-card'}
                  onChange={handlePaymentMethodChange}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '.5vw',
                    marginLeft: '.5vw',
                  }}
                >
                  <img src={CreditCardIcon} alt="CreditCard Icon" />
                  <RadioTitle>신용카드</RadioTitle>
                </div>
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  value="payco"
                  checked={selectedPaymentMethod === 'payco'}
                  onChange={handlePaymentMethodChange}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '.5vw',
                    marginLeft: '.5vw',
                  }}
                >
                  <img src={PaycoIcon} alt="Payco Icon" />
                  <RadioTitle>PAYCO</RadioTitle>
                </div>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  value="kakaopay"
                  checked={selectedPaymentMethod === 'kakaopay'}
                  onChange={handlePaymentMethodChange}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '.5vw',
                    marginLeft: '.5vw',
                  }}
                >
                  <img src={KakaoPayIcon} alt="KakaoPay Icon" />
                  <RadioTitle>카카오페이</RadioTitle>
                </div>
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  value="naverpay"
                  checked={selectedPaymentMethod === 'naverpay'}
                  onChange={handlePaymentMethodChange}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '.5vw',
                    marginLeft: '.5vw',
                  }}
                >
                  <img src={NaverPayIcon} alt="NaverPay Icon" />
                  <RadioTitle>네이버페이</RadioTitle>
                </div>
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  value="phone"
                  checked={selectedPaymentMethod === 'phone'}
                  onChange={handlePaymentMethodChange}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '.5vw',
                    marginLeft: '.5vw',
                  }}
                >
                  <img src={PhoneIcon} alt="Phone Icon" />
                  <RadioTitle>휴대폰결제</RadioTitle>
                </div>
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  value="passbook"
                  checked={selectedPaymentMethod === 'passbook'}
                  onChange={handlePaymentMethodChange}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '.5vw',
                    marginLeft: '.5vw',
                  }}
                >
                  <img src={PassbookIcon} alt="Passbook Icon" />
                  <RadioTitle> 무통장입금</RadioTitle>
                </div>
              </label>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: '9vh',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '.5vw',
              marginBottom: '17vh',
            }}
          >
            <div
              style={{
                color: '#454545',
                fontWeight: '600',
                fontSize: '.8vw',
                fontFamily: 'Noto Sans KR',
                marginBottom: '1vw',
              }}
            >
              주문안내
            </div>
            <div style={{ color: '#767572' }}>
              · 장바구니에 담긴 상품은 최대 60일간 보관됩니다.(로그인 기준)
            </div>
            <div style={{ color: '#767572' }}>
              · 패키지/딜 종료 시 해당 상품은 자동 삭제됩니다.
            </div>
            <div style={{ color: '#767572' }}>
              · 상품을 장기간 보관하시려면 "좋아요"를 눌러주십시오.
            </div>
            <div style={{ color: '#767572' }}>
              · 장바구니에 최대 100개 상품을 담을 수 있습니다.
            </div>
          </div>
        </div>
      ),
    },

    {
      key: '2',
      label: '선물하기 0',
      children: (
        <>
          {/* <CheckBoxContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.5vw',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              // onClick={handleSelectAllChange}
            >
              <input
                type="checkbox"
                checked={isAllChecked}
                style={{
                  cursor: 'pointer',
                  width: '1.5vw',
                  height: '1.5vw',
                }}
              />
              <CheckBoxText>전체선택</CheckBoxText>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1vw',
              }}
            >
              <CheckBoxText>삭제</CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText>품절삭제</CheckBoxBar>
              <CheckBoxText>좋아요담기</CheckBoxText>
            </div>
          </CheckBoxContainer>
          <Line /> */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '15vh 0 22vh',
              gap: '1vh',
              borderBottom: '1px solid #e7e7e7',
            }}
          >
            <img src={ErrorIcon} alt="Error icon" />
            <p
              style={{
                fontFamily: 'Noto Sans KR',
                color: '#767572',
                fontWeight: '500',
                fontSize: '.9vw',
              }}
            >
              장바구니에 담긴 상품이 없습니다.
            </p>
          </div>
          <div
            style={{
              marginTop: '9vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                color: '#454545',
                fontWeight: '600',
                fontSize: '.8vw',
                fontFamily: 'Noto Sans KR',
                marginBottom: '1vw',
              }}
            >
              주문안내
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '.5vw',
                marginBottom: '17vh',
              }}
            >
              <div style={{ color: '#767572' }}>
                · 장바구니에 담긴 상품은 최대 60일간 보관됩니다.(로그인 기준)
              </div>
              <div style={{ color: '#767572' }}>
                · 패키지/딜 종료 시 해당 상품은 자동 삭제됩니다.
              </div>
              <div style={{ color: '#767572' }}>
                · 상품을 장기간 보관하시려면 "좋아요"를 눌러주십시오.
              </div>
              <div style={{ color: '#767572' }}>
                · 장바구니에 최대 100개 상품을 담을 수 있습니다.
              </div>
            </div>
          </div>
        </>
      ),
    },

    {
      key: '3',
      label: '브랜드직송 0',
      children: (
        <>
          {/* <CheckBoxContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.5vw',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={handleSelectAllChange}
            >
              <input
                type="checkbox"
                checked={isAllChecked}
                style={{
                  cursor: 'pointer',
                  width: '1.5vw',
                  height: '1.5vw',
                }}
              />
              <CheckBoxText>전체선택</CheckBoxText>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1vw',
              }}
            >
              <CheckBoxText>삭제</CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText>품절삭제</CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText>좋아요담기</CheckBoxText>
            </div>
          </CheckBoxContainer>
          <Line /> */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '15vh 0 22vh',
              gap: '1vh',
              borderBottom: '1px solid #e7e7e7',
            }}
          >
            <img src={ErrorIcon}></img>
            <p
              style={{
                fontFamily: 'Noto Sans KR',
                color: '#767572',
                fontWeight: '500',
                fontSize: '.9vw',
              }}
            >
              장바구니에 담긴 상품이 없습니다.
            </p>
          </div>
          <div
            style={{
              marginTop: '9vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                color: '#454545',
                fontWeight: '600',
                fontSize: '.8vw',
                fontFamily: 'Noto Sans KR',
                marginBottom: '1vw',
              }}
            >
              주문안내
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '.5vw',
                marginBottom: '17vh',
              }}
            >
              <div style={{ color: '#767572' }}>
                · 장바구니에 담긴 상품은 최대 60일간 보관됩니다.(로그인 기준)
              </div>
              <div style={{ color: '#767572' }}>
                · 패키지/딜 종료 시 해당 상품은 자동 삭제됩니다.
              </div>
              <div style={{ color: '#767572' }}>
                · 상품을 장기간 보관하시려면 "좋아요"를 눌러주십시오.
              </div>
              <div style={{ color: '#767572' }}>
                · 장바구니에 최대 100개 상품을 담을 수 있습니다.
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: '4',
      label: 'e슈퍼마켓 0',
      children: (
        <>
          {/* <CheckBoxContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.5vw',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={handleSelectAllChange}
            >
              <input
                type="checkbox"
                checked={isAllChecked}
                style={{
                  cursor: 'pointer',
                  width: '1.5vw',
                  height: '1.5vw',
                }}
              />
              <CheckBoxText>전체선택</CheckBoxText>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1vw',
              }}
            >
              <CheckBoxText>삭제</CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText>품절삭제</CheckBoxText>
              <CheckBoxBar>|</CheckBoxBar>
              <CheckBoxText>좋아요담기</CheckBoxText>
            </div>
          </CheckBoxContainer>
          <Line /> */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '15vh 0 22vh',
              gap: '1vh',
              borderBottom: '1px solid #e7e7e7',
            }}
          >
            <img src={ErrorIcon}></img>
            <p
              style={{
                fontFamily: 'Noto Sans KR',
                color: '#767572',
                fontWeight: '500',
                fontSize: '.9vw',
              }}
            >
              장바구니에 담긴 상품이 없습니다.
            </p>
          </div>
          <div
            style={{
              marginTop: '9vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                color: '#454545',
                fontWeight: '600',
                fontSize: '.8vw',
                fontFamily: 'Noto Sans KR',
                marginBottom: '1vw',
              }}
            >
              주문안내
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '.5vw',
                marginBottom: '17vh',
              }}
            >
              <div style={{ color: '#767572' }}>
                · 장바구니에 담긴 상품은 최대 60일간 보관됩니다.(로그인 기준)
              </div>
              <div style={{ color: '#767572' }}>
                · 패키지/딜 종료 시 해당 상품은 자동 삭제됩니다.
              </div>
              <div style={{ color: '#767572' }}>
                · 상품을 장기간 보관하시려면 "좋아요"를 눌러주십시오.
              </div>
              <div style={{ color: '#767572' }}>
                · 장바구니에 최대 100개 상품을 담을 수 있습니다.
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <HeaderContainer>
        <HeaderInner>
          <img
            src={Logo}
            alt="Hyundai icon"
            style={{ cursor: 'pointer' }}
            onClick={() =>
              (window.location.href =
                'https://tohome.thehyundai.com/front/dp/dpa/dawnHome.do')
            }
          ></img>
          <HeaderTextContainer>
            {accessToken ? (
              <>
                <HeaderText onClick={debouncedLogout}>로그아웃</HeaderText>
                <HeaderText>회원정보변경</HeaderText>
                <HeaderText
                  onClick={() => {
                    handleChangeUrl('/info');
                  }}
                >
                  마이페이지
                </HeaderText>
                <HeaderText
                  onClick={() =>
                    (window.location.href =
                      'https://tohome.thehyundai.com/front/dp/dpf/customerCenterMain.do')
                  }
                >
                  고객센터
                </HeaderText>
              </>
            ) : (
              <>
                <HeaderText
                  onClick={() => {
                    handleChangeUrl('/login');
                  }}
                >
                  로그인
                </HeaderText>
                <HeaderText
                  onClick={() => {
                    handleChangeUrl('/signup');
                  }}
                >
                  회원가입
                </HeaderText>
                <HeaderText>마이페이지</HeaderText>
                <HeaderText
                  onClick={() =>
                    (window.location.href =
                      'https://tohome.thehyundai.com/front/dp/dpf/customerCenterMain.do')
                  }
                >
                  고객센터
                </HeaderText>
              </>
            )}
          </HeaderTextContainer>
        </HeaderInner>
      </HeaderContainer>
      <ContentContainer>
        <HeaderTitle>결제</HeaderTitle>
        <div style={{ marginTop: '5vh', display: 'flex' }}>
          {accessToken ? (
            <>
              <StyledTabs items={items} defaultActiveKey="1" />
              <div style={{ marginLeft: '5vw' }}>
                <div
                  style={{
                    width: '22vw',
                    height: '38vh',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#ffffff',
                    border: '1px solid #ff6913',
                    position: 'sticky',
                    top: '0',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <SideInner>총 상품금액</SideInner>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1.5vw',
                        marginTop: '1.5vw',
                      }}
                    >
                      {/* <div>{totalPrice}</div> */}
                      {totalPrice}
                      <div>원</div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <SideInner>총 할인금액</SideInner>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1.5vw',
                        marginTop: '1.5vw',
                      }}
                    >
                      {/* <div>{totalPrice * discount * 0.01}</div> */}
                      {discountPrice}
                      <div>원</div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <SideInner>총 배송비</SideInner>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1.5vw',
                        marginTop: '1.5vw',
                      }}
                    >
                      {shippingPrice}
                      <div>원</div>
                    </div>
                  </div>
                  <div style={{ borderBottom: '1px solid #e7e7e7' }}>
                    <div
                      style={{
                        marginBottom: '1vw',
                        color: '#767572',
                        fontFamily: 'Noto Sans KR',
                        fontSize: '.7vw',
                        textAlign: 'center',
                        marginTop: '1.5vw',
                      }}
                    >
                      주문 결제 시 배송지에 따라 배송비가 상이할 수 있습니다.
                    </div>
                  </div>
                  <div
                    style={{
                      height: '25%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}
                      >
                        <div style={{ marginLeft: '1.5vw', color: '#ff6913' }}>
                          총 결제예상금액
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            marginRight: '1.5vw',
                          }}
                        >
                          <div
                            style={{
                              color: '#ff6913',
                            }}
                          >
                            {totalDiscountPrice}
                          </div>
                          <div
                            style={{
                              color: '#ff6913',
                            }}
                          >
                            원
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexGrow: 1,
                    }}
                  >
                    <CustomButton
                      text={'결제하기'}
                      color="#ffffff"
                      width="100%"
                      height={'10vh'}
                      backgroundColor="#ff6913"
                      borderColor="#ff6913"
                      fontFamily="Noto Sans KR"
                      fontSize={'1.2rem'}
                      fontWeight="600"
                      onClick={() => showLoader()}
                    />
                    <StyledSpin
                      spinning={spinning}
                      percent={percent}
                      tip={'결제중입니다!'}
                      fullscreen
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <StyledTabs1 items={items1} defaultActiveKey="1" />

              <div style={{ marginLeft: '5vw' }}>
                <div
                  style={{
                    width: '22vw',
                    height: '38vh',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#ffffff',
                    border: '1px solid #ff6913',
                    position: 'sticky',
                    top: '0',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <SideInner>총 상품금액</SideInner>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1.5vw',
                        marginTop: '1.5vw',
                      }}
                    >
                      {/* <div>{totalPrice}</div> */}
                      {totalPrice}
                      <div>원</div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <SideInner>총 할인금액</SideInner>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1.5vw',
                        marginTop: '1.5vw',
                      }}
                    >
                      {/* <div>{totalPrice * discount * 0.01}</div> */}
                      {discountPrice}
                      <div>원</div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <SideInner>총 배송비</SideInner>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1.5vw',
                        marginTop: '1.5vw',
                      }}
                    >
                      {shippingPrice}
                      <div>원</div>
                    </div>
                  </div>
                  <div style={{ borderBottom: '1px solid #e7e7e7' }}>
                    <div
                      style={{
                        marginBottom: '1vw',
                        color: '#767572',
                        fontFamily: 'Noto Sans KR',
                        fontSize: '.7vw',
                        textAlign: 'center',
                        marginTop: '1.5vw',
                      }}
                    >
                      주문 결제 시 배송지에 따라 배송비가 상이할 수 있습니다.
                    </div>
                  </div>
                  <div
                    style={{
                      height: '25%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}
                      >
                        <div style={{ marginLeft: '1.5vw', color: '#ff6913' }}>
                          총 결제예상금액
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            marginRight: '1.5vw',
                          }}
                        >
                          <div
                            style={{
                              color: '#ff6913',
                            }}
                          >
                            {/* {discountedPrice} */}
                            {totalDiscountPrice}
                          </div>
                          <div
                            style={{
                              color: '#ff6913',
                            }}
                          >
                            원
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexGrow: 1,
                    }}
                  >
                    <CustomButton
                      text={'결제하기'}
                      color="#ffffff"
                      width="100%"
                      height={'10vh'}
                      backgroundColor="#ff6913"
                      borderColor="#ff6913"
                      fontFamily="Noto Sans KR"
                      fontSize={'1vw'}
                      fontWeight="600"
                      onClick={() => showLoader()}
                    />
                    <StyledSpin
                      spinning={spinning}
                      percent={percent}
                      tip={'결제중입니다!'}
                      fullscreen
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </ContentContainer>
    </>
  );
};
export default Order;
