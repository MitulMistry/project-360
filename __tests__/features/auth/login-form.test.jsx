import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { LoginForm } from "@features/auth";

describe("Login form", () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  it("renders text inputs", () => {
    const email = screen.getByTestId("emailInput");
    const password = screen.getByTestId("passwordInput");

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    const button = screen.getByTestId("submitButton");

    expect(button).toBeInTheDocument();
  });

  it("renders a GitHub OAuth button", () => {
    const button = screen.getByTestId("gitHubOAuthButton");

    expect(button).toBeInTheDocument();
  });
});
