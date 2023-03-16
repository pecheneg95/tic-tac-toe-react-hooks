export default function setStatus(winner: string | null, xIsNext: boolean) {
  let status: string;

  if (winner) {
    status = 'Winner ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return status;
}