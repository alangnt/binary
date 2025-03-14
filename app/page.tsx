'use client'

import Header from "./components/Header";
import Home from "./components/Main";

import { LucideIcon, RotateCcw } from "lucide-react";

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
			
			<footer className={"flex items-center justify-center border-t p-4"}>
				{tabs.map((tab: Tab) => (
					<div key={tab._id}>
						<button onClick={tab.action} className={"cursor-pointer hover:scale-110 hover:rotate-360 transition-all duration-250"}><tab.icon/></button>
					</div>
				))}
			</footer>
		</>
	)
}

export default App;
