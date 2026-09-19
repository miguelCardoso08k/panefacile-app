import { typography } from "@/src/theme";
import { Text, TextProps } from "react-native";

type Textvariant = keyof typeof typography;
type TextTone =
  | "primary"
  | "secondary"
  | "muted"
  | "inverse"
  | "success"
  | "warning"
  | "danger"
  | "info";

interface AppTextProps extends TextProps {
  variant?: Textvariant;
  tone?: TextTone;
  className?: string;
}

const variantClasses: Record<Textvariant, string> = {
  caption: "font-inter text-caption",
  label: "font-inter-semibold text-label",
  body: "font-inter text-body",
  bodyMedium: "font-inter-medium text-body",
  cardTitle: "font-inter-bold text-card-title",
  sectionTitle: "font-inter-bold text-section-title",
  screenTitle: "font-inter-bold text-screen-title",
  pageTitle: "font-inter-bold text-page-title",
  display: "font-inter-extrabold text-display",
};

const toneClasses: Record<TextTone, string> = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  muted: "text-text-muted",
  inverse: "text-white",

  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
};

export function AppText({
  variant = "body",
  tone = "primary",
  className = "",
  ...props
}: AppTextProps) {
  return (
    <Text
      className={`${variantClasses[variant]} ${toneClasses[tone]} ${className}`}
      {...props}
    />
  );
}
