import { Meta, StoryObj } from "@storybook/react";
// import { Button, ButtonIcon, ButtonSize, ButtonColor, ButtonVariant } from ".";
import { Button, ButtonSize, ButtonColor, ButtonVariant } from ".";

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
const icon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 0C7.55228 0 8 0.447715 8 1V5.999L13 6C13.5523 6 14 6.44772 14 7C14 7.55228 13.5523 8 13 8L8 7.999V13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13V7.999L1 8C0.447715 8 0 7.55228 0 7C0 6.44772 0.447715 6 1 6L6 5.999V1C6 0.447715 6.44772 0 7 0Z"
      fill="currentColor"
    />
  </svg>
);

export const IconLeading: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: (
      <>
        {/* <ButtonIcon src="/icons/plus.svg" /> */}
        {icon}
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
        {icon}
      </>
    ),
  },
};

export const IconOnly: Story = {
  ...Default,
  args: {
    ...Default.args,
    // children: <ButtonIcon src="/icons/plus.svg" />,
    children: icon,
    variant: ButtonVariant.IconOnly,
  },
};
