import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../assets/scss/profile.scss";
import DataTable from 'react-data-table-component';
import { menuList, tabMenuList, trackColumnList, trackData, albumColumnList, albumData } from "./contents";
import { useState } from "react";

export const TagEditorPage: React.FC = () => {
    const [active, setActive] = useState(menuList[0].key);

    return (
        <div className="page page-profile uk-container-large mt-5 row">
            <div className="col-3 left-menu">
                <ul>
                    {menuList.map((menu, index) => (
                        <li
                            key={index}
                            className={"mb-1 " + (menu.key === active ? "active" : "")}
                            onClick={() => setActive(menu.key)}
                        >
                            <Link to={""}>{menu.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-9 content-wrapper">

                {active === menuList[0].key ? (
                    <DataTable
                        columns={trackColumnList}
                        data={trackData}
                    />
                ) : (
                    <DataTable
                        columns={albumColumnList}
                        data={albumData}
                    />
                )}
            </div>
        </div>
    );
};