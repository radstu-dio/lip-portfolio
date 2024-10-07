'use client';

import React from 'react';
import {
  getBestPerformingPlatform,
  getBrands,
  getCollaborations,
  getLargestAudience,
  getLatestYoutubeVideo,
  getProducts,
  getProfile,
  getRecommendations,
  getSocialAnalytics,
  getSocialPlatforms,
  getSocials,
  getTotalAudience,
  getTemplateThemeColor,
} from '../lib/portfolio';
import {
  FetchState,
  PortfolioProviderProps,
  PortfolioResponse,
  UsePortfolio,
} from '../types';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { hasAccessToMediaKit, sendMessage } from '../lib/contact';

const PortfolioContext = createContext<UsePortfolio | undefined>(undefined);

const reducer = (
  state: UsePortfolio,
  action:
    | { type: 'LOADING'; resource: 'portfolio' | 'message' }
    | {
        type: 'ERROR';
        resource: 'portfolio' | 'message';
        error: FetchState<PortfolioResponse>['error'];
      }
    | {
        type: 'SUCCESS';
        resource: 'portfolio' | 'message';
        data: PortfolioResponse;
        success:
          | FetchState<PortfolioResponse>['success']
          | FetchState<PortfolioResponse>['success'];
        useDefaultData: boolean;
      }
): UsePortfolio => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          isLoading: true,
          isError: false,
          isSuccess: false,
        },
      };
    case 'SUCCESS':
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          isLoading: false,
          isSuccess: true,
          getTemplateThemeColor: (defaultData) =>
            getTemplateThemeColor(defaultData, action.data),
          getSocials: (defaultData) =>
            getSocials(defaultData, action.data.socialLinks),
          getProfile: (defaultData) =>
            getProfile(defaultData, action.data.profile),
          getProducts: (defaultData) =>
            getProducts(defaultData, action.data.products),
          getBrands: (defaultData) =>
            getBrands(defaultData, action.data.brands),
          getRecommendations: (defaultData) =>
            getRecommendations(defaultData, action.data.recommendations),
          getCollaborations: (defaultData) =>
            getCollaborations(defaultData, action.data.collaborations),
          getSocialPlatforms: (defaultData) =>
            getSocialPlatforms(defaultData, action.data.socialPlatforms),
          getSocialAnalytics: (defaultData) =>
            getSocialAnalytics(defaultData, action.data.socialAnalytics),
          getTotalAudience: (defaultData) =>
            getTotalAudience(
              action.useDefaultData ? defaultData : action.data.socialPlatforms
            ),
          getLargestAudience: (defaultData) =>
            getLargestAudience(
              action.useDefaultData ? defaultData : action.data.socialPlatforms
            ),
          getBestPerformingPlatform: (defaultData) =>
            getBestPerformingPlatform(
              action.useDefaultData ? defaultData : action.data.socialPlatforms
            ),
          getLatestYoutubeVideo: (defaultData) =>
            getLatestYoutubeVideo(
              action.useDefaultData ? defaultData : action.data.socialPlatforms
            ),
        },
      };
    case 'ERROR':
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          isLoading: false,
          isError: true,
          error: action.error,
        },
      };
    default:
      return state;
  }
};

const PortfolioProvider = ({
  loader,
  error,
  apiBaseUrl,
  accessId,
  isDraft,
  children,
}: PortfolioProviderProps) => {
  const useDefaultData = accessId === 'DEFAULT';
  const initialState: UsePortfolio = {
    portfolio: {
      isLoading: !useDefaultData,
      isError: false,
      isSuccess: false,
      error: undefined,
      success: undefined,
      getTemplateThemeColor: (defaultData) => defaultData,
      getSocials: (defaultData) => defaultData,
      getProfile: (defaultData) => defaultData,
      getProducts: (defaultData) => defaultData,
      getBrands: (defaultData) => defaultData,
      getRecommendations: (defaultData) => defaultData,
      getCollaborations: (defaultData) => defaultData,
      getSocialPlatforms: (defaultData) => defaultData,
      getSocialAnalytics: (defaultData) => defaultData,
      getTotalAudience: (defaultData) => getTotalAudience(defaultData),
      getLargestAudience: (defaultData) => getLargestAudience(defaultData),
      getBestPerformingPlatform: (defaultData) =>
        getBestPerformingPlatform(defaultData),
      getLatestYoutubeVideo: (defaultData) =>
        getLatestYoutubeVideo(defaultData),
    },
    contact: {
      hasAccessToMediaKit: (code) =>
        hasAccessToMediaKit(apiBaseUrl, accessId, code),
      sendMessage: ({ onMutate, onSuccess, onError, payload }) =>
        sendMessage({
          baseUrl: apiBaseUrl,
          accessId,
          useDefaultData,
          onMutate,
          onSuccess,
          onError,
          payload,
        }),
    },
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getPortfolioDetails = async () => {
      dispatch({ type: 'LOADING', resource: 'portfolio' });

      try {
        const response = await fetch(
          `${apiBaseUrl}/portfolios/${accessId}?isAnon=true&draft=${isDraft}`
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        dispatch({
          type: 'SUCCESS',
          resource: 'portfolio',
          data: result.data,
          success: result,
          useDefaultData,
        });
      } catch (error: any) {
        dispatch({ type: 'ERROR', resource: 'portfolio', error });
      }
    };

    if (!useDefaultData) {
      getPortfolioDetails();
    }
  }, [useDefaultData]);

  if (state.portfolio.isLoading || state.portfolio.isError) {
    return state.portfolio.isLoading && loader ? (
      loader()
    ) : state.portfolio.isError && error ? (
      error(state.portfolio.error)
    ) : (
      <main
        className='dark:text-white text-[#010101]'
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {state.portfolio.isLoading ? (
          <p style={{ fontSize: 18 }}>Loading...</p>
        ) : (
          <>
            <h1 style={{ fontSize: 18, fontWeight: 'bold' }}>
              Ooops an error occured!!!
            </h1>
            <p style={{ paddingTop: '8px', fontSize: 14 }}>
              {state.portfolio.error?.message}
            </p>
          </>
        )}
      </main>
    );
  }

  return (
    <PortfolioContext.Provider value={state}>
      {children}
    </PortfolioContext.Provider>
  );
};

function usePortfolio(): UsePortfolio {
  const context = useContext(PortfolioContext);

  if (!context || context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }

  return context;
}

export { PortfolioContext, PortfolioProvider, usePortfolio };
