import {
  colors,
  fontFamily,
  fontSize,
  radius,
  sizes,
  spacing,
} from "@/src/theme";
import { forwardRef, ReactNode, useState } from "react";
import { TextInput, View, type TextInputProps } from "react-native";
import { AppText } from "./app-text";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  required?: boolean;
  containerClassName?: string;
  inputContainerClassName?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,

      leftElement,
      rightElement,

      required = false,
      editable = true,

      containerClassName = "",
      inputContainerClassName = "",

      onFocus,
      onBlur,
      style,

      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const isDisabled = !editable;

    const borderColor = error
      ? colors.danger.default
      : isFocused
        ? colors.brand.primary
        : colors.border.default;

    return (
      <View className={containerClassName} style={{ gap: spacing[2] }}>
        {label && (
          <View className="flex-row items-center" style={{ gap: spacing[1] }}>
            <AppText variant="label">{label}</AppText>
            {required && (
              <AppText variant="label" tone="danger">
                *
              </AppText>
            )}
          </View>
        )}
        <View
          className={`flex-row items-center border ${inputContainerClassName}`}
          style={{
            minHeight: sizes.input.height,
            paddingHorizontal: spacing[4],
            borderWidth: 1,
            borderColor,
            borderRadius: radius.md,
            backgroundColor: isDisabled
              ? colors.disabled.background
              : colors.surface.default,
            gap: spacing[3],
          }}
        >
          {leftElement}
          <TextInput
            ref={ref}
            editable={editable}
            placeholderTextColor={colors.text.muted}
            selectionColor={colors.brand.primary}
            style={[
              {
                flex: 1,
                paddingVertical: spacing[3],
                color: isDisabled ? colors.disabled.text : colors.text.primary,
                fontFamily: fontFamily.regular,
                fontSize: fontSize.body,
              },
              style,
            ]}
            onFocus={(event) => {
              setIsFocused(true);
              onFocus?.(event);
            }}
            onBlur={(event) => {
              setIsFocused(false);
              onBlur?.(event);
            }}
            {...props}
          />

          {rightElement}
        </View>
        {error ? (
          <AppText variant="caption" tone="danger">
            {error}
          </AppText>
        ) : helperText ? (
          <AppText variant="caption" tone="secondary">
            {helperText}
          </AppText>
        ) : null}
      </View>
    );
  },
);

Input.displayName = "Input";
