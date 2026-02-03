export default function Input({ label, type = "text", placeholder }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}
