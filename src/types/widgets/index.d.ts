interface ButtonProps {
  className?: string;
  disabled?: boolean;
  color?: string;
  borderRadius?: number;
  borderColor?: string;
  textColor?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
}

interface InputProps {
  className?: string;
  disabled?: boolean;
  color?: string;
  type?: string;
  borderRadius?: number;
  borderColor?: string;
  textColor?: string;
  placeholder?: string;
  value?: string;
  error?:string;
  length?:number;
  example?:string;
  onChange?: (event: any) => void;
}

interface OptionProps {
  value?:string;
  label?:string;
}

interface SelectProps {
  color?:string;
  textColor?:string;
  borderRadius?:number;
  className?:string;
  items:OptionProps[];
  disabled?:boolean;
  value?:string;
  onChange?: (value: string) => void;
}