import { DeviceProps } from "../types/device";
import Editor from "./Editor";
import Previewer from "./Previewer";

export default function Computer({ html, onChange, markdown }: DeviceProps) {
    return (
        <div className="d-flex w-100 h-100 pt-2">
            <div className="box mb-2">
                <div className="card mx-2 text-left">
                    <div className="card-header">
                        <h4 className="Markdown">Markdown</h4>
                    </div>
                    <Editor handleChange={onChange} value={markdown} />
                </div>
            </div>
            <div className="mb-2 box">
                <div className="card me-2">
                    <div className="card-header">
                        <h4 className="Markdown">Preview</h4>
                    </div>
                    <Previewer value={html} />
                </div>
            </div>
        </div>
    );
}
