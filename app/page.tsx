'use client'

import Header from "./components/Header";
import Home from "./components/Main";

import { LucideIcon, RotateCcw, Heart } from "lucide-react";

import Link from "next/link";

type Tab = {
	_id: string;
	name: string;
	icon: LucideIcon;
	action: () => void;
}

function App() {
	const tabs: Tab[] = [
		{
			_id: "home",
			name: "Home",
			icon: RotateCcw,
			action: () => window.location.reload(),
		}
	]
	
	return (
		<>
			<Header />
			
			<Home />
			
			<footer className={"flex flex-col items-center justify-center border-t p-4"}>
				{tabs.map((tab: Tab) => (
					<div key={tab._id}>
						<button onClick={tab.action} className={"cursor-pointer hover:scale-110 hover:rotate-360 transition-all duration-250"}><tab.icon/></button>
					</div>
				))}

				<div>
					<p className={"flex items-center text-sm md:text-md"}>This is a beta website made with&nbsp;<span><Heart className={"hover:fill-red-800 overflow-hidden transition-all duration-150"} /></span>&nbsp;by &nbsp;<Link target={"_blank"} href={"https://www.linkedin.com/in/alan-geirnaert/"} className={"hover:scale-105 underline transition-all duration-150"}>Alan Geirnaert</Link></p>
				</div>
			</footer>
		</>
	)
}

export default App;
