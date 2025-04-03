import BasicButton from './BasicButton'; 
import React from 'react';

interface PageTitleProps {
  title: string;
  buttons?: Array<{
    variant: 'icon' | 'text' | 'icon-text';
    icon?: React.ReactNode;
    text?: string;
    onClick?: () => void;
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    size?: 'small' | 'medium' | 'large';
  }>;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  buttons = [],
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1rem',
      }}
    >
      <h1>{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {buttons.map((button, index) => (
          <BasicButton
            color={button.color}
            icon={button.icon}
            key={index}
            onClick={button.onClick}
            size={button.size}
            text={button.text}
            variant={button.variant}
          />
        ))}
      </div>
    </div>
  );
};

export default PageTitle;
