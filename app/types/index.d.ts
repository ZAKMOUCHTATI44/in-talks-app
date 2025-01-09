interface AuthUser {
  name: string;
  email: string;
  id: string;
}

interface Country {
  value: string;
  data: {
    a2: string;
    a3: string;
    tld: string;
    label: string;
  };
}

interface Insights {
  id: string;
  network: string;
  subscribers: string;
  score: string;
  growth: string;
}

interface Post {
  id: string;
  mediaUrl: string;
  thumbnailUrl: string;
  date: string;
  username: string;
  caption: string;
  network: string;
  pictureUrl: string;
  commentCountRaw: number | null;
  viewCountRaw: number | null;
  shareCountRaw: number | null;
  engagementCountRaw: number | null;
  engagementRateRaw: number | null;
  likeCountRaw: number | null;
}

interface SocialAccounts {
  id: string;
  name: string;
  network: string;
  handle: string;
  bio: string;
  verified: boolean;
  subscribers: number;
  score: string;
  growth_rate: number;
  engagement_rate: number;
}

interface Category {
  name: string;
  slug: string;
  id: string;
}

interface Network {
  id: string;
  network: string;
  name: string;
  username: string;
  pictureUrl: string;
  bio: string;
  followers: number;
  score: number;
  verified: true;
}

interface Account {
  id: string;
  pictureUrl: string;
  name: string;
  title: string;
  description: string;
  country: string;
  countryCode: string;
  city: string;
  topPost: string[];
  networks: Network[];
  categories: Category[];
  // id: string;
  // name : string
  // title : string
  // description: string;
  // type: string;
  // rank: string;
  // name: string;
  // picture: string;
  // categories: Category[];
  // picture: string;
  // gender: string;
  // nationality: string;
  // country: Country;
  // verified: boolean;
  // // categories: Category[];
  // insights: {
  //   top: Insights;
  //   audience: [];
  //   engagement: [];
  // };
  // accounts: SocialAccounts[];
  // posts: Post[];
}

interface FavList {
  id: string;
  name: string;
  description: string;
  accountsCount : string
  accounts: Account[];
  pictures: string[];
}

interface Step {
  id: string;
  name: string;
  position: number;
  accounts: Account[];
}
interface Project {
  id: string;
  name: string;
  description: string;
  accountCount: number;
  steps: Step[];
}

interface SocialMention {
  id: string;
  picture: string;
  name: string;
  post: {
    id: string;
    url: string;
    date: string;
  };
  evaluation: number;
}

interface WebMention {
  id: string;
  picture: string;
  domain: string;
  link: {
    title: string;
    date: string;
    text : string
    url: string;
    evaluation: number;
  };
}

interface Mentions {
  mentions: {
    social: SocialMention[];
    web: WebMention[];
  };
}
