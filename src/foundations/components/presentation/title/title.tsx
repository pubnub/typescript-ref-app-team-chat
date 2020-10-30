import React, { FunctionComponent, HTMLAttributes } from "react";
import Styled from "styled-components/macro";
import {
  Heading,
  HeadingProps,
  Label,
  LabelProps
} from "foundations/components/presentation";

interface TitleWrapperProps extends HTMLAttributes<HTMLElement> {
  /** Should the Heading and Label be capitalized */
  capitalize?: boolean;
}

interface TitleProps extends TitleWrapperProps {
  /** Text passed to the Heading */
  heading?: string;
  /** Options passed to the Heading */
  headingProps?: HeadingProps;
  /** Text passsed to the Label */
  label?: string;
  /** Options passed to the Label */
  labelProps?: LabelProps;
}

export const TitleWrapper = Styled.div<TitleWrapperProps>`
  * {
    text-transform: ${p => p.capitalize && "capitalize"}
  }

  ${Heading} {
    margin-bottom: 5px;
  }
`;

export const Title: FunctionComponent<TitleProps> = ({
  heading,
  headingProps,
  label,
  labelProps,
  ...rest
}) => {
  return (
    <TitleWrapper {...rest}>
      {heading && <Heading {...headingProps}>{heading}</Heading>}
      {label && <Label {...labelProps}>{label}</Label>}
    </TitleWrapper>
  );
};
