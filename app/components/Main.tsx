'use client'

import { useState } from "react";

type Cell = 0 | 1 | undefined;
type Board = Cell[];

export default function Main() {
	const board: Board[] = [
		[0, undefined, 1, 1, undefined, undefined],
		[0, undefined, undefined, undefined, 1, undefined],
		[undefined, undefined, undefined, undefined, 1, undefined],
		[undefined, undefined, 1, undefined, 0, 0],
		[0, undefined, undefined, undefined, undefined, undefined],
		[undefined, undefined, 1, undefined, 0, undefined]
	];

	const [initialBoard, setInitialBoard] = useState<Board[]>(() => board.map(row => [...row]));
	
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
		let newValue: Cell;
		if (cell === undefined) newValue = 0;
		else if (cell === 0) newValue = 1;
		else newValue = undefined;
		
		const newBoard = initialBoard.map((currentRow, rowIndex) =>
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
		
		setInitialBoard(newBoard);
	};
	
	return (
		<main className={"flex flex-col items-center space-y-4 p-4 grow"}>
			<div className={"grid grid-cols-6 gap-4"}>
				{initialBoard.map((row, rowIndex) => (
					<div key={rowIndex} className={"contents"}>
						{row.map((cell, colIndex) => (
							<button
								key={colIndex}
								value={cell === 0 ? '' : cell}
								className={
								`w-8 h-8 md:w-12 md:h-12 lg:w-20 lg:h-20  border border-gray-500 text-xs md:text-md lg:text-lg font-bold flex items-center justify-center bg-gray-900 text-white rounded-lg shadow-[0_8px_0px_#1E293B]
								${isValid ? 'bg-[#1B3A2F]!' : ''} ${cell === board[rowIndex][colIndex] && (cell === 0 || cell === 1) ? 'bg-gray-500!' : 'cursor-pointer hover:shadow-[0_6px_0px_#1E293B] active:shadow-none active:translate-y-1 transition-all lg:duration-150'}`}
								onClick={() => {
									if (isValid || cell === board[rowIndex][colIndex] && (cell === 0 || cell === 1)) return;
									else handleClick(cell, rowIndex, colIndex);
								}}
							>
								{cell}
							</button>
						))}
					</div>
				))}
			</div>

			<div>
				<button className={"mt-4"}>Rules</button>
			</div>

			{isValid && (
				<div className={"text-lg text-center"}>Congrats !</div>
			)}
		</main>
	);
}
