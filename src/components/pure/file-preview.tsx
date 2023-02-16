//react router
import { Link } from "react-router-dom";
import Icon from "./icon";
//utils
import { iconsPaths } from "../../utils/icons";
//styles
import "../../styles/style-component-list.css";
import { lastFileFromUrl } from "../../utils/utils";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

type Props = {
	title: string;
	textPreview?: string | null;
	createDate: string;
	pathsIcons: string[];
	pathFile: string;
	actionRemove: Function;
};
const FilePreview = ({
	title,
	textPreview,
	createDate,
	pathFile,

	pathsIcons,
	actionRemove,
}: Props) => {
	const { setPathFile } = useContext(AuthContext);
	const date = createDate;
	const remove = async () => {
		await actionRemove(pathFile);
	};

	return (
		<div className="component-list">
			<Link to={`/musics/${lastFileFromUrl(pathFile)}`}>
				<article
					className="component-list-content"
					onClick={() => {
						setPathFile(pathFile);
						localStorage.setItem("pathFile", pathFile);
					}}
				>
					<header className="component-list-header">
						<h4>
							<span>
								<Icon paths={pathsIcons} width={16} height={16} />
							</span>
							<span>{title}</span>
						</h4>
						{textPreview && <p className="text-preview">{textPreview}</p>}
						<p className="date">{date}</p>
					</header>
				</article>
			</Link>
			<div className="component-list-options">
				<button className="button" onClick={remove}>
					<Icon
						width={16}
						height={16}
						paths={iconsPaths.trashFill}
						color="tomato"
					/>
				</button>
				{/* <button className="button">
					<Icon width={16} height={16} paths={iconsPaths.pencilFill} />
				</button> */}
			</div>
		</div>
	);
};

export default FilePreview;
