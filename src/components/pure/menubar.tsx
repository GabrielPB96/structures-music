//components
import Icon from "./icon";
//styles
import "../../styles/style-menu-bar.css";
//utils
import { iconsPaths } from "../../utils/icons";

const MenuBar = () => {
  return (
    <div className="menu-bar">
      <label htmlFor="search">
        <input type="search" id="search" placeholder="Search File" />
        <span className="menu-bar-search-icon">
          <Icon width={17} height={17} paths={iconsPaths.search} />
        </span>
      </label>
      <div className="menu-bar-options-file">
        <button>
          <span>
            <Icon width={17} height={17} paths={iconsPaths.newFile} />
          </span>
        </button>
        <button>
          <span>
            <Icon width={17} height={17} paths={iconsPaths.newFolder} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
