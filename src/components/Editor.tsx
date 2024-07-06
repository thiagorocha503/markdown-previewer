import { markdown } from "@codemirror/lang-markdown";
import MarkdownEditor from "@uiw/react-markdown-editor";
import useWindowSize from "../hooks/useWindows";
import { bbedit } from "@uiw/codemirror-theme-bbedit";
import { EditorView } from "@uiw/react-codemirror";

const nav = 57;
const header = 54;
const offSet = nav + header + (2 * 8 + 37 + 16 + 30.5);

export default function Editor({
    handleChange,
    value,
}: {
    handleChange: Function;
    value: string;
}) {
    const windowsSise = useWindowSize();
    return (
        <MarkdownEditor
            className="w-100 border"
            value={value}
            minHeight="200px"
            height={`${windowsSise.height - offSet}px`}
            visibleEditor={true}
            extensions={[markdown(), EditorView.lineWrapping]}
            theme={bbedit}
            onChange={(v) => handleChange(v)}
        />
    );
}
