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
import { metricIcons, socialIcons } from '../components/Icons';

const getTemplateThemeColor = (
  defaultData: Portfolio['templateThemeColor'],
  data: Portfolio
): Portfolio['templateThemeColor'] =>
  data.draft?.templateThemeColor || data.templateThemeColor
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
): PortfolioSocialLink[] => {
  if (!data) return defaultData;

  return data
    .filter((link) => link.status === 'active') // Keep only active links
    .map((link) => {
      const socialLink = link.draft
        ? { ...link, ...link.draft, icon: socialIcons[link.draft.name] }
        : { ...link, icon: socialIcons[link.name] };

      const { draft, ...validLink } = socialLink; // Remove draft property

      // Return the valid link if it has a name and url
      return validLink.name && validLink.url ? validLink : null;
    })
    .reduce<PortfolioSocialLink[]>((acc, validLink) => {
      if (validLink && !acc.some((l) => l.name === validLink.name)) {
        acc.push(validLink as PortfolioSocialLink); // Push unique links into the accumulator
      }
      return acc;
    }, []);
};

const getProducts = (
  defaultData: PortfolioProduct[],
  data: PortfolioProduct[]
): PortfolioProduct[] => {
  if (!data) return defaultData;

  return data
    .filter((product) => product.status === 'active') // Keep only active products
    .map((product) => {
      const portfolioProduct = product.draft
        ? { ...product, ...product.draft }
        : product;

      const { draft, ...validProduct } = portfolioProduct; // Remove draft property

      // Return the valid product if it has a name
      return validProduct.name ? validProduct : null;
    })
    .reduce<PortfolioProduct[]>((acc, validProduct) => {
      if (validProduct && !acc.some((p) => p.name === validProduct.name)) {
        acc.push(validProduct as PortfolioProduct); // Push unique products into the accumulator
      }
      return acc;
    }, []);
};

const getBrands = (
  defaultData: PortfolioBrand[],
  data: PortfolioBrand[]
): PortfolioBrand[] => {
  if (!data) return defaultData;

  return data
    .filter((brand) => brand.status === 'active') // Keep only active brands
    .map((brand) => {
      const portfolioBrand = brand.draft ? { ...brand, ...brand.draft } : brand;

      const { draft, ...validBrand } = portfolioBrand; // Remove draft property

      // Return the valid brand if it has a company name
      return validBrand.companyName ? validBrand : null;
    })
    .reduce<PortfolioBrand[]>((acc, validBrand) => {
      if (
        validBrand &&
        !acc.some((b) => b.companyName === validBrand.companyName)
      ) {
        acc.push(validBrand as PortfolioBrand); // Push unique brands into the accumulator
      }
      return acc;
    }, []);
};

const getRecommendations = (
  defaultData: PortfolioRecommendation[],
  data: PortfolioRecommendation[]
): PortfolioRecommendation[] => {
  if (!data) return defaultData;

  return data
    .filter((recommendation) => recommendation.status === 'active') // Keep only active recommendations
    .map((recommendation) => {
      const portfolioRecommendation = recommendation.draft
        ? { ...recommendation, ...recommendation.draft }
        : recommendation;

      const { draft, ...validRecommendation } = portfolioRecommendation; // Remove draft property

      // Return the valid recommendation if it has a name
      return validRecommendation.name ? validRecommendation : null;
    })
    .reduce<PortfolioRecommendation[]>((acc, validRecommendation) => {
      if (
        validRecommendation &&
        !acc.some((r) => r.name === validRecommendation.name)
      ) {
        acc.push(validRecommendation as PortfolioRecommendation); // Push unique recommendations into the accumulator
      }
      return acc;
    }, []);
};

const getCollaborations = (
  defaultData: PortfolioCollaboration[],
  data: PortfolioCollaboration[]
): PortfolioCollaboration[] => {
  if (!data) return defaultData;

  return data
    .filter((collaboration) => collaboration.status === 'active') // Keep only active collaborations
    .map((collaboration) => {
      const portfolioCollaboration = collaboration.draft
        ? { ...collaboration, ...collaboration.draft }
        : collaboration;

      const { draft, ...validCollaboration } = portfolioCollaboration; // Remove draft property

      // Return the valid collaboration if it has a URL
      return validCollaboration.url ? validCollaboration : null;
    })
    .reduce<PortfolioCollaboration[]>((acc, validCollaboration) => {
      if (
        validCollaboration &&
        !acc.some((c) => c.url === validCollaboration.url)
      ) {
        acc.push(validCollaboration as PortfolioCollaboration); // Push unique collaborations into the accumulator
      }
      return acc;
    }, []);
};

