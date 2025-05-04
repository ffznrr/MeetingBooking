const Button = ({ className, text, type }) => {
  return (
    <>
      <button type={type} className={`w-20 h-10 border-1 ${className}`}>
        {text}
      </button>
    </>
  );
};

export default Button;
