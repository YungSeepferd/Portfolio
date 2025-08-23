import React from 'react';
import { 
  TextField as MuiTextField, 
  TextFieldProps as MuiTextFieldProps,
  InputAdornment,
  Box,
  FormHelperText
} from '@mui/material';

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'variant' | 'color'> {
  /**
   * The label for the text field
   */
  label?: React.ReactNode;
  
  /**
   * The helper text to display
   */
  helperText?: React.ReactNode;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * The variant of the text field
   */
  variant?: 'outlined' | 'filled' | 'standard';
  
  /**
   * The color of the text field
   */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | string;
  
  /**
   * The start adornment for the text field
   */
  startAdornment?: React.ReactNode;
  
  /**
   * The end adornment for the text field
   */
  endAdornment?: React.ReactNode;
  
  /**
   * Whether to show the character count
   */
  showCharacterCount?: boolean;
  
  /**
   * Whether the field is invalid
   */
  isInvalid?: boolean;
  
  /**
   * Whether the field is valid
   */
  isValid?: boolean;
  
  /**
   * Custom validation error message
   */
  errorMessage?: string;
  
  /**
   * Success message to display when field is valid
   */
  successMessage?: string;
  
  /**
   * Whether to use a monospaced font
   */
  monospace?: boolean;
}

/**
 * TextField component with enhanced features and consistent styling
 */
const TextField: React.FC<TextFieldProps> = ({
  label,
  helperText,
  required = false,
  variant = 'outlined',
  color = 'primary',
  startAdornment,
  endAdornment,
  showCharacterCount = false,
  isInvalid = false,
  isValid = false,
  errorMessage,
  successMessage,
  monospace = false,
  InputProps = {},
  inputProps = {},
  sx = {},
  onChange,
  value,
  defaultValue,
  maxRows,
  minRows,
  multiline,
  ...props
}) => {
  const [inputValue, setInputValue] = React.useState<string>(
    (value as string) || defaultValue as string || ''
  );
  
  // Handle value changes
  const handleChange = (event: React.ChangeEvent<any>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    
    if (onChange) {
      onChange(event);
    }
  };
  
  // Determine field status
  const hasError = isInvalid || !!props.error;
  const hasSuccess = isValid && !hasError;
  const displayHelperText = helperText || errorMessage || successMessage;
  
  // Determine character count text
  const maxLength = inputProps.maxLength as number;
  const characterCount = inputValue ? inputValue.length : 0;
  const characterCountText = maxLength
    ? `${characterCount}/${maxLength}`
    : `${characterCount}`;
  
  // Combine input props
  const combinedInputProps = {
    ...inputProps,
    style: {
      ...(monospace && { fontFamily: '"IBM Plex Mono", monospace' }),
      ...inputProps.style,
    },
  };
  
  // Combine input adornments
  const combinedInputProps2 = {
    ...InputProps,
    ...(startAdornment && {
      startAdornment: (
        <InputAdornment position="start">{startAdornment}</InputAdornment>
      ),
    }),
    ...(endAdornment && {
      endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
    }),
  };
  
  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <MuiTextField
        label={label}
        required={required}
        variant={variant}
        color={hasError ? 'error' : hasSuccess ? 'success' : (color as any)}
        error={hasError}
        helperText={displayHelperText}
        InputProps={combinedInputProps2}
        inputProps={combinedInputProps}
        multiline={multiline}
        minRows={minRows}
        maxRows={maxRows}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        sx={{
          width: '100%',
          ...sx,
        }}
        {...props}
      />

      {showCharacterCount && (
        <FormHelperText
          sx={{
            textAlign: 'right',
            mt: 0.5,
            ml: 1,
            color: 'text.secondary',
            ...(maxLength && characterCount >= maxLength && {
              color: 'error.main',
              fontWeight: 'medium',
            }),
          }}
        >
          {characterCountText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default TextField;
