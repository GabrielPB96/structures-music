//components
import Icon from "./icon";
//styles
import "../../styles/style-menu-bar.css";
//utils
import { iconsPaths } from "../../utils/icons";
import BackBtn from "./back-btn";
import { Array, searchFile } from "../../utils/utils";
import { ChangeEvent } from "react";

type Props = {
	newFolder: Function;
	currentFolder: Array[] | null | false;
};

const MenuBar = ({ newFolder, currentFolder }: Props) => {
	const hadleNewFolder = () => {
		newFolder(true);
	};

	const hadleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		let textInput = event.target.value;
		searchFile(currentFolder || [], textInput);
	};

	return (
		<nav className="nav-menu-files">
			<div className="menu-bar">
				<div className="search container-input-label ">
					<input
						type="search"
						id="search"
						placeholder="Search File"
						className="search-input"
						onChange={hadleSearch}
					/>
					{/* <span className="span-icon-form menu-bar-search-icon">
						<Icon width={17} height={17} paths={iconsPaths.search} />
					</span> */}
				</div>

				<div className="menu-bar-options">
					<div className="menu-bat-options-files">
						<button>
							<span>
								<Icon width={17} height={17} paths={iconsPaths.newFile} />
							</span>
						</button>
						<button onClick={hadleNewFolder}>
							<span>
								<Icon width={17} height={17} paths={iconsPaths.newFolder} />
							</span>
						</button>
					</div>
					<BackBtn></BackBtn>
				</div>
			</div>
		</nav>
	);
};

export default MenuBar;
