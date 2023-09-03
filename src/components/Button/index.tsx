import { ButtonContainer, ButtonVariants } from "./styles";

type ButtonProps = {
  variant?: ButtonVariants;
};

export function Button({ variant = "primary" }: ButtonProps) {
  return (
    <>
      <ButtonContainer variant={variant}>Enviar</ButtonContainer>
    </>
  );
}
