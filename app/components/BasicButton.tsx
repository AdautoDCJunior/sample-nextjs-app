import Button from '@mui/material/Button';
import React from 'react';
import { styled } from '@mui/material/styles';

export interface IBasicButton {
  variant: 'icon' | 'text' | 'icon-text';
  icon?: React.ReactNode;
  text?: string;
  onClick?: () => void;
  className?: string;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
}

const StyledButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '&.icon-only': {
    borderRadius: '50%',
    padding: theme.spacing(1),
    minWidth: 0,
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

const BasicButton: React.FC<IBasicButton> = ({
  variant,
  icon,
  text,
  onClick,
  className,
  color = 'primary',
  size = 'medium',
}) => {
  return (
    <StyledButton
      className={`${className} ${variant === 'icon' ? 'icon-only' : ''}`}
      color={color}
      onClick={onClick}
      size={size}
      variant={'contained'}
    >
      {variant === 'icon' && icon}
      {variant === 'text' && text}
      {variant === 'icon-text' && (
        <>
          {icon}
          {text}
        </>
      )}
    </StyledButton>
  );
};

export default BasicButton;
