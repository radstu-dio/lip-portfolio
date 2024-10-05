import {
  Portfolio,
  PortfolioBrand,
  PortfolioCollaboration,
  PortfolioProduct,
  PortfolioProfile,
  PortfolioRecommendation,
  PortfolioSocialAnalytics,
  PortfolioSocialLink,
  PortfolioSocialPlatform,
} from '../types';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  SpotifyIcon,
  TiktokIcon,
  TwitchIcon,
  TwitterIcon,
  YoutubeIcon,
  CommentIcon,
  HeartIcon,
  LineChartIcon,
  User2Icon,
  ShareIcon,
  EyeIcon,
} from '../components/Icons';

const metricIcons: Record<
  PortfolioSocialPlatform['metrics'][number]['name'],
  PortfolioSocialPlatform['metrics'][number]['icon']
> = {
  Subscribers: User2Icon,
  Followers: User2Icon,
  'Average Likes': HeartIcon,
  'Average Views': EyeIcon,
  'Average Comments': CommentIcon,
  'Average Shares': ShareIcon,
  'Engagement Rate': LineChartIcon,
};

const socialIcons = {
  Tiktok: TiktokIcon,
  Podcast: LinkedInIcon,
  Twitter: TwitterIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  Youtube: YoutubeIcon,
  Spotify: SpotifyIcon,
  Twitch: TwitchIcon,
};

const getTemplateThemeColor = (
  defaultData: Portfolio['templateThemeColor'],
  data: Portfolio
): Portfolio['templateThemeColor'] =>
  data
    ? data.draft?.templateThemeColor ?? data.templateThemeColor
    : defaultData;

const getProfile = (
  defaultData: PortfolioProfile,
  data: PortfolioProfile
): PortfolioProfile =>
  data
    ? {
        ...data,
        displayName: data?.draft?.displayName ?? data.displayName,
        about: data?.draft?.about ?? data.about,
        contactEmail: data?.draft?.contactEmail ?? data.contactEmail,
        profession: data?.draft?.profession ?? data.profession,
        coverImageUrl: data?.draft?.coverImageUrl! ?? data.coverImageUrl!,
        // creatorTags:  data?.draft?.creatorTags! ?? data.creatorTags!,
      }
    : defaultData;

const getSocialAnalytics = (
  defaultData: PortfolioSocialAnalytics,
  data: PortfolioSocialAnalytics
): PortfolioSocialAnalytics =>
  data
    ? {
        ...data,
        lockAccessToSocialAnalytics:
          data.draft?.lockAccessToSocialAnalytics ??
          data.lockAccessToSocialAnalytics,
        showTotalAudience:
          data.draft?.showTotalAudience ?? data.showTotalAudience,
        showAudienceLocation:
          data.draft?.showAudienceLocation ?? data.showAudienceLocation,
        showPrimaryPlatform:
          data.draft?.showPrimaryPlatform ?? data.showPrimaryPlatform,
      }
    : defaultData;

const getSocials = (
  defaultData: PortfolioSocialLink[],
  data: PortfolioSocialLink[]
): PortfolioSocialLink[] =>
  data
    ? data.reduce((acc, link) => {
        const validLink = link.draft
          ? {
              ...link,
              ...link.draft,
              icon: socialIcons[link.name],
            }
          : { ...link, icon: socialIcons[link.name] }; // Use draft if available

        if (!validLink.draft && !validLink.name) {
          delete (validLink as { draft?: any }).draft; // Remove draft property
        }
        if (validLink && !acc.some((l) => l.name === validLink.name)) {
          acc.push(validLink);
        }
        return acc;
      }, [] as PortfolioSocialLink[])
    : defaultData;

const getProducts = (
  defaultData: PortfolioProduct[],
  data: PortfolioProduct[]
): PortfolioProduct[] =>
  data
    ? data.reduce((acc, product) => {
        const validProduct = product.draft
          ? {
              ...product,
              ...product.draft,
            }
          : product; // Use draft if available

        if (!validProduct.draft && !validProduct.name) {
          delete (validProduct as { draft?: any }).draft; // Remove draft property
        }
        if (validProduct && !acc.some((l) => l.name === validProduct.name)) {
          acc.push(validProduct);
        }
        return acc;
      }, [] as PortfolioProduct[])
    : defaultData;

const getBrands = (
  defaultData: PortfolioBrand[],
  data: PortfolioBrand[]
): PortfolioBrand[] =>
  data
    ? data.reduce((acc, brand) => {
        const validBrand = brand.draft
          ? {
              ...brand,
              ...brand.draft,
            }
          : brand; // Use draft if available

        if (!validBrand.draft && !validBrand.companyName) {
          delete (validBrand as { draft?: any }).draft; // Remove draft property
        }
        if (
          validBrand &&
          !acc.some((l) => l.companyName === validBrand.companyName)
        ) {
          acc.push(validBrand);
        }
        return acc;
      }, [] as PortfolioBrand[])
    : defaultData;

