import "./button.css";

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

export const Button = ({
  children,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <div className="button">
      <button onClick={onClick} disabled={disabled} className="button__scan">
        {children}
      </button>
    </div>
  );
};
