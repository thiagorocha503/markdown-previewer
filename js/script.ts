const input: JQuery<HTMLElement> = $("#input");
const output: JQuery<HTMLElement> = $("#output");


function render() { 
    let dirty = marked(input.val() as string);
    // sanitize the output HTML
    let clean = DOMPurify.sanitize(dirty);
    output.html(clean);
}

$(input).on("keyup paste", () => render())

$(window).on("load", () => {
    let data: string | null = localStorage.getItem("markdown-text");
    if (data == null) {
        return;
    }
    input.val(data);
    render();
})

$(window).on("unload", () => {
    let text: string = input.val() as string;
    localStorage.setItem("markdown-text", text);
});

$("#btn-copy").on("click",()=>{
    /* Select the text field */
    input.trigger("select");
    /* Copy the text inside the text field */
    document.execCommand("copy");

})