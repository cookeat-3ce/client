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
  RED: '#FF0000',
  LIGHTORANGE: '#FFE7E2',
  STROKE: '#CECECE',
  SUCCESS: '#79DEB4',
  SALES: '#FFD800',
  LIGHTBLUE: '#4A5568',
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
  1: '한식',
  2: '일식',
  3: '양식',
  4: '중식',
  5: '건강',
  6: '간편',
  7: '단짠',
  8: '매운',
  9: '비건',
  10: '야식',
  11: '브런치',
  12: '간식',
  13: '초보',
  14: '가벼운',
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
