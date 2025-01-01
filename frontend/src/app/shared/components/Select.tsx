import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./styles/Select.module.css";
import { IoIosArrowDown } from "react-icons/io";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  placeholder = "Selecione uma opção",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    null
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleOptionClick = (option: SelectOption) => {
    setSelectedValue(option.value);
    onChange(option.value);
    setIsOpen(false);
  };

  const handleDocumentClick = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleDocumentClick);
    } else {
      document.removeEventListener("click", handleDocumentClick);
    }
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isOpen, handleDocumentClick]);

  const selectedLabel = selectedValue
    ? options.find((option) => option.value === selectedValue)?.label ||
      placeholder
    : placeholder;

  return (
    <div className={styles.dropdownContainer}>
      <div
        className={`${styles.dropdown} ${className} ${
          isOpen ? styles.active : ""
        }`}
        ref={dropdownRef}
      >
        <div
          className={styles.select}
          onClick={toggleDropdown}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-label="Dropdown selector"
        >
          <span>{selectedLabel}</span>
          <i className={styles.arrow}>
            <IoIosArrowDown />
          </i>
        </div>
        {isOpen && (
          <ul className={styles.dropdownMenu} role="listbox">
            {options.map((option) => (
              <li
              className={styles.selectOption}
                key={option.value}
                onClick={() => handleOptionClick(option)}
                role="option"
                aria-selected={selectedValue === option.value}
                tabIndex={0}
                id={option.value.toString()}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
