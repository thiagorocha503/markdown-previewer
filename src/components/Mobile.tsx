import { useState } from "react";
import { DeviceProps } from "../types/device";
import Previewer from "./Previewer";
import Editor from "./Editor";

export default function Mobile({ html, onChange, markdown }: DeviceProps) {
    const [currentTab, setCurrentTab] = useState<number>(0);

    return (
        <div className="pt-2 px-2">
            <div className="card">
                <div className="card-header">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <button
                                onClick={() => setCurrentTab(0)}
                                className={
                                    "nav-link pointer " +
                                    (currentTab === 0 ? "active" : "")
                                }
                            >
                                Markdown
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                onClick={() => setCurrentTab(1)}
                                className={
                                    "nav-link pointer " +
                                    (currentTab === 1 ? "active" : "")
                                }
                            >
                                Preview
                            </button>
                        </li>
                    </ul>
                </div>
                <div className={currentTab === 0 ? "d-block" : "d-none"}>
                    <Editor handleChange={onChange} value={markdown} />
                </div>
                <div className={currentTab === 1 ? "d-block" : "d-none"}>
                    <Previewer value={html} />
                </div>
            </div>
        </div>
    );
}
