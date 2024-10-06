import styled from "styled-components";
const FormRow = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  /* grid-template-columns: 10rem 2fr; */
  /* gap: 0.1rem; */
  padding: 1rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid white;
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

export default FormRow;
