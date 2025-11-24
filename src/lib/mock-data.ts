import { Token, TokenStatus } from '@/types/token';

const TOKEN_NAMES = [
  'Moonshot', 'RocketFi', 'SafeMoon', 'DogeCoin', 'ShibaInu',
  'PepeCoin', 'FlokiInu', 'BabyDoge', 'ElonMars', 'MoonDoge',
  'SafeEarth', 'CumRocket', 'BonkToken', 'SaitaInu', 'KishuInu',
  'AkitaInu', 'HokkaInu', 'SamoyedCoin', 'CateCoin', 'DogeKing'
];

const SYMBOLS = [
  'MOON', 'ROCK', 'SAFE', 'DOGE', 'SHIB',
  'PEPE', 'FLOKI', 'BABY', 'ELON', 'MDOGE',
  'EARTH', 'CUMMIES', 'BONK', 'SAIT', 'KISHU',
  'AKITA', 'HOKK', 'SAMO', 'CATE', 'KING'
];

/**
 * Generate random number within range
 */
function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generate random integer within range
 */
function randomIntInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate random token address
 */
function generateAddress(): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let address = '';
  for (let i = 0; i < 44; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return address;
}

/**
 * Generate mock token data
 */
export function generateMockToken(id: string, status: TokenStatus): Token {
  const nameIndex = Math.floor(Math.random() * TOKEN_NAMES.length);
  const price = status === 'new' 
    ? randomInRange(0.000001, 0.01)
    : status === 'final-stretch'
    ? randomInRange(0.01, 1)
    : randomInRange(1, 100);

  const marketCap = status === 'new'
    ? randomInRange(10000, 500000)
    : status === 'final-stretch'
    ? randomInRange(500000, 5000000)
    : randomInRange(5000000, 100000000);

  const age = status === 'new'
    ? randomIntInRange(1, 60)
    : status === 'final-stretch'
    ? randomIntInRange(60, 480)
    : randomIntInRange(480, 10080);

  return {
    id,
    name: TOKEN_NAMES[nameIndex],
    symbol: SYMBOLS[nameIndex],
    address: generateAddress(),
    price,
    priceChange24h: randomInRange(-50, 200),
    marketCap,
    volume24h: marketCap * randomInRange(0.1, 2),
    liquidity: marketCap * randomInRange(0.05, 0.3),
    holders: randomIntInRange(100, 50000),
    age,
    status,
    logoUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${id}`,
    createdAt: new Date(Date.now() - age * 60 * 1000),
    lastUpdated: new Date(),
  };
}

/**
 * Generate array of mock tokens
 */
export function generateMockTokens(count: number, status: TokenStatus): Token[] {
  return Array.from({ length: count }, (_, i) => 
    generateMockToken(`${status}-${i}`, status)
  );
}

/**
 * Generate mock price update
 */
export function generatePriceUpdate(token: Token): Token {
  const priceChangePercent = randomInRange(-5, 5);
  const newPrice = token.price * (1 + priceChangePercent / 100);
  const volumeChange = randomInRange(-10, 10);
  
  return {
    ...token,
    price: newPrice,
    priceChange24h: token.priceChange24h + randomInRange(-2, 2),
    volume24h: token.volume24h * (1 + volumeChange / 100),
    marketCap: token.marketCap * (1 + priceChangePercent / 100),
    lastUpdated: new Date(),
  };
}
