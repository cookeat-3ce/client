import React, { useEffect, useState } from 'react';
import {
  Container,
  TabsContainer,
  StyledTabs,
  Inner,
  SortInner,
  ContentInner,
  TagImage,
} from './styles';
import { debounce } from 'lodash';
import CustomTextButton from '../../components/Button/Text';
import { COLORS, TAG_VALUES } from '../../constants';
import { CustomSearchInput } from '../../components/Input';
import CustomText from '../../components/Text';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState('1');
  const [isSort, setIsSort] = useState('recent');
  const [isTag, setIsTag] = useState([]);
  const [loadingSskcookRecent, setLoadingSskcookRecent] = useState(true);
  const [loadingSskcookLike, setLoadingSskcookLike] = useState(true);
  const [loadingMember, setLoadingMember] = useState(true);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      triggerSearch(searchValue, activeTab, isSort);
    }
  };

  const triggerSearch = (value, tab, sort) => {
    console.log('Search triggered:', { value, tab, sort });

    if (tab === '1') {
      if (sort === 'recent') {
      } else if (sort === 'like') {
      }
    } else if (tab === '2') {
      if (searchValue.length === 0) {
        setIsTag([]);
      } else {
        const matchingTags = TAG_VALUES.filter((tag) =>
          tag.includes(searchValue),
        );
        setIsTag(matchingTags);
      }
    } else if (tab === '3') {
    }
  };

  const debouncedSearch = debounce(triggerSearch, 300);

  useEffect(() => {
    if (searchValue) {
      debouncedSearch(searchValue, activeTab, isSort);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [activeTab, isSort]);

  const handleSortChange = (sortType) => {
    setIsSort(sortType);
    triggerSearch(searchValue, activeTab, sortType);
  };

  const onChangeTabs = (key) => {
    setActiveTab(key);
    triggerSearch(searchValue, key, isSort);
  };

  const items = [
    {
      key: '1',
      label: '슥쿡',
      children: (
        <Inner>
          <SortInner>
            <CustomTextButton
              text={'최신순'}
              onClick={() => handleSortChange('recent')}
              style={{
                fontFamily: 'Happiness-Sans-Regular',
                color:
                  isSort === 'recent' ? `${COLORS.BLACK}` : `${COLORS.TAG}`,
              }}
              fontSize={'1vw'}
            />
            <CustomTextButton
              text={'인기순'}
              onClick={() => handleSortChange('like')}
              style={{
                fontFamily: 'Happiness-Sans-Regular',
                color: isSort === 'like' ? `${COLORS.BLACK}` : `${COLORS.TAG}`,
              }}
              fontSize={'1vw'}
            />
          </SortInner>
        </Inner>
      ),
    },
    {
      key: '2',
      label: '태그',
      children: (
        <Inner>
          <ContentInner>
            {isTag.length > 0 ? (
              isTag.map((item, index) => (
                <React.Fragment key={index}>
                  <div
                    style={{
                      display: 'flex',
                      gap: '3vw',
                    }}
                  >
                    <div
                      style={{
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '1vw',
                      }}
                      onClick={() =>
                        (window.location.href = `/sskcook?tag=${item}`)
                      }
                    >
                      <TagImage>
                        <CustomText
                          text={'#'}
                          fontFamily={'Happiness-Sans-Bold'}
                          color={COLORS.BLACK}
                          fontSize={'1.5vw'}
                        />
                      </TagImage>
                      <CustomText
                        text={item}
                        fontFamily={'Happiness-Sans-Regular'}
                        color={COLORS.BLACK}
                        fontSize={'1.5vw'}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))
            ) : (
              <CustomText
                text={'검색 결과가 없어요!'}
                fontFamily={'Happiness-Sans-Bold'}
                color={COLORS.DARKGRAPEFRUIT}
                fontSize={'1vw'}
              />
            )}
          </ContentInner>
        </Inner>
      ),
    },
    {
      key: '3',
      label: '크리에이터',
      children: <Inner>Content of Tab Pane 3</Inner>,
    },
  ];

  return (
    <Container>
      <CustomSearchInput
        text={'슥쿡 / 태그 / 크리에이터 검색'}
        fontSize={'1.1vw'}
        width={'40vw'}
        height={'6vh'}
        type={'text'}
        onChange={handleChange}
        value={searchValue}
        onKeyDown={handleKeyDown}
      />
      <TabsContainer>
        <StyledTabs
          defaultActiveKey="1"
          items={items}
          onChange={onChangeTabs}
        />
      </TabsContainer>
    </Container>
  );
};

export default Search;
