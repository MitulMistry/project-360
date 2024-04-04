import { Meta, StoryObj } from "@storybook/react";
import { OrganizationNewForm } from ".";

// Storybook CSF3 format

const meta: Meta<typeof OrganizationNewForm> = {
  title: "UI/OrganizationNewForm",
  component: OrganizationNewForm,
};
export default meta;

type Story = StoryObj<typeof OrganizationNewForm>;

export const Default: Story = {};
