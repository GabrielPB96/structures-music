//components
import Icon from "./icon";
//styles
import "../../styles/style-menu-bar.css";
//utils
import { iconsPaths } from "../../utils/icons";
import BackBtn from "./back-btn";
import { searchFile } from "../../utils/utils";
import { ChangeEvent } from "react";

type Props = {
	newFolder: Function;
	//TODO: REVISAR EL TIPO
	currentFolder: any;
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
					<label htmlFor="menu" className="btn-menu">
						File
					</label>
					<input type="checkbox" name="" id="menu" />
					<div className="menu-bar-options-files">
						<button className="button">
							<span>
								<Icon width={17} height={17} paths={iconsPaths.newFile} />
							</span>
						</button>
						<button className="button" onClick={hadleNewFolder}>
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
