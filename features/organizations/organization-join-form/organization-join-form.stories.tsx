import { Meta, StoryObj } from "@storybook/react";
import { OrganizationJoinForm } from ".";

// Storybook CSF3 format

const meta: Meta<typeof OrganizationJoinForm> = {
  title: "UI/OrganizationJoinForm",
  component: OrganizationJoinForm,
};
export default meta;

type Story = StoryObj<typeof OrganizationJoinForm>;

export const Default: Story = {};
