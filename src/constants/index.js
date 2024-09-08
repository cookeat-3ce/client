export const COLORS = {
  NAVY: '#012140',
  YELLOW: '#FFEA75',
  GREEN: '#79DEB4',
  ORANGE: '#FF785B',
  SKYBLUE: '#E7FAFE',
  TAG: '#D9D9D9',
  WHITE: '#FFFFFF',
  GRAY: '#585858',
  BLACK: '#000000',
  LIGHTGRAY: '#ADADAD',
  GRAPEFRUIT: 'rgba(255, 89, 53, 0.4)',
  DARKGRAPEFRUIT: '#FF785B',
  STROKE: '#CECECE',
  SUCCESS: '#79DEB4',
  SALES: '#FFD800',
  한식: '#C93A40',
  일식: '#2E3A59',
  양식: '#4A7A8C',
  중식: '#D9434E',
  건강: '#7BB661',
  간편: '#A2A3A5',
  단짠: '#F5C04E',
  매운: '#E84A27',
  비건: '#609F60',
  야식: '#373B41',
  브런치: '#E2C58D',
  간식: '#F6A532',
  초보: '#7FBCD2',
  가벼운: '#F2D0A9',
};

export const TAGS = {
  KOREAN_FOOD: '한식',
  JAPANESE_FOOD: '일식',
  WESTERN_FOOD: '양식',
  CHINESE_FOOD: '중식',
  HEALTH: '건강',
  EASY: '간편',
  SWEET_AND_SALTY: '단짠',
  ACRID: '매운',
  VEGAN: '비건',
  LATE_NIGHT_SNACK: '야식',
  BRUNCH: '브런치',
  SNACK: '간식',
  RUDIMENTS: '초보',
  LIGHT: '가벼운',
};

export const INGREDIENTS = {
  계란: '5000',
  감자: '3000',
  당근: '2000',
  콩나물: '2500',
  소고기: '10000',
  닭고기: '10000',
};

export const TAG_VALUES = Object.values(TAGS);

export const TAG_COLOR_MAPPING = Object.fromEntries(
  Object.entries(TAGS).map(([key, tagValue]) => [tagValue, COLORS[tagValue]]),
);
