import React, { useState } from "react";
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
  const [selectedLabel, setSelectedLabel] = useState(placeholder);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleOptionClick = (option: SelectOption) => {
    setSelectedLabel(option.label);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div
      className={`${styles.dropdown} ${className} ${
        isOpen ? styles.active : ""
      }`}
    >
      <div className={styles.select} onClick={toggleDropdown}>
        <span>{selectedLabel}</span>
        <i className={styles.arrow}>
          <IoIosArrowDown />
        </i>
      </div>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              id={option.value.toString()}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
