import { Meta, StoryObj } from "@storybook/react";
import type { User, Organization } from "@prisma/client";
import { OrganizationCard } from ".";

// Storybook CSF3 format

const meta: Meta<typeof OrganizationCard> = {
  title: "UI/OrganizationCard",
  component: OrganizationCard,
};
export default meta;

const date = new Date();

const owner: User = {
  id: "clud0qust000208l4cq5f5usy",
  createdAt: new Date(date.getDate()),
  name: "Bob Smith",
  email: "Bob@example.com",
  emailVerified: null,
  image: "",
};

const organization: Organization = {
  id: "clud0qi6g000008l49ga1g1d9",
  createdAt: new Date(date.getDate()),
  name: "Development Team",
};

type Story = StoryObj<typeof OrganizationCard>;

export const Default: Story = {
  args: {
    organization: organization,
    owner: owner,
    isSelected: false,
    userIsOwner: false,
  },
  argTypes: {
    isSelected: { control: "boolean" },
    userIsOwner: { control: "boolean" },
  },
};

export const IsOwner: Story = {
  ...Default,
  args: { ...Default.args, userIsOwner: true },
};
