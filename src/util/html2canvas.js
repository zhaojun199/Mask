export default class Html2canvas {
    constructor({ container, style }) {
        this.container = container;
        this.style = style || { width: '100vw', height: '100vh' };
        this.svgId = null;
        this.html2svg();
        this.svg2img();
    }

    html2svg() {
        // 创造svg
        const data = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${this.style.width}" height="${this.style.height}">
            <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">
            ${this.container.innerHTML}
            </div>
            </foreignObject>
        </svg>
        `;

        const div = document.createElement('div');
        div.id = `$svg_${Math.random()}`;
        this.svgId = div.id;
        div.style.width = this.style.width;
        div.style.height = this.style.height;
        div.innerHTML = data;
        document.body.appendChild(div);
    }

    svg2img() {
        const divContent = document.getElementById(this.svgId).children[0];
        const svgStr = new XMLSerializer().serializeToString(divContent);
        const blob = new Blob([svgStr], {
            type: 'image/svg+xml',
        });
        const blobStr = URL.createObjectURL(blob);
        const template = `<img src="${blobStr}" width="100%" height="100%">`;
        const div = document.createElement('div');
        div.id = `$img_${Math.random()}`;
        this.imgId = div.id;
        div.style.width = this.style.width;
        div.style.height = this.style.height;
        div.innerHTML = template;
        document.body.appendChild(div);
    }

    img2canvas() {

    }
}
