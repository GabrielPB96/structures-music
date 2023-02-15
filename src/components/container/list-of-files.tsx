import { TypeChildren } from "../../utils/utils";
import ComponentList from "./component-list";
import { FC } from "react";

type Props = {
	directory: TypeChildren[] | any;
	actionRemove: Function;
};
const ListOfFiles: FC<Props> = ({ directory, actionRemove }) => {
	return (
		<>
			{directory.map((e: any, k: number) => (
				<ComponentList
					type={e._type}
					title={e._name}
					textPreview={e._textPreview}
					createDate={e._creationDate}
					key={`clp${k}`}
					pathFile={e._path}
					actionRemove={actionRemove}
				/>
			))}
		</>
	);
};

export default ListOfFiles;
