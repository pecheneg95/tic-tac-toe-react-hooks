export default function Square({ value, onClick }: { value: string | null; onClick: () => void }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  )
}
