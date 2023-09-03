import styled from "styled-components";

export type ButtonVariants = "primary" | "secondary" | "neutral";

type ButtonContainerProps = {
  variant: ButtonVariants;
};

const buttonColor = {
  primary: "lightgreen",
  secondary: "lightblue",
  neutral: "lightgray",
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  height: 56px;
  width: 100px;
  background-color: ${({ variant }) => buttonColor[variant]};
`;