const getSocialPlatforms = (
  defaultData: PortfolioSocialPlatform[],
  data: PortfolioSocialPlatform[]
): PortfolioSocialPlatform[] => {
  if (!data) return defaultData;

  return data
    .filter((platform) => platform.status === 'active') // Keep only active platforms
    .map((platform) => {
      const socialPlatform = platform.draft
        ? {
            ...platform,
            ...platform.draft,
            metrics: platform.draft.metrics.map((metric) => ({
              ...metric,
              icon: metricIcons[
                metric.name as PortfolioSocialPlatform['metrics'][number]['name']
              ],
            })),
          }
        : {
            ...platform,
            metrics: platform.metrics.map((metric) => ({
              ...metric,
              icon: metricIcons[
                metric.name as PortfolioSocialPlatform['metrics'][number]['name']
              ],
            })),
          };

      const { draft, ...validPlatform } = socialPlatform; // Remove draft property

      // Return the valid platform if it has a name
      return validPlatform.name ? validPlatform : null;
    })
    .reduce<PortfolioSocialPlatform[]>((acc, validPlatform) => {
      if (validPlatform && !acc.some((p) => p.name === validPlatform.name)) {
        acc.push(validPlatform as PortfolioSocialPlatform); // Push unique platforms into the accumulator
      }
      return acc;
    }, []);
};

function getBestPerformingPlatform(
  data: PortfolioSocialPlatform[]
): PortfolioSocialPlatform | null {
  if (!data.length) return null;

  return data.reduce((bestPlatform, currentPlatform) => {
    const platformToEvaluate = currentPlatform.draft
      ? { ...currentPlatform, ...currentPlatform.draft }
      : currentPlatform;

    const currentViews =
      platformToEvaluate.metrics.find(
        (metric) => metric.name === 'Average Views'
      )?.value || 0;
    const bestViews =
      bestPlatform.metrics.find((metric) => metric.name === 'Average Views')
        ?.value || 0;

    const bestPerformingPlatform =
      currentViews > bestViews ? platformToEvaluate : bestPlatform;

    return {
      ...bestPerformingPlatform,
      icon: metricIcons[
        bestPerformingPlatform.name as PortfolioSocialPlatform['metrics'][number]['name']
      ],
    };
  });
}

function getLargestAudience(
  data: PortfolioSocialPlatform[]
): PortfolioSocialPlatform | null {
  if (!data.length) return null;

  return data.reduce((largestPlatform, currentPlatform) => {
    const platformToEvaluate = currentPlatform.draft
      ? { ...currentPlatform, ...currentPlatform.draft }
      : currentPlatform;

    const currentFollowers =
      platformToEvaluate.metrics.find((metric) => metric.name === 'Followers')
        ?.value || 0;
    const largestFollowers =
      largestPlatform.metrics.find((metric) => metric.name === 'Followers')
        ?.value || 0;

    const largestAudience =
      currentFollowers > largestFollowers
        ? platformToEvaluate
        : largestPlatform;

    return {
      ...largestAudience,
      icon: metricIcons[
        largestAudience.name as PortfolioSocialPlatform['metrics'][number]['name']
      ],
    };
  });
}

function getTotalAudience(data: PortfolioSocialPlatform[]): number {
  if (!data.length) return 0;

  return data.reduce((total, platform) => {
    const platformToEvaluate = platform.draft
      ? { ...platform, ...platform.draft }
      : platform;

    const followers =
      platformToEvaluate.metrics.find((metric) => metric.name === 'Followers')
        ?.value || 0;
    const subscribers =
      platformToEvaluate.metrics.find((metric) => metric.name === 'Subscribers')
        ?.value || 0;

    return total + (followers || subscribers);
  }, 0);
}

function getLatestYoutubeVideo(
  data: PortfolioSocialPlatform[]
): PortfolioSocialPlatform['media'][number] | null {
  const youTubeVideos = data
    .map((platform) => {
      const platformToEvaluate = platform.draft
        ? { ...platform, ...platform.draft }
        : platform;
      return platformToEvaluate.name === 'youtube'
        ? platformToEvaluate.media
        : [];
    })
    .flat();

  return youTubeVideos.length ? youTubeVideos[0] : null;
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
