//components
import Icon from "./icon";
//styles
import "../../styles/style-menu-bar.css";
//utils
import { iconsPaths } from "../../utils/icons";
import BackBtn from "./back-btn";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import {
	readGetOnce,
	updateDataPath,
} from "../../firebase/firebase-realdatabase";
import { File } from "../../models/structure-files/file.class";
import { useNavigate } from "react-router-dom";

type Props = {
	newFolder: Function;
	search: Function;
	resetDirectory:Function
};

const MenuBar = ({ newFolder, search,resetDirectory }: Props) => {
	const navigation = useNavigate();
	const { pathFile, setPathFile } = useContext(AuthContext);
	const [textSearch, setTextSearch] = useState("");

	const hadleNewFolder = () => {
		newFolder(true);
	};

	const hadleNewFile = async () => {
		const dataUser = await readGetOnce(pathFile);
		const newFile = new File("New File", `${pathFile}/_children/New File`);
		const newData = {
			...dataUser,
			["_children"]: {
				...dataUser._children,
				["New File"]: newFile,
			},
		};
		await updateDataPath(pathFile, newData);
		navigation(`/musics/New File`);
		setPathFile(`${pathFile}/_children/New File`);
	};

	const hadleSearch = () => {
		search(textSearch);
	};

	return (
		<nav className="nav-menu-files">
			<div className="menu-bar">
				<div className="container-input-label" id="search">
					<input
						type="search"
						id="search"
						value={textSearch}
						placeholder="Search File"
						className="search-input"
						onChange={(event) => {
							const text = event.target.value;
							if(!text.length) resetDirectory()
							setTextSearch(text);
						}}
					/>
					<button className="button" id="search-button" onClick={hadleSearch}>
						search
					</button>
				</div>

				<div className="menu-bar-options">
					<label htmlFor="menu" className="btn-menu">
						File
					</label>
					<input type="checkbox" name="" id="menu" />
					<div className="menu-bar-options-files">
						<button onClick={hadleNewFile} className="button">
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
