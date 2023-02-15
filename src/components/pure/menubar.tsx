//components
import Icon from "./icon";
//styles
import "../../styles/style-menu-bar.css";
//utils
import { iconsPaths } from "../../utils/icons";
import BackBtn from "./back-btn";
import { searchFile } from "../../utils/utils";
import { ChangeEvent, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { off, onValue, ref } from "firebase/database";
import {
	db,
	readGetOnce,
	updateDataPath,
} from "../../firebase/firebase-realdatabase";
import { File } from "../../models/structure-files/file.class";
import { Link, useNavigate } from "react-router-dom";

type Props = {
	newFolder: Function;
	//TODO: REVISAR EL TIPO
	currentFolder: any;
};

const MenuBar = ({ newFolder, currentFolder }: Props) => {
	const navigation = useNavigate();
	const { pathFile, setPathFile } = useContext(AuthContext);

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
