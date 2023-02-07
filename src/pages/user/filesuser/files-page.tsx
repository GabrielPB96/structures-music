import ComponentList from "../../../components/container/component-list";
//import Metronome from "./components/metronome/components/container/metronome";
import MenuBar from "../../../components/pure/menubar";

//styles

//firebase
import { readDoc } from "../../../firebase/firebase-utils";
//react
import { useContext, useEffect, useState } from "react";

//react router
import { useLoaderData, useNavigate } from "react-router-dom";
import { User } from "../../../models/user.class";
import AuthContext from "../../../context/AuthContext";
import BackBtn from "../../../components/pure/back-btn";

const FilesPage = () => {
	//const us = useLoaderData();
	//console.log(us);

	const navigation = useNavigate();
	const { user } = useContext(AuthContext);

	const [USER, setUSER] = useState<User>();
	const [directory, setDirectory] = useState<{ [key: string]: any }>();

	useEffect(() => {
		if (user) {
			readDoc("users", user.displayName || "").then((data: any) => {
				setDirectory(data._directory);
			});
		}
	}, []);

	const renderList = () => {
		let list: any = [];
		for (let ob in directory) {
			list.push(directory[ob]);
		}
		return list;
	};
	const renderFiles = () => {
		let list = renderList();
		let res = <p>EMPTY</p>;
		if (list.length) {
			res = renderList().map((e: any, k: number) => (
				<ComponentList
					type={e._type}
					title={e._name}
					textPreview={e._textPreview}
					createDate={e._creationDate}
					key={`clp${k}`}
				/>
			));
		}
		return res;
	};
	const hadleBack = () => {
		navigation("/dashboard");
	};
	return (
		<div className="App">
			<header className="header-app">
				<h1>Music Structures</h1>
				<BackBtn action={hadleBack}></BackBtn>
			</header>
			<nav>
				<MenuBar />
			</nav>
			<main>{directory ? renderFiles() : "Cargando..."}</main>
			<footer className="footer-app"></footer>
		</div>
	);
};

export default FilesPage;
