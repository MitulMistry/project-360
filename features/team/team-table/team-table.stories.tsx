import { Meta, StoryObj } from "@storybook/react";
import { TeamTable } from "./team-table";
import { UserForOrg } from "@/typings/user.types";
import QueryClientWrapper from "@/api/query-client-wrapper";
import { mockUsersSimple1 } from "@/__mocks__/user";

// Storybook CSF3 format

const meta: Meta<typeof TeamTable> = {
  title: "UI/TeamTable",
  component: TeamTable,
};
export default meta;

const users: UserForOrg[] = mockUsersSimple1;

type Story = StoryObj<typeof TeamTable>;

export const Default: Story = {
  args: {
    users: users,
  },
  // Need to wrap component with QueryClientProvider since it needs access to queryClient
  decorators: [
    (Story) => {
      return <QueryClientWrapper>{Story()}</QueryClientWrapper>;
    },
  ],
};
