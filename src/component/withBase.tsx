import React, { createContext, useContext } from 'react';
import { Appearance, Localization, mountHeaderOptions } from '../types';
import StrivveCore from '../core/core';
import { getColors } from './utils';

export const BaseContext = createContext<{
  core: StrivveCore;
  appearance: Appearance;
  localization: Localization;
  headerOptions?: mountHeaderOptions;
}>({
  core: {} as StrivveCore,
  appearance: {} as Appearance,
  localization: {} as Localization,
  headerOptions: undefined,
});
export const useBase = () => useContext(BaseContext);

export interface BaseProps {
  core: StrivveCore;
  appearance: Appearance;
  localization: Localization;
  headerOptions?: mountHeaderOptions;
}

export interface WithBaseProps {
  core: StrivveCore;
  appearance: Appearance;
  localization: Localization;
}

const withBase = <P extends BaseProps>(Component: React.ComponentType<P>) => {
  return function WithBase(props: P) {
    const { appearance, localization, headerOptions, core } = props;
    const variables = appearance?.variables || ({} as any);
    const generateVariables: { [key: string]: string } = {};

    Object.keys(variables).forEach((key) => {
      if (variables[key]) {
        generateVariables[`--${key}`] = variables[key];
        if (key.includes('Color')) {
          const colors = getColors(variables[key]);
          generateVariables[`--${key}Dark`] = colors.dark;
          generateVariables[`--${key}Lighter`] = colors.lighter;
        }
      }
    });
    return (
      <div
        style={{
          ...generateVariables,
          fontFamily: variables.fontFamily,
          fontSize: variables.fontSize,
        }}
      >
        <BaseContext.Provider
          value={{ appearance, localization, headerOptions, core }}
        >
          <Component {...props} />
        </BaseContext.Provider>
      </div>
    );
  };
};

export default withBase;
