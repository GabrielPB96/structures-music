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
					textPreview={
						e._music
							? (e._music._structure.length &&
									e._music._structure.slice(0, 50)) ||
							  "No Text"
							: ""
					}
					createDate={e._creationDate}
					key={e._uid}
					pathFile={e._path}
					actionRemove={actionRemove}
				/>
			))}
		</>
	);
};

export default ListOfFiles;
