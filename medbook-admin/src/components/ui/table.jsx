export function Table({ children, className = "" }) {
  return <table className={`w-full border-collapse text-sm ${className}`}>{children}</table>
}

export function TableHeader({ children, className = "" }) {
  return <thead className={`bg-gray-50 text-left ${className}`}>{children}</thead>
}

export function TableRow({ children, className = "" }) {
  return <tr className={`border-b last:border-0 ${className}`}>{children}</tr>
}

export function TableHead({ children, className = "" }) {
  return <th className={`px-4 py-2 font-medium text-gray-600 ${className}`}>{children}</th>
}

export function TableBody({ children, className = "" }) {
  return <tbody className={className}>{children}</tbody>
}

export function TableCell({ children, className = "" }) {
  return <td className={`px-4 py-2 align-middle ${className}`}>{children}</td>
}
