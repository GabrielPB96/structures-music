//react router
import { Link } from "react-router-dom";
import Icon from "./icon";
//utils
import { iconsPaths } from "../../utils/icons";
//styles
import "../../styles/style-component-list.css";

type Props = {
  title: string;
  createDate: string;
};
const FolderPreview = ({ title, createDate }: Props) => {
  const date = createDate;
  return (
    <div className="component-list">
      <Link to="">
        <article>
          <header className="component-list-header">
            <h4>
              <span>
                <Icon paths={iconsPaths.folderMusic} width={16} height={16} />
              </span>
              <span>{title}</span>
            </h4>
          </header>
          <p className="date">{date}</p>
        </article>
      </Link>
    </div>
  );
};

export default FolderPreview;
