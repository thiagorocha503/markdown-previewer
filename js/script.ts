const input: JQuery<HTMLElement> = $("#input");
const output: JQuery<HTMLElement> = $("#output");
var editor: CodeMirror.Editor;

// set highlight
marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});

function render() {
    let dirty = marked(editor.getValue());
    // sanitize the output HTML
    let clean = DOMPurify.sanitize(dirty);
    output.html(clean);
}

$("#btn-copy").on("click", () => {
    /* Select the text field */
    input.trigger("select");
    /* Copy the text inside the text field */
    document.execCommand("copy");
})

$(window).on("unload", () => {
    let text: string = editor.getValue();
    localStorage.setItem("markdown-text", text);
});

$(window).on("load", () => {
    let data: string | null = localStorage.getItem("markdown-text");
    if (data == null) {
        data = "";
    }
    editor = CodeMirror.fromTextArea(
        document.getElementById("input") as HTMLTextAreaElement,
        {
            lineNumbers: true,
            lineWrapping: true,
            styleActiveSelected: true,
        }
    );
    editor.getDoc().setValue(data);
    CodeMirror.on(editor, "change", () => {
        render();
    })
    $(".CodeMirror").css("height", "100%");
    render();
})