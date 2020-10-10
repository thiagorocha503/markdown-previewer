"use strict";
var input = $("#input");
var output = $("#output");
var editor;
// set highlight
marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});
function render() {
    var dirty = marked(editor.getValue());
    // sanitize the output HTML
    var clean = DOMPurify.sanitize(dirty);
    output.html(clean);
}
$("#btn-copy").on("click", function () {
    /* Select the text field */
    input.trigger("select");
    /* Copy the text inside the text field */
    document.execCommand("copy");
});
$(window).on("unload", function () {
    var text = editor.getValue();
    localStorage.setItem("markdown-text", text);
});
$(window).on("load", function () {
    var data = localStorage.getItem("markdown-text");
    if (data == null) {
        data = "";
    }
    editor = CodeMirror.fromTextArea(document.getElementById("input"), {
        lineNumbers: true,
        lineWrapping: true,
        styleActiveSelected: true,
    });
    editor.getDoc().setValue(data);
    CodeMirror.on(editor, "change", function () {
        render();
    });
    $(".CodeMirror").css("height", "100%");
    render();
});
