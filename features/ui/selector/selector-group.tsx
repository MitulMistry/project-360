"use client";

import React, { useState } from "react";
import { ButtonProps as AriaButtonProps } from "react-aria-components";
import { Selector, SelectorSize } from "./selector";
import classNames from "classnames";
import styles from "./selector-group.module.scss";

type SelectorGroupProps = AriaButtonProps & {
  className?: string;
  size?: SelectorSize;
  items: string[];
  initializedId?: number | null;
};

export function SelectorGroup({
  className,
  size = SelectorSize.Medium,
  items,
  initializedId = null,
  ...props
}: SelectorGroupProps) {
  const [selectedId, setSelectedId] = useState(initializedId);

  return (
    <div className={classNames(styles.group, className)}>
      {items.map((item: string, idx: number) => (
        <Selector
          id={item}
          key={idx}
          size={size}
          isSelected={selectedId === idx}
          onPress={() => setSelectedId(idx)}
          {...props}
        >
          {item}
        </Selector>
      ))}
    </div>
  );
}
