export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const base = "px-4 py-2 rounded font-medium transition";

  const styles = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button type={type} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}
