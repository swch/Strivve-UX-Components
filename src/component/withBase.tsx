import React, { createContext, useContext } from 'react';
import { Appearance } from '../types';
import StrivveCore from '../core/core';


export const BaseContext = createContext<{ appearance: Appearance }>({ appearance: {} as Appearance });
export const useBase = () => useContext(BaseContext);

export interface BaseProps {
  core: StrivveCore
  appearance: Appearance
}

export interface WithBaseProps {
  core: StrivveCore
  appearance: Appearance
}

const withBase = <P extends BaseProps>(Component: React.ComponentType<P>) => {
  return function WithBase(props: P) {
    const { appearance } = props;
    return (
      <BaseContext.Provider value={{ appearance }}>
        <Component {...props} />
      </BaseContext.Provider>
    );
  };
};

export default withBase;