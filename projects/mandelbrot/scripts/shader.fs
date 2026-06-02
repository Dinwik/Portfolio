varying lowp vec4 vColor;

precision highp float;
uniform float cx;
uniform float cy;
uniform int maxIter;

int mandelbrot(float x, float y) {
    
    float zx = 0.0;
    float zy = 0.0;

    for (int i = 0; i < 10000; i++) {

        if (i >= maxIter) {
            break;
        }

        float zx2 = zx*zx;
        float zy2 = zy*zy;

        if (zx2 + zy2 > 4.0) {
            return i;
        }

        zy = 2.0*zx*zy + y;
        zx = zx2-zy2 + x;
    }
    return -1;
}

void main() {
    
    float x = gl_FragCoord.x + cx;
    float y = gl_FragCoord.y + cy;

    x /= 128.0;
    y /= 128.0;

    int color = mandelbrot(x, y);

    if (color == -1) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
        float temp = float(color) / float(maxIter);
        gl_FragColor = vec4(temp, 1.0, 0.0, 1.0);
    }
}