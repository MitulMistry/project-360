import { Meta, StoryObj } from "@storybook/react";
import { OAuthGitHubButton } from ".";

// Storybook CSF3 format

const meta: Meta<typeof OAuthGitHubButton> = {
  title: "UI/OAuthGitHubButton",
  component: OAuthGitHubButton,
};
export default meta;

type Story = StoryObj<typeof OAuthGitHubButton>;

export const Default: Story = {};
