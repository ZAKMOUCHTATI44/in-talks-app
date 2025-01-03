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
}

interface Account {
  id: string;
  type: string;
  rank: string;
  name: string;
  picture: string;
  title: string;
  categories: Category[];
  picture: string;
  description: string;
  gender: string;
  nationality: string;
  country: Country;
  verified: boolean;
  // categories: Category[];
  insights: {
    top: Insights;
    audience: [];
    engagement: [];
  };
  accounts: SocialAccounts[];
  posts: Post[];
}

interface Post {
  id: string;
  account: string;
  network: string;
  handle: string;
  type: string;
  url: string;
  caption: string;
  date: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  interactions: number;
  ER: number;
}

interface FavList {
  id: string;
  label: string;
  description: string;
  creators: Account[];
  creators_count: number;
}

interface Step {
  id: string;
  id: string;
  label: string;
  position: number;
  creators: Account[];
}
interface Project {
  id: string;
  label: string;
  description: string;
  creators_count: number;
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
  id: null;
  picture: string;
  domain: string;
  link: {
    title: string;
    date: string;
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
