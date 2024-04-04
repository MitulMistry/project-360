import { Meta, StoryObj } from "@storybook/react";
// import { Button, ButtonIcon, ButtonSize, ButtonColor, ButtonVariant } from ".";
import { Button, ButtonSize, ButtonColor, ButtonVariant } from ".";
import { PlusIcon } from "@features/ui";

// Storybook CSF3 format

const meta: Meta<typeof Button> = { title: "UI/Button", component: Button };
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Button CTA", isDisabled: false },
  argTypes: {
    color: {
      control: "select",
      options: Object.values(ButtonColor),
    },
  },
};

export const Small: Story = {
  ...Default,
  args: { ...Default.args, size: ButtonSize.Small },
};

export const Medium: Story = {
  ...Default,
  args: { ...Default.args, size: ButtonSize.Medium },
};

export const Large: Story = {
  ...Default,
  args: { ...Default.args, size: ButtonSize.Large },
};

export const Primary: Story = {
  ...Default,
  args: { ...Default.args, color: ButtonColor.Primary },
};

export const Secondary: Story = {
  ...Default,
  args: { ...Default.args, color: ButtonColor.Secondary },
};

export const Destructive: Story = {
  ...Default,
  args: { ...Default.args, color: ButtonColor.Destructive },
};

export const DestructiveSecondary: Story = {
  ...Default,
  args: { ...Default.args, color: ButtonColor.DestructiveSecondary },
};

// Using an inline SVG with fill set to "currentColor" will match the color of
// the SVG to the CSS color property. However, since width and height are set
// to hardcoded values, the icon will not scale. Using the ButtonIcon component
// will allow it to scale to different button size variants, but will not be able
// to change the color.

export const IconLeading: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: (
      <>
        {/* <ButtonIcon src="/icons/plus.svg" /> */}
        <PlusIcon />
        Button CTA
      </>
    ),
  },
};

// Alternative render function:
// render: (args) => (
//   <Button {...args}>
//     <ButtonIcon src="/icons/plus.svg" />
//     Button CTA
//   </Button>
// ),

export const IconTrailing: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: (
      <>
        Button CTA
        {/* <ButtonIcon src="/icons/plus.svg" /> */}
        <PlusIcon />
      </>
    ),
  },
};

export const IconOnly: Story = {
  ...Default,
  args: {
    ...Default.args,
    // children: <ButtonIcon src="/icons/plus.svg" />,
    children: <PlusIcon />,
    variant: ButtonVariant.IconOnly,
  },
};
