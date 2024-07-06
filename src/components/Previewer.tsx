import DOMPurify from "dompurify";
import "./Previewer.css";

export default function Previewer({ value }: { value: string }) {
    return (
        <div
            className=" w-100"
            id="preview"
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(value),
            }}
        ></div>
    );
}
