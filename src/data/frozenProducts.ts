export interface FrozenProduct {
  id: string;
  name: string;
  category: '芋圓系列' | '冰淇淋系列' | '杏仁茶系列';
  spec: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  featured?: boolean;
}

export const frozenProducts: FrozenProduct[] = [
  // 芋圓系列
  {
    id: 'taro-balls',
    name: '阿爸冷凍生芋圓',
    category: '芋圓系列',
    spec: 'HB300g',
    price: 135,
    image: '/images/handmade-taro.jpg',
    description: '100% 新鮮芋頭手工製作，Q彈有嚼勁',
    featured: true,
  },
  {
    id: 'white-balls',
    name: '阿爸冷凍生白玉',
    category: '芋圓系列',
    spec: 'HB350g',
    price: 135,
    image: '/images/fresh-taro.jpg',
    description: '地瓜粉手工製作，口感軟Q',
  },
  {
    id: 'peanut-milk-ice',
    name: '花生牛奶冰淇杯',
    category: '芋圓系列',
    spec: 'HB350g',
    price: 235,
    image: '/images/product-taro-bags.jpg',
    description: '濃郁花生香氣，綿密口感',
  },
  // 冰淇淋系列
  {
    id: 'peanut-icecream',
    name: '花生冰淇淋杯裝',
    category: '冰淇淋系列',
    spec: '380ml',
    price: 235,
    image: '/images/icecream-cup.png',
    description: '自家研磨花生，香濃滑順',
    featured: true,
  },
  {
    id: 'sesame-icecream',
    name: '芝麻冰淇淋杯裝',
    category: '冰淇淋系列',
    spec: '380ml',
    price: 235,
    image: '/images/icecream-cup.png',
    description: '純黑芝麻研磨，營養健康',
    featured: true,
  },
  {
    id: 'strawberry-icecream',
    name: '草莓牛奶冰淇淋杯裝',
    category: '冰淇淋系列',
    spec: '380ml',
    price: 280,
    image: '/images/taro-icecream.jpg',
    description: '新鮮草莓混合鮮奶，酸甜滋味',
    featured: true,
  },
  // 杏仁茶系列
  {
    id: 'almond-tea-300',
    name: '就愛杏仁',
    category: '杏仁茶系列',
    spec: '300ml 冷藏瓶',
    price: 65,
    image: '/images/product-almond-tea.jpg',
    description: '每日現磨杏仁，香濃順口',
  },
  {
    id: 'almond-tea-1000',
    name: '就愛杏仁 家庭號',
    category: '杏仁茶系列',
    spec: '1000ml 冷藏瓶',
    price: 180,
    image: '/images/product-almond-tea.jpg',
    description: '家庭號大容量，全家共享',
    featured: false,
  },
];
