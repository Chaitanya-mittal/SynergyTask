import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1rem;
    padding: 0.8rem 1rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.2rem;
    padding: 1.2rem 1.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: white;
    background-color: blue;

    &:hover {
      background-color: lightblue;
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: white;
    background-color: red;

    &:hover {
      background-color: #ff5d5d;
    }
  `,
};

interface ButtonProps {
  variations?: keyof typeof variations;
  sizes?: keyof typeof sizes;
}

const Button = styled.button<ButtonProps>`
  border: none;
  margin-right: 1rem;
  border-radius: 5px;
  ${(props) => variations[props.variations || "primary"]};
  ${(props) => sizes[props.sizes || "medium"]};
`;

Button.defaultProps = {
  variations: "primary",
  sizes: "medium",
};

export default Button;
