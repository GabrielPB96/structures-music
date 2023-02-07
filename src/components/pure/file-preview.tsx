//react router
import { Link } from "react-router-dom";
import Icon from "./icon";
//utils
import { iconsPaths } from "../../utils/icons";
//styles
import "../../styles/style-component-list.css";

type Props = {
  title: string;
  textPreview: string;
  createDate: string;
};
const FilePreview = ({ title, textPreview, createDate }: Props) => {
  const date = createDate;
  return (
    <div className="component-list">
      <Link to={`/home/${title}`}>
        <article className="component-list-header">
          <header>
            <h4>
              <span>
                <Icon paths={iconsPaths.fileMusic} width={16} height={16} />
              </span>
              <span>{title}</span>
            </h4>
          </header>
          <p className="text-preview">{textPreview}</p>
          <p className="date">{date}</p>
        </article>
      </Link>
    </div>
  );
};

export default FilePreview;
