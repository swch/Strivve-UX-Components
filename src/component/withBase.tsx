import React, { createContext, useContext } from 'react';

import StrivveCore from '../core/core';
import { BaseStyle } from './component';

export const BaseContext = createContext<{ style: BaseStyle }>({ style: {} as BaseStyle });
export const useBase = () => useContext(BaseContext);

export interface BaseProps {
  core: StrivveCore
  style: BaseStyle
}

interface WithBaseProps {
  core: StrivveCore
  style: BaseStyle
}

// Take in a component as argument WrappedComponent
const withBase = <P extends BaseProps>(Component: React.ComponentType<P>) => {
  // And return another component
  class HOC extends React.Component<P & WithBaseProps> {

    render() {
      return (
        <div
          style={{
            color: this.props.style.text_color,
            fontFamily: this.props.style?.font_family,
            fontSize: '0.9rem'
          }}>
          <BaseContext.Provider
            value={{
              style: this.props.style
            }}
          >
            <Component
              {...this.props as P}
            />
          </BaseContext.Provider>

        </div>
      );
    }
  }
  return HOC;
};

export default withBase;