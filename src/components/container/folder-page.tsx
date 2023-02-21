import { useContext } from "react";
import { StateRead, StateReadFile, lastFileFromUrl } from "../../utils/utils";
import EmptyDirectory from "../pure/empty-directory";
import Loading from "../pure/loading";
import MenuBar from "../pure/menubar";
import SearchEmpty from "../pure/search-empty";
import AuthContext from "../../context/AuthContext";
import ListOfFiles from "./list-of-files";

const Header = ({ title }: { title: string }) => {
	return (
		<header className="header-app header-files">
			<h1>{title}</h1>
		</header>
	);
};

type Props = {
	directory: StateRead;
	setModalCreate: (state: boolean) => void;
	search: Function;
	resetDirectory: Function;
	handleRemove: Function;
};

const FolderPage = ({
	setModalCreate,
	search,
	resetDirectory,
	handleRemove,
	directory,
}: Props) => {
	const { pathFile } = useContext(AuthContext);
	return (
		<div className="page">
			<Header title={lastFileFromUrl(pathFile) || ""} />

			<MenuBar
				newFolder={setModalCreate}
				search={search}
				resetDirectory={resetDirectory}
			/>
			<main className="main-app main-files-user">
				{directory.state === StateReadFile.LOADING ? (
					<Loading />
				) : directory.state === StateReadFile.FOLDER ? (
					<ListOfFiles
						directory={directory.content}
						actionRemove={handleRemove}
					/>
				) : directory.state === StateReadFile.SEARCH_EMPTY ? (
					<SearchEmpty />
				) : (
					<EmptyDirectory />
				)}
			</main>
		</div>
	);
};

export default FolderPage;
