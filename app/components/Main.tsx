'use client'

import { useState, useEffect } from "react";

import { X } from "lucide-react";

type Cell = 0 | 1 | undefined;
type Board = Cell[];

export default function Main() {
	const [rulesMenu, setRulesMenu] = useState<boolean>(false);

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

	useEffect(() => {
		setRulesMenu(true);
	}, [])
	
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
				<button onClick={() => setRulesMenu(true)} className={"mt-4 cursor-pointer hover:scale-105 transition-all duration-150"}>Rules</button>
				<section className={`absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/20 backdrop-blur ${rulesMenu ? '' : 'hidden'}`}>
					<article className={"border-gray-500 w-fit h-fit text-center relative"}>
						<h2 className={"text-xl mb-4"}>Rules :</h2>
						<ul className={"flex flex-col space-y-4 text-sm md:text-lg p-4 md:p-0"}>
							<li>The grid consists of 6 columns and 6 rows (6x6)</li>
							<li>Each row and column must contain exactly 3 zeros (0) and 3 ones (1)</li>
							<li>No more than two consecutive zeros (0 0 0) or ones (1 1 1) are allowed horizontally or vertically</li>
							<li>The puzzle must be solvable using logic, no guessing required</li>
							<li className={"mt-4"}>Good luck !</li>
						</ul>

						<button
							onClick={() => setRulesMenu(false)}
							className={"border rounded-full p-2 mt-12 left-1/2 cursor-pointer hover:scale-105 transition-all duration-100"}><X /></button>
					</article>
				</section>
			</div>

			{isValid && (
				<div className={"text-lg text-center"}>Congrats !</div>
			)}
		</main>
	);
}
