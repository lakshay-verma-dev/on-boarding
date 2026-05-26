"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Select from "react-select";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// ==========================================
// 1. FORM FIELD WRAPPER
// ==========================================
interface FormFieldProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  error,
  containerClassName,
  labelClassName,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2 w-full", containerClassName)}>
      {label && (
        <label className={cn("block text-sm font-medium text-foreground", labelClassName)}>
          {label}
        </label>
      )}
      {children}
      {error && (
        <span className="text-xs text-destructive font-medium mt-0.5">{error}</span>
      )}
    </div>
  );
}

// ==========================================
// 2. FORM INPUT
// ==========================================
interface FormInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export function FormInput({
  label,
  error,
  containerClassName,
  labelClassName,
  className,
  ...props
}: FormInputProps) {
  return (
    <FormField
      label={label}
      error={error}
      containerClassName={containerClassName}
      labelClassName={labelClassName}
    >
      <Input
        className={cn(
          "h-12 w-full rounded-2xl border-border bg-background px-4 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-300",
          error && "border-destructive hover:border-destructive focus-visible:border-destructive focus-visible:ring-destructive/10",
          className
        )}
        {...props}
      />
    </FormField>
  );
}

// ==========================================
// 3. FORM TEXTAREA
// ==========================================
interface FormTextareaProps extends React.ComponentProps<typeof Textarea> {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export function FormTextarea({
  label,
  error,
  containerClassName,
  labelClassName,
  className,
  ...props
}: FormTextareaProps) {
  return (
    <FormField
      label={label}
      error={error}
      containerClassName={containerClassName}
      labelClassName={labelClassName}
    >
      <Textarea
        className={cn(
          "w-full rounded-2xl border-border bg-background px-4 py-3 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 min-h-[120px] resize-none transition-all duration-300",
          error && "border-destructive hover:border-destructive focus-visible:border-destructive focus-visible:ring-destructive/10",
          className
        )}
        {...props}
      />
    </FormField>
  );
}

// ==========================================
// 4. FORM SELECT (using React Select)
// ==========================================
const selectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    height: "48px",
    backgroundColor: "var(--background)",
    borderColor: state.isFocused ? "var(--primary)" : "var(--border)",
    borderRadius: "1rem", // 2xl (16px)
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    boxShadow: state.isFocused ? "0 0 0 4px color-mix(in srgb, var(--primary) 10%, transparent)" : "none",
    transition: "all 300ms ease",
    cursor: "pointer",
    "&:hover": {
      borderColor: state.isFocused ? "var(--primary)" : "color-mix(in srgb, var(--primary) 50%, transparent)",
    },
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: "0 8px",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "var(--foreground)",
    fontSize: "0.875rem",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "var(--muted-foreground)",
    fontSize: "0.875rem",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "var(--foreground)",
    fontSize: "0.875rem",
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "var(--muted-foreground)",
    "&:hover": {
      color: "var(--foreground)",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--popover)",
    borderColor: "var(--border)",
    borderWidth: "1px",
    borderRadius: "1rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
    zIndex: 50,
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: "6px",
    backgroundColor: "var(--popover)",
  }),
  option: (provided: any, state: any) => {
    let bg = "transparent";
    let color = "var(--foreground)";
    if (state.isSelected) {
      bg = "var(--primary)";
      color = "var(--primary-foreground)";
    } else if (state.isFocused) {
      bg = "var(--secondary)";
      color = "var(--secondary-foreground)";
    }
    return {
      ...provided,
      backgroundColor: bg,
      color: color,
      padding: "8px 12px",
      borderRadius: "0.5rem",
      cursor: "pointer",
      fontSize: "0.875rem",
      "&:active": {
        backgroundColor: "var(--primary)",
        color: "var(--primary-foreground)",
      },
    };
  },
};

interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  name?: string;
  value?: string | string[];
  options: FormSelectOption[];
  placeholder?: string;
  isMulti?: boolean;
  disabled?: boolean;
  onChange?: (e: { target: { name: string; value: any } }) => void;
  onValueChange?: (value: any) => void;
}

