import Header from "./components/Header";
import Home from "./components/Main";

import { LucideIcon, House } from "lucide-react";

type Tab = {
	_id: string;
	name: string;
	icon: LucideIcon;
}

function App() {
	const tabs: Tab[] = [
		{
			_id: "home",
			name: "Home",
			icon: House
		}
	]
	
	return (
		<>
			<Header />
			
			<Home />
			
			<footer className={"flex items-center justify-center border-t p-4"}>
				{tabs.map((tab: Tab) => (
					<div key={tab._id}>
						<a href="#"><tab.icon/></a>
					</div>
				))}
			</footer>
		</>
	)
}

export default App;
