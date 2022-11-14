interface SearchProps {
  value?: string | number;
  items?: any[];
  itemKeyProperty?: string;
  itemLabelProperty?: string;
  width?: string | number;
  borderColor?: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
}
