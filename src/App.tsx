import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { useEffect, useState } from "react";
import { EXAMPLE, MARKDOWN_KEY } from "./constant";
import Mobile from "./components/Mobile";
import Computer from "./components/Computer";
import GitHubCorners from "./components/GitHubCorners";
import useWindowSize from "./hooks/useWindows";
import "./App.css";

const marked = new Marked(
    markedHighlight({
        langPrefix: "hljs language-",
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(code, { language }).value;
        },
    })
);

function App() {
    const [markdown, setMarkdown] = useState<string>("");
    const [html, setHtml] = useState<string>("");
    const windowsSise = useWindowSize();

    useEffect(() => {
        (async function parse() {
            const h = await marked.parse(markdown);
            setHtml(h);
        })();
    }, [markdown]);

    useEffect(() => {
        const d = localStorage.getItem(MARKDOWN_KEY);
        d !== null ? setMarkdown(d) : setMarkdown(EXAMPLE);
    }, []);

    useEffect(() => {
        function unload() {
            localStorage.setItem(MARKDOWN_KEY, markdown);
        }
        window.addEventListener("unload", unload);
        return () => window.removeEventListener("unload", unload);
    });

    const handleChangeText = (text: string) => {
        setMarkdown(text);
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(markdown);
    };

    return (
        <div className="App">
            <GitHubCorners />
            <nav className="navbar bg-primary">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1 text-light">
                        Markdown previewer
                    </span>
                </div>
            </nav>
            <div className="px-2 pt-3">
                <button
                    onClick={handleCopyClick}
                    className="btn btn-primary text-light"
                >
                    Copy
                </button>
            </div>
            <div id="wrapper">
                {windowsSise.width < 992 ? (
                    <Mobile
                        html={html}
                        markdown={markdown}
                        onChange={handleChangeText}
                    />
                ) : (
                    <Computer
                        html={html}
                        onChange={handleChangeText}
                        markdown={markdown}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