export function FormSelect({
  label,
  error,
  containerClassName,
  labelClassName,
  name,
  value,
  options,
  placeholder = "Select...",
  isMulti = false,
  disabled = false,
  onChange,
  onValueChange,
  ...props
}: FormSelectProps) {
  // Find option(s) matching current simple values
  const selectValue = isMulti
    ? options.filter((opt) => Array.isArray(value) && value.includes(opt.value))
    : options.find((opt) => opt.value === value) || null;

  const handleSelectChange = (newValue: any) => {
    const rawValue = isMulti
      ? (newValue || []).map((opt: any) => opt.value)
      : newValue?.value || "";

    if (onValueChange) {
      onValueChange(rawValue);
    }
    if (onChange && name) {
      onChange({
        target: {
          name,
          value: rawValue,
        },
      } as any);
    }
  };

  return (
    <FormField
      label={label}
      error={error}
      containerClassName={containerClassName}
      labelClassName={labelClassName}
    >
      <Select
        name={name}
        value={selectValue}
        onChange={handleSelectChange}
        options={options}
        placeholder={placeholder}
        isMulti={isMulti}
        isDisabled={disabled}
        styles={selectStyles}
        {...props}
      />
    </FormField>
  );
}

// ==========================================
// 5. FORM DATE PICKER / DATE RANGE PICKER
// ==========================================
interface FormDatePickerProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  name?: string;
  value?: string | Date | { from: string | Date; to?: string | Date };
  mode?: "single" | "range";
  placeholder?: string;
  disabled?: boolean;
  onChange?: (e: { target: { name: string; value: any } }) => void;
  onValueChange?: (value: any) => void;
}

export function FormDatePicker({
  label,
  error,
  containerClassName,
  labelClassName,
  name,
  value,
  mode = "single",
  placeholder = "Pick a date",
  disabled = false,
  onChange,
  onValueChange,
}: FormDatePickerProps) {
  const [open, setOpen] = React.useState(false);

  // Convert raw value to Date or DateRange object
  const dateValue = React.useMemo(() => {
    if (mode === "single") {
      if (!value) return undefined;
      const parsed = typeof value === "string" ? new Date(value) : value;
      return parsed instanceof Date && !isNaN(parsed.getTime()) ? parsed : undefined;
    } else {
      // range mode
      if (!value || typeof value !== "object") return undefined;
      const valObj = value as any;
      const from = valObj.from ? (typeof valObj.from === "string" ? new Date(valObj.from) : valObj.from) : undefined;
      const to = valObj.to ? (typeof valObj.to === "string" ? new Date(valObj.to) : valObj.to) : undefined;
      return { from, to };
    }
  }, [value, mode]);

  const handleSelect = (selected: any) => {
    let rawValue: any = undefined;
    if (mode === "single") {
      if (selected) {
        rawValue = format(selected, "yyyy-MM-dd");
      } else {
        rawValue = "";
      }
      setOpen(false); // Auto-close popover on selecting a single date
    } else {
      // range mode
      if (selected) {
        rawValue = {
          from: selected.from ? format(selected.from, "yyyy-MM-dd") : "",
          to: selected.to ? format(selected.to, "yyyy-MM-dd") : "",
        };
      } else {
        rawValue = { from: "", to: "" };
      }
    }

    if (onValueChange) {
      onValueChange(rawValue);
    }
    if (onChange && name) {
      onChange({
        target: {
          name,
          value: rawValue,
        },
      } as any);
    }
  };

  // Format the visual display text
  const displayText = React.useMemo(() => {
    if (mode === "single") {
      if (dateValue) {
        return format(dateValue as Date, "PPP");
      }
      return placeholder;
    } else {
      const range = dateValue as { from?: Date; to?: Date } | undefined;
      if (range?.from) {
        if (range.to) {
          return `${format(range.from, "LLL dd, y")} - ${format(range.to, "LLL dd, y")}`;
        }
        return format(range.from, "LLL dd, y");
      }
      return placeholder;
    }
  }, [dateValue, mode, placeholder]);

  return (
    <FormField
      label={label}
      error={error}
      containerClassName={containerClassName}
      labelClassName={labelClassName}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "h-12 w-full justify-start text-left font-normal rounded-2xl border-border bg-background px-4 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-300",
              !dateValue && "text-muted-foreground",
              error && "border-destructive hover:border-destructive focus-visible:border-destructive focus-visible:ring-destructive/10"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            {displayText}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode={mode as any}
            selected={dateValue}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </FormField>
  );
}
