import styled from "styled-components";

export const CardUser = styled.div`
  width: 350px;
  height: 763px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  -webkit-box-shadow: 0px 6px 7px 1px rgba(0, 0, 0, 0.69);
  box-shadow: 0px 6px 7px 1px rgba(0, 0, 0, 0.69);
  overflow: hidden;
  position: relative;
  z-index: 10;

  div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F09116;
    color: white;
    width: 100%;
    height: 50px;
    border-radius: 8px 8px 0 0;
  }

  div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background-color: white;
    border-radius: 0 0 8px 8px;
    overflow: hidden;

    form {
        display: flex;
        flex-direction: column;
        width: 90%;
        gap: 10px;
        color: black;
        min-height: 655px;
        padding: 10px 0;

      input {
        border-style: none;
        padding: 10px;
        background-color: whitesmoke;
        width: 100%;
        box-sizing: border-box;
      }

      select {
        border-style: none;
        padding: 10px;
        background-color: whitesmoke;
        width: 100%;
        box-sizing: border-box;
        font-family: inherit;
        cursor: pointer;

        &:disabled {
          cursor: default;
          opacity: 0.7;
        }
      }

      textarea {
        border-style: none;
        padding: 10px;
        background-color: whitesmoke;
        width: 100%;
        box-sizing: border-box;
        resize: none;
        font-family: inherit;
        max-height: 80px;
        overflow-y: auto;
      }

      div {
        width: 100%;
        display: flex;
        gap: 10px;
        margin-top: 10px;
      }
    }
  }
`;

export const ButtonSalvar = styled.button`
  background-color: #F09116;
  color: white;
  height: 30px;
  width: 70px;
  border-style: none;
  align-self: center;
  border-radius: 8px;

  &:disabled {
    background-color: gray;
    cursor: default;
  }
`;

export const ButtonEditar = styled(ButtonSalvar)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
`;

export const ButtonCancelar = styled(ButtonSalvar)`
  background-color: red;
  align-self: unset;
`;
