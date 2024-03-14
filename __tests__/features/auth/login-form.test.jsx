import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { LoginForm } from "@features/auth";

describe("Login form", () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  it("renders text inputs", () => {
    const email = screen.getByText("Email");
    const password = screen.getByText("Password");

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it("renders a button", () => {
    const description = screen.getByText("Sign In");

    expect(description).toBeInTheDocument();
  });
});
