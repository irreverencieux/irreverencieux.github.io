

const fileSelector = document.getElementById('archivo');
const caja = document.getElementById('origen');
fileSelector.addEventListener('change', (event) => {
  const file = event.target.files[0];
  //console.log(fileList);
  caja.value=file;
});



function cargatxt()
{


let input = document.querySelector('archivo')
 
let textarea = document.querySelector('origen')
 
// This event listener has been implemented to identify a
// Change in the input section of the html code
// It will be triggered when a file is chosen.
input.addEventListener('change', () => {
    let files = input.files;
 
    if (files.length == 0) return;
 
    /* If any further modifications have to be made on the
       Extracted text. The text can be accessed using the
       file variable. But since this is const, it is a read
       only variable, hence immutable. To make any changes,
       changing const to var, here and In the reader.onload
       function would be advisible */
    const file = files[0];
 
    let reader = new FileReader();
 
    reader.onload = (e) => {
        const file = e.target.result;
 
        // This is a regular expression to identify carriage
        // Returns and line breaks
        const lines = file.split(/\r\n|\n/);
        textarea.value = lines.join('\n');
        alert(textarea.value);
 
    };
 
    reader.onerror = (e) => alert(e.target.error.name);
 
    reader.readAsText(file);
});
}