type MenuPositionType = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  width?: number;
};

type MenuItemProps = string |
  {
    icon?: string | React.ReactNode;
    label?: string;
    value?: string | number;
    [key: string]: any;
    action?: (event?: React.MouseEvent) => void;
  };

interface MenuProps {
  value?: string | number;
  activator: React.ReactNode;
  open?: boolean;
  selectedColor?: string;
  menuItems?: MenuItemProps[];
  menuItemKeyProperty?: string;
  menuItemLabelProperty?: string;
  disabled?: boolean;
  maxHeight?: number | string;
  inline?: boolean;
  renderItem?: (value: MenuItemProps) => React.ReactNode;
}
