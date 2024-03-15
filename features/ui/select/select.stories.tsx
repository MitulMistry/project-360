import { Meta, StoryObj } from "@storybook/react";
import { Select, Item } from ".";

// Storybook CSF3 format

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    children: [
      <Item key={1}>Item 1</Item>,
      <Item key={2}>Item 2</Item>,
      <Item key={3}>Item 3</Item>,
    ],
    isDisabled: false,
  },
};

export const Label: Story = {
  ...Default,
  args: { ...Default.args, label: "Label" },
};

interface ItemObj {
  id: number;
  name: string;
}

const options = [
  { id: 1, name: "Aerospace" },
  { id: 2, name: "Mechanical" },
  { id: 3, name: "Civil" },
  { id: 4, name: "Biomedical" },
  { id: 5, name: "Nuclear" },
  { id: 6, name: "Industrial" },
  { id: 7, name: "Chemical" },
  { id: 8, name: "Agricultural" },
  { id: 9, name: "Electrical" },
];

export const Iterable: Story = {
  args: {
    label: "Pick an engineering major",
    items: options,
    children: (item) => <Item>{(item as ItemObj).name}</Item>,
    isDisabled: false,
  },
};
