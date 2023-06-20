import React, { createContext, useContext } from 'react';
import { Appearance } from '../types';
import StrivveCore from '../core/core';
import { getColors } from './utils';

export const BaseContext = createContext<{ appearance: Appearance }>({
  appearance: {} as Appearance,
});
export const useBase = () => useContext(BaseContext);

export interface BaseProps {
  core: StrivveCore;
  appearance: Appearance;
}

export interface WithBaseProps {
  core: StrivveCore;
  appearance: Appearance;
}

const withBase = <P extends BaseProps>(Component: React.ComponentType<P>) => {
  return function WithBase(props: P) {
    const { appearance } = props;
    const variables = appearance?.variables || ({} as any);
    const generateVariables: { [key: string]: string } = {};

    Object.keys(variables).forEach((key) => {
      if (variables[key]) {
        generateVariables[`--${key}`] = variables[key];
        if (key.includes('color')) {
          const colors = getColors(variables[key]);
          generateVariables[`--${key}Dark`] = colors.dark;
          generateVariables[`--${key}Lighter`] = colors.lighter;
        }
      }
    });
    return (
      <div style={{ ...generateVariables, fontFamily: variables.fontFamily }}>
        <BaseContext.Provider value={{ appearance }}>
          <Component {...props} />
        </BaseContext.Provider>
      </div>
    );
  };
};

export default withBase;
