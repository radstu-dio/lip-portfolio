import * as React from 'react';

export type SupportedPlatforms =
  | 'tiktok'
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'twitch';

export type SupportedSocialLinks =
  | 'Podcast'
  | 'Tiktok'
  | 'Twitter'
  | 'Instagram'
  | 'Facebook'
  | 'Youtube'
  | 'Spotify'
  | 'Twitch';

export interface Portfolio {
  id: string;
  userId: string;
  templateId: string;
  templateVersionId: string;
  templateThemeColor: string;
  slug: string;
  deploymentProjectId: string;
  draft: Portfolio | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioProfile {
  id: string;
  portfolioId: string;
  displayName: string;
  profession: string | null;
  about: string | null;
  coverImageUrl: string | null;
  contactEmail: string | null;
  draft: PortfolioProfile | null;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioSocialAnalytics {
  id: string;
  portfolioId: string;
  lockAccessToSocialAnalytics: boolean;
  showTotalAudience: boolean;
  showAudienceLocation: boolean;
  showPrimaryPlatform: boolean;
  draft: PortfolioSocialAnalytics | null;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioSocialLink {
  id: string;
  portfolioId: string;
  name: SupportedSocialLinks;
  url: string;
  draft: PortfolioSocialLink | null;
  icon?: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioNotification {
  id: string;
  portfolioId: string;
  name: string;
  isEnabled: boolean;
  draft: PortfolioNotification | null;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioRecommendation {
  id: string;
  portfolioId: string;
  name: string;
  url: string;
  description: string;
  coverImageUrl: string;
  draft: PortfolioRecommendation | null;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioProduct {
  id: string;
  portfolioId: string;
  name: string;
  url: string;
  coverMediaUrl: string;
  draft: PortfolioProduct | null;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioCollaboration {
  id: string;
  portfolioId: string;
  name: string;
  url: string;
  mediaUrls: string[];
  isPersonalProject: boolean;
  draft: PortfolioCollaboration | null;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioBrand {
  id: string;
  portfolioId: string;
  companyName: string;
  companyLogoUrl: string;
  draft: PortfolioBrand | null;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioSocialPlatform {
  id: string;
  portfolioId: string;
  name: SupportedPlatforms;
  isEnabled: boolean;
  isLinked: boolean;
  info: {
    id: string;
    name: string;
    avatar: string;
    username: string | null;
    profileLink: string;
  };
  media: {
    id: string;
    coverImageUrl: string;
    shareUrl: string;
    title: string | null;
    mediaType: 'IMAGE' | 'VIDEO';
    likes?: number;
    comments?: number;
    views?: number;
    shares?: number;
    url: string | null;
    embedHtml: string | null;
    embedLink: string | null;
  }[];
  demographics: {
    name: 'Age' | 'Gender' | 'Country';
    values: { name: string; value: number }[];
    isEnabled: boolean;
    description: string;
  }[];
  metrics: {
    name:
      | 'Subscribers'
      | 'Followers'
      | 'Average Likes'
      | 'Average Views'
      | 'Average Comments'
      | 'Average Shares'
      | 'Engagement Rate';
    value: number;
    isEnabled: boolean;
    description: string;
    icon?: (
      props: React.SVGProps<SVGSVGElement> & {
        width?: number;
        height?: number;
      }
    ) => React.JSX.Element;
  }[];
  draft: PortfolioSocialPlatform | null;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioResponse extends Portfolio {
  profile: PortfolioProfile;
  socialAnalytics: PortfolioSocialAnalytics;
  socialLinks: PortfolioSocialLink[];
  notifications: PortfolioNotification[];
  recommendations: PortfolioRecommendation[];
  products: PortfolioProduct[];
  collaborations: PortfolioCollaboration[];
  brands: PortfolioBrand[];
  socialPlatforms: PortfolioSocialPlatform[];
}

export interface ErrorProps {
  message: string;
  status: number;
  error?: any;
}

export interface SuccessProps<T> {
  message: string;
  status: number;
  data?: T;
}

export interface FetchState<T> {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: ErrorProps;
  success?: SuccessProps<T>;
}

export type Maybe<T> = T | null | undefined;

export interface SendMessagePayload {
  firstName: string;
  lastName: string;
  receiverName: string;
  senderEmail: string;
  receiverEmail: string;
  websiteUrl: string;
  company?: Maybe<string | undefined>;
  subject: string;
  type: string;
  message: string;
}

export interface MutateState {
  onMutate?: () => void;
  onSuccess?: (success: SuccessProps<undefined>) => void;
  onError?: (error: ErrorProps) => void;
}

export type SendMessageProps = MutateState & {
  baseUrl: string;
  accessId: string;
  useDefaultData: boolean;
  payload: SendMessagePayload;
};

export type UsePortfolio = {
  portfolio: FetchState<PortfolioResponse> & {
    getTemplateThemeColor: (
      defaultData: Portfolio['templateThemeColor']
    ) => Portfolio['templateThemeColor'];
    getSocials: (defaultData: PortfolioSocialLink[]) => PortfolioSocialLink[];
    getProfile: (defaultData: PortfolioProfile) => PortfolioProfile;
    getProducts: (defaultData: PortfolioProduct[]) => PortfolioProduct[];
    getBrands: (defaultData: PortfolioBrand[]) => PortfolioBrand[];
    getRecommendations: (
      defaultData: PortfolioRecommendation[]
    ) => PortfolioRecommendation[];
    getCollaborations: (
      defaultData: PortfolioCollaboration[]
    ) => PortfolioCollaboration[];
    getSocialPlatforms: (
      defaultData: PortfolioSocialPlatform[]
    ) => PortfolioSocialPlatform[];
    getSocialAnalytics: (
      defaultData: PortfolioSocialAnalytics
    ) => PortfolioSocialAnalytics;
    getTotalAudience: (defaultData: PortfolioSocialPlatform[]) => number;
    getLargestAudience: (
      defaultData: PortfolioSocialPlatform[]
    ) => PortfolioSocialPlatform | null;
    getBestPerformingPlatform: (
      defaultData: PortfolioSocialPlatform[]
    ) => PortfolioSocialPlatform | null;
    getLatestYoutubeVideo: (
      defaultData: PortfolioSocialPlatform[]
    ) => PortfolioSocialPlatform['media'][number] | null;
  };
  contact: {
    hasAccessToMediaKit: (code: string) => Promise<boolean>;
    sendMessage: ({
      onMutate,
      onSuccess,
      onError,
      payload,
    }: MutateState & {
      payload: SendMessageProps['payload'];
    }) => Promise<void>;
  };
};

export type PortfolioProviderProps = {
  loader?: () => React.ReactElement;
  error?: (error?: ErrorProps) => React.ReactElement;
  apiBaseUrl: string;
  accessId: string;
  isDraft: boolean;
  children: React.ReactNode;
};