const getRecommendations = (
  defaultData: PortfolioRecommendation[],
  data: PortfolioRecommendation[]
): PortfolioRecommendation[] =>
  data
    ? data.reduce((acc, recommendation) => {
        const validRecommendation = recommendation.draft
          ? {
              ...recommendation,
              ...recommendation.draft,
            }
          : recommendation; // Use draft if available

        if (!validRecommendation.draft && !validRecommendation.name) {
          delete (validRecommendation as { draft?: any }).draft; // Remove draft property
        }
        if (
          validRecommendation &&
          !acc.some((l) => l.name === validRecommendation.name)
        ) {
          acc.push(validRecommendation);
        }
        return acc;
      }, [] as PortfolioRecommendation[])
    : defaultData;

const getCollaborations = (
  defaultData: PortfolioCollaboration[],
  data: PortfolioCollaboration[]
): PortfolioCollaboration[] =>
  data
    ? data.reduce((acc, collaboration) => {
        const validCollaboration = collaboration.draft
          ? {
              ...collaboration,
              ...collaboration.draft,
            }
          : collaboration; // Use draft if available

        if (!validCollaboration.draft && !validCollaboration.url) {
          delete (validCollaboration as { draft?: any }).draft; // Remove draft property
        }
        if (
          validCollaboration &&
          !acc.some((l) => l.url === validCollaboration.url)
        ) {
          acc.push(validCollaboration);
        }
        return acc;
      }, [] as PortfolioCollaboration[])
    : defaultData;

const getSocialPlatforms = (
  defaultData: PortfolioSocialPlatform[],
  data: PortfolioSocialPlatform[]
): PortfolioSocialPlatform[] =>
  data
    ? data.reduce((acc, platform) => {
        const validSocialPlatform = platform.draft
          ? {
              ...platform,
              ...platform.draft,
              metrics: { ...platform, ...platform.draft }.metrics.map(
                (metric) => ({
                  ...metric,
                  icon: metricIcons[
                    metric.name as PortfolioSocialPlatform['metrics'][number]['name']
                  ],
                })
              ),
            }
          : {
              ...platform,
              metrics: platform.metrics.map((metric) => ({
                ...metric,
                icon: metricIcons[
                  metric.name as PortfolioSocialPlatform['metrics'][number]['name']
                ],
              })),
            }; // Use draft if available

        if (!validSocialPlatform.draft && !validSocialPlatform.name) {
          delete (validSocialPlatform as { draft?: any }).draft; // Remove draft property
        }
        if (
          validSocialPlatform &&
          !acc.some((l) => l.name === validSocialPlatform.name)
        ) {
          acc.push(validSocialPlatform);
        }
        return acc;
      }, [] as PortfolioSocialPlatform[])
    : defaultData;

function getBestPerformingPlatform(
  socialPlatforms: PortfolioSocialPlatform[]
): PortfolioSocialPlatform | null {
  return socialPlatforms.length
    ? socialPlatforms.reduce((bestPlatform, currentPlatform) => {
        const currentViews =
          currentPlatform.metrics.find(
            (metric) => metric.name === 'Average Views'
          )?.value || 0;
        const bestViews =
          bestPlatform.metrics.find((metric) => metric.name === 'Average Views')
            ?.value || 0;

        return currentViews > bestViews ? currentPlatform : bestPlatform;
      })
    : null;
}

function getLargestAudience(
  socialPlatforms: PortfolioSocialPlatform[]
): PortfolioSocialPlatform | null {
  return socialPlatforms.length
    ? socialPlatforms.reduce((largestPlatform, currentPlatform) => {
        const currentFollowers =
          currentPlatform.metrics.find((metric) => metric.name === 'Followers')
            ?.value || 0;
        const largestFollowers =
          largestPlatform.metrics.find((metric) => metric.name === 'Followers')
            ?.value || 0;

        return currentFollowers > largestFollowers
          ? currentPlatform
          : largestPlatform;
      })
    : null;
}

function getTotalAudience(socialPlatforms: PortfolioSocialPlatform[]): number {
  return socialPlatforms.length
    ? socialPlatforms.reduce((total, platform) => {
        const followers =
          platform.metrics.find((metric) => metric.name === 'Followers')
            ?.value || 0;
        const subscribers =
          platform.metrics.find((metric) => metric.name === 'Subscribers')
            ?.value || 0;
        return total + (followers || subscribers);
      }, 0)
    : 0;
}

function getLatestYoutubeVideo(
  socialPlatforms: PortfolioSocialPlatform[]
): PortfolioSocialPlatform['media'][number] | null {
  const youTubeVideos = socialPlatforms
    .sort()
    .find((platform) => platform.name === 'youtube')?.media;

  return youTubeVideos?.length ? youTubeVideos[0] : null;
}

export {
  socialIcons,
  metricIcons,
  getTemplateThemeColor,
  getSocials,
  getProfile,
  getProducts,
  getBrands,
  getRecommendations,
  getCollaborations,
  getSocialPlatforms,
  getSocialAnalytics,
  getTotalAudience,
  getLargestAudience,
  getBestPerformingPlatform,
  getLatestYoutubeVideo,
};
