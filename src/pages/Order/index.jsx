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
  ProductContainer,
  DeliveryTitle,
  NumberText,
  ItemContainer,
  StyledTabs1,
  Item1,
  Item2,
  Item3,
  SideInner,
} from './styles';
import { message } from 'antd';
import Logo from '../../assets/icons/hyundai_logo.png';
import { getCookie, useCustomNavigate } from '../../hooks';
import { useMutation } from '@tanstack/react-query';
import { memberAPI } from '../../apis/member';
import { debounce } from 'lodash';
import { useResetRecoilState } from 'recoil';
import { deleteAllCookies } from '../../hooks';
import ArrowUpIcon from '../../assets/icons/arrow_up.svg';
import ArrowDownIcon from '../../assets/icons/arrow_down.svg';
import ErrorIcon from '../../assets/icons/error.svg';
import CloseIcon from '../../assets/icons/close.svg';
import { memberState } from '../../store';
import CustomButton from '../../components/Button';
import CustomText from '../../components/Text';

const Order = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const resetMemberState = useResetRecoilState(memberState);
  const urlParams = new URLSearchParams(window.location.search);
  const data = urlParams.get('data');
  const decodedData = decodeURIComponent(data);
  const [checked, setChecked] = useState(true);
  const [isArrowClicked, setIsArrowClicked] = useState(true);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [randomPrice, setRandomPrice] = useState([]);
  const [isChecked, setIsChecked] = useState(true);

  const handleIncrement = (index) => {
    setValues((prevValues) =>
      prevValues.map((value, i) =>
        i === index && randomNumbers[i] !== 0 && value < randomNumbers[i]
          ? value + 1
          : value,
      ),
    );
  };

  const handleDecrement = (index) => {
    setValues((prevValues) =>
      prevValues.map((value, i) =>
        i === index && randomNumbers[i] !== 0 && value > 1 ? value - 1 : value,
      ),
    );
  };

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

  const debouncedLogout = useCallback(
    debounce(() => {
      mutation.mutate();
    }, 300),
    [],
  );

  let initialArrayData = [];

  if (
    decodedData !== null &&
    (decodedData.includes(' ') ||
      decodedData.startsWith('[') ||
      decodedData.startsWith('{'))
  ) {
    try {
      initialArrayData = JSON.parse(decodedData);
    } catch (error) {
      initialArrayData = [decodedData];
    }
  } else initialArrayData = [decodedData];

  const [arrayData, setArrayData] = useState(initialArrayData);

  const [checkedItems, setCheckedItems] = useState(() =>
    randomNumbers.map((num) => num !== 0),
  );
  const isAllChecked = useMemo(() => {
    return checkedItems.every((checked, index) => {
      return randomNumbers[index] === 0 || checked;
    });
  }, [checkedItems, randomNumbers]);

  useEffect(() => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.map((_, index) =>
        randomNumbers[index] === 0 ? false : true,
      ),
    );
  }, [randomNumbers]);

  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) => {
      const newCheckedItems = [...prev];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  const handleSelectAllChange = () => {
    const shouldCheck = !checked;
    const updatedCheckedItems = arrayData.map((item, index) => {
      if (randomNumbers[index] !== 0) {
        return shouldCheck;
      }
      return checkedItems[index];
    });

    setCheckedItems(updatedCheckedItems);
    setChecked(shouldCheck);
  };
  const getRandomNumber = () => Math.floor(Math.random() * 11);
  const [values, setValues] = useState(randomNumbers.map(() => 1));
  useEffect(() => {
    setValues(randomNumbers.map(() => 1));
  }, [randomNumbers]);
  const getProductPriceRandom = () => Math.floor(Math.random() * 10000) + 1;

  useEffect(() => {
    if (arrayData.length > 0) {
      const newRandomNumbers = arrayData.map(() => getRandomNumber());
      setRandomNumbers(newRandomNumbers);
      const newPrice = arrayData.map(() => getProductPriceRandom());
      setRandomPrice(newPrice);
    }
  }, [arrayData]);

  const handleDeleteCheckedItems = () => {
    const filteredData = arrayData.filter(
      (_, index) => !checkedItems[index] && randomNumbers[index] !== 0,
    );
    const filteredRandomNumbers = randomNumbers.filter(
      (_, index) => !checkedItems[index] && randomNumbers[index] !== 0,
    );

    setArrayData(filteredData);
    setCheckedItems(new Array(filteredData.length).fill(true));
    setRandomNumbers(filteredRandomNumbers);

    const encodedData = encodeURIComponent(JSON.stringify(filteredData));
    handleChangeUrl(`/order?data=${encodedData}`);
  };

  const handleDeleteItem = (index) => {
    if (randomNumbers[index] === 0) return;

    const updatedData = arrayData.filter((_, i) => i !== index);
    const updatedRandomNumbers = randomNumbers.filter((_, i) => i !== index);
    const updatedCheckedItems = checkedItems.filter((_, i) => i !== index);

    setArrayData(updatedData);
    setRandomNumbers(updatedRandomNumbers);
    setCheckedItems(updatedCheckedItems);

    const encodedData = encodeURIComponent(JSON.stringify(updatedData));
    handleChangeUrl(`/order?data=${encodedData}`);
  };

  const handleDeleteOutOfStockItems = () => {
    const filteredData = arrayData.filter(
      (_, index) => randomNumbers[index] !== 0,
    );
    const filteredRandomNumbers = randomNumbers.filter(
      (number) => number !== 0,
    );

    setArrayData(filteredData);
    setRandomNumbers(filteredRandomNumbers);
    setCheckedItems(new Array(filteredData.length).fill(true));

    const encodedData = encodeURIComponent(JSON.stringify(filteredData));
    handleChangeUrl(`/order?data=${encodedData}`);
  };

  const getTotal = (field) => {
    return arrayData.reduce((total, item, index) => {
      if (checkedItems[index] && randomNumbers[index] !== 0) {
        return total + randomPrice[index] * values[index];
      }
      return total;
    }, 0);
  };

  useEffect(() => {
    setCheckedItems(arrayData.map((_, index) => randomNumbers[index] !== 0));
  }, [arrayData, randomNumbers]);

  const totalPrice = getTotal('price');

  const [shippingPrice, setShippingPrice] = useState(3500);
  useEffect(() => {
    const allFalse = checkedItems.every((item) => !item);

    if (allFalse) {
      setShippingPrice(0);
    } else {
      if (totalPrice > 50000) setShippingPrice(0);
      else setShippingPrice(3500);
    }
  }, [checkedItems, totalPrice]);

  let totalExpectedPayment =
    totalPrice < 50000
      ? Number(totalPrice) + shippingPrice
      : Number(totalPrice);

  useEffect(() => {
    const allUnchecked = checkedItems.every((item) => !item);

    setIsChecked(!allUnchecked);
  }, [checkedItems]);

  const items = [
    {
      key: '1',
      label: `새벽배송 ${arrayData.length}`,
      children: (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <CheckBoxContainer>
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
          <Line />
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
                        {randomNumbers[index] !== 0 && (
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
                        )}
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
                            fontFamily={'NotoSansKR'}
                            fontSize={'1.3vw'}
                          />
                          {randomNumbers[index] !== 0 && (
                            <div
                              style={{
                                color: '#ff6913',
                                fontFamily: 'NotoSansKR',
                                fontSize: '.8vw',
                              }}
                            >
                              남은 수량 : {randomNumbers[index]}개
                            </div>
                          )}
                          <div
                            style={{ display: 'flex', alignItems: 'flex-end' }}
                          >
                            {randomNumbers[index] !== 0 && (
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
                            )}
                            <div
                              style={{
                                fontFamily: 'Roboto',
                                fontWeight: '700',
                                fontSize: '1.3vw',
                              }}
                            >
                              {randomPrice[index] * values[index]}
                            </div>
                            <div
                              style={{
                                fontFamily: 'NotoSansKR',
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
                          <div>
                            <img
                              src={CloseIcon}
                              alt="Close Icon"
                              style={{
                                cursor: 'pointer',
                                width: '24px',
                                height: '24px',
                              }}
                              onClick={() => handleDeleteItem(index)}
                            />
                          </div>

                          {randomNumbers[index] !== 0 && (
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
                                fontFamily={'NotoSansKR'}
                              />
                            </div>
                          )}
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
                    fontFamily: 'NotoSansKR',
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
                    fontFamily={'NotoSansKR'}
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
                color: '#454545',
                fontWeight: '600',
                fontSize: '.8vw',
                fontFamily: 'NotoSansKR',
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
          <CheckBoxContainer>
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
          <Line />
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
                fontFamily: 'NotoSansKR',
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
                fontFamily: 'NotoSansKR',
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
          <CheckBoxContainer>
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
          <Line />
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
                fontFamily: 'NotoSansKR',
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
                fontFamily: 'NotoSansKR',
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
          <CheckBoxContainer>
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
          <Line />
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
                fontFamily: 'NotoSansKR',
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
                fontFamily: 'NotoSansKR',
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
          <CheckBoxContainer>
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
          <Line />
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
                fontFamily: 'NotoSansKR',
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
                fontFamily: 'NotoSansKR',
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
          <CheckBoxContainer>
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
          <Line />
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
                fontFamily: 'NotoSansKR',
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
                fontFamily: 'NotoSansKR',
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
          <CheckBoxContainer>
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
          <Line />
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
                        {randomNumbers[index] !== 0 && (
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
                        )}
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
                            fontFamily={'NotoSansKR'}
                            fontSize={'1.3vw'}
                          />
                          {randomNumbers[index] !== 0 && (
                            <div
                              style={{
                                color: '#ff6913',
                                fontFamily: 'NotoSansKR',
                                fontSize: '.8vw',
                              }}
                            >
                              남은 수량 : {randomNumbers[index]}개
                            </div>
                          )}
                          <div
                            style={{ display: 'flex', alignItems: 'flex-end' }}
                          >
                            {randomNumbers[index] !== 0 && (
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
                            )}
                            <div
                              style={{
                                fontFamily: 'Roboto',
                                fontWeight: '700',
                                fontSize: '1.3vw',
                              }}
                            >
                              {randomPrice[index] * values[index]}
                            </div>
                            <div
                              style={{
                                fontFamily: 'NotoSansKR',
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
                          <div>
                            <img
                              src={CloseIcon}
                              alt="Close Icon"
                              style={{
                                cursor: 'pointer',
                                width: '24px',
                                height: '24px',
                              }}
                              onClick={() => handleDeleteItem(index)}
                            />
                          </div>

                          {randomNumbers[index] !== 0 && (
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
                                fontFamily={'NotoSansKR'}
                              />
                            </div>
                          )}
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
                    fontFamily: 'NotoSansKR',
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
                    fontFamily={'NotoSansKR'}
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
                color: '#454545',
                fontWeight: '600',
                fontSize: '.8vw',
                fontFamily: 'NotoSansKR',
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
          <CheckBoxContainer>
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
          <Line />
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
                fontFamily: 'NotoSansKR',
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
                fontFamily: 'NotoSansKR',
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
          <CheckBoxContainer>
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
          <Line />
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
                fontFamily: 'NotoSansKR',
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
                fontFamily: 'NotoSansKR',
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
          <CheckBoxContainer>
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
          <Line />
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
                fontFamily: 'NotoSansKR',
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
                fontFamily: 'NotoSansKR',
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
        <HeaderTitle>장바구니</HeaderTitle>
        <div style={{ marginTop: '5vh', display: 'flex' }}>
          {accessToken ? (
            <>
              <StyledTabs items={items} defaultActiveKey="1" />
              <div style={{ marginLeft: '5vw' }}>
                <div
                  style={{
                    width: '22vw',
                    height: '45vh',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#ffffff',
                    border: '1px solid #ff6913',
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
                      <div>{totalPrice}</div>
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
                      <div>0</div>
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
                        fontFamily: 'NotoSansKR',
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
                            {totalExpectedPayment}
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
                      text={'주문하기'}
                      color="#ffffff"
                      width="100%"
                      backgroundColor="#ff6913"
                      borderColor="#ff6913"
                      fontFamily="NotoSansKR"
                      fontSize={'1vw'}
                      fontWeight="600"
                      onClick={() => {
                        if (isChecked) {
                          message.success(
                            `${totalExpectedPayment}원 결제 되었습니다!`,
                            3,
                          );
                          setTimeout(() => {
                            window.close();
                          }, 2000);
                        } else {
                          message.warning('결제할 상품을 선택해주세요!', 3);
                        }
                      }}
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
                    height: '45vh',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#ffffff',
                    border: '1px solid #ff6913',
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
                      <div>{totalPrice}</div>
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
                      <div>0</div>
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
                        fontFamily: 'NotoSansKR',
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
                            {totalExpectedPayment}
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
                      text={'주문하기'}
                      color="#ffffff"
                      width="100%"
                      backgroundColor="#ff6913"
                      borderColor="#ff6913"
                      fontFamily="NotoSansKR"
                      fontSize={'1vw'}
                      fontWeight="600"
                      onClick={() => {
                        if (isChecked) {
                          message.success(
                            `${totalExpectedPayment}원 결제 되었습니다!`,
                            3,
                          );
                          setTimeout(() => {
                            window.close();
                          }, 2000);
                        } else {
                          message.warning('결제할 상품을 선택해주세요!', 3);
                        }
                      }}
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
