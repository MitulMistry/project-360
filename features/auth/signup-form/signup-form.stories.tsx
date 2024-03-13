import { Meta, StoryObj } from "@storybook/react";
import { SignUpForm } from ".";

// Storybook CSF3 format

const meta: Meta<typeof SignUpForm> = {
  title: "UI/SignupForm",
  component: SignUpForm,
};
export default meta;

type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {};
