import ComponentList from "../../components/container/component-list";
//import Metronome from "./components/metronome/components/container/metronome";
import MenuBar from "../../components/pure/menubar";

//styles
import "../../styles.css";

//firebase
import { readUser } from "../../utils/firebase";

//react
import { useEffect, useState } from "react";

//react router
import { useLoaderData } from "react-router-dom";

export async function readUsuario() {
  const res = await readUser(202000234);
  return res;
}
const FilesPage = () => {
  //const us = useLoaderData();
  //console.log(us);
  const [directoryUser, setDirectoryUser] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    readUser(202000234).then((e) => {
      setUser(e);
    });
  }, []);
  useEffect(() => {
    if (user) setDirectoryUser(user._directory);
  }, [user]);

  const renderList = () => {
    let list = [];
    for (let ob in directoryUser) {
      list.push(directoryUser[ob]);
    }
    return list;
  };
  return (
    <div className="App">
      <header className="header-app">
        <h1>Music Structures</h1>
      </header>
      <nav>
        <MenuBar />
      </nav>
      <main>
        {directoryUser
          ? renderList().map((e, k) => {
              return (
                <ComponentList
                  type={e._type}
                  title={e._name}
                  textPreview={e._textPreview}
                  createDate={e._creationDate}
                  key={`clp${k}`}
                />
              );
            })
          : "Cargando..."}
      </main>
      <footer className="footer-app"></footer>
    </div>
  );
};

export default FilesPage;
