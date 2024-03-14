import { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from ".";

// Storybook CSF3 format

const meta: Meta<typeof LoginForm> = {
  title: "UI/LoginForm",
  component: LoginForm,
};
export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};
