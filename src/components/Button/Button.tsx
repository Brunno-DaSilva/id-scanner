import "./button.css";

type ButtonProps = {
  text: string;
};

export const Button = ({ text }: ButtonProps) => {
  return (
    <div className="button">
      <button className="button__scan">{text}</button>
    </div>
  );
};
