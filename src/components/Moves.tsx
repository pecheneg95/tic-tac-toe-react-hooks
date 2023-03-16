export default function Moves({ history, onClick }: { history: (string | null)[][], onClick: (step: number) => void }) {
  const moves = history.map((step: any, move: number) => {
    const description = move ?
      'Go to move #' + move :
      'To game start';

    return (
      <li key={move}>
        <button onClick={() => onClick(move)}>{description}</button>
      </li>
    )
  })

  return <ol>{moves}</ol>;
}