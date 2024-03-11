import { Meta, StoryObj } from "@storybook/react";
import { TextInput } from ".";

// Storybook CSF3 format

const meta: Meta<typeof TextInput> = {
  title: "UI/TextInput",
  component: TextInput,
};
export default meta;

type Story = StoryObj<typeof TextInput>;

// Default is uncontrolled component
export const Default: Story = {
  args: {
    isDisabled: false,
  },
};

export const Label: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: "Label",
  },
};

export const Hint: Story = {
  ...Label,
  args: {
    ...Label.args,
    description: "This is a description to inform the user.",
  },
};

export const Error: Story = {
  ...Hint,
  args: {
    ...Hint.args,
    isInvalid: true,
    errorMessage: "This is an error message.",
  },
};
