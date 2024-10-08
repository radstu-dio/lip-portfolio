# Lipaa Portfolio

The Lipaa Portfolio Package provides a utility hook, provider and types to simplify working with portfolio data in multiple templates. This package includes:

- `usePortfolio`: A React hook that fetches and provides utility functions for extracting data such as: template's theme color, profile information, social platforms information, products information, brands information, recommendations information, collaborations information, social analytics information, total audience information, largest audience information, best-performing social platform information, most recent YouTube video information.
- `PortfolioProvider`: A context provider to wrap components for accessing portfolio data.
- `metricIcons` and `socialIcons`: Icons for metrics and social platforms.
- `types` and `interfaces` for strong TypeScript support.

## Installation

To use the package in your project, install it via npm or yarn:

```bash
npm install lip-portfolio
```

or

```bash
yarn add lip-portfolio
```

## Usage

#### `PortfolioProvider`

The `PortfolioProvider` component wraps your application or component where portfolio data is needed.

Example:

```tsx
import { PortfolioProvider } from 'lip-portfolio';

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const baseUrl = process.env.API_BASE_URL;
  const accesssId = process.env.PORTFOLIO_ACCESS_ID;

  const useDefaultData = accesssId === 'DEFAULT';

  const apiUrl = `${baseUrl}/portfolios/${accesssId}?isAnon=true&draft=${searchParams.get(
    'draft'
  )}`;

  return (
    <PortfolioProvider useDefaultData={useDefaultData} apiUrl={apiUrl}>
      <YourComponent />
    </PortfolioProvider>
  );
}
```

#### `usePortfolio`

The `usePortfolio` hook provides access to portfolio data within a component.

Example:

```tsx
import { usePortfolio } from 'lip-portfolio';

const defaultProfile: PortfolioProfile = {
  id: '1',
  portfolioId: 'my-portfolio-id',
  draft: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  displayName: 'Jeffrey Omoore',
  about: `A Designer and Content creator based in Utah, USA. Creating videos to inspire and spark creativity.`,
  contactEmail: 'jeffreyomoore@gmail.com',
  profession: 'Video & Content Creator',
  coverImageUrl: '/template-1/hero-image.png',
};

function YourComponent() {
  const { getProfile } = usePortfolio();

  const profile = getProfile(defaultProfile);

  return (
    <div>
      <h1>{profile.displayName}</h1>
    </div>
  );
}
```

## Types and Interfaces

The package includes several TypeScript interfaces for type safety, such as Portfolio, PortfolioProfile, PortfolioSocialPlatform, and more.

Example:

```tsx
import { PortfolioProfile } from 'lip-portfolio';

const userProfile: PortfolioProfile = {
  id: '1',
  portfolioId: 'my-portfolio-id',
  draft: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  displayName: 'Jeffrey Omoore',
  about: `A Designer and Content creator based in Utah, USA. Creating videos to inspire and spark creativity.`,
  contactEmail: 'jeffreyomoore@gmail.com',
  profession: 'Video & Content Creator',
  coverImageUrl: '/template-1/hero-image.png',
};
```

## API Documentation

#### `Types`

- SupportedPlatforms
- SupportedSocialLinks
- Portfolio
- PortfolioProfile
- PortfolioSocialAnalytics
- PortfolioSocialLink
- PortfolioNotification
- PortfolioRecommendation
- PortfolioProduct
- PortfolioCollaboration
- PortfolioBrand
- PortfolioSocialPlatform
- PortfolioResponse
- ErrorProps
- SuccessProps
- FetchState
- MutateState
- Maybe
- SendMessagePayload
- SendMessageProps
- UsePortfolio
- PortfolioProviderProps

#### `usePortfolio`

This hook returns portfolio-related data and actions:

##### Returned Values:

- `**portfolio**`: The portfolio object returns the following:
  - `isError`: Indicates if there was an error fetching the data.
  - `isSuccess`: Indicates if the query was successful.
  - `error`: Contains error details if an error occurs during data fetching.
  - `getTemplateThemeColor(defaultData)`: Returns the template's theme color, or the defaultData if unavailable.
  - `getProfile(defaultData)`: Returns the portfolio profile, or defaultData if unavailable.
  - `getSocialPlatforms(defaultData)`: Returns social platforms linked to the portfolio, or defaultData if unavailable.
  - `getProducts(defaultData)`: Returns portfolio products, or defaultData if unavailable.
  - `getBrands(defaultData)`: Returns the brands associated with the portfolio, or defaultData if unavailable.
  - `getRecommendations(defaultData)`: Returns portfolio recommendations, or defaultData if unavailable.
  - `getCollaborations(defaultData)`: Returns collaborations related to the portfolio, or defaultData if unavailable.
  - `getSocialAnalytics(defaultData)`: Returns social analytics data, or defaultData if unavailable.
  - `getTotalAudience(defaultData)`: Returns the total audience count across all platforms.
  - `getLargestAudience(defaultData)`: Returns the platform with the largest audience, or null if unavailable.
  - `getBestPerformingPlatform(defaultData)`: Returns the best-performing social platform, or null if unavailable.
  - `getLatestYoutubeVideo(defaultData)`: Returns the most recent YouTube video, or null if unavailable.
- `**contact**`: The contact object returns the following:
  - `hasAccessToMediaKit(code)`: Checks if the user has access to the media kit based on the provided code.
  - `sendMessage({onMutate, onSuccess, onError, payload})`: Sends a message to the portfolio owner.
    - `onMutate`: A callback function to be executed before sending the message.
    - `onSuccess`: A callback function to be executed after sending the message successfully.
    - `onError`: A callback function to be executed if there's an error sending the message.
    - `payload`: The message payload.

#### `PortfolioProvider`

The `PortfolioProvider` component fetches portfolio data and provides it to child components via React's Context API.

##### Props:

`loader`: Optional. A custom loader component to display while data is being fetched.
`error`: Optional. A custom error component to display if fetching data fails.
`apiBaseUrl`: Required. The backend api url.
`accessId`: Required. The portfolio access id.
`isDraft`: Required. whether you would like to fetch draft changes or not.

Example:

```tsx
function renderLoader() {
  return <CustomLoader />;
}

function renderError() {
  return <CustomError />;
}

<PortfolioProvider
  loader={renderLoader}
  error={renderError}
  apiBaseUrl='apiBaseUrl'
  accessId='accessId'
  isDraft={false}
>
  <YourComponent />
</PortfolioProvider>;
```

For questions, issues, or contributions, feel free to open a GitHub issue or submit a pull request!
