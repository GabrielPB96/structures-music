//react router
import { Link } from "react-router-dom";
import Icon from "./icon";
//utils
import { iconsPaths } from "../../utils/icons";
//styles
import "../../styles/style-component-list.css";
import { removePath } from "../../firebase/firebase-realdatabase";
import { useState } from "react";
import ConfirmModal from "./confirm-modal";

type Props = {
	title: string;
	textPreview?: string | null;
	createDate: string;
	paths: string[];
	pathFile: string;
};
const FilePreview = ({
	title,
	textPreview,
	createDate,
	paths,
	pathFile,
}: Props) => {
	const date = createDate;
	const [modal, setModal] = useState<boolean>(false);
	const remove = async () => {
		await removePath(pathFile);
		setModal(false);
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
						<button onClick={() => setModal(true)}>
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
			{modal && (
				<ConfirmModal
					message="¿Esta Seguro?"
					accept={remove}
					cancel={() => setModal(false)}
				/>
			)}
		</div>
	);
};

export default FilePreview;
