'use client'

import { useState } from "react";

type Cell = 0 | 1 | undefined;
type Board = Cell[];

export default function Main() {
	const [board, setBoard] = useState<Board[]>([
		[0, undefined, 1, 1, undefined, undefined],
		[0, undefined, undefined, undefined, 1, undefined],
		[undefined, undefined, undefined, undefined, 1, undefined],
		[undefined, undefined, 1, undefined, 0, 0],
		[0, undefined, undefined, undefined, undefined, undefined],
		[undefined, undefined, 1, undefined, 0, undefined]
	]);
	
	const validBoard: Board[] = [
		[0, 0, 1, 1, 0, 1],
		[0, 1, 0, 0, 1, 1],
		[1, 1, 0, 0, 1, 0],
		[1, 0, 1, 1, 0, 0],
		[0, 1, 0, 0, 1, 1],
		[1, 0, 1, 1, 0, 0]
	]
	
	const [isValid, setIsValid] = useState<boolean>(false);
	
	const handleClick = (cell: Cell, row: number, col: number) => {
		// Determine the new cell value: cycle through undefined -> 0 -> 1 -> undefined
		let newValue: Cell;
		if (cell === undefined) newValue = 0;
		else if (cell === 0) newValue = 1;
		else newValue = undefined;
		
		// Create a new board by mapping through rows and updating the clicked cell
		const newBoard = board.map((currentRow, rowIndex) =>
			rowIndex === row
				? currentRow.map((currentCell, colIndex) =>
					colIndex === col ? newValue : currentCell
				)
				: currentRow
		);
		
		if (JSON.stringify(newBoard) === JSON.stringify(validBoard)) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
		
		// Update state with the new board
		setBoard(newBoard);
	};
	
	return (
		<main className={"flex flex-col items-center p-4 grow"}>
			<div className={"grid grid-cols-6 gap-1"}>
				{board.map((row, rowIndex) => (
					<div key={rowIndex} className={"contents"}>
						{row.map((cell, colIndex) => (
							<button
								key={colIndex}
								value={cell === 0 ? '' : cell}
								className={`flex items-center justify-center w-20 h-20 text-lg border cursor-pointer ${isValid ? 'bg-green-500' : ''}`}
								onClick={() => handleClick(cell, rowIndex, colIndex)}
							>
								{cell}
							</button>
						))}
					</div>
				))}
			</div>
		</main>
	);
}
