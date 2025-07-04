import { RadioCard } from "@chakra-ui/react";
import * as React from "react";

export const RadioCardItem = React.forwardRef(
  function RadioCardItem(props, ref) {
    const {
      inputProps,
      label,
      description,
      addon,
      icon,
      indicator = <RadioCard.ItemIndicator />,
      indicatorPlacement = "end",
      onItemClick,
      currentValue,
      ...rest
    } = props;

    const hasContent = label || description || icon;
    const ContentWrapper = indicator ? RadioCard.ItemContent : React.Fragment;

    const handleClick = React.useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (onItemClick) {
          onItemClick(rest.value);
        }
      },
      [onItemClick, rest.value],
    );

    return (
      <RadioCard.Item
        {...rest}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <RadioCard.ItemHiddenInput ref={ref} {...inputProps} />
        <RadioCard.ItemControl>
          {indicatorPlacement === "start" && indicator}
          {hasContent && (
            <ContentWrapper>
              {icon}
              {label && <RadioCard.ItemText>{label}</RadioCard.ItemText>}
              {description && (
                <RadioCard.ItemDescription>
                  {description}
                </RadioCard.ItemDescription>
              )}
              {indicatorPlacement === "inside" && indicator}
            </ContentWrapper>
          )}
          {indicatorPlacement === "end" && indicator}
        </RadioCard.ItemControl>
        {addon && <RadioCard.ItemAddon>{addon}</RadioCard.ItemAddon>}
      </RadioCard.Item>
    );
  },
);

export const RadioCardRoot = React.forwardRef(
  function RadioCardRoot(props, ref) {
    const { value, onValueChange, children, ...rest } = props;

    const handleItemClick = React.useCallback(
      (clickedValue) => {
        onValueChange({ value: clickedValue === value ? "" : clickedValue });
      },
      [value, onValueChange],
    );

    const childrenWithHandlers = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          onItemClick: handleItemClick,
          currentValue: value,
        });
      }
      return child;
    });

    return (
      <RadioCard.Root ref={ref} value={value} {...rest}>
        {childrenWithHandlers}
      </RadioCard.Root>
    );
  },
);

export const RadioCardLabel = RadioCard.Label;
export const RadioCardItemIndicator = RadioCard.ItemIndicator;
