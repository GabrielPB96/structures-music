//react router
import { Link } from "react-router-dom";
import Icon from "./icon";
//utils
import { iconsPaths } from "../../utils/icons";
//styles
import "../../styles/style-component-list.css";

type Props = {
	title: string;
	textPreview?: string | null;
	createDate: string;
	paths: string[];
	pathFile: string;
	actionRemove: Function;
};
const FilePreview = ({
	title,
	textPreview,
	createDate,
	paths,
	pathFile,
	actionRemove,
}: Props) => {
	const date = createDate;
	const remove = async () => {
		await actionRemove(pathFile);
	};
	return (
		<div className="component-list">
			<Link to="">
				<article className="component-list-content">
					<header className="component-list-header">
						<h4>
							<span>
								<Icon paths={paths} width={16} height={16} />
							</span>
							<span>{title}</span>
						</h4>
						{textPreview && <p className="text-preview">{textPreview}</p>}
						<p className="date">{date}</p>
					</header>
					<div className="component-list-options">
						<button onClick={remove}>
							<Icon
								width={16}
								height={16}
								paths={iconsPaths.trashFill}
								color="tomato"
							/>
						</button>
						<button>
							<Icon width={16} height={16} paths={iconsPaths.pencilFill} />
						</button>
					</div>
				</article>
			</Link>
		</div>
	);
};

export default FilePreview;
