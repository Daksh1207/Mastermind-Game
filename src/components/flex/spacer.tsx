import styled from "styled-components";

export const Spacer = styled.div<{
  margin: { right?: string; bottom?: string; left?: string; top?: string };
}>`
  margin-right: ${(props) =>
    props.margin.right && props.theme.spacing[props.margin.right]};
  margin-left: ${(props) =>
    props.margin.left && props.theme.spacing[props.margin.left]};
  margin-bottom: ${(props) =>
    props.margin.bottom && props.theme.spacing[props.margin.bottom]};
  margin-top: ${(props) =>
    props.margin.top && props.theme.spacing[props.margin.top]};
`;
