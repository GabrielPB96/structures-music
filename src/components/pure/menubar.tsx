//components
import Icon from "./icon";
//styles
import "../../styles/style-menu-bar.css";
//utils
import { iconsPaths } from "../../utils/icons";
import BackBtn from "./back-btn";
import { useNavigate } from "react-router-dom";

type Props = {
	newFolder: Function;
};

const MenuBar = ({ newFolder }: Props) => {
	const navigation = useNavigate();
	const hadleBack = () => {
		navigation("/dashboard");
	};

	const hadleNewFolder = () => {
		newFolder(true);
	};
	return (
		<nav className="nav-menu-files">
			<div className="menu-bar">
				<div className="search container-input-label ">
					<input type="search" id="search" placeholder="Search File" />
					<span className="span-icon-form menu-bar-search-icon">
						<Icon width={17} height={17} paths={iconsPaths.search} />
					</span>
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
					<BackBtn action={hadleBack}></BackBtn>
				</div>
			</div>
		</nav>
	);
};

export default MenuBar;
