import styled from "styled-components";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

interface ConfirmDeleteProps {
  resourceName: string;
  onConfirm: () => void;
  disabled?: boolean;
  handleForm?: () => void;
}

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled = false,
  handleForm: closeModal,
}: ConfirmDeleteProps) {
  return (
    <StyledConfirmDelete>
      <h1 className="text-lg font-bold">Delete {resourceName}</h1>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <button
          disabled={disabled}
          onClick={closeModal}
          className="rounded-sm border px-4 py-2"
        >
          Cancel
        </button>
        <button
          disabled={disabled}
          onClick={() => {
            closeModal!();
            onConfirm();
          }}
          className="rounded-sm bg-red-500 px-4 py-2"
        >
          Delete
        </button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
