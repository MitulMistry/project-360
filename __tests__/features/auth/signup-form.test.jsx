import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SignUpForm } from "@features/auth";

describe("Sign up form", () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  it("renders text inputs", () => {
    const email = screen.getByText("Email");
    const password = screen.getByText("Password");

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it("renders a button", () => {
    const description = screen.getByText("Create Account");

    expect(description).toBeInTheDocument();
  });
});
