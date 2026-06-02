const xoff = document.getElementById("posx");
const yoff = document.getElementById("posy");

const iter = document.getElementById("iter");

const gl = canvas.getContext("webgl");
if (!gl)
    alert("Your browser doesn't support WebGL.");

function createShader(gl, type, source) {

    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(gl, vsSource, fsSource) {
    const vShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    
    const program = gl.createProgram();
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program Link Error:", gl.getProgramInfoLog(program));
        return null;
    }
    return program;
}

async function draw() {
  
    const xVal = parseFloat(document.getElementById("posx").value);
    const yVal = parseFloat(document.getElementById("posy").value);
    const iterVal = parseInt(document.getElementById("iter").value);

    const [vsSource, fsSource] = await Promise.all([
        fetch('scripts/shader.vs').then(r => r.text()),
        fetch('scripts/shader.fs').then(r => r.text())
    ]);

    const program = createProgram(gl, vsSource, fsSource);
    if (!program) return;

    gl.useProgram(program);

    const cxLoc = gl.getUniformLocation(program, "cx");
    const cyLoc = gl.getUniformLocation(program, "cy");
    const maxIterLoc = gl.getUniformLocation(program, "maxIter");

    gl.uniform1f(cxLoc, xVal);
    gl.uniform1f(cyLoc, yVal);
    gl.uniform1i(maxIterLoc, iterVal);

    const vertices = new Float32Array([
        -1.0,  1.0, 
        -1.0, -1.0,
         1.0,  1.0,
         1.0, -1.0 
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    
    console.log("Render zakończony dla:", xVal, yVal, iterVal);
}

draw();