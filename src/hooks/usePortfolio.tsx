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
} from '../lib/getPortfolioData';
import {
  FetchState,
  PortfolioProviderProps,
  PortfolioResponse,
  UsePortfolio,
} from '../types';
import { createContext, useContext, useEffect, useReducer } from 'react';

const PortfolioContext = createContext<UsePortfolio | undefined>(undefined);

const reducer = (
  state: UsePortfolio,
  action:
    | { type: 'LOADING' }
    | { type: 'ERROR'; error: FetchState['error'] }
    | { type: 'SUCCESS'; data: PortfolioResponse; useDefaultData: boolean }
): UsePortfolio => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true, isError: false, isSuccess: false };
    case 'SUCCESS':
      return {
        ...state,
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
        getBrands: (defaultData) => getBrands(defaultData, action.data.brands),
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
      };
    case 'ERROR':
      return { ...state, isLoading: false, isError: true, error: action.error };
    default:
      return state;
  }
};

const PortfolioProvider = ({
  loader,
  error,
  useDefaultData,
  apiUrl,
  children,
}: PortfolioProviderProps) => {
  const initialState: UsePortfolio = {
    isLoading: !useDefaultData,
    isError: false,
    isSuccess: false,
    error: undefined,
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
    getLatestYoutubeVideo: (defaultData) => getLatestYoutubeVideo(defaultData),
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getPortfolioDetails = async () => {
      dispatch({ type: 'LOADING' });

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const { data } = await response.json();
        dispatch({ type: 'SUCCESS', data, useDefaultData });
      } catch (error: any) {
        dispatch({ type: 'ERROR', error });
      }
    };

    if (!useDefaultData) {
      getPortfolioDetails();
    }
  }, [useDefaultData]);

  if (state.isLoading || state.isError) {
    return loader ? (
      loader()
    ) : error ? (
      error(state.error)
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
        {state.isLoading ? (
          <p style={{ fontSize: 18 }}>Loading...</p>
        ) : (
          <>
            <h1 style={{ fontSize: 18, fontWeight: 'bold' }}>
              Ooops an error occured!!!
            </h1>
            <p style={{ paddingTop: '8px', fontSize: 14 }}>
              {state.error?.message}
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
