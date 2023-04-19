import React, { createContext, useContext } from 'react';
import { BaseStyle } from '../types';


export const BaseContext = createContext<{ style: BaseStyle }>({ style: {} as BaseStyle });
export const useBase = () => useContext(BaseContext);

export interface BaseProps {
  style: BaseStyle
}

export interface WithBaseProps {
  style: BaseStyle
}

const withBase = <P extends BaseProps>(Component: React.ComponentType<P>) => {
  return function WithBase(props: P) {
    const { style } = props;
    return (
      <div style={{ color: style.text_color, fontFamily: style?.font_family, fontSize: '0.9rem' }}>
        <BaseContext.Provider value={{ style }}>
          <Component {...props} />
        </BaseContext.Provider>
      </div>
    );
  };
};

export default withBase;