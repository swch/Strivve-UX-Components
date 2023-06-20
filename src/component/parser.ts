import React from 'react';

export interface CustomComponent {
  type: string;
  props?: { [key: string]: any };
  children?: Array<CustomComponent | string | null>;
}

export function customComponentToReact({
  type,
  props,
  children = [],
}: CustomComponent): any {
  return React.createElement(
    type,
    props,
    ...children.map((item: any) =>
      item?.type ? customComponentToReact(item) : item
    )
  );
}
