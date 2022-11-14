import { useState } from "react";
import styled from "styled-components";

const InternalUseSection = styled.section`
  padding: 40px;
  padding-top: 0;
  display: flex;
  justify-content: center;
  height: 100%;

  form {
    h1 {
      font-size: 22px;
      font-weight: bold;
      text-transform: uppercase;
    }
    padding: 40px;
    max-width: 500px;
    width: 100%;
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 38px rgba(0, 0, 0, 0.05), 0 15px 50px rgba(0, 0, 0, 0.05);
    .form-group {
      margin-top: 12px;
      label {
        margin-left: 12px;
        font-size: 12px;
      }
      input {
        margin-top: 8px;
        padding: 0px 12px;
        width: 100%;
        appearance: none;
        height: 50px;
        font-size: 16px;
        background: none;
        border: solid 1px #e9e9e9;
        border-radius: 8px;
      }
      button {
        margin-top: 12px;
        border-radius: 8px;
        appearance: none;
        border: none;
        height: 50px;
        width: 100%;
        background: #333;
        color: white;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        cursor: pointer;
      }
    }
    .email-input {
      position: relative;
      .form-validation-hint {
        font-size: 12px;
        position: absolute;
        bottom: -16px;
        left: 8px;
        color: red;
      }
    }
  }
`;

const EmailForm = ({ handleFormSubmit, clearData }) => {
  const [formData, setFormData] = useState("");
  const [formValidationHint, setFormValidationHint] = useState("");

  const clearData = () => {
    formData("");
  };

  const handleFormInput = (e) => {
    let userInput = e.target.value;
    setFormData(userInput);
  };

  const handleFormSubmitBtn = (e) => {
    e.preventDefault();
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (formData.match(validRegex)) {
      handleFormSubmit(formData);
    } else {
      setFormValidationHint("Please enter a valid email address.");
    }
  };

  return (
    <InternalUseSection>
      <form action="">
        <h1>Asset Security</h1>
        <div className="form-group email-input">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => handleFormInput(e)}
            name="email"
            value={formData}
            required
          />
          {formValidationHint !== "" ? (
            <div className="form-validation-hint">{formValidationHint}</div>
          ) : null}
        </div>
        <div className="form-group">
          <button type="submit" onClick={(e) => handleFormSubmitBtn(e)}>
            Query Email
          </button>
        </div>
      </form>
    </InternalUseSection>
  );
};

export default EmailForm;
