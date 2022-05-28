const date = (new Date()).getFullYear();
const paragraph = document.getElementById('copyright');
paragraph.innerHTML = `Copyright © ${date} Sean Conroy.`;
