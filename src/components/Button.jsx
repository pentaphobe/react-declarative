import React from 'react';
import styled, { injectGlobal, css } from 'styled-components'

const styleVars = {
  app: {
    // Assets path to map images and fonts
    'assets-path': '../assets/'
  },
  color: {
    // Color theme
    'darkGrey': '#494949',
    'lightGrey': '#CCCCCC',
    'labelGrey': '#747678',
    'bgGrey': '#F5F5F5',
    'borderGrey': '#E5E5E5',
    'darkBlue': '#004165',
    'oceanBlue': '#007DBA',
    'lightOceanBlue': '#0093D8',
    'darkOceanBlue': '#005682',
    'mediumOceanBlue': '#0E6C9E',
    'htmlLink': '#007DBA',
    'white': '#FFFFFF',
    'grayscale97': '#f7f7f7',
    'grayscale96': '#f5f5f5',
    'grayscale93': '#eee',
    'grayscale90': '#e5e5e5',
    'grayscale88': '#e0e0e0',
    'grayscale80': '#ccc',
    'grayscale60': '#8e8e8e',
    'grayscale50': '#747678',
    'grayscale40': '#666',
    'grayscale29': '#494949',
    'black': '#000000',

    // Translucents
    'black10': 'rgba(0, 0, 0, 0.1)',
    'black20': 'rgba(0, 0, 0, 0.2)',
    'black30': 'rgba(0, 0, 0, 0.3)',
    'black40': 'rgba(0, 0, 0, 0.4)',
    'black50': 'rgba(0, 0, 0, 0.5)',
    'black60': 'rgba(0, 0, 0, 0.6)',
    'black70': 'rgba(0, 0, 0, 0.7)',
    'black80': 'rgba(0, 0, 0, 0.8)',
    'black90': 'rgba(0, 0, 0, 0.9)',

    // Messaging
    'm1': '#008a02',
    'm2': '#d53d39',
    'm3': '#df7a00',
    'm1Lt': '#00a303',
    'm2Lt': '#d9534f',
    'm2Ult': '#ffede9',

    // Errors
    'warningBg': '#FEF0E3',
    'warningBorder': '#EBD4BF',
    'warningIcon': '#EA8B26',
    'errorBg': '#FFEDE9',
    'errorBorder': '#EFC9C0',
    'errorIcon': '#DA5149',

    // Information
    'informationBg': '#f0faff',
    'informationBorder': '#93c7e5'
  },

  dimensions: {
    maxPageWidth: '968px',
    border: '1px',
    gap3: '3px',
    gap4: '4px',
    gap12: '12px',
    gap14: '14px',
    gap16: '16px',
    gap20: '20px',
    gap24: '24px',
    gap28: '28px',
    gap32: '32px',
    gap36: '36px',
    gap40: '40px',
    gap44: '44px',
    gap60: '60px',
    gap64: '64px',
    font30: '30px',
    font14: '14px',
    font16: '16px',
    width32: '32px',
    height32: '32px',
    height60: '60px',
    height212: '212px',
    height280: '280px'
  },
  screen: {
    desktop: (...args) => css`
      @media screen and (min-width: 980px){
        ${css(...args)}
      }
    `,
    laptop: (...args) => css`
      @media screen and (min-width: 768px) {
        ${css(...args)}
      }
    `,
    tablet: (...args) => css`
      @media screen and (min-width:480px) {
        ${css(...args)}
      }
    `
  }
}

injectGlobal`
  *, ::after, ::before {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'myriad-pro', sans-serif;
    color: ${styleVars.color.darkGrey};
    -webkit-font-smoothing: antialiased;
    min-width: 320px;
  }

  a {
    color: ${styleVars.color.htmlLink};
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`

const Button = styled.button`
  font-family: 'myriad-pro', sans-serif;
  font-weight: 600;
  border-radius: 3px;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
  line-height: 20px;
  padding: 11px 14px;
  user-select: none;
  display: inline-block;
  color: ${styleVars.color.white};
  background-color: ${styleVars.color.oceanBlue};
  border: 1px solid ${styleVars.color.white};
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
  outline: none;

  &:hover,
  &:focus {
    background-color: ${styleVars.color.lightOceanBlue};
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover,
    &:focus {
      background-color: ${styleVars.color.oceanBlue};
    }
  }

  ${props => props.fullWidth && css`
    width: 100%;
  `}

  ${props => props.large && css`
    font-size: 16px;
    line-height: 22px;
  `}

  ${props => props.action && css`
    background-color: ${styleVars.color.m1};

    &:hover,
    &:focus {
      background-color: ${styleVars.color.m1Lt};
    }

    &[disabled] {
      &:hover,
      &:focus {
        background-color: ${styleVars.color.m1};
      }
    }
  `}

  ${props => props.ghost && css`
    background-color: transparent;
    border-color: ${styleVars.color.oceanBlue};
    color: ${styleVars.color.oceanBlue};

    &:hover,
    &:focus {
      color: ${styleVars.color.white};
      border-color: ${styleVars.color.white};
    }

    &[disabled] {
      &:hover,
      &:focus {
        background-color: transparent;
        color: ${styleVars.color.oceanBlue};
        border-color: ${styleVars.color.oceanBlue};
      }
    }
  `}

  ${props => props.text && css`
    padding: 0;
    text-align: left;
    color: ${styleVars.color.oceanBlue};
    background: transparent;
    border: 0;
    font-weight: 400;

    &:hover,
    &:focus {
      background: transparent;
      text-decoration: underline;

      &[disabled] {
        background: transparent;
        text-decoration: none;
      }
    }

    i {
      font-size: 10px;
    }
  `}
`

export {
	Button
};

export default Button;