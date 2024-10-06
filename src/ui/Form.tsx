import styled, { css } from "styled-components";

interface FormProps {
  type?: "regular" | "modal";
}

const Form = styled.form<FormProps>`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 1rem;

      /* Box */
      background-color: white;
      border: 1px solid lightcyan;
      border-radius: 10px;
    `}
  max-width:50rem;
  padding: 2rem;
  overflow: hidden;
  font-size: 1rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
