import Styled from "styled-components/macro";

export const Textarea = Styled.textarea`
  background: ${p => p.theme.backgrounds.content};
  border: ${p => p.theme.borders.none};
  color: ${p => p.theme.colors.importantText};
  max-height: ${p => p.theme.sizes[4]};
  overflow: auto;
  padding: ${p => p.theme.space[0]};
  resize: none;
  width: 100%;

  &::placeholder {
    color: ${p => p.theme.colors.normalText};
  }

  &:focus {
    outline: none;
  }
`;
